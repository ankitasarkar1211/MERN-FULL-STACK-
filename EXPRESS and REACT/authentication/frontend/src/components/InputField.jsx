import { useState } from "react";

export default function InputField({ label, type, placeholder, icon, value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label
        className="block text-xs font-semibold tracking-widest uppercase mb-2"
        style={{ color: "#92654a" }}
      >
        {label}
      </label>

      <div
        className="relative flex items-center rounded-xl border transition-all duration-300"
        style={{
          background: focused ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
          borderColor: focused ? "#c8956a" : "#e8cdb8",
          boxShadow: focused ? "0 0 0 3px rgba(200,149,106,0.18)" : "none",
        }}
      >
        <span className="pl-4 text-lg" style={{ color: "#b8805a" }}>{icon}</span>

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-3 py-3.5 text-sm outline-none font-light tracking-wide"
          style={{ color: "#4a2e1a", caretColor: "#c8956a" }}
        />
      </div>
    </div>
  );
}