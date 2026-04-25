const Message = require("../models/Message");

function chatSocket(socket, io) {
  socket.on("join_room", async (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);

    try {
      const messages = await Message.find({ room }).sort({ createdAt: 1 });
      socket.emit("load_messages", messages);
    } catch (error) {
      console.error("Error fetching previous messages:", error);
    }
  });
  // Send + SAVE message
  socket.on("send_message", async (data) => {
    console.log("Message to room:", data.room);

    // 🔥 Typing start
    socket.on("typing", (data) => {
      socket.to(data.room).emit("show_typing", data.user);
    });

    // 🔥 Typing stop
    socket.on("stop_typing", (data) => {
      socket.to(data.room).emit("hide_typing");
    });

    try {
      // Save to DB
      const newMessage = new Message(data);
      await newMessage.save();

      // Send to others
      io.to(data.room).emit("receive_message", data);
    } catch (err) {
      console.log("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
}
module.exports = chatSocket;
