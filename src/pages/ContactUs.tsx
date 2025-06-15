
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, #2563eb 0%, #2196f3 32%, #17c7b7 68%, #a78bfa 100%)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated blobs, same as Home */}
      <div className="absolute top-10 left-[-5rem] w-80 h-80 bg-pink-400/30 rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute bottom-[-5rem] right-[-4rem] w-96 h-80 bg-indigo-400/25 rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute top-1/2 left-36 -translate-y-1/2 w-56 h-56 bg-emerald-200/15 rounded-full blur-2xl z-0"></div>
      <div className="absolute bottom-44 left-1/2 -translate-x-1/2 w-52 h-48 bg-white/20 rounded-full blur-3xl z-0"></div>

      <nav className="w-full glass-card bg-white/90 shadow-lg px-8 py-4 flex items-center justify-between border-b backdrop-blur-xl mt-4 mb-6 z-20 relative">
        <span className="text-2xl font-bold tracking-tight text-primary drop-shadow">SmartShop</span>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-primary font-medium transition">Home</Link>
          <Link to="/about" className="hover:text-primary font-medium transition">About</Link>
          <Link to="/contact-us" className="hover:text-primary font-medium transition">Contact Us</Link>
          <Link to="/auth" className="px-4 py-2 rounded-md bg-gradient-to-tr from-blue-700 to-purple-500 text-white font-semibold shadow-md hover:scale-105 focus:ring-2 ring-offset-2 ring-blue-700 transition">Login / Sign Up</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center text-center flex-1 w-full z-10 relative">
        <h1 className="text-4xl font-bold mb-4 text-blue-900 drop-shadow-sm bg-gradient-to-r from-blue-700 via-cyan-700 to-emerald-400 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-lg mb-8 text-dark-main font-medium bg-white/90 px-4 py-3 rounded-xl shadow">
          For questions or support, email us at
          <a className="underline text-blue-800 ml-1" href="mailto:support@smartshop.com">support@smartshop.com</a>.
        </p>
        <Link to="/" className="underline text-primary">Back to Home</Link>
      </main>
      <footer className="glass-card border-t py-6 px-4 mt-auto text-center text-gray-700 text-sm mb-4 bg-white/95 backdrop-blur">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-2">
          <div className="flex gap-4 mb-1">
            <Link to="/" className="hover:underline text-primary">Home</Link>
            <Link to="/about" className="hover:underline text-primary">About</Link>
            <Link to="/contact-us" className="hover:underline text-primary">Contact Us</Link>
          </div>
          <span>
            &copy; {new Date().getFullYear()} SmartShop. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
