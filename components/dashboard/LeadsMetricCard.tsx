'use client';

import React from 'react';
import { Card, CardContent } from '../ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 160 },
  { name: 'Wed', value: 90 },
  { name: 'Thu', value: 200 },
  { name: 'Fri', value: 170 },
  { name: 'Sat', value: 140 },
  { name: 'Sun', value: 110 }
];

const LeadsMetricCard: React.FC = () => {
  return (
<Card className="h-full flex flex-col justify-between col-span-1 row-span-1">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Leads This Week</h3>
        <p className="text-sm text-green-600">+12% from last week</p>
      </div>
      <CardContent className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeadsMetricCard;