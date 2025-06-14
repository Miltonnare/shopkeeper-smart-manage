import TopNav from "@/components/TopNav";
import { useNavigate } from "react-router-dom";
import { BarChart2, Archive, ShoppingCart, Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const initialTotalSales = 42950; // Initial sales value

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for sales
  const [totalSales, setTotalSales] = useState(0);
  const [loadingTotalSales, setLoadingTotalSales] = useState(true);

  // For prompt/modal (quick "sell" UI)
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [saleQty, setSaleQty] = useState(1);
  const [isRecordingSale, setIsRecordingSale] = useState(false);

  // Auth and loading states
  const [user, setUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // States for inventory stats
  const [inventoryCount, setInventoryCount] = useState<number | null>(null);
  const [lowStockCount, setLowStockCount] = useState<number | null>(null);

  // Load auth and user state
  useEffect(() => {
    let unsubscribed = false;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!unsubscribed) {
        setUser(user);
        setAuthLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!unsubscribed) {
        setUser(session?.user ?? null);
        setAuthLoading(false);
      }
    });
    return () => {
      unsubscribed = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch dashboard stats from Supabase
  useEffect(() => {
    if (!user) {
      setInventoryCount(null);
      setLowStockCount(null);
      setTotalSales(0);
      return;
    }

    // Fetch total sales for this user
    const fetchTotalSales = async () => {
      setLoadingTotalSales(true);
      const { data, error } = await supabase
        .from("sales")
        .select("total_amount")
        .eq("user_id", user.id);

      if (error) {
        setTotalSales(0);
        setLoadingTotalSales(false);
        return;
      }
      const sum = (data || []).reduce(
        (acc: number, s: any) => acc + Number(s.total_amount || 0),
        0
      );
      setTotalSales(sum);
      setLoadingTotalSales(false);
    };

    // Fetch products for sale modal
    const fetchProducts = async () => {
      const { data: productsData, error } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", user.id);

      setProducts(productsData || []);
      setInventoryCount(productsData ? productsData.length : 0);
      setLowStockCount(productsData ? productsData.filter((p) => typeof p.stock === "number" && p.stock <= 10).length : 0);
    };

    fetchTotalSales();
    fetchProducts();
  }, [user, isRecordingSale]);

  // Handlers for sales
  const handleIncrement = () => {
    if (user) setShowSaleForm(true);
  };

  const handleDecrement = () => {
    // For demo simplicity: just toast
    toast({
      description: "Decrementing total sales is not supported for data integrity.",
      variant: "destructive"
    });
  };

  const handleRecordSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedProductId || saleQty <= 0) return;

    setIsRecordingSale(true);
    // Find product
    const product = products.find((p) => p.id === selectedProductId);
    if (!product) {
      toast({ title: "Invalid product.", variant: "destructive" });
      setIsRecordingSale(false);
      return;
    }
    if (saleQty > product.stock) {
      toast({ title: "Not enough stock for this sale.", variant: "destructive" });
      setIsRecordingSale(false);
      return;
    }

    // Compute totals
    const unit_price = Number(product.selling_price);
    const total_amount = unit_price * saleQty;

    // Insert sale record, update stock
    const { error: saleError } = await supabase.from("sales").insert([{
      user_id: user.id,
      product_id: selectedProductId,
      product_name: product.name,
      quantity: saleQty,
      unit_price: unit_price,
      total_amount: total_amount,
    }]);

    if (saleError) {
      toast({ title: "Failed to record sale.", description: saleError.message, variant: "destructive" });
      setIsRecordingSale(false);
      return;
    }

    // Update product stock
    const { error: stockError } = await supabase
      .from("products")
      .update({ stock: product.stock - saleQty })
      .eq("id", selectedProductId)
      .eq("user_id", user.id);

    if (stockError) {
      toast({ title: "Failed to update stock.", description: stockError.message, variant: "destructive" });
    } else {
      toast({ title: "Sale recorded! Inventory updated.", variant: "default"});
    }

    setShowSaleForm(false);
    setSelectedProductId("");
    setSaleQty(1);
    setIsRecordingSale(false);
    // Stats will be refreshed due to isRecordingSale dependency
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3edf9] via-[#c7f6ed] to-[#fafbfe] flex flex-col">
      <TopNav onLogout={() => navigate("/")} />

      <main className="max-w-6xl mx-auto py-10 px-6 flex-1 w-full">
        <h2 className="text-3xl font-bold mb-8 bg-modern-gradient bg-clip-text text-transparent drop-shadow">Dashboard Overview</h2>
        {/* Show loading spinner while user/auth state is being determined */}
        {authLoading ? (
          <div className="mb-8 flex items-center justify-center py-8">
            <span className="animate-spin rounded-full border-4 border-accent/20 border-t-accent mr-3 h-6 w-6 inline-block" />
            <span className="text-accent text-lg font-medium">Loading...</span>
          </div>
        ) : (
          // If not logged in, show a banner prompting user to login/signup
          !user && (
            <div className="mb-8 bg-yellow-100 text-yellow-900 p-4 rounded-lg border border-yellow-300 shadow flex flex-col md:flex-row md:items-center gap-4">
              <span>Sign in to manage your shop, add products, and track your inventory and sales!</span>
              <div className="flex gap-2">
                <Link to="/auth" className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition">
                  Login / Sign Up
                </Link>
              </div>
            </div>
          )
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {/* Total Sales stat card */}
          <div className="glass-card light p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all">
            <span className="bg-accent/10 border-2 border-accent rounded-xl p-3 inline-flex shadow-inner">
              <BarChart2 size={30} className="text-accent" />
            </span>
            <div className="flex-1">
              <div className="font-bold mb-1 text-dark-secondary">Total Sales</div>
              <div className="text-2xl font-extrabold text-accent transition-all duration-200" key={totalSales}>
                {loadingTotalSales ? "..." : `Ksh${totalSales.toLocaleString()}`}
              </div>
              {/* No percentage change shown as it's not meaningful for historical totals */}
            </div>
            <div className="flex flex-col gap-2">
              <button
                aria-label="Record a sale"
                className="bg-accent-btn p-1 rounded hover:scale-110 transition"
                onClick={handleIncrement}
                type="button"
                disabled={!user || loadingTotalSales || products.length === 0}
              >
                <PlusIcon size={20} />
              </button>
              <button
                aria-label="Cannot decrement sales"
                className="bg-accent-btn p-1 rounded hover:scale-110 transition"
                onClick={handleDecrement}
                type="button"
                disabled
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
        {/* Sale record modal */}
        {showSaleForm && (
          <form
            onSubmit={handleRecordSale}
            className="fixed z-40 left-0 top-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur"
            style={{ alignItems: "flex-start", paddingTop: "12vh" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 border">
              <div className="mb-4 font-bold text-accent text-lg">Record a Sale</div>
              <div className="mb-3">
                <label className="block mb-1 font-medium text-sm">Product</label>
                <select
                  className="w-full px-2 py-2 border rounded"
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select product</option>
                  {products.map((p) =>
                    <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
                  )}
                </select>
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-medium text-sm">Quantity</label>
                <input
                  className="w-full px-2 py-2 border rounded"
                  type="number"
                  min={1}
                  max={selectedProductId ? (products.find((p) => p.id === selectedProductId)?.stock || 1) : 1}
                  value={saleQty}
                  onChange={e => setSaleQty(Number(e.target.value))}
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white rounded py-2 font-semibold hover:bg-primary/90 transition"
                  disabled={isRecordingSale}
                >
                  {isRecordingSale ? "Saving..." : "Record Sale"}
                </button>
                <button type="button" className="flex-1 bg-gray-200 rounded py-2 font-semibold" onClick={() => setShowSaleForm(false)}>Cancel</button>
              </div>
            </div>
          </form>
        )}
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
