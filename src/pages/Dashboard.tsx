
import TopNav from "@/components/TopNav";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, BarChart2, Archive, Plus } from "lucide-react";

const statData = [
  {
    title: "Total Sales",
    value: "Ksh42,950",
    change: "+8.2%",
    icon: BarChart2,
    color: "bg-blue-100 text-blue-700"
  },
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
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav onLogout={() => navigate("/")} />
      <main className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {statData.map(stat => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow p-6 flex items-center gap-4 border hover:shadow-lg transition-shadow"
            >
              <span className={`${stat.color} rounded-md p-3 inline-flex`}>
                <stat.icon size={30} />
              </span>
              <div>
                <div className="text-gray-600 font-medium">{stat.title}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}>{stat.change}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white p-6 rounded-2xl shadow border mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            <div className="flex gap-4 flex-wrap">
              <button
                className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors gap-2"
                onClick={() => navigate("/add-product")}
              >
                <Plus size={18} /> Add Product
              </button>
              <button
                className="flex items-center bg-white px-4 py-2 border rounded-md font-medium hover:bg-gray-50 transition-colors gap-2"
                onClick={() => navigate("/track-sales")}
              >
                <BarChart2 size={18} /> Track Sales
              </button>
              <button
                className="flex items-center bg-white px-4 py-2 border rounded-md font-medium hover:bg-gray-50 transition-colors gap-2"
                onClick={() => navigate("/sales-reports")}
              >
                <BarChart2 size={18} /> Sales Reports
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            {/* Placeholder: Add illustration, tips, or recent activity */}
            <div className="bg-gradient-to-tr from-blue-100 to-emerald-100 h-full rounded-2xl flex items-center justify-center border shadow-inner p-6">
              <span className="text-lg text-gray-500 italic">“Stay smart! Monitor sales, stock, and trends here.”</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
