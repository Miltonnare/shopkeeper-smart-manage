
import TopNav from "@/components/TopNav";
import DemoChart from "@/components/DemoChart";

export default function SalesReports() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#17203a] via-[#2f3149] to-[#274664]">
      <TopNav />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 glass-title">Sales Reports &amp; Trends</h2>
        <div className="glass-card border shadow-xl p-8">
          <DemoChart />
        </div>
      </main>
    </div>
  );
}
