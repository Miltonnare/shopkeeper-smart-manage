import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  ArrowRight,
  Layers,
  TrendingUp,
  Coins,
  Star,
  CheckCircle,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact-us", label: "Contact Us" },
];

export default function Index() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  // Sandbox State for Live Demo Simulator
  const [sandboxStock, setSandboxStock] = useState(12);
  const [sandboxSales, setSandboxSales] = useState(24300);
  const [sandboxAlert, setSandboxAlert] = useState(false);
  const [simulations, setSimulations] = useState<string[]>([
    "Initial stock verified: 12 units",
    "SmartShop ready to track transactions."
  ]);

  const recordSale = () => {
    if (sandboxStock > 0) {
      const nextStock = sandboxStock - 1;
      setSandboxStock(nextStock);
      setSandboxSales(prev => prev + 1200); // Ksh 1,200 item price
      setSimulations(prev => [
        `Ksh1,200 sale recorded! Stock decremented to ${nextStock} units.`,
        ...prev.slice(0, 3)
      ]);
      if (nextStock <= 3) {
        setSandboxAlert(true);
      }
    } else {
      setSimulations(prev => ["Out of stock! Cannot record sales.", ...prev.slice(0, 3)]);
    }
  };

  const restock = () => {
    const nextStock = sandboxStock + 10;
    setSandboxStock(nextStock);
    if (nextStock > 3) setSandboxAlert(false);
    setSimulations(prev => [
      `Restocked +10 units. Inventory level raised to ${nextStock}.`,
      ...prev.slice(0, 3)
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-[-100px] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/75 border-b border-slate-900 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-teal-500 rounded-lg text-white font-extrabold shadow-lg shadow-blue-500/20">
              <Sparkles size={20} />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              SmartShop
            </span>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                to={link.to}
                key={link.label}
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {loading ? (
              <span className="text-xs text-slate-500 italic">Checking status...</span>
            ) : isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold shadow-md">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="border-slate-800 hover:bg-slate-900 hover:text-white text-slate-300 font-semibold">
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Hamburguer */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-slate-400 hover:text-white transition">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-950 border-slate-900 text-slate-200 w-64 p-0">
                <nav className="flex flex-col gap-4 mt-16 px-8">
                  {navLinks.map((link) => (
                    <Link
                      to={link.to}
                      key={link.label}
                      className="text-lg font-bold text-slate-300 hover:text-white transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="border-slate-900 my-2" />
                  {isAuthenticated ? (
                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                        Login / Sign Up
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 z-10 w-full">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/5 text-blue-400 text-xs font-semibold">
              <Sparkles size={14} /> <span>Enterprise Shop Management Platform</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
              The Smarter Way to Run Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
                Retail Shop
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0">
              Simplify your day-to-day business. Seamlessly manage inventory lists, track daily sales transactions, adjust prices, and analyze profits in real-time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
                <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-extrabold shadow-lg shadow-blue-500/20 hover:scale-[1.03] transition-all">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#demo" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                Try Live Simulator
              </a>
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="lg:col-span-6 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-1000" />
            <div className="relative border border-slate-800 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/dashboard_hero_preview.jpg"
                alt="Dashboard Mockup"
                className="w-full h-auto object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* TRUSTED SAAS METRICS */}
        <section className="border-y border-slate-900 py-10 mb-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-center bg-slate-950/40 backdrop-blur rounded-2xl border px-6">
          <div>
            <div className="text-3xl font-extrabold text-white">Ksh50M+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Sales Logged</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">12,000+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Products Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">99.99%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Platform Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">2,500+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Retailers Trust Us</div>
          </div>
        </section>

        {/* INTERACTIVE SIMULATOR (Live Demo widget) */}
        <section id="demo" className="mb-24 scroll-mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Test-Drive SmartShop</h2>
            <p className="text-slate-400 mt-2">
              Try our live inventory sandbox below. Test transaction reporting and stock alerts in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-4xl mx-auto border border-slate-800 bg-slate-900/50 rounded-2xl p-6 sm:p-8 shadow-xl relative backdrop-blur">
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-white text-lg">Product: Premium Olive Oil</h3>
                  <p className="text-xs text-slate-500">Ksh 1,200 Selling Price | Ksh 800 Cost</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={recordSale} disabled={sandboxStock === 0} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Record Sale
                  </Button>
                  <Button size="sm" variant="outline" onClick={restock} className="border-slate-700 hover:bg-slate-800 text-slate-300">
                    <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Restock (+10)
                  </Button>
                </div>
              </div>

              {/* Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Current Stock</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-3xl font-black text-white">{sandboxStock}</span>
                    <span className="text-xs text-slate-400">units</span>
                  </div>
                  {sandboxAlert && (
                    <div className="mt-2 text-xs font-semibold text-rose-400 animate-pulse">
                      ⚠️ Low stock alert (Under 4)!
                    </div>
                  )}
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Total Revenue</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-black text-emerald-400">Ksh {sandboxSales.toLocaleString()}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2 font-medium">Accumulated simulation total</div>
                </div>
              </div>
            </div>

            {/* Simulation Log Console */}
            <div className="md:col-span-5 bg-black/80 rounded-xl p-4 border border-slate-900 flex flex-col h-[200px] md:h-auto justify-between">
              <div>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Activity Console Log</div>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  {simulations.map((sim, index) => (
                    <div key={index} className="flex gap-1.5">
                      <span className="text-slate-600">&gt;</span>
                      <span className={sim.startsWith("Ksh") ? "text-emerald-400" : sim.startsWith("Restocked") ? "text-blue-400" : ""}>
                        {sim}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-slate-600 font-mono text-right mt-4">
                Status: Simulation Active
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Built for High-Growth Retail</h2>
            <p className="text-slate-400 mt-2">
              Say goodbye to messy paper ledgers and complex software. Everything you need is visual.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="relative border border-slate-900 bg-slate-900/25 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/50 hover:bg-slate-900/40 transition duration-300">
              <div className="space-y-4">
                <div className="inline-flex p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                  <Layers size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">Stock Control</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Track items on shelves, log barcodes, and set up automated low-stock warnings before you run out of popular items.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-400">
                <span>Stock audits</span>
                <CheckCircle size={14} className="text-teal-400" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative border border-slate-900 bg-slate-900/25 p-6 rounded-2xl flex flex-col justify-between hover:border-purple-500/50 hover:bg-slate-900/40 transition duration-300">
              <div className="space-y-4">
                <div className="inline-flex p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">Real-Time Transactions</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Record sales inside a responsive register modal that updates total transaction volumes, stock levels, and daily profit curves instantly.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-purple-400">
                <span>Instant receipts</span>
                <CheckCircle size={14} className="text-teal-400" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative border border-slate-900 bg-slate-900/25 p-6 rounded-2xl flex flex-col justify-between hover:border-teal-500/50 hover:bg-slate-900/40 transition duration-300">
              <div className="space-y-4">
                <div className="inline-flex p-3 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
                  <Coins size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">Profit & Loss Reporting</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Run user-level reports across customizable date ranges. Inspect margins by matching product unit costs against selling prices.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-teal-400">
                <span>Admin exports</span>
                <CheckCircle size={14} className="text-teal-400" />
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">Loved by Retailers Everywhere</h2>
            <p className="text-slate-400 mt-2">
              See how SmartShop helps store managers save hours of bookkeeping weekly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="border border-slate-900 bg-slate-900/10 p-6 rounded-2xl space-y-4 shadow hover:bg-slate-900/20 transition">
              <div className="flex gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "SmartShop made tracking my sales and managing stock so much easier. I no longer lose track of my inventory! The interface is beautiful."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow">
                  AM
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Amina</h4>
                  <p className="text-[10px] text-slate-500">Local Grocer, Nairobi</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="border border-slate-900 bg-slate-900/10 p-6 rounded-2xl space-y-4 shadow hover:bg-slate-900/20 transition">
              <div className="flex gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "The dashboard is simple but powerful. I even get reminders when stock is low, which saves me time and money. Highly recommend to everyone."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-sm shadow">
                  RV
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Ravi</h4>
                  <p className="text-[10px] text-slate-500">Electronics Retailer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="border border-slate-900 bg-slate-900/10 p-6 rounded-2xl space-y-4 shadow hover:bg-slate-900/20 transition">
              <div className="flex gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "I used to write everything in a notebook. With SmartShop, planning and reporting are just a click away! I can check profits from anywhere."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white text-sm shadow">
                  SM
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Samuel</h4>
                  <p className="text-[10px] text-slate-500">Boutique Manager</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="relative border border-slate-800 bg-gradient-to-tr from-blue-950/40 to-slate-950 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl text-center flex flex-col items-center space-y-6">
          <div className="absolute top-[-200px] left-[-200px] w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-200px] right-[-200px] w-96 h-96 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-xl leading-tight">
            Ready to Take Control of Your Shop?
          </h2>
          <p className="text-slate-400 max-w-md text-sm sm:text-base">
            Join thousands of smart retailers. Create your free account and start tracking transactions, managing products, and viewing reports immediately.
          </p>

          <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
            <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-extrabold hover:scale-[1.03] transition-all">
              {isAuthenticated ? "Go to Dashboard" : "Register Your Store Now"} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-10 mt-auto bg-slate-950/80 backdrop-blur z-10 w-full text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center gap-6">
          <div className="flex gap-8">
            <Link to="/" className="text-sm text-slate-400 hover:text-white transition">Home</Link>
            <Link to="/about" className="text-sm text-slate-400 hover:text-white transition">About</Link>
            <Link to="/contact-us" className="text-sm text-slate-400 hover:text-white transition">Contact Us</Link>
          </div>
          <span className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} SmartShop. All rights reserved. Built with pride for retailers worldwide.
          </span>
        </div>
      </footer>
    </div>
  );
}
