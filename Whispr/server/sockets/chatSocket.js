const Message = require("../models/Message");

const onlineUsers = {};
const userSockets = {};

function chatSocket(socket, io) {
  // 🔹 JOIN ROOM
  socket.on("join_room", async (room) => {
    socket.join(room);
    socket.room = room;

    console.log(`User joined room: ${room}`);

    try {
      const messages = await Message.find({ room }).sort({ createdAt: 1 });
      socket.emit("load_messages", messages);
    } catch (error) {
      console.error("Error fetching previous messages:", error);
    }
  });

  // 🔹 JOIN USER (ONLINE TRACKING)
  socket.on("join_user", ({ room, user }) => {
    socket.user = user;

    if (!userSockets[user]) {
      userSockets[user] = new Set();
    }

    userSockets[user].add(socket.id);

    if (!onlineUsers[room]) {
      onlineUsers[room] = [];
    }

    if (!onlineUsers[room].includes(user)) {
      onlineUsers[room].push(user);
    }

    console.log("Online users:", onlineUsers);

    io.to(room).emit("online_users", onlineUsers[room]);
  });

  // 🔹 LEAVE ROOM
  socket.on("leave_room", ({ room, user }) => {
    socket.leave(room);

    if (onlineUsers[room]) {
      onlineUsers[room] = onlineUsers[room].filter((u) => u !== user);

      io.to(room).emit("online_users", onlineUsers[room]);
    }

    console.log(`${user} left room: ${room}`);
  });

  // 🔹 TYPING START
  socket.on("typing", (data) => {
    socket.to(data.room).emit("show_typing", data.user);
  });

  // 🔹 TYPING STOP
  socket.on("stop_typing", (data) => {
    socket.to(data.room).emit("hide_typing");
  });

  // 🔹 SEND MESSAGE
  socket.on("send_message", async (data) => {
    console.log("Message to room:", data.room);

    try {
      const newMessage = new Message(data);

      const savedMessage = await newMessage.save();

      io.to(data.room).emit("receive_message", savedMessage);
    } catch (err) {
      console.log("Error saving message:", err);
    }
  });

  // 🔹 DISCONNECT
  socket.on("disconnect", () => {
    const room = socket.room;
    const user = socket.user;

    if (user && userSockets[user]) {
      userSockets[user].delete(socket.id);

      if (userSockets[user].size === 0) {
        delete userSockets[user];

        if (room && onlineUsers[room]) {
          onlineUsers[room] = onlineUsers[room].filter((u) => u !== user);

          io.to(room).emit("online_users", onlineUsers[room]);
        }
      }
    }

    console.log("User disconnected:", socket.id);
  });
}

module.exports = chatSocket;
