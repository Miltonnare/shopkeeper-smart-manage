
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex flex-col">
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
        <h1 className="text-4xl font-bold mb-4 text-primary">About SmartShop</h1>
        <p className="text-lg mb-8 text-muted-foreground">
          SmartShop is designed to help shopkeepers easily manage inventory, sales, pricing, and more using an intuitive dashboard.
        </p>

        {/* Why SmartShop Section */}
        <section className="w-full mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Why SmartShop?</h2>
          <p className="text-muted-foreground leading-relaxed text-base text-left">
            SmartShop was built out of a genuine desire to simplify the everyday challenges faced by small retailers and shop owners. 
            Many business owners struggle to keep up with their inventory, accurately track sales, or respond quickly to market price changes. 
            Our mission is to empower local businesses by providing an affordable, easy-to-use digital tool that streamlines daily operations, reduces human error, and helps shopkeepers thrive in the modern market.
            <br /><br />
            We believe that technology should be a helpful companion, not a barrier. SmartShop removes complexity and brings together all essential tools in one beautiful dashboard, allowing shopkeepers to focus on what matters most: their customers and their business.
          </p>
        </section>

        {/* Testimonials Section */}
        <section className="w-full mb-16">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start">
              <p className="text-md italic mb-4">
                "SmartShop made tracking my sales and managing stock so much easier. I no longer lose track of my inventory!"
              </p>
              <span className="font-semibold text-primary">— Amina, Local Grocer</span>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start">
              <p className="text-md italic mb-4">
                "The dashboard is simple but powerful. I even get reminders when stock is low, which saves me time and money."
              </p>
              <span className="font-semibold text-primary">— Ravi, Electronics Retailer</span>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start">
              <p className="text-md italic mb-4">
                "Price change notifications help me stay competitive—now I can update my prices on time and keep my profits steady."
              </p>
              <span className="font-semibold text-primary">— Fatima, Shop Owner</span>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start">
              <p className="text-md italic mb-4">
                "I used to write everything in a notebook. With SmartShop, planning and reporting are just a click away!"
              </p>
              <span className="font-semibold text-primary">— Samuel, Boutique Manager</span>
            </div>
          </div>
        </section>

        <Link to="/" className="underline text-primary mt-4">Back to Home</Link>
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
