import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { name: "Mon", value: 1800 },
  { name: "Tue", value: 2200 },
  { name: "Wed", value: 1900 },
  { name: "Thu", value: 2500 },
  { name: "Fri", value: 2100 },
  { name: "Sat", value: 1400 },
  { name: "Sun", value: 1000 },
];

const pieData = [
  { name: "Call", value: 3 },
  { name: "Email", value: 2 },
  { name: "Visit", value: 1 },
  { name: "Missed", value: 1 },
];

const COLORS = ["#22c55e", "#86efac", "#bbf7d0", "#4ade80"];

const DashboardChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">
          Active Monthly Sales Closed
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">
          Urgent Action Needed
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
