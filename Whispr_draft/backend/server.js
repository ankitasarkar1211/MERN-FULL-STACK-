const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const PORT = 5000;

const app = express();
app.use(cors());

const server = http.createServer(app);

// ✅ CORS FIX for frontend connection
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // React/Vite default port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("chatMessage", (msg) => {
    console.log("Message received:", msg);

    // Broadcast to all clients
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/chatbot");

// // Schema
// const ChatSchema = new mongoose.Schema({
//   message: String,
//   reply: String,
// });

// // Model
// const Chat = mongoose.model("Chat", ChatSchema);

// // Chat API
// app.post("/chat", async (req, res) => {
//   const userMsg = req.body.message.toLowerCase();

//   let botReply = "Sorry, I don't understand.";

//   // Simple chatbot logic
//   if (userMsg.includes("hello")) {
//     botReply = "Hi! How can I help you?";
//   } else if (userMsg.includes("price")) {
//     botReply = "Prices depend on the product.";
//   } else if (userMsg.includes("bye")) {
//     botReply = "Goodbye!";
//   }

//   // Save chat in DB
//   await Chat.create({
//     message: userMsg,
//     reply: botReply,
//   });

//   res.json({ reply: botReply });
// });

// // Server
// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

// const express= require ('express');
// const http= require("http");
// const cors= require("cors");
// const {Server} = require("socket.io");

// const app= express();
// app.use(cors());

// const server= http.createServer(app);
// const io= new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("User connected: ", socket.id);

//   socket.on("join_room", (room) => {
//     socket.join(room);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit.apply("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("Server running on port 5000");
//   });
// })
