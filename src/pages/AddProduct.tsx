
import TopNav from "@/components/TopNav";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    buyingPrice: "",
    sellingPrice: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You need to be logged in to add a product.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("products").insert([
      {
        user_id: user.id,
        name: product.name,
        buying_price: Number(product.buyingPrice),
        selling_price: Number(product.sellingPrice),
        stock: Number(product.stock),
      }
    ]);
    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Product added ✓",
      variant: "default",
    });
    setProduct({
      name: "",
      buyingPrice: "",
      sellingPrice: "",
      stock: "",
    });
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, #2563eb 0%, #2196f3 32%, #17c7b7 68%, #a78bfa 100%)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated/faint background blobs */}
      <div className="absolute top-10 left-[-5rem] w-80 h-80 bg-pink-400/30 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-[-5rem] right-[-4rem] w-96 h-80 bg-indigo-400/25 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute top-1/2 left-36 -translate-y-1/2 w-56 h-56 bg-emerald-200/15 rounded-full blur-2xl z-0" />
      <div className="absolute bottom-44 left-1/2 -translate-x-1/2 w-52 h-48 bg-white/20 rounded-full blur-3xl z-0" />

      <TopNav />
      <main className="max-w-md mx-auto px-4 py-10 flex-1 w-full z-10 relative">
        <h2 className="text-2xl font-bold mb-6 bg-modern-gradient bg-clip-text text-transparent drop-shadow">
          Add New Product
        </h2>
        <form
          onSubmit={handleAdd}
          className="bg-white/95 glass-card p-8 rounded-xl shadow border space-y-6"
        >
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Product Name</label>
            <input
              name="name"
              required
              value={product.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 ring-primary"
              placeholder="E.g. Oil, Rice"
            />
          </div>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2 font-medium">
                Buying Price (per Qty)
              </label>
              <input
                name="buyingPrice"
                type="number"
                min={0}
                required
                value={product.buyingPrice}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 ring-primary"
                placeholder="Buying Price"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2 font-medium">
                Selling Price (per Qty)
              </label>
              <input
                name="sellingPrice"
                type="number"
                min={0}
                required
                value={product.sellingPrice}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 ring-primary"
                placeholder="Selling Price"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Stock Qty</label>
            <input
              name="stock"
              type="number"
              min={0}
              required
              value={product.stock}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 ring-primary"
              placeholder="0"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md hover:bg-blue-700 mt-2 transition-colors"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </main>
    </div>
  );
}
