
import React, { useState } from "react";
import { useAllUsersWithSales } from "@/hooks/useAllUsersWithSales";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { format, parseISO } from "date-fns";

// Util to get start/end of today for default range
function getDefaultRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export default function AdminProfitLossReport() {
  const { data: users, isLoading: usersLoading } = useAllUsersWithSales();
  const [userId, setUserId] = useState<string>("");
  const [startDate, setStartDate] = useState(getDefaultRange().start);
  const [endDate, setEndDate] = useState(getDefaultRange().end);
  const [summary, setSummary] = useState<null | {
    totalSales: number;
    totalCost: number;
    profit: number;
    rows: {
      date: string;
      product: string;
      quantity: number;
      revenue: number;
      cost: number;
      profit: number;
    }[]
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleRunReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    setSummary(null);
    // Get sales for user in range
    const { data: sales, error } = await supabase
      .from("sales")
      .select("created_at, product_id, product_name, quantity, unit_price, total_amount")
      .eq("user_id", userId)
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    if (error) {
      setSummary(null);
      setLoading(false);
      return;
    }

    // Get products (to get the buying_price)
    const prodIds = Array.from(new Set((sales ?? []).map((s: any) => s.product_id)));
    const { data: products } = await supabase
      .from("products")
      .select("id, buying_price")
      .in("id", prodIds);

    // Calculate profit by row and sum
    let totalSales = 0, totalCost = 0, rows: any[] = [];
    (sales ?? []).forEach((s: any) => {
      const buy = products?.find((p: any) => p.id === s.product_id)?.buying_price ?? 0;
      const cost = Number(buy) * s.quantity;
      const revenue = Number(s.total_amount) || 0;
      const profit = revenue - cost;
      rows.push({
        date: format(parseISO(s.created_at), "yyyy-MM-dd"),
        product: s.product_name ?? "-",
        quantity: s.quantity,
        revenue,
        cost,
        profit,
      });
      totalSales += revenue;
      totalCost += cost;
    });
    setSummary({
      totalSales,
      totalCost,
      profit: totalSales - totalCost,
      rows,
    });
    setLoading(false);
  };

  return (
    <div className="mb-10 w-full max-w-2xl mx-auto text-left bg-white rounded shadow-lg p-8">
      <h3 className="font-bold text-2xl text-accent mb-2">Profit/Loss Report by User &amp; Period</h3>
      <form onSubmit={handleRunReport} className="flex flex-wrap gap-3 mb-4 items-end">
        <div>
          <label className="text-sm font-medium">User</label><br />
          <select
            value={userId}
            onChange={e => setUserId(e.target.value)}
            required
            className="px-3 py-2 border rounded min-w-[160px]"
          >
            <option value="">-- Select User --</option>
            {users && users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Start Date</label><br />
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="px-3 py-2 border rounded"
            required
            max={endDate}
          />
        </div>
        <div>
          <label className="text-sm font-medium">End Date</label><br />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="px-3 py-2 border rounded"
            required
            min={startDate}
          />
        </div>
        <Button type="submit" className="mt-1" disabled={loading || usersLoading || !userId}>
          {loading ? "Loading..." : "Show Report"}
        </Button>
      </form>
      {!loading && summary && (
        <div>
          <div className="flex gap-6 mb-3">
            <div>
              <div className="text-xs text-muted-foreground">Total Sales</div>
              <div className="font-bold text-accent">Ksh{summary.totalSales.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Total Cost</div>
              <div className="font-bold text-orange-600">Ksh{summary.totalCost.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Profit/Loss</div>
              <div className={`font-bold ${summary.profit < 0 ? "text-red-600" : "text-green-600"}`}>
                Ksh{summary.profit.toLocaleString()}
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.rows.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.product}</TableCell>
                  <TableCell>{r.quantity}</TableCell>
                  <TableCell>Ksh{r.revenue.toLocaleString()}</TableCell>
                  <TableCell>Ksh{r.cost.toLocaleString()}</TableCell>
                  <TableCell className={r.profit < 0 ? "text-red-600" : "text-green-700"}>
                    Ksh{r.profit.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {!loading && !summary && (
        <div className="text-sm text-muted-foreground mt-2">
          Select a user and date range to view report.
        </div>
      )}
    </div>
  );
}
