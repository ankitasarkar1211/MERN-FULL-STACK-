import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// ✅ connect to backend
const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // ✅ Listen only once
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (inputMessage.trim() === "") return;

    socket.emit("chatMessage", inputMessage);
    setInputMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mini Chat App</h2>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;

// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   const sendMessage = async () => {
//     if (!message) return;

//     const res = await axios.post("http://localhost:5000/chat", {
//       message,
//     });

//     setChat([...chat, { user: message, bot: res.data.reply }]);

//     setMessage("");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>💬 Chatbot</h2>

//       <div>
//         {chat.map((c, i) => (
//           <div key={i}>
//             <p>
//               <b>You:</b> {c.user}
//             </p>
//             <p>
//               <b>Bot:</b> {c.bot}
//             </p>
//           </div>
//         ))}
//       </div>

//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type message..."
//       />

//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:5000");
// function App() {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);
//   const [showChat, setShowChat] = useState(false);
//   const joinRoom = () => {
//     if (username !== "" && room !== "") {
//       socket.emit("join_room", room);
//       setShowChat(true);
//     }
//   };
//   const sendMessage = async () => {
//     if (message !== "") {
//       const messageData = {
//         room: room,
//         author: username,
//         message: message,
//         time: new Date().toLocaleTimeString(),
//       };
//       await socket.emit("send_message", messageData);
//       setMessageList((list) => [...list, messageData]);
//       setMessage("");
//     }
//   };
//   socket.on("receive_message", (data) => {
//     setMessageList((list) => [...list, data]);
//   });
//   return (
//     <div>
//       {!showChat ? (
//         <div>
//           <input
//             placeholder="Username"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input placeholder="Room" onChange={(e) => setRoom(e.target.value)} />
//           <button onClick={joinRoom}>Join</button>
//         </div>
//       ) : (
//         <div>
//           <div>
//             {messageList.map((msg, index) => (
//               <div key={index}>
//                 <b>{msg.author}</b>: {msg.message}
//               </div>
//             ))}
//           </div>
//           <input value={message} onChange={(e) => setMessage(e.target.value)} />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }
// export default App;
