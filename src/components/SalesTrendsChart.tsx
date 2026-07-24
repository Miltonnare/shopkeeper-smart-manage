
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

// types: sales must at least have created_at and total_amount
type Sale = {
  created_at: string;
  total_amount: number;
};

type Props = {
  sales: Sale[];
};

function aggregateSalesByDate(sales: Sale[]) {
  // Aggregate sales by day
  const map: Record<string, number> = {};
  sales.forEach(sale => {
    const date = new Date(sale.created_at).toLocaleDateString(); // group by day
    map[date] = (map[date] || 0) + Number(sale.total_amount);
  });
  return Object.entries(map).map(([date, total]) => ({
    date,
    total,
  }));
}

export default function SalesTrendsChart({ sales }: Props) {
  const data = aggregateSalesByDate(sales);

  if (!data.length) {
    return <div className="text-center text-muted-foreground py-10">No sales data yet.</div>;
  }

  return (
    <ChartContainer config={{}}>
      <AreaChart data={data}>
        <XAxis dataKey="date" />
        <YAxis tickFormatter={x => `Ksh${x}`} />
        <Tooltip formatter={value => `Ksh${value}`} />
        <Area
          type="monotone"
          dataKey="total"
          name="Total Sales"
          stroke="#0d9488"
          fill="#99f6e4"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
