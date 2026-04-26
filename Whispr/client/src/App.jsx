import { useState, useEffect, useRef } from "react";
import Join from "./components/Join";
import Chat from "./components/Chat";
import { socket } from "./socket";

function App() {
  const [targetUser, setTargetUser] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const chatEndRef = useRef(null);

  // Restore session
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedTargetUser = localStorage.getItem("targetUser");
    const savedRoom = localStorage.getItem("room");

    if (savedUsername && savedTargetUser && savedRoom) {
      setUsername(savedUsername);
      setTargetUser(savedTargetUser);
      setRoom(savedRoom);
      setIsJoined(true);

      const rejoin = () => {
        socket.emit("join_room", savedRoom);
        socket.emit("join_user", { room: savedRoom, user: savedUsername });
      };

      // If already connected, emit immediately; otherwise wait
      if (socket.connected) {
        rejoin();
      } else {
        socket.once("connect", rejoin);
      }
    }
  }, []);

  // Socket listeners
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

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receive_message");
      socket.off("load_messages");
      socket.off("show_typing");
      socket.off("hide_typing");
      socket.off("online_users");
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Generate room
  const generateRoomId = (user1, user2) => {
    return [user1.trim().toLowerCase(), user2.trim().toLowerCase()]
      .sort()
      .join("_");
  };

  // Join room
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

    localStorage.setItem("username", username);
    localStorage.setItem("targetUser", targetUser);
    localStorage.setItem("room", roomId);

    setRoom(roomId);
    setChat([]);

    socket.emit("join_room", roomId);

    socket.emit("join_user", {
      room: roomId,
      user: username,
    });

    setIsJoined(true);
  };

  // Send message
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

  return !isJoined ? (
    <Join
      username={username}
      setUsername={setUsername}
      targetUser={targetUser}
      setTargetUser={setTargetUser}
      joinRoom={joinRoom}
    />
  ) : (
    <Chat
      targetUser={targetUser}
      username={username}
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage}
      chat={chat}
      typingUser={typingUser}
      onlineUsers={onlineUsers}
      chatEndRef={chatEndRef}
      room={room}
      setIsJoined={setIsJoined}
      setChat={setChat}
    />
  );
}

export default App;
