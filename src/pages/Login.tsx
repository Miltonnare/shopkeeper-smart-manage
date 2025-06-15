
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{
        background:
          "linear-gradient(120deg, #2563eb 0%, #2196f3 35%, #17c7b7 65%, #a78bfa 90%)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated colorful blobs for extra depth */}
      <div className="absolute top-10 left-[-5rem] w-80 h-80 bg-pink-400/30 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-[-5rem] right-[-4rem] w-96 h-80 bg-indigo-400/30 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-72 h-64 bg-emerald-200/25 rounded-full blur-2xl z-0" />
      <div className="absolute top-1/3 left-1/12 w-44 h-44 bg-white/20 rounded-full blur-3xl z-0" />
      <nav className="w-full bg-white/80 glass-card shadow-lg px-8 py-4 flex items-center justify-between border-b absolute top-0 left-0 z-10 backdrop-blur-xl">
        <span className="text-2xl font-bold tracking-tight text-primary drop-shadow">SmartShop</span>
        <div className="flex gap-6">
          <a href="/" className="hover:text-primary font-medium transition">Home</a>
          <a href="/about" className="hover:text-primary font-medium transition">About</a>
          <a href="/contact-us" className="hover:text-primary font-medium transition">Contact Us</a>
          <a
            href="/login"
            className="px-4 py-2 rounded-md bg-gradient-to-tr from-blue-700 to-purple-500 text-white font-semibold shadow-md hover:scale-105 focus:ring-2 ring-offset-2 ring-blue-700 transition"
          >
            Login / Sign Up
          </a>
        </div>
      </nav>

      {/* SmartShop logo above card */}
      <div className="mt-52 mb-2 flex flex-col items-center z-20">
        <span
          className="text-5xl font-extrabold tracking-[0.18em] select-none font-sans"
          style={{
            color: "#334155",
            opacity: 0.32,
            letterSpacing: "0.16em",
            textShadow: "0 4px 28px #dbeafea1, 0 2px 8px #eef2ff60",
            filter: "blur(0.5px)",
          }}
        >
          SmartShop
        </span>
      </div>

      <form
        className="glass-card shadow-2xl p-10 space-y-8 w-full max-w-md border
            mt-4 z-10 relative flex flex-col bg-white/90 backdrop-blur-lg rounded-2xl"
        onSubmit={handleLogin}
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold bg-gradient-to-br from-blue-600 via-violet-700 to-indigo-700 bg-clip-text text-transparent drop-shadow-sm mb-1">
            SmartShop Login
          </h1>
          <p className="text-lg text-muted-foreground">
            Sign in to manage your shop smarter!
          </p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            required
            placeholder="Username or email"
            className="w-full rounded-lg border-none px-3 py-2 focus:ring-2 ring-blue-400 text-base bg-white/90 
            focus:bg-white/100 shadow-md transition"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-lg border-none px-3 py-2 focus:ring-2 ring-indigo-400 text-base bg-white/90
            focus:bg-white/100 shadow-md transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-tr from-blue-700 to-purple-500 text-white font-semibold py-3 rounded-lg
            shadow-lg hover:scale-105 hover:from-blue-800 hover:to-purple-700 transition ring-2 ring-transparent
            focus:ring-blue-600 relative"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

