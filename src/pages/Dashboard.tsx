
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
    <div className="min-h-screen bg-gradient-to-br from-[#e3edf9] via-[#c7f6ed] to-[#fafbfe] flex flex-col">
      <TopNav onLogout={() => navigate("/")} />
      <main className="max-w-6xl mx-auto py-10 px-6 flex-1 w-full">
        <h2 className="text-3xl font-bold mb-8 bg-modern-gradient bg-clip-text text-transparent drop-shadow">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {/* Total Sales stat card - GLASS */}
          <div
            className="glass-card light p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all"
          >
            <span className="bg-accent/10 border-2 border-accent rounded-xl p-3 inline-flex shadow-inner">
              <BarChart2 size={30} className="text-accent" />
            </span>
            <div className="flex-1">
              <div className="font-bold mb-1 text-dark-secondary">Total Sales</div>
              <div className="text-2xl font-extrabold text-accent transition-all duration-200" key={totalSales}>
                Ksh{totalSales.toLocaleString()}
              </div>
              <div className={`text-sm ${Number(percentChange) >= 0 ? "text-emerald-500" : "text-rose-400"}`}>
                {changeDisplay}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                aria-label="Increment sales"
                className="bg-accent-btn p-1 rounded hover:scale-110 transition"
                onClick={handleIncrement}
                type="button"
              >
                <PlusIcon size={20} />
              </button>
              <button
                aria-label="Decrement sales"
                className="bg-accent-btn p-1 rounded hover:scale-110 transition"
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
              className="glass-card light p-6 flex items-center gap-4 border shadow-xl hover:scale-[1.025] transition-all"
            >
              <span className="bg-accent/10 rounded-xl p-3 inline-flex shadow-inner">
                <stat.icon size={30} className="text-accent" />
              </span>
              <div>
                <div className="font-bold mb-1 text-dark-secondary">{stat.title}</div>
                <div className="text-2xl font-extrabold text-accent">{stat.value}</div>
                <div className={`text-sm ${stat.change.startsWith("+") ? "text-emerald-500" : "text-rose-400"}`}>{stat.change}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 glass-card light p-6 mb-6 md:mb-0 border shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Quick Actions</h3>
            <div className="flex gap-4 flex-wrap">
              <button
                className="flex items-center bg-accent-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
                onClick={() => navigate("/add-product")}
              >
                <PlusIcon size={18} /> <span>Add Product</span>
              </button>
              <button
                className="flex items-center bg-accent-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
                onClick={() => navigate("/track-sales")}
              >
                <BarChart2 size={18} /> <span>Track Sales</span>
              </button>
              <button
                className="flex items-center bg-accent-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
                onClick={() => navigate("/sales-reports")}
              >
                <BarChart2 size={18} /> <span>Sales Reports</span>
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="glass-card light h-full rounded-2xl flex items-center justify-center border shadow-lg p-6">
              <span className="text-lg text-dark-secondary italic">
                “Stay smart! Monitor sales, stock, and trends here.”
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
