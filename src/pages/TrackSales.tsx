
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
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f8fe] via-[#e0f7fa] to-[#f2f6fb]">
      <TopNav />
      <main className="max-w-4xl mx-auto px-4 py-10">
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
                {products.map((product) => (
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
