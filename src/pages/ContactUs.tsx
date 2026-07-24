import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  ArrowRight,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact-us", label: "Contact Us" },
];

export default function ContactUs() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields before sending.",
        variant: "destructive"
      });
      return;
    }
    setSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We will get back to you shortly."
      });
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

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
                  link.to === "/contact-us" ? "text-white" : "text-slate-400 hover:text-white"
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
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-16 z-10 w-full">
        {/* Intro */}
        <section className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/5 text-blue-400 text-xs font-semibold">
            <Mail size={14} /> <span>Get In Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white">
            Contact{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
              Our Team
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Have questions about system setup, custom user roles, or feature requests? Drop us a message below.
          </p>
        </section>

        {/* Form and Info Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-4xl mx-auto">
          {/* Info Card - Left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border border-slate-900 bg-slate-900/10 p-6 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Support</h3>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Email Address</h4>
                  <a href="mailto:support@smartshop.com" className="text-sm text-slate-400 hover:text-white transition-colors underline">
                    support@smartshop.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/20">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Phone Line</h4>
                  <p className="text-sm text-slate-400">+254 700 000 000</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Main Office</h4>
                  <p className="text-sm text-slate-400">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-900 bg-slate-900/5 p-6 rounded-2xl flex gap-3 items-center">
              <CheckCircle2 size={20} className="text-teal-400 shrink-0" />
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Response Guarantee: We review and respond to all store setup questions within 24 hours.
              </p>
            </div>
          </div>

          {/* Form Card - Right */}
          <div className="lg:col-span-7 border border-slate-900 bg-slate-900/20 p-6 sm:p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-900 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-600 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your.email@domain.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-900 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-600 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help your business?"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-900 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-600 transition resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-extrabold shadow-lg"
              >
                {submitting ? "Sending..." : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-10 mt-auto bg-slate-950/80 backdrop-blur z-10 w-full text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center gap-6">
          <div className="flex gap-8">
            <Link to="/" className="text-sm text-slate-400 hover:text-white transition">Home</Link>
            <Link to="/about" className="text-sm text-slate-400 hover:text-white transition">About</Link>
            <Link to="/contact-us" className="text-sm text-white transition">Contact Us</Link>
          </div>
          <span className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} SmartShop. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
