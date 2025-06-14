
import { useNavigate } from "react-router-dom";
import { Plus as PlusIcon, BarChart2 } from "lucide-react";

export default function DashboardQuickActions({ user }: { user: any }) {
  const navigate = useNavigate();
  return (
    <div className="flex-1 glass-card light p-6 mb-6 md:mb-0 border shadow-lg">
      <h3 className="text-lg font-semibold mb-3 text-accent">Quick Actions</h3>
      <div className="flex gap-4 flex-wrap">
        <button
          className="flex items-center bg-accent-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
          onClick={() => {
            if (user) navigate("/add-product");
            else navigate("/auth");
          }}
          disabled={!user}
        >
          <PlusIcon size={18} /> <span>Add Product</span>
        </button>
        <button
          className="flex items-center bg-accent-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
          onClick={() => {
            if (user) navigate("/track-sales");
            else navigate("/auth");
          }}
          disabled={!user}
        >
          <BarChart2 size={18} /> <span>Track Sales</span>
        </button>
         <button
          className="flex items-center bg-accent-btn px-4 py-2 rounded-md font-medium hover:scale-105 transition gap-2"
          onClick={() => {
            if (user) navigate("/sales-reports");
            else navigate("/auth");
          }}
          disabled={!user}
        >
          <BarChart2 size={18} /> <span>Sales Reports</span>
        </button>
      </div>
    </div>
  );
}
