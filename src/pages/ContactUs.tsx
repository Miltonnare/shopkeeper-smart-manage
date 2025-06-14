
import { Link } from "react-router-dom";

export default function ContactUs() {
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
        <h1 className="text-4xl font-bold mb-4 text-primary">Contact Us</h1>
        <p className="text-lg mb-8 text-muted-foreground">
          For questions or support, email us at <a className="underline text-blue-800" href="mailto:support@smartshop.com">support@smartshop.com</a>.
        </p>
        <Link to="/" className="underline text-primary">Back to Home</Link>
      </main>
    </div>
  );
}
