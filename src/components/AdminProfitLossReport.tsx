import React, { useState } from "react";
import { useAllUsers } from "@/hooks/useAllUsers";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type ProfitLoss = {
  totalSales: number;
  totalCost: number;
  totalProfit: number;
};

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

interface SaleRecord {
  quantity: number;
  unit_price: number | null;
  product_id: string;
  total_amount: number;
  created_at: string;
}

interface ProductRecord {
  id: string;
  buying_price: number;
}

export default function AdminProfitLossReport() {
  const { data: users } = useAllUsers() as { data: UserProfile[] | undefined; isLoading: boolean };
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [result, setResult] = useState<ProfitLoss | null>(null);
  const [loading, setLoading] = useState(false);

  // Filtering users as admin types
  const filteredUsers = users?.filter((u: UserProfile) => {
    if (!inputSearch) return true;
    const name = `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim().toLowerCase();
    return (
      name.includes(inputSearch.toLowerCase()) ||
      (u.id ?? "").toLowerCase().includes(inputSearch.toLowerCase())
    );
  });

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
      const { data: salesData, error } = await supabase
        .from("sales")
        .select("quantity, unit_price, product_id, total_amount, created_at")
        .eq("user_id", selectedUser)
        .gte("created_at", from.toISOString())
        .lte("created_at", to.toISOString());

      if (error) throw error;

      const sales = (salesData || []) as SaleRecord[];

      if (sales.length === 0) {
        setResult({ totalSales: 0, totalCost: 0, totalProfit: 0 });
        setLoading(false);
        return;
      }
      // Fetch product info for buying prices
      const uniqueProductIds = [
        ...new Set(sales.map((s) => s.product_id)),
      ];
      const { data: productsData, error: prodError } = await supabase
        .from("products")
        .select("id, buying_price")
        .in("id", uniqueProductIds);

      if (prodError) throw prodError;

      const products = (productsData || []) as ProductRecord[];

      // Calculate
      let totalSales = 0;
      let totalCost = 0;

      for (const sale of sales) {
        const qty = Number(sale.quantity) || 0;
        const amount = Number(sale.total_amount) || 0;
        totalSales += amount;
        const product = products.find((p) => p.id === sale.product_id);
        const buyingPrice = product ? Number(product.buying_price) : 0;
        totalCost += buyingPrice * qty;
      }
      const totalProfit = totalSales - totalCost;
      setResult({ totalSales, totalCost, totalProfit });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: "Error", description: msg });
    }
    setLoading(false);
  };

  return (
    <div className="mb-8 glass-card border shadow-xl p-6 flex flex-col gap-3 items-start w-full">
      <h2 className="text-lg font-semibold mb-3 text-accent">Admin Profit / Loss Report</h2>
      <form className="flex flex-wrap items-end gap-4 mb-2 w-full" onSubmit={handleGenerate}>
        <div className="flex flex-col gap-1 min-w-[170px]">
          <label className="block mb-1 text-xs font-semibold">User</label>
          <Input
            placeholder="Type to search users"
            value={inputSearch}
            onChange={e => setInputSearch(e.target.value)}
            className="mb-2"
          />
          <Select value={selectedUser} onValueChange={setSelectedUser} disabled={!filteredUsers || filteredUsers.length === 0}>
            <SelectTrigger>
              <SelectValue placeholder="Select User" />
            </SelectTrigger>
            <SelectContent className="max-h-52">
              {filteredUsers && filteredUsers.length > 0 &&
                filteredUsers.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {`${u.first_name || ""} ${u.last_name || ""}`.trim() || u.id}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
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
