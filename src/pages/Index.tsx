import { Link } from "react-router-dom";
import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact-us", label: "Contact Us" },
];

export default function Index() {
  // Mobile menu open state
  const [open, setOpen] = React.useState(false);

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

      {/* Responsive Nav with Hamburger */}
      <nav className="w-full glass-card bg-white/95 shadow-lg px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b backdrop-blur-xl mt-4 mb-6 z-20 relative">
        <span
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-900 select-none drop-shadow-lg py-1"
          style={{
            textShadow:
              "0 3px 24px #dbeafe, 0 1px 8px #0007, 0 0px 0px #000",
          }}
        >
          SmartShop
        </span>
        {/* Hamburger Icon only on mobile (sm:hidden) */}
        <div className="flex-1 flex items-center justify-end sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-md hover:bg-blue-100 transition focus:ring-2 focus:ring-blue-600"
                aria-label="Open navigation menu"
                onClick={() => setOpen(true)}
              >
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-60 bg-white shadow-lg">
              <nav className="flex flex-col gap-2 mt-10 px-6">
                {navLinks.map((link) => (
                  <Link
                    to={link.to}
                    key={link.label}
                    className="font-extrabold text-blue-800 hover:text-blue-700 transition rounded px-4 py-2 text-lg hover:bg-blue-100"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/auth"
                  className="w-full mt-4 px-4 py-2 rounded-md bg-gradient-to-tr from-blue-700 to-purple-500 text-white font-extrabold shadow-md text-center text-lg"
                  onClick={() => setOpen(false)}
                >
                  Login / Sign Up
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* Regular nav for desktop */}
        <div className="hidden sm:flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3 sm:mt-0">
          {navLinks.map((link) => (
            <Link
              to={link.to}
              key={link.label}
              className="font-extrabold text-blue-800 hover:text-blue-700 transition rounded px-4 py-2 text-base sm:text-lg shadow hover:bg-blue-100 focus:bg-blue-200 focus:outline-none"
              style={{
                textShadow:
                  "0 1px 6px #fff,0 1px 2px #c7d2fe,0 0px 0px #000",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/auth"
            className="px-4 py-2 mt-1 sm:mt-0 rounded-md bg-gradient-to-tr from-blue-700 to-purple-500 text-white font-extrabold shadow-md hover:scale-105 focus:ring-2 ring-offset-2 ring-blue-700 transition text-base sm:text-lg min-w-[120px] text-center"
            style={{
              textShadow:
                "0 1px 8px #3b82f6, 0 2px 2px #9333ea",
            }}
          >
            Login / Sign Up
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-20 flex flex-col items-center text-center flex-1 w-full z-10 relative">
        {/* Vibrant logo */}
        <div className="flex flex-col items-center mb-8">
          <span
            className="text-6xl font-extrabold tracking-[0.18em] select-none font-sans"
            style={{
              color: "#334155",
              opacity: 0.33,
              letterSpacing: "0.16em",
              textShadow: "0 4px 24px #dbeafea1, 0 2px 10px #0003",
              filter: "blur(0.3px)",
            }}
          >
            SmartShop
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-blue-900 drop-shadow-sm bg-gradient-to-r from-blue-700 via-cyan-700 to-emerald-400 bg-clip-text text-transparent">
          Welcome to SmartShop
        </h1>
        <p className="text-lg mb-8 text-gray-800 backdrop-blur-lg px-6 py-4 rounded-xl bg-white/95 font-medium shadow">
          Empowering shopkeepers with simple tools for Inventory, Sales &amp; Stock Management.
        </p>
        <Link
          to="/auth"
          className="bg-gradient-to-tr from-blue-700 to-purple-500 text-white px-8 py-3 rounded-lg font-extrabold shadow-lg hover:scale-105 transition mb-16"
        >
          Get Started
        </Link>

        <section className="w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 drop-shadow">Features</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
            <div className="glass-card bg-white/95 p-6 shadow-md rounded-xl border">
              <h3 className="font-semibold text-lg mb-2 text-blue-800 drop-shadow">Inventory Management</h3>
              <p className="text-gray-800 font-medium">
                Easily track, update, and manage your shop's inventory. Get notified about low stock and avoid running out of products.
              </p>
            </div>
            <div className="glass-card bg-white/95 p-6 shadow-md rounded-xl border">
              <h3 className="font-semibold text-lg mb-2 text-blue-800 drop-shadow">Sales Tracking</h3>
              <p className="text-gray-800 font-medium">
                Monitor your daily sales, analyze patterns, and ensure accurate billing with our easy-to-use sales dashboard.
              </p>
            </div>
            <div className="glass-card bg-white/95 p-6 shadow-md rounded-xl border">
              <h3 className="font-semibold text-lg mb-2 text-blue-800 drop-shadow">Price Fluctuation Monitoring</h3>
              <p className="text-gray-800 font-medium">
                Stay updated with changing market prices—adjust your product pricing in real-time to maximize profitability.
              </p>
            </div>
            <div className="glass-card bg-white/95 p-6 shadow-md rounded-xl border">
              <h3 className="font-semibold text-lg mb-2 text-blue-800 drop-shadow">Loss Tracking &amp; Stock Planning</h3>
              <p className="text-gray-800 font-medium">
                Track shop losses and plan stocks more efficiently with our smart analytics and planning tools.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full mb-16">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 drop-shadow">About SmartShop</h2>
          <p className="text-gray-800 leading-relaxed px-6 py-4 rounded-xl bg-white/95 shadow font-medium">
            SmartShop is built to simplify day-to-day shop operations for retailers.
            From small stores to thriving local businesses, our platform enables users to manage products, sales, stock, and more from one beautiful and simple dashboard. <br />
            We believe technology should make life easier, and SmartShop does just that.
          </p>
        </section>
      </main>

      <footer className="glass-card border-t py-6 px-4 mt-auto text-center text-gray-700 text-sm mb-4 bg-white/95 backdrop-blur">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-2">
          <div className="flex gap-4 mb-1">
            <Link to="/" className="hover:underline text-primary font-semibold">Home</Link>
            <Link to="/about" className="hover:underline text-primary font-semibold">About</Link>
            <Link to="/contact-us" className="hover:underline text-primary font-semibold">Contact Us</Link>
          </div>
          <span>
            &copy; {new Date().getFullYear()} SmartShop. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
