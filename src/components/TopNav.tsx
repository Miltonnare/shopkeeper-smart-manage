import { Link, useLocation } from "react-router-dom";
import { LogOut, ShoppingCart, BarChart2, Archive, Plus } from "lucide-react";

const navLinks = [
  { name: "Dashboard", to: "/dashboard", icon: BarChart2 },
  { name: "Track Sales", to: "/track-sales", icon: ShoppingCart },
  { name: "Sales Reports", to: "/sales-reports", icon: BarChart2 },
  { name: "Add Product", to: "/add-product", icon: Plus },
];

export default function TopNav({ onLogout }: { onLogout?: () => void }) {
  const location = useLocation();
  return (
    <nav className="w-full glass-card gold px-8 py-3 flex items-center justify-between shadow-lg z-30 border border-gold/60 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-extrabold tracking-tight glass-title gold-text drop-shadow" style={{ letterSpacing: '1.5px' }}>
          SmartShop
        </span>
        <div className="flex gap-4">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${location.pathname.startsWith(link.to)
                  ? "glass-card bg-opacity-70 gold-text"
                  : "text-white/90 hover:text-gold"
                }`}
            >
              <link.icon size={18} /> {link.name}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-gold to-yellow-400 text-black shadow-lg hover:from-amber-400 hover:to-yellow-400 transition-colors ring-2 ring-gold/30"
        title="Log out"
      >
        <LogOut size={18} /> Logout
      </button>
    </nav>
  );
}
