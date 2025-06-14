
import TopNav from "@/components/TopNav";
import { useNavigate } from "react-router-dom";
import { BarChart2, Archive, ShoppingCart, Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const initialTotalSales = 42950; // Initial sales value

export default function Dashboard() {
  const navigate = useNavigate();
  // State for sales 
  const [totalSales, setTotalSales] = useState(initialTotalSales);
  const [lastSales, setLastSales] = useState(initialTotalSales);

  // New: state to track auth user
  const [user, setUser] = useState<any | null>(null);

  // States for inventory stats
  const [inventoryCount, setInventoryCount] = useState<number | null>(null);
  const [lowStockCount, setLowStockCount] = useState<number | null>(null);

  useEffect(() => {
    // Get current user & subscribe to auth changes
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // If user logged in, fetch product stats
    if (!user) {
      setInventoryCount(null);
      setLowStockCount(null);
      return;
    }
    async function fetchProductStats() {
      let { data: products, error } = await supabase
        .from("products")
        .select("id,stock")
        .eq("user_id", user.id);
      if (error || !Array.isArray(products)) {
        setInventoryCount(0);
        setLowStockCount(0);
        return;
      }
      setInventoryCount(products.length);
      setLowStockCount(products.filter((p) => typeof p.stock === "number" && p.stock <= 10).length);
    }
    fetchProductStats();
  }, [user]);

  // Derive sales change
  const salesDiff = totalSales - lastSales;
  // Calculate the percentage change (to one decimal)
  const percentChange = lastSales !== 0 ? ((salesDiff / lastSales) * 100).toFixed(1) : "0.0";
  const changeDisplay =
    salesDiff === 0
      ? "+0.0%"
      : `${salesDiff > 0 ? "+" : ""}${percentChange}%`;

  const handleIncrement = () => {
    setLastSales(totalSales);
    setTotalSales(totalSales + 100); // Change step as desired
  };

  const handleDecrement = () => {
    setLastSales(totalSales);
    setTotalSales(Math.max(totalSales - 100, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3edf9] via-[#c7f6ed] to-[#fafbfe] flex flex-col">
      <TopNav onLogout={() => navigate("/")} />
      <main className="max-w-6xl mx-auto py-10 px-6 flex-1 w-full">
        <h2 className="text-3xl font-bold mb-8 bg-modern-gradient bg-clip-text text-transparent drop-shadow">Dashboard Overview</h2>
        {/* If not logged in, show a banner prompting user to login/signup */}
        {!user && (
          <div className="mb-8 bg-yellow-100 text-yellow-900 p-4 rounded-lg border border-yellow-300 shadow flex flex-col md:flex-row md:items-center gap-4">
            <span>Sign in to manage your shop, add products, and track your inventory and sales!</span>
            <div className="flex gap-2">
              <Link to="/auth" className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition">
                Login / Sign Up
              </Link>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {/* Total Sales stat card - GLASS */}
          <div
            className="glass-card light p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all"
          >
            <span className="bg-accent/10 border-2 border-accent rounded-xl p-3 inline-flex shadow-inner">
              <BarChart2 size={30} className="text-accent" />
            </span>
            <div className="flex-1">
              <div className="font-bold mb-1 text-dark-secondary">Total Sales</div>
              <div className="text-2xl font-extrabold text-accent transition-all duration-200" key={totalSales}>
                Ksh{totalSales.toLocaleString()}
              </div>
              <div className={`text-sm ${Number(percentChange) >= 0 ? "text-emerald-500" : "text-rose-400"}`}>
                {changeDisplay}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                aria-label="Increment sales"
                className="bg-accent-btn p-1 rounded hover:scale-110 transition"
                onClick={handleIncrement}
                type="button"
                disabled={!user}
              >
                <PlusIcon size={20} />
              </button>
              <button
                aria-label="Decrement sales"
                className="bg-accent-btn p-1 rounded hover:scale-110 transition"
                onClick={handleDecrement}
                type="button"
                disabled={!user}
              >
                <MinusIcon size={20} />
              </button>
            </div>
          </div>
          {/* Inventory stat cards */}
          <div
            className="glass-card light p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all"
          >
            <span className="bg-accent/10 rounded-xl p-3 inline-flex shadow-inner">
              <Archive size={30} className="text-accent" />
            </span>
            <div>
              <div className="font-bold mb-1 text-dark-secondary">Inventory Items</div>
              <div className="text-2xl font-extrabold text-accent">
                {user
                  ? (inventoryCount === null ? "..." : inventoryCount)
                  : "--"}
              </div>
            </div>
          </div>
          <div
            className="glass-card light p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all"
          >
            <span className="bg-accent/10 rounded-xl p-3 inline-flex shadow-inner">
              <ShoppingCart size={30} className="text-accent" />
            </span>
            <div>
              <div className="font-bold mb-1 text-dark-secondary">Products Low in Stock</div>
              <div className="text-2xl font-extrabold text-accent">
                {user
                  ? (lowStockCount === null ? "..." : lowStockCount)
                  : "--"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 glass-card light p-6 mb-6 md:mb-0 border shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Quick Actions</h3>
            <div className="flex gap-4 flex-wrap">
              <button
                className="flex items-center bg-accent-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
                onClick={() => {
                  if (user) navigate("/add-product");
                  else navigate("/auth");
                }}
                disabled={!user}
              >
                <PlusIcon size={18} /> <span>Add Product</span>
              </button>
              <button
                className="flex items-center bg-accent-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
                onClick={() => {
                  if (user) navigate("/track-sales");
                  else navigate("/auth");
                }}
                disabled={!user}
              >
                <BarChart2 size={18} /> <span>Track Sales</span>
              </button>
              <button
                className="flex items-center bg-accent-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
                onClick={() => {
                  if (user) navigate("/sales-reports");
                  else navigate("/auth");
                }}
                disabled={!user}
              >
                <BarChart2 size={18} /> <span>Sales Reports</span>
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="glass-card light h-full rounded-2xl flex items-center justify-center border shadow-lg p-6">
              <span className="text-lg text-dark-secondary italic">
                “Stay smart! Monitor sales, stock, and trends here.”
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
