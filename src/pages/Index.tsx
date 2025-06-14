
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between border-b">
        <span className="text-2xl font-bold tracking-tight text-primary">SmartShop</span>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-primary font-medium">Home</Link>
          <Link to="/about" className="hover:text-primary font-medium">About</Link>
          <Link to="/contact-us" className="hover:text-primary font-medium">Contact Us</Link>
          <Link to="/login" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-blue-700 transition-colors font-semibold">Login / Sign Up</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center text-center flex-1 w-full">
        <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to SmartShop</h1>
        <p className="text-lg mb-8 text-muted-foreground">
          Empowering shopkeepers with simple tools for Inventory, Sales & Stock Management.
        </p>
        <Link
          to="/login"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold shadow hover:bg-blue-700 transition-colors mb-12"
        >
          Get Started
        </Link>

        <section className="w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Features</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-2 text-primary">Inventory Management</h3>
              <p className="text-muted-foreground">
                Easily track, update, and manage your shop's inventory. Get notified about low stock and avoid running out of products.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-2 text-primary">Sales Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your daily sales, analyze patterns, and ensure accurate billing with our easy-to-use sales dashboard.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-2 text-primary">Price Fluctuation Monitoring</h3>
              <p className="text-muted-foreground">
                Stay updated with changing market prices—adjust your product pricing in real-time to maximize profitability.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-2 text-primary">Loss Tracking & Stock Planning</h3>
              <p className="text-muted-foreground">
                Track shop losses and plan stocks more efficiently with our smart analytics and planning tools.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full mb-16">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">About SmartShop</h2>
          <p className="text-muted-foreground leading-relaxed">
            SmartShop is built to simplify day-to-day shop operations for retailers. 
            From small stores to thriving local businesses, our platform enables users to manage products, sales, stock, and more from one beautiful and simple dashboard. 
            <br />
            We believe technology should make life easier, and SmartShop does just that.
          </p>
        </section>
      </main>

      <footer className="bg-white border-t py-6 px-4 mt-auto text-center text-muted-foreground text-sm">
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
