function Join({ username, setUsername, targetUser, setTargetUser, joinRoom }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 relative overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@300;400;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
      `}</style>

      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-16 w-80 h-80 rounded-full bg-amber-200 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-16 w-64 h-64 rounded-full bg-orange-200 opacity-25 blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="font-lato relative w-96 bg-orange-50 border border-amber-200 rounded-2xl px-10 py-12 shadow-2xl shadow-amber-900/10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-800 text-amber-50 text-xs font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6 shadow-md shadow-amber-700/30">
          <span>☕</span>
          <span>Whispr</span>
        </div>

        {/* Title */}
        <h1 className="font-playfair text-4xl text-amber-950 leading-tight mb-2">
          Start a<br />conversation.
        </h1>
        <p className="text-sm text-amber-700 font-light mb-9 leading-relaxed">
          Enter your name and who you'd like to chat with.
        </p>

        {/* Your name */}
        <div className="mb-4">
          <label className="block text-xs font-bold tracking-widest uppercase text-amber-800 mb-2">
            Your Name
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none opacity-60">👤</span>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-950 placeholder-amber-400 font-light text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 focus:bg-white transition-all"
              placeholder="e.g. alex"
              onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
            />
          </div>
        </div>

        {/* Chat with */}
        <div className="mb-2">
          <label className="block text-xs font-bold tracking-widest uppercase text-amber-800 mb-2">
            Chat With
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none opacity-60">👤</span>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-950 placeholder-amber-400 font-light text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 focus:bg-white transition-all"
              placeholder="their username"
              onChange={(e) => setTargetUser(e.target.value.trim().toLowerCase())}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-60" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>

        {/* CTA Button */}
        <button
          disabled={!username || !targetUser}
          onClick={joinRoom}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-800 text-amber-50 text-sm font-bold tracking-wide shadow-lg shadow-amber-700/25 hover:shadow-amber-700/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:from-amber-300 disabled:to-amber-400 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
        >
          <span>Begin Chatting</span>
          <span>→</span>
        </button>

        <p className="text-center mt-5 text-xs text-amber-600 tracking-wide font-light">
          Your conversation is private &amp; real-time.
        </p>
      </div>
    </div>
  );
}

export default Join;