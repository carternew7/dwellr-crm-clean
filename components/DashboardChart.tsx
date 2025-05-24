// components/DashboardChart.tsx

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", value: 1800 },
  { name: "Tue", value: 2100 },
  { name: "Wed", value: 1900 },
  { name: "Thu", value: 2500 },
  { name: "Fri", value: 1600 },
  { name: "Sat", value: 1000 },
];

const DashboardChart: React.FC = () => {
  return (
    <div className="w-full h-[160px]">
      <h3 className="text-sm font-medium text-gray-600 mb-2">Active Sales Closed</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip />
          <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
