
import TopNav from "@/components/TopNav";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function TrackSales() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProducts([]);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

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
      <main className="max-w-4xl mx-auto px-4 py-10 flex-1 w-full z-10 relative">
        <h2 className="text-2xl font-bold mb-6 bg-modern-gradient bg-clip-text text-transparent drop-shadow">Track Sales</h2>
        <div className="glass-card light overflow-x-auto border shadow-xl">
          {loading ? (
            <div className="py-10 text-center text-accent">Loading...</div>
          ) : (
            <table className="min-w-full divide-y divide-blue-200 table-glass">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-extrabold table-header-accent uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-extrabold table-header-accent uppercase">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-extrabold table-header-accent uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-extrabold table-header-accent uppercase">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No products added yet.
                    </td>
                  </tr>
                )}
                {products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-accent/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-dark-main">{product.name}</td>
                    <td className="px-6 py-4 text-dark-main">{product.stock}</td>
                    <td className="px-6 py-4 text-dark-main">Ksh{product.selling_price}</td>
                    <td className="px-6 py-4 text-dark-main">
                      {product.created_at ? new Date(product.created_at).toLocaleString(undefined, {
                        dateStyle: "short",
                        timeStyle: "short"
                      }) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
