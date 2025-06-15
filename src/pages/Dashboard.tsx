import TopNav from "@/components/TopNav";
import { useNavigate } from "react-router-dom";
import { BarChart2, Archive, ShoppingCart, Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecordSaleModal from "@/components/dashboard/RecordSaleModal";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";
import { useUserRoles } from "@/hooks/useUserRoles";

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

  const { roles = [], loading: loadingRoles } = useUserRoles();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(120deg, #2563eb 0%, #3b82f6 35%, #14b8a6 70%, #a78bfa 100%)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <TopNav onLogout={() => navigate("/")} />

      <main className="max-w-6xl mx-auto py-10 px-6 flex-1 w-full">
        <h2 className="text-3xl font-bold mb-8 bg-modern-gradient bg-clip-text text-transparent drop-shadow">Dashboard Overview</h2>
        {/* Show current user roles */}
        {!authLoading && user && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-base font-medium text-slate-600">Your roles:</span>
            {loadingRoles ? (
              <span className="text-slate-400 italic">Loading...</span>
            ) : roles.length === 0 ? (
              <span className="text-slate-400 italic">No roles assigned.</span>
            ) : (
              roles.map((role) => (
                <span
                  key={role}
                  className="px-2 py-1 bg-accent/10 text-accent border border-accent/30 rounded font-semibold text-xs"
                >
                  {role}
                </span>
              ))
            )}
          </div>
        )}
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

        <DashboardStats
          totalSales={totalSales}
          loadingTotalSales={loadingTotalSales}
          user={user}
          inventoryCount={inventoryCount}
          lowStockCount={lowStockCount}
          onRecordSale={() => setShowSaleForm(true)}
        />

        <RecordSaleModal
          show={showSaleForm}
          products={products}
          selectedProductId={selectedProductId}
          saleQty={saleQty}
          isRecordingSale={isRecordingSale}
          onChangeProduct={setSelectedProductId}
          onChangeQty={setSaleQty}
          onSubmit={handleRecordSale}
          onCancel={() => setShowSaleForm(false)}
        />

        <div className="flex flex-col md:flex-row gap-8">
          <DashboardQuickActions user={user} />
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
