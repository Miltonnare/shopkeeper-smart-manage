import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  ArrowRight,
  Star,
  Sparkles,
  BookOpen,
  Eye,
  Heart
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact-us", label: "Contact Us" },
];

export default function About() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />

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
                className={`text-sm font-semibold transition-colors ${
                  link.to === "/about" ? "text-white" : "text-slate-400 hover:text-white"
                }`}
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
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-16 z-10 w-full">
        {/* Intro */}
        <section className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/5 text-blue-400 text-xs font-semibold">
            <BookOpen size={14} /> <span>Our Journey & Purpose</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
              SmartShop
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Empowering retail shopkeepers and local business owners with modular tools to drive transaction transparency and stock accuracy.
          </p>
        </section>

        {/* Vision & Mission Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="border border-slate-900 bg-slate-900/20 p-8 rounded-2xl space-y-4">
            <div className="inline-flex p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We envision a world where local shopkeepers are equipped with the same high-level analytic capabilities as major retail conglomerates, simplifying accounting and unlocking store growth.
            </p>
          </div>

          <div className="border border-slate-900 bg-slate-900/20 p-8 rounded-2xl space-y-4">
            <div className="inline-flex p-3 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              To build modern, accessible, and high-performance digital tools that eliminate error-prone notebooks, save hours of manual logging weekly, and optimize supply-chain restocking.
            </p>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="border border-slate-900 bg-slate-900/10 p-8 sm:p-10 rounded-2xl mb-16 space-y-6">
          <h2 className="text-2xl font-black text-white">Why We Built This</h2>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            SmartShop was built out of a genuine desire to simplify the everyday challenges faced by small retailers and shop owners. 
            Many business owners struggle to keep up with their inventory, accurately track sales, or respond quickly to market price changes. 
            Our mission is to empower local businesses by providing an affordable, easy-to-use digital tool that streamlines daily operations, reduces human error, and helps shopkeepers thrive in the modern market.
          </p>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            We believe that technology should be a helpful companion, not a barrier. SmartShop removes complexity and brings together all essential tools in one beautiful dashboard, allowing shopkeepers to focus on what matters most: their customers and their business.
          </p>
        </section>

        {/* Testimonials */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Loved by Retailers Everywhere</h2>
            <p className="text-slate-400 mt-2 text-sm">
              See how SmartShop helps store managers save hours of bookkeeping weekly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-slate-900 bg-slate-900/10 p-6 rounded-2xl space-y-4 shadow">
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
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
                  AM
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Amina</h4>
                  <p className="text-[10px] text-slate-500">Local Grocer, Nairobi</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-900 bg-slate-900/10 p-6 rounded-2xl space-y-4 shadow">
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
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-sm">
                  RV
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Ravi</h4>
                  <p className="text-[10px] text-slate-500">Electronics Retailer</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-10 mt-auto bg-slate-950/80 backdrop-blur z-10 w-full text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center gap-6">
          <div className="flex gap-8">
            <Link to="/" className="text-sm text-slate-400 hover:text-white transition">Home</Link>
            <Link to="/about" className="text-sm text-white transition">About</Link>
            <Link to="/contact-us" className="text-sm text-slate-400 hover:text-white transition">Contact Us</Link>
          </div>
          <span className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} SmartShop. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
