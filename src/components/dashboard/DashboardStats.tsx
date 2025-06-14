
import { BarChart2, Archive, ShoppingCart, Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";

interface StatProps {
  totalSales: number;
  loadingTotalSales: boolean;
  user: any;
  inventoryCount: number | null;
  lowStockCount: number | null;
  onRecordSale: () => void;
}

export default function DashboardStats({
  totalSales,
  loadingTotalSales,
  user,
  inventoryCount,
  lowStockCount,
  onRecordSale,
}: StatProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
      {/* Total Sales stat card */}
      <div className="glass-card light p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all">
        <span className="bg-accent/10 border-2 border-accent rounded-xl p-3 inline-flex shadow-inner">
          <BarChart2 size={30} className="text-accent" />
        </span>
        <div className="flex-1">
          <div className="font-bold mb-1 text-dark-secondary">Total Sales</div>
          <div className="text-2xl font-extrabold text-accent transition-all duration-200" key={totalSales}>
            {loadingTotalSales ? "..." : `Ksh${totalSales.toLocaleString()}`}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            aria-label="Record a sale"
            className="bg-accent-btn p-1 rounded hover:scale-110 transition"
            onClick={onRecordSale}
            type="button"
            disabled={!user || loadingTotalSales}
          >
            <PlusIcon size={20} />
          </button>
          <button
            aria-label="Cannot decrement sales"
            className="bg-accent-btn p-1 rounded hover:scale-110 transition"
            onClick={() => {
              alert("Decrementing total sales is not supported for data integrity.");
            }}
            type="button"
            disabled
          >
            <MinusIcon size={20} />
          </button>
        </div>
      </div>
      {/* Inventory stat cards */}
      <div className="glass-card light p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all">
        <span className="bg-accent/10 rounded-xl p-3 inline-flex shadow-inner">
          <Archive size={30} className="text-accent" />
        </span>
        <div>
          <div className="font-bold mb-1 text-dark-secondary">Inventory Items</div>
          <div className="text-2xl font-extrabold text-accent">
            {user
              ? (inventoryCount === null ? "..." : inventoryCount)
              : "--"}
          </div>
        </div>
      </div>
      <div className="glass-card light p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all">
        <span className="bg-accent/10 rounded-xl p-3 inline-flex shadow-inner">
          <ShoppingCart size={30} className="text-accent" />
        </span>
        <div>
          <div className="font-bold mb-1 text-dark-secondary">Products Low in Stock</div>
          <div className="text-2xl font-extrabold text-accent">
            {user
              ? (lowStockCount === null ? "..." : lowStockCount)
              : "--"}
          </div>
        </div>
      </div>
    </div>
  );
}
