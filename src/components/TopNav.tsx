
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
    <nav className="w-full neu-nav px-8 py-3 flex items-center justify-between shadow-sm z-20">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold tracking-tight text-primary drop-shadow">SmartShop</span>
        <div className="flex gap-4">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors
                ${
                  location.pathname.startsWith(link.to)
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <link.icon size={18} /> {link.name}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-destructive-foreground font-semibold bg-destructive hover:bg-red-600 transition-colors"
        title="Log out"
      >
        <LogOut size={18} /> Logout
      </button>
    </nav>
  );
}

