
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4">
      <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between border-b absolute top-0 left-0">
        <span className="text-2xl font-bold tracking-tight text-primary">SmartShop</span>
        <div className="flex gap-6">
          <a href="/" className="hover:text-primary font-medium">Home</a>
          <a href="/about" className="hover:text-primary font-medium">About</a>
          <a href="/contact-us" className="hover:text-primary font-medium">Contact Us</a>
          <a href="/login" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-blue-700 transition-colors font-semibold">Login / Sign Up</a>
        </div>
      </nav>
      <form
        className="bg-white shadow-xl rounded-2xl p-8 space-y-8 w-full max-w-md border mt-32"
        onSubmit={handleLogin}
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary mb-1">SmartShop Login</h1>
          <p className="text-muted-foreground">Sign in to manage your shop smarter!</p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            required
            placeholder="Username or email"
            className="w-full rounded-md border px-3 py-2 focus:ring-2 ring-primary text-base"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-md border px-3 py-2 focus:ring-2 ring-primary text-base"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
