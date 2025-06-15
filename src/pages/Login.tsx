
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
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-blue-500 via-emerald-200 to-pink-200 px-4 relative overflow-hidden">
      {/* Animated glowing blobs */}
      <div className="absolute top-10 left-[-4rem] w-72 h-72 bg-pink-400/30 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-[-4rem] right-[-3rem] w-80 h-72 bg-blue-400/30 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-60 h-60 bg-emerald-300/20 rounded-full blur-2xl z-0" />
      <nav className="w-full bg-white/70 glass-card shadow-md px-8 py-4 flex items-center justify-between border-b absolute top-0 left-0 z-10">
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

      {/* Logo above card */}
      <div className="mt-48 mb-2 flex flex-col items-center z-20">
        <span
          className="text-5xl font-extrabold tracking-tight select-none"
          style={{
            color: "#475569",      // muted slate gray
            opacity: 0.36,         // dimmed
            letterSpacing: "0.15em",
            textShadow: "0 2px 24px #d1dbeec0" // subtle blur for softness
          }}
        >
          SmartShop
        </span>
      </div>

      <form
        className="glass-card shadow-2xl p-10 space-y-8 w-full max-w-md border
            mt-4 z-10 relative flex flex-col"
        onSubmit={handleLogin}
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold bg-gradient-to-br from-blue-600 via-violet-700 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm mb-1">
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
            className="w-full rounded-lg border-none px-3 py-2 focus:ring-2 ring-blue-400 text-base bg-white/80 
            focus:bg-white/90 shadow-md transition"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-lg border-none px-3 py-2 focus:ring-2 ring-indigo-400 text-base bg-white/80
            focus:bg-white/90 shadow-md transition"
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
