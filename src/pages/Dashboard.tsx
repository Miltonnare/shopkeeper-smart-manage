
import TopNav from "@/components/TopNav";
import { useNavigate } from "react-router-dom";
import { BarChart2, Archive, ShoppingCart, Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";
import { useState } from "react";

const initialTotalSales = 42950; // Initial sales value

const statDataStatic = [
  {
    title: "Inventory Items",
    value: "120",
    change: "-2.4%",
    icon: Archive,
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    title: "Products Low in Stock",
    value: "7",
    change: "+1.1%",
    icon: ShoppingCart,
    color: "bg-orange-100 text-orange-700"
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  // State for sales 
  const [totalSales, setTotalSales] = useState(initialTotalSales);
  const [lastSales, setLastSales] = useState(initialTotalSales);

  // Derive sales change
  const salesDiff = totalSales - lastSales;
  // Calculate the percentage change (to one decimal)
  const percentChange = lastSales !== 0 ? ((salesDiff / lastSales) * 100).toFixed(1) : "0.0";
  const changeDisplay =
    salesDiff === 0
      ? "+0.0%"
      : `${salesDiff > 0 ? "+" : ""}${percentChange}%`;

  const handleIncrement = () => {
    setLastSales(totalSales);
    setTotalSales(totalSales + 100); // Change step as desired
  };

  const handleDecrement = () => {
    setLastSales(totalSales);
    setTotalSales(Math.max(totalSales - 100, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#222a38] via-[#263346] to-[#2f415c] flex flex-col">
      <TopNav onLogout={() => navigate("/")} />
      <main className="max-w-6xl mx-auto py-10 px-6 flex-1 w-full">
        <h2 className="text-2xl font-bold mb-8 glass-title">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {/* Total Sales stat card - GLASS */}
          <div
            className="glass-card gold p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all"
          >
            <span className="bg-[#23314d] border-2 border-gold rounded-xl p-3 inline-flex shadow-inner">
              <BarChart2 size={30} className="text-[#ffd700]" />
            </span>
            <div className="flex-1">
              <div className="glass-title text-[1rem] mb-1">Total Sales</div>
              <div className="text-2xl font-extrabold gold-text transition-all duration-200" key={totalSales}>
                Ksh{totalSales.toLocaleString()}
              </div>
              <div className={`text-sm ${Number(percentChange) >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                {changeDisplay}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                aria-label="Increment sales"
                className="neu-btn p-1 hover:scale-110 transition"
                onClick={handleIncrement}
                type="button"
              >
                <PlusIcon size={20} />
              </button>
              <button
                aria-label="Decrement sales"
                className="neu-btn p-1 hover:scale-110 transition"
                onClick={handleDecrement}
                type="button"
              >
                <MinusIcon size={20} />
              </button>
            </div>
          </div>
          {/* Render remaining static stat cards as GLASS */}
          {statDataStatic.map(stat => (
            <div
              key={stat.title}
              className="glass-card p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all"
            >
              <span className={`${stat.color} rounded-xl p-3 inline-flex shadow-inner`}>
                <stat.icon size={30} />
              </span>
              <div>
                <div className="glass-title mb-1">{stat.title}</div>
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className={`text-sm ${stat.change.startsWith("+") ? "text-emerald-300" : "text-rose-300"}`}>{stat.change}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 glass-card p-6 mb-6 md:mb-0 border-gold shadow-lg">
            <h3 className="text-lg font-semibold mb-3 gold-text">Quick Actions</h3>
            <div className="flex gap-4 flex-wrap">
              <button
                className="flex items-center neu-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
                onClick={() => navigate("/add-product")}
              >
                <PlusIcon size={18} /> <span className="gold-text">Add Product</span>
              </button>
              <button
                className="flex items-center neu-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
                onClick={() => navigate("/track-sales")}
              >
                <BarChart2 size={18} /> <span className="gold-text">Track Sales</span>
              </button>
              <button
                className="flex items-center neu-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
                onClick={() => navigate("/sales-reports")}
              >
                <BarChart2 size={18} /> <span className="gold-text">Sales Reports</span>
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            {/* Placeholder: Add illustration, tips, or recent activity */}
            <div className="glass-card h-full rounded-2xl flex items-center justify-center border shadow-lg p-6">
              <span className="text-lg text-white/70 italic glass-title">“Stay smart! Monitor sales, stock, and trends here.”</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
