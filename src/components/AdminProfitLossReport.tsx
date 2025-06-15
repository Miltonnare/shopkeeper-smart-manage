
import { useState } from "react";
import { useAllUsersWithSales } from "@/hooks/useAllUsersWithSales";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

type ProfitLoss = {
  totalSales: number;
  totalCost: number;
  totalProfit: number;
};

export default function AdminProfitLossReport() {
  const { data: users, isLoading } = useAllUsersWithSales();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [result, setResult] = useState<ProfitLoss | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !from || !to) {
      toast({ title: "Select user and date range" });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      // Fetch all sales for this user in range
      const { data: sales, error } = await supabase
        .from("sales")
        .select("quantity, unit_price, product_id, total_amount, created_at")
        .eq("user_id", selectedUser)
        .gte("created_at", from.toISOString())
        .lte("created_at", to.toISOString());

      if (error) throw error;
      if (!sales || sales.length === 0) {
        setResult({ totalSales: 0, totalCost: 0, totalProfit: 0 });
        setLoading(false);
        return;
      }
      // Fetch product info for buying prices
      const uniqueProductIds = [
        ...new Set(sales.map((s: any) => s.product_id)),
      ];
      const { data: products, error: prodError } = await supabase
        .from("products")
        .select("id, buying_price")
        .in("id", uniqueProductIds);

      if (prodError) throw prodError;

      // Calculate
      let totalSales = 0;
      let totalCost = 0;

      for (const sale of sales) {
        const qty = Number(sale.quantity) || 0;
        const amount = Number(sale.total_amount) || 0;
        totalSales += amount;
        const product = products.find((p: any) => p.id === sale.product_id);
        const buyingPrice = product ? Number(product.buying_price) : 0;
        totalCost += buyingPrice * qty;
      }
      const totalProfit = totalSales - totalCost;
      setResult({ totalSales, totalCost, totalProfit });
    } catch (err: any) {
      toast({ title: "Error", description: String(err?.message) });
    }
    setLoading(false);
  };

  return (
    <div className="mb-8 glass-card border shadow-xl p-6 flex flex-col gap-3 items-start w-full">
      <h2 className="text-lg font-semibold mb-3 text-accent">Admin Profit / Loss Report</h2>
      <form className="flex flex-wrap items-end gap-4 mb-2" onSubmit={handleGenerate}>
        <div>
          <label className="block mb-1 text-xs font-semibold">User</label>
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            className="px-3 py-2 border rounded min-w-[170px]"
            required
          >
            <option value="">Select User</option>
            {users?.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-xs font-semibold">From</label>
          <input
            type="date"
            value={from ? from.toISOString().slice(0, 10) : ""}
            onChange={e => setFrom(e.target.value ? new Date(e.target.value) : null)}
            className="px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-semibold">To</label>
          <input
            type="date"
            value={to ? to.toISOString().slice(0, 10) : ""}
            onChange={e => setTo(e.target.value ? new Date(e.target.value) : null)}
            className="px-3 py-2 border rounded"
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="h-10 mt-5">
          {loading ? "Loading..." : "Generate"}
        </Button>
      </form>
      {result && (
        <Table>
          <TableCaption>Totals for selected user and period.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Total Sales</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Total Profit/Loss</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ksh{result.totalSales.toLocaleString()}</TableCell>
              <TableCell>Ksh{result.totalCost.toLocaleString()}</TableCell>
              <TableCell className={result.totalProfit >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                Ksh{result.totalProfit.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}

// ... end of file
