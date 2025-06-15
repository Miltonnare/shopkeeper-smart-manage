import TopNav from "@/components/TopNav";
import SalesTrendsChart from "@/components/SalesTrendsChart";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminProfitLossReport from "@/components/AdminProfitLossReport";
import { useUserRoles } from "@/hooks/useUserRoles";

type Sale = {
  id: string;
  created_at: string;
  total_amount: number;
  product_name: string | null;
  quantity: number;
  unit_price: number | null;
};

export default function SalesReports() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const { roles, loading: rolesLoading } = useUserRoles();
  const isAdmin = roles?.includes("admin");

  useEffect(() => {
    async function fetchSales() {
      setLoading(true);
      // get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setSales([]);
        setLoading(false);
        return;
      }
      // fetch sales for this user
      const { data, error } = await supabase
        .from("sales")
        .select("id, created_at, total_amount, product_name, quantity, unit_price")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        setSales([]);
      } else {
        setSales(data || []);
      }
      setLoading(false);
    }
    fetchSales();
  }, []);

  const totalSales = sales.reduce((sum, sale) => sum + Number(sale.total_amount), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3edf9] via-[#c7f6ed] to-[#fafbfe]">
      <TopNav />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 bg-modern-gradient bg-clip-text text-transparent drop-shadow">
          Sales Reports &amp; Trends
        </h2>
        {/* Admin Profit/Loss panel */}
        {isAdmin && !rolesLoading && (
          <AdminProfitLossReport />
        )}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="bg-white glass-card shadow text-lg px-6 py-4 rounded-lg border font-bold flex-1 flex flex-col items-center">
            <span className="text-sm text-dark-secondary mb-2">Total Sales</span>
            <span className="text-2xl text-accent font-extrabold">
              {loading ? "..." : `Ksh${totalSales.toLocaleString()}`}
            </span>
          </div>
        </div>
        <div className="glass-card light border shadow-xl p-8 mb-10">
          <h3 className="font-semibold text-lg mb-2 text-accent">Sales Trend</h3>
          {loading ? (
            <div className="text-center text-accent py-10">Loading...</div>
          ) : (
            <SalesTrendsChart sales={sales} />
          )}
        </div>
        <div className="glass-card py-3 px-4 border shadow">
          <h3 className="font-semibold mb-2 text-accent">All Sales</h3>
          <div className="max-h-[320px] overflow-auto">
            <table className="min-w-full divide-y divide-blue-200 table-glass">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold table-header-accent uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold table-header-accent uppercase">Product</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold table-header-accent uppercase">Qty</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold table-header-accent uppercase">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {sales.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-muted-foreground">
                      No sales recorded yet.
                    </td>
                  </tr>
                )}
                {sales.map(sale => (
                  <tr key={sale.id} className="hover:bg-accent/10 transition-colors">
                    <td className="px-4 py-2 whitespace-nowrap text-dark-main">
                      {new Date(sale.created_at).toLocaleString(undefined, {
                        dateStyle: "short",
                        timeStyle: "short"
                      })}
                    </td>
                    <td className="px-4 py-2 text-dark-main">
                      {sale.product_name || "-"}
                    </td>
                    <td className="px-4 py-2 text-dark-main">
                      {sale.quantity}
                    </td>
                    <td className="px-4 py-2 text-dark-main">
                      Ksh{Number(sale.total_amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
