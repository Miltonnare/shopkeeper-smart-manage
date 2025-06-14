
import { Link, useLocation } from "react-router-dom";
import { LogOut, ShoppingCart, BarChart2, Archive, Plus, User, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Add profile link to navLinks
const navLinks = [
  { name: "Dashboard", to: "/dashboard", icon: BarChart2 },
  { name: "Track Sales", to: "/track-sales", icon: ShoppingCart },
  { name: "Sales Reports", to: "/sales-reports", icon: BarChart2 },
  { name: "Add Product", to: "/add-product", icon: Plus },
  { name: "Profile", to: "/profile", icon: User }, // NEW
  { name: "User Roles", to: "/user-roles", icon: Navigation }, // NEW NAV LINK
];

export default function TopNav({ onLogout }: { onLogout?: () => void }) {
  const location = useLocation();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLogout) onLogout();
    // Redirect handled by onAuthStateChange
  };

  return (
    <nav className="w-full px-8 py-3 flex items-center justify-between
      bg-white/95 border-b border-slate-200 shadow-md z-30 glass-card light">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-extrabold tracking-tight text-accent" style={{ letterSpacing: '1.5px' }}>
          SmartShop
        </span>
        <div className="flex gap-4">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                location.pathname.startsWith(link.to)
                  ? "bg-accent/10 text-accent font-semibold"
                  : "text-dark-secondary hover:bg-accent/5 hover:text-accent"
              }`}
            >
              <link.icon size={18} /> {link.name}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-md font-semibold bg-accent-btn shadow-md hover:scale-105 transition focus:ring-2 ring-accent"
        title="Log out"
      >
        <LogOut size={18} /> Logout
      </button>
    </nav>
  );
}
