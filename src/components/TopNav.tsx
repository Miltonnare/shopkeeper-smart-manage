import { Link, useLocation } from "react-router-dom";
import { LogOut, ShoppingCart, BarChart2, Archive, Plus, User, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRoles } from "@/hooks/useUserRoles";

// Regular nav links (omit User Roles here, add below conditionally)
const navLinks = [
  { name: "Dashboard", to: "/dashboard", icon: BarChart2 },
  { name: "Track Sales", to: "/track-sales", icon: ShoppingCart },
  { name: "Sales Reports", to: "/sales-reports", icon: BarChart2 },
  { name: "Add Product", to: "/add-product", icon: Plus },
  { name: "Profile", to: "/profile", icon: User },
];

export default function TopNav({ onLogout }: { onLogout?: () => void }) {
  const location = useLocation();
  const { roles, loading: rolesLoading } = useUserRoles();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLogout) onLogout();
    // Redirect handled by onAuthStateChange
  };

  // Only show User Roles if user is an admin
  const isAdmin = roles?.includes("admin");

  return (
    <nav className="w-full px-0 py-3 bg-white/95 border-b border-slate-200 shadow-md z-30 glass-card light">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-4 sm:px-8 gap-y-2">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center min-w-0 flex-shrink gap-3 sm:gap-8 flex-wrap">
          <span className="text-2xl font-extrabold tracking-tight text-accent whitespace-nowrap" style={{ letterSpacing: '1.5px' }}>
            SmartShop
          </span>
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md font-medium transition-colors ${
                  location.pathname.startsWith(link.to)
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-dark-secondary hover:bg-accent/5 hover:text-accent"
                }`}
              >
                <link.icon size={18} /> {link.name}
              </Link>
            ))}
            {!rolesLoading && isAdmin && (
              <>
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md font-medium transition-colors ${
                    location.pathname.startsWith("/admin")
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-dark-secondary hover:bg-accent/5 hover:text-accent"
                  }`}
                >
                  <BarChart2 size={18} /> Admin
                </Link>
                <Link
                  to="/user-roles"
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md font-medium transition-colors ${
                    location.pathname.startsWith("/user-roles")
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-dark-secondary hover:bg-accent/5 hover:text-accent"
                  }`}
                >
                  <Navigation size={18} /> User Roles
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Right: Logout Button */}
        <div className="ml-auto flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-md font-semibold bg-accent-btn shadow-md hover:scale-105 transition focus:ring-2 ring-accent whitespace-nowrap"
            title="Log out"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
