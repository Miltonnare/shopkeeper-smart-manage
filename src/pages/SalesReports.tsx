
import TopNav from "@/components/TopNav";
import DemoChart from "@/components/DemoChart";

export default function SalesReports() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3edf9] via-[#c7f6ed] to-[#fafbfe]">
      <TopNav />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 bg-modern-gradient bg-clip-text text-transparent drop-shadow">Sales Reports &amp; Trends</h2>
        <div className="glass-card light border shadow-xl p-8">
          <DemoChart />
        </div>
      </main>
    </div>
  );
}
