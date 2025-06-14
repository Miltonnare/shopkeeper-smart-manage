
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
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Track Sales</h2>
        <div className="bg-white shadow rounded-xl border overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{sale.product}</td>
                  <td className="px-6 py-4">{sale.qty}</td>
                  <td className="px-6 py-4">{sale.amount}</td>
                  <td className="px-6 py-4">{sale.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

