
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/dashboard");
      }
    });
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMsg(null);
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
    } else {
      // Use window.location.origin as required by Supabase docs
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) setError(error.message);
      else setMsg("Signup successful! Check your email to confirm your account.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-emerald-200 to-pink-200 px-4 relative overflow-hidden">
      <div className="absolute top-10 left-[-4rem] w-72 h-72 bg-pink-400/30 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-[-4rem] right-[-3rem] w-80 h-72 bg-blue-400/30 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-60 h-60 bg-emerald-300/20 rounded-full blur-2xl z-0" />
      <form
        className="glass-card shadow-2xl p-10 space-y-8 w-full max-w-md border mt-32 z-10 relative flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold bg-gradient-to-br from-blue-600 via-violet-700 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm mb-1">
            {mode === "login" ? "SmartShop Login" : "SmartShop Sign Up"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {mode === "login"
              ? "Sign in to manage your shop smarter!"
              : "Sign up to create your SmartShop account!"}
          </p>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-lg border-none px-3 py-2 focus:ring-2 ring-blue-400 text-base bg-white/80 focus:bg-white/90 shadow-md transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-lg border-none px-3 py-2 focus:ring-2 ring-indigo-400 text-base bg-white/80 focus:bg-white/90 shadow-md transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-tr from-blue-700 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-105 hover:from-blue-800 hover:to-purple-700 transition ring-2 ring-transparent focus:ring-blue-600 relative"
          disabled={loading}
        >
          {loading ? (mode === "login" ? "Logging in..." : "Signing up...") : mode === "login" ? "Login" : "Sign Up"}
        </button>
        {error && <div className="text-red-600 text-center">{error}</div>}
        {msg && <div className="text-green-600 text-center">{msg}</div>}
        <div className="flex justify-between text-sm mt-4">
          <button
            type="button"
            className="text-primary underline"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError(null);
              setMsg(null);
            }}
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
