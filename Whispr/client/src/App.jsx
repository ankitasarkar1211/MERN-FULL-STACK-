import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [targetUser, setTargetUser] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const generateRoomId = (user1, user2) => {
    return [user1.trim().toLowerCase(), user2.trim().toLowerCase()]
      .sort()
      .join("_");
  };

  const joinRoom = () => {
    if (!username || !targetUser) {
      alert("Enter both usernames");
      return;
    }

    const roomId = generateRoomId(username, targetUser);
    console.log("Joining room:", roomId); // DEBUG

    setRoom(roomId);
    socket.emit("join_room", roomId);
    console.log("Room generated:", roomId);
    setIsJoined(true);
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      room: room,
      user: username,
      message: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", messageData);

    // Add message locally (since server doesn't send back to sender)
    setChat((prev) => [...prev, messageData]);

    setMessage("");
  };

  // 🔐 Join Screen
  if (!isJoined) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl mb-4 font-bold">Whispr 💬</h1>

        <input
          className="border p-2 mb-2"
          placeholder="Your name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 mb-3"
          placeholder="Chat with (username)"
          onChange={(e) => setTargetUser(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2" onClick={joinRoom}>
          Join Chat
        </button>
      </div>
    );
  }

  // 💬 Chat UI
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-2">Room: {room}</h1>

      <div className="w-80 h-80 bg-white shadow rounded p-3 overflow-y-auto">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`my-2 flex ${
              msg.user === username ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded max-w-[70%] ${
                msg.user === username ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <p className="text-sm font-semibold">{msg.user}</p>
              <p>{msg.message}</p>
              <p className="text-xs text-right">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-3">
        <input
          className="border p-2 w-60"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
