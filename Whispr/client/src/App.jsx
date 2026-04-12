import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      user: username,
      message: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", messageData);
    setMessage("");
  };

  // Join screen
  if (!isJoined) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl mb-4 font-bold">Whispr 💬</h1>
        <input
          className="border p-2 mb-3"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => setIsJoined(true)}
        >
          Join Chat
        </button>
      </div>
    );
  }

  // Chat UI
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Whispr 💬</h1>

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
                msg.user === username
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
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
        <button
          className="bg-blue-500 text-white px-4"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;