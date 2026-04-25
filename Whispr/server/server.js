const http = require("http");
const app = require("./app");
const setupSocket = require("./config/socket");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

// Initialize Socket.IO
setupSocket(server);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});