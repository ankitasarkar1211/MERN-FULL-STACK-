const { Server } = require("socket.io");
const chatSocket = require("../sockets/chatSocket");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Call all socket logic
    chatSocket(socket, io);
  });
}

module.exports = setupSocket;