
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between border-b">
        <span className="text-2xl font-bold tracking-tight text-primary">SmartShop</span>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-primary font-medium">Home</Link>
          <Link to="/about" className="hover:text-primary font-medium">About</Link>
          <Link to="/contact-us" className="hover:text-primary font-medium">Contact Us</Link>
          <Link to="/login" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-blue-700 transition-colors font-semibold">Login / Sign Up</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to SmartShop</h1>
        <p className="text-lg mb-8 text-muted-foreground">Empowering shopkeepers with simple tools for Inventory, Sales & Stock Management.</p>
        <Link to="/login" className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold shadow hover:bg-blue-700 transition-colors">Get Started</Link>
      </main>
    </div>
  );
}
