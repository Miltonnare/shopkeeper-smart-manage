
import TopNav from "@/components/TopNav";
import DemoChart from "@/components/DemoChart";

export default function SalesReports() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Sales Reports & Trends</h2>
        <DemoChart />
      </main>
    </div>
  );
}
