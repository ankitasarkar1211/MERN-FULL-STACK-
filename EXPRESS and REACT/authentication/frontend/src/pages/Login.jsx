import { useState } from "react";
import InputField from "../components/InputField";
import GoogleIcon from "../components/GoogleIcon";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #fdf6ee 0%, #f5e8d8 40%, #eedcc8 100%)" }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(210,160,110,0.18) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(180,120,70,0.14) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,200,155,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
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
          boxShadow:
            "0 24px 64px rgba(120,70,30,0.13), 0 2px 0 rgba(255,255,255,0.9) inset",
        }}
      >
        {/* Top gradient strip */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, #d4956a, #c47a45, #a0522d, #c47a45, #d4956a)",
          }}
        />

        <div className="px-8 pt-8 pb-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #c47a45 0%, #8b4513 100%)",
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
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "#4a2e1a",
                letterSpacing: "0.02em",
              }}
            >
              Welcome back
            </h1>
            <p
              className="text-sm font-light tracking-wide"
              style={{ color: "#9a7060" }}
            >
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
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

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                className="text-xs font-medium tracking-wide transition-colors"
                style={{ color: "#c47a45" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#8b4513")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#c47a45")
                }
              >
                Forgot password?
              </button>
            </div>

            {/* CTA */}
            <div className="pt-1">
              <button
                className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-widest uppercase text-white transition-all duration-200 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, #c47a45 0%, #a0522d 60%, #8b4513 100%)",
                  boxShadow: "0 6px 20px rgba(139,69,19,0.32)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(139,69,19,0.45)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(139,69,19,0.32)")
                }
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(180,120,70,0.2)" }}
            />
            <span
              className="px-4 text-xs tracking-widest uppercase"
              style={{ color: "#b89a7a" }}
            >
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(180,120,70,0.2)" }}
            />
          </div>

          {/* Google */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(180,120,70,0.28)",
              color: "#4a2e1a",
              boxShadow: "0 2px 8px rgba(120,70,30,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,1)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(120,70,30,0.15)";
              e.currentTarget.style.borderColor =
                "rgba(180,120,70,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.85)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(120,70,30,0.08)";
              e.currentTarget.style.borderColor =
                "rgba(180,120,70,0.28)";
            }}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          {/* Footer */}
          <p
            className="text-center text-xs mt-6 font-light tracking-wide"
            style={{ color: "#a07858" }}
          >
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-semibold transition-colors"
              style={{ color: "#8b4513" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#c47a45")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#8b4513")
              }
            >
              Sign up free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}