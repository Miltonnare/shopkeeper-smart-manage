
import TopNav from "@/components/TopNav";

const sales = [
  { id: 1, product: "Bread", qty: 40, amount: "Ksh400", time: "10:25 AM" },
  { id: 2, product: "Milk", qty: 25, amount: "Ksh500", time: "11:00 AM" },
  { id: 3, product: "Rice", qty: 14, amount: "Ksh980", time: "12:15 PM" },
  { id: 4, product: "Oil", qty: 10, amount: "Ksh1200", time: "1:18 PM" },
  { id: 5, product: "Sugar", qty: 30, amount: "Ksh600", time: "2:06 PM" },
];

export default function TrackSales() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#19212f] via-[#232b40] to-[#243a4b]">
      <TopNav />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 glass-title">Track Sales</h2>
        <div className="glass-card overflow-x-auto border shadow-xl">
          <table className="min-w-full divide-y divide-blue-600 table-glass">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold gold-text uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold gold-text uppercase">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold gold-text uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold gold-text uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-blue-700/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-white">{sale.product}</td>
                  <td className="px-6 py-4 text-white">{sale.qty}</td>
                  <td className="px-6 py-4 text-white">{sale.amount}</td>
                  <td className="px-6 py-4 text-white">{sale.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
