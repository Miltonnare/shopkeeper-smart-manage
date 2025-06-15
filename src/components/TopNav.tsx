
import { Link, useLocation } from "react-router-dom";
import { LogOut, ShoppingCart, BarChart2, Archive, Plus, User, Navigation, Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import * as React from "react";

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
  const [open, setOpen] = React.useState(false);

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
        {/* Left: Logo + Mobile Hamburger */}
        <div className="flex items-center min-w-0 flex-shrink gap-3 sm:gap-8 flex-wrap">
          <span className="text-2xl font-extrabold tracking-tight text-accent whitespace-nowrap" style={{ letterSpacing: '1.5px' }}>
            SmartShop
          </span>
          {/* Hamburger for mobile only */}
          <div className="sm:hidden flex items-center ml-1">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-md hover:bg-blue-100 transition focus:ring-2 focus:ring-blue-600"
                  aria-label="Open navigation menu"
                  onClick={() => setOpen(true)}
                >
                  <Menu size={28} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 max-w-full bg-white shadow-lg">
                <nav className="flex flex-col gap-1 mt-10 px-4">
                  {navLinks.map((link) => (
                    <Link
                      to={link.to}
                      key={link.name}
                      className={`flex items-center gap-2 font-extrabold text-blue-800 hover:text-blue-700 transition rounded px-4 py-3 text-lg hover:bg-blue-100 ${
                        location.pathname.startsWith(link.to)
                          ? "bg-accent/10 text-accent"
                          : ""
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <link.icon size={20} /> {link.name}
                    </Link>
                  ))}
                  {!rolesLoading && isAdmin && (
                    <Link
                      to="/user-roles"
                      className={`flex items-center gap-2 font-extrabold text-blue-800 hover:text-blue-700 transition rounded px-4 py-3 text-lg hover:bg-blue-100 ${
                        location.pathname.startsWith("/user-roles")
                          ? "bg-accent/10 text-accent"
                          : ""
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <Navigation size={20} /> User Roles
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 mt-6 px-4 py-3 bg-accent-btn w-full rounded-md font-extrabold text-white shadow-md hover:scale-105 transition"
                    title="Log out"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          {/* END: Hamburger */}
          {/* Desktop nav */}
          <div className="hidden sm:flex gap-2 sm:gap-4 flex-wrap ml-6">
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
            )}
          </div>
        </div>
        {/* Right: Only show Logout on desktop */}
        <div className="ml-auto flex-shrink-0 hidden sm:block">
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
