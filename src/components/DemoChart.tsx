
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", sales: 320 },
  { name: "Tue", sales: 480 },
  { name: "Wed", sales: 410 },
  { name: "Thu", sales: 607 },
  { name: "Fri", sales: 505 },
  { name: "Sat", sales: 744 },
  { name: "Sun", sales: 690 },
];

export default function DemoChart() {
  return (
    <div className="w-full bg-card p-4 rounded-lg shadow border">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Weekly Sales Trend</h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 9 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
