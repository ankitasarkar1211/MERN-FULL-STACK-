import { useState } from "react";
import InputField from "../components/InputField";
import GoogleIcon from "../components/GoogleIcon";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #fdf6ee 0%, #f5e8d8 40%, #eedcc8 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(210,160,110,0.18) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(180,120,70,0.14) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(240,200,155,0.25) 0%, transparent 70%)" }} />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #c8956a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,252,248,0.82)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(210,170,130,0.4)",
          boxShadow: "0 24px 64px rgba(120,70,30,0.13), 0 2px 0 rgba(255,255,255,0.9) inset",
        }}
      >
        {/* Top strip */}
        <div className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, #d4956a, #c47a45, #a0522d, #c47a45, #d4956a)" }}
        />

        <div className="px-8 pt-8 pb-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
              style={{
                background: "linear-gradient(135deg, #c47a45 0%, #8b4513 100%)",
                boxShadow: "0 8px 20px rgba(139,69,19,0.3)",
                fontFamily: "Georgia, serif",
              }}
            >
              ✦
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1
              className="text-2xl font-normal mb-1"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#4a2e1a" }}
            >
              Create account
            </h1>
            <p className="text-sm font-light"
              style={{ color: "#9a7060" }}
            >
              Start something beautiful today
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">

            <InputField
              label="Full Name"
              type="text"
              placeholder="Your full name"
              icon="◈"
              value={form.name}
              onChange={handleChange("name")}
            />

            <InputField
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon="◉"
              value={form.email}
              onChange={handleChange("email")}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••••"
              icon="◎"
              value={form.password}
              onChange={handleChange("password")}
            />

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="••••••••••"
              icon="◌"
              value={form.confirm}
              onChange={handleChange("confirm")}
            />

            {/* CTA */}
            <div className="pt-1">
              <button
                className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-widest uppercase text-white"
                style={{
                  background: "linear-gradient(135deg, #c47a45 0%, #a0522d 60%, #8b4513 100%)",
                  boxShadow: "0 6px 20px rgba(139,69,19,0.32)",
                }}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px" style={{ background: "rgba(180,120,70,0.2)" }} />
            <span className="px-4 text-xs uppercase" style={{ color: "#b89a7a" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(180,120,70,0.2)" }} />
          </div>

          {/* Google */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(180,120,70,0.28)",
              color: "#4a2e1a",
            }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-xs mt-6"
            style={{ color: "#a07858" }}
          >
            Already have an account?
            <button
              onClick={() => navigate("/login")}
              style={{ color: "#8b4513" }}
            >
              Sign in
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}