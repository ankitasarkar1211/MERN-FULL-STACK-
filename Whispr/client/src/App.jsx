import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [targetUser, setTargetUser] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedTargetUser = localStorage.getItem("targetUser");
    const savedRoom = localStorage.getItem("room");

    if (savedUsername && savedTargetUser && savedRoom) {
      setUsername(savedUsername);
      setTargetUser(savedTargetUser);
      setRoom(savedRoom);
      setIsJoined(true);

      socket.emit("join_room", savedRoom);
    }
  }, []);

  // 🔹 Receive messages + load old messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("load_messages", (messages) => {
      setChat(messages);
    });
    socket.on("show_typing", (user) => {
      setTypingUser(user);
    });

    socket.on("hide_typing", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("receive_message");
      socket.off("load_messages");
      socket.off("show_typing");
      socket.off("hide_typing");
    };
  }, []);

  // 🔹 Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // 🔹 Generate room ID
  const generateRoomId = (user1, user2) => {
    return [user1.trim().toLowerCase(), user2.trim().toLowerCase()]
      .sort()
      .join("_");
  };

  // 🔹 Join room
  const joinRoom = () => {
    if (!username || !targetUser) {
      alert("Enter both usernames");
      return;
    }

    if (username === targetUser) {
      alert("You cannot chat with yourself");
      return;
    }

    const roomId = generateRoomId(username, targetUser);

    //saving username, target user and room to local storage because
    //if I refresh page username becomes "" without it
    //chats don't align properly while refreshing message
    localStorage.setItem("username", username);
    localStorage.setItem("targetUser", targetUser);
    localStorage.setItem("room", roomId);

    setRoom(roomId);
    setChat([]); // clear previous chat
    socket.emit("join_room", roomId);

    setIsJoined(true);
  };

  // 🔹 Send message
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

        <button
          disabled={!username || !targetUser}
          className="bg-blue-500 text-white px-4 py-2 disabled:bg-gray-400"
          onClick={joinRoom}
        >
          Join Chat
        </button>
      </div>
    );
  }

  // 💬 Chat UI
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-2">Chat with: {targetUser}</h1>

      <button
        className="bg-red-500 text-white px-3 py-1 mb-2 rounded"
        onClick={() => {
          localStorage.clear();
          setIsJoined(false);
          setChat([]);
        }}
      >
        Logout
      </button>

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
              <p className="text-sm font-semibold">
                {msg.user === username ? "You" : msg.user}
              </p>
              <p>{msg.message}</p>
              <p className="text-xs text-right">{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="flex mt-3">
        {typingUser && typingUser !== username && (
          <p className="text-sm text-gray-500 mb-1">
            {typingUser} is typing...
          </p>
        )}
        <input
          className="border p-2 w-60"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);

            socket.emit("typing", {
              room: room,
              user: username,
            });

            // stop typing after delay
            setTimeout(() => {
              socket.emit("stop_typing", { room: room });
            }, 1000);
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="bg-blue-500 text-white px-4" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
