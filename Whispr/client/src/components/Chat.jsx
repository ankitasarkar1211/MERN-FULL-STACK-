import { useRef } from "react";
import { socket } from "../socket";

function Chat({
  targetUser,
  username,
  message,
  setMessage,
  sendMessage,
  chat,
  typingUser,
  onlineUsers,
  chatEndRef,
  room,
  setIsJoined,
  setChat,
}) {
  const isOnline = onlineUsers.includes(targetUser);
  const typingTimeoutRef = useRef(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #d6b896; border-radius: 4px; }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .typing-dot { animation: typingBounce 1s infinite ease-in-out; }
        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-16 w-80 h-80 rounded-full bg-amber-200 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-16 w-64 h-64 rounded-full bg-orange-200 opacity-25 blur-3xl pointer-events-none" />

      {/* Chat window */}
      <div className="font-lato relative flex flex-col w-[460px] max-h-[88vh] bg-orange-50 border border-amber-200 rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/15">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-amber-500 to-amber-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-amber-50 font-bold text-lg uppercase flex-shrink-0">
              {targetUser.charAt(0)}
            </div>
            {/* Name + status */}
            <div className="flex flex-col gap-0.5">
              <span className="font-playfair text-amber-50 text-base leading-tight">
                {targetUser}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-amber-100/75 font-light">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${isOnline ? "bg-green-300 shadow-[0_0_6px_rgba(134,239,172,0.9)]" : "bg-white/30"}`}
                />
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          {/* Leave button */}
          <button
            onClick={() => {
              localStorage.clear();

              socket.emit("leave_room", {
                room,
                user: username,
              });

              socket.disconnect();

              setChat([]);
              setIsJoined(false);
            }}
            className="bg-white/15 border border-white/25 text-amber-50 text-xs font-bold tracking-wide rounded-lg px-3.5 py-1.5 hover:bg-white/25 transition-colors"
          >
            Leave
          </button>
        </div>

        {/* ── Messages ── */}
        {chat.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12 text-amber-400">
            <span className="text-4xl opacity-50">☕</span>
            <p className="text-sm font-light tracking-wide">
              No messages yet — say hello!
            </p>
          </div>
        ) : (
          <div className="chat-scroll flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-2.5 min-h-0">
            {chat.map((msg, index) => {
              const isMine = msg.user === username;
              return (
                <div
                  key={msg._id || index}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMine
                        ? "bg-gradient-to-br from-amber-500 to-amber-800 text-amber-50 rounded-br-sm shadow-md shadow-amber-700/20"
                        : "bg-amber-100 text-amber-950 border border-amber-200 rounded-bl-sm shadow-sm shadow-amber-900/5"
                    }`}
                  >
                    <p
                      className={`text-xs font-bold tracking-wide uppercase mb-1 ${isMine ? "text-amber-200/80" : "text-amber-600"}`}
                    >
                      {isMine ? "You" : msg.user}
                    </p>
                    <p className="break-words">{msg.message}</p>
                    <p
                      className={`text-right text-xs mt-1.5 ${isMine ? "text-amber-200/60" : "text-amber-500/70"}`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* ── Typing indicator ── */}
        <div className="px-5 h-7 flex items-center flex-shrink-0">
          {typingUser && typingUser !== username && (
            <span className="flex items-center gap-2 text-xs text-amber-600 italic font-light">
              <span>{typingUser} is typing</span>
              <span className="flex items-center gap-0.5">
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              </span>
            </span>
          )}
        </div>

        {/* ── Input area ── */}
        <div className="flex items-center gap-2.5 px-4 pb-4 pt-2 border-t border-amber-200/60 flex-shrink-0 bg-orange-50/80">
          <input
            className="flex-1 px-4 py-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-950 placeholder-amber-400 font-light text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 focus:bg-white transition-all"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);

              socket.emit("typing", {
                room,
                user: username,
              });

              clearTimeout(typingTimeoutRef.current);

              typingTimeoutRef.current = setTimeout(() => {
                socket.emit("stop_typing", { room });
              }, 1500);
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-800 text-amber-50 text-base flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-700/25 hover:shadow-amber-700/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
