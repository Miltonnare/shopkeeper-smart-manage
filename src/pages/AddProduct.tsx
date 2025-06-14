
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
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="max-w-md mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form
          onSubmit={handleAdd}
          className="bg-white p-8 rounded-xl shadow border space-y-6"
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
          <div className="flex gap-4">
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
