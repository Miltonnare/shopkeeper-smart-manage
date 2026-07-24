import TopNav from "@/components/layout/TopNav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecordSaleModal from "@/components/dashboard/RecordSaleModal";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: string;
  name: string;
  stock: number;
  selling_price: number;
  buying_price: number;
  user_id: string;
  created_at: string | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, roles, loading: authLoading } = useAuth();

  // State for sales
  const [totalSales, setTotalSales] = useState(0);
  const [loadingTotalSales, setLoadingTotalSales] = useState(true);

  // For prompt/modal (quick "sell" UI)
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [saleQty, setSaleQty] = useState(1);
  const [isRecordingSale, setIsRecordingSale] = useState(false);

  // States for inventory stats
  const [inventoryCount, setInventoryCount] = useState<number | null>(null);
  const [lowStockCount, setLowStockCount] = useState<number | null>(null);

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
        (acc: number, s: { total_amount: number }) => acc + Number(s.total_amount || 0),
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

      if (error) {
        console.error("Error fetching products:", error.message);
        setProducts([]);
        setInventoryCount(0);
        setLowStockCount(0);
        return;
      }

      const typedProducts = (productsData || []) as Product[];
      setProducts(typedProducts);
      setInventoryCount(typedProducts.length);
      setLowStockCount(typedProducts.filter((p) => typeof p.stock === "number" && p.stock <= 10).length);
    };

    fetchTotalSales();
    fetchProducts();
  }, [user, isRecordingSale]);

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
  };

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

      <main className="max-w-6xl mx-auto py-6 px-2 sm:py-10 sm:px-6 flex-1 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 bg-modern-gradient bg-clip-text text-transparent drop-shadow text-center sm:text-left">
          Dashboard Overview
        </h2>
        {/* Show current user roles */}
        {!authLoading && user && (
          <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 items-center justify-center sm:justify-start">
            <span className="text-base font-medium text-slate-600">Your roles:</span>
            {roles.length === 0 ? (
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
        {authLoading ? (
          <div className="mb-6 sm:mb-8 flex items-center justify-center py-4 sm:py-8">
            <span className="animate-spin rounded-full border-4 border-accent/20 border-t-accent mr-3 h-6 w-6 inline-block" />
            <span className="text-accent text-lg font-medium">Loading...</span>
          </div>
        ) : (
          !user && (
            <div className="mb-6 sm:mb-8 bg-yellow-100 text-yellow-900 p-4 rounded-lg border border-yellow-300 shadow flex flex-col md:flex-row md:items-center gap-3">
              <span>Sign in to manage your shop, add products, and track your inventory and sales!</span>
              <div className="flex gap-2 justify-end">
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

        {/* Wrap dashboard QuickActions and tips in mobile-friendly flex */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
          <DashboardQuickActions user={user} />
          <div className="flex-1 flex flex-col mt-4 md:mt-0">
            <div className="glass-card light h-full rounded-2xl flex items-center justify-center border shadow-lg p-4 sm:p-6">
              <span className="text-base sm:text-lg text-dark-secondary italic text-center">
                “Stay smart! Monitor sales, stock, and trends here.”
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
