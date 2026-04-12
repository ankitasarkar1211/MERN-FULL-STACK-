const express = require("express");
const http = require("http"); // For creating HTTP server to work with Socket.IO
const { Server } = require("socket.io"); // Socket.IO server class 
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// Create socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app
    methods: ["GET", "POST"],
  },
});

// When client connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Send message to room only
  socket.on("send_message", (data) => {
    console.log("Message to room:", data.room);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});