const Message = require("../models/Message");

const onlineUsers = {};

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

    if (!onlineUsers[room]) {
      onlineUsers[room] = [];
    }

    if (!onlineUsers[room].includes(user)) {
      onlineUsers[room].push(user);
    }

    console.log("Online users:", onlineUsers);

    io.to(room).emit("online_users", onlineUsers[room]);
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
      await newMessage.save();

      io.to(data.room).emit("receive_message", data);
    } catch (err) {
      console.log("Error saving message:", err);
    }
  });

  // 🔹 DISCONNECT
  socket.on("disconnect", () => {
    const room = socket.room;

    if (room && onlineUsers[room]) {
      onlineUsers[room] = onlineUsers[room].filter(
        (user) => user !== socket.user
      );

      io.to(room).emit("online_users", onlineUsers[room]);
    }

    console.log("User disconnected:", socket.id);
  });
}

module.exports = chatSocket;