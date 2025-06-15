
import { Link } from "react-router-dom";

export default function Index() {
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
      {/* Animated/faint background blobs */}
      <div className="absolute top-10 left-[-5rem] w-80 h-80 bg-pink-400/30 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-[-5rem] right-[-4rem] w-96 h-80 bg-indigo-400/25 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute top-1/2 left-36 -translate-y-1/2 w-56 h-56 bg-emerald-200/15 rounded-full blur-2xl z-0" />
      <div className="absolute bottom-44 left-1/2 -translate-x-1/2 w-52 h-48 bg-white/20 rounded-full blur-3xl z-0" />

      <nav className="w-full glass-card bg-white/80 shadow-lg px-8 py-4 flex items-center justify-between border-b backdrop-blur-xl mt-4 mb-6 z-20 relative">
        <span className="text-2xl font-bold tracking-tight text-primary drop-shadow">SmartShop</span>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-primary font-medium transition">Home</Link>
          <Link to="/about" className="hover:text-primary font-medium transition">About</Link>
          <Link to="/contact-us" className="hover:text-primary font-medium transition">Contact Us</Link>
          <Link to="/login" className="px-4 py-2 rounded-md bg-gradient-to-tr from-blue-700 to-purple-500 text-white font-semibold shadow-md hover:scale-105 focus:ring-2 ring-offset-2 ring-blue-700 transition">Login / Sign Up</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-20 flex flex-col items-center text-center flex-1 w-full z-10 relative">
        {/* Vibrant logo */}
        <div className="flex flex-col items-center mb-8">
          <span
            className="text-6xl font-extrabold tracking-[0.18em] select-none font-sans"
            style={{
              color: "#334155",
              opacity: 0.27,
              letterSpacing: "0.16em",
              textShadow: "0 4px 24px #dbeafea1, 0 2px 10px #eef2ff60",
              filter: "blur(0.7px)",
            }}
          >
            SmartShop
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-primary drop-shadow-sm bg-gradient-to-r from-blue-700 via-cyan-700 to-emerald-400 bg-clip-text text-transparent">
          Welcome to SmartShop
        </h1>
        <p className="text-lg mb-8 text-muted-foreground backdrop-blur-lg glass-card light px-6 py-4 rounded-xl">
          Empowering shopkeepers with simple tools for Inventory, Sales & Stock Management.
        </p>
        <Link
          to="/login"
          className="bg-gradient-to-tr from-blue-700 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition mb-16"
        >
          Get Started
        </Link>

        <section className="w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Features</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
            <div className="glass-card bg-white/80 p-6 shadow-md rounded-xl border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Inventory Management</h3>
              <p className="text-muted-foreground">
                Easily track, update, and manage your shop's inventory. Get notified about low stock and avoid running out of products.
              </p>
            </div>
            <div className="glass-card bg-white/80 p-6 shadow-md rounded-xl border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Sales Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your daily sales, analyze patterns, and ensure accurate billing with our easy-to-use sales dashboard.
              </p>
            </div>
            <div className="glass-card bg-white/80 p-6 shadow-md rounded-xl border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Price Fluctuation Monitoring</h3>
              <p className="text-muted-foreground">
                Stay updated with changing market prices—adjust your product pricing in real-time to maximize profitability.
              </p>
            </div>
            <div className="glass-card bg-white/80 p-6 shadow-md rounded-xl border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Loss Tracking & Stock Planning</h3>
              <p className="text-muted-foreground">
                Track shop losses and plan stocks more efficiently with our smart analytics and planning tools.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full mb-16">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">About SmartShop</h2>
          <p className="text-muted-foreground leading-relaxed glass-card light px-6 py-4 rounded-xl bg-white/70 backdrop-blur">
            SmartShop is built to simplify day-to-day shop operations for retailers. 
            From small stores to thriving local businesses, our platform enables users to manage products, sales, stock, and more from one beautiful and simple dashboard. <br />
            We believe technology should make life easier, and SmartShop does just that.
          </p>
        </section>
      </main>

      <footer className="glass-card border-t py-6 px-4 mt-auto text-center text-muted-foreground text-sm mb-4 bg-white/80 backdrop-blur">
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
