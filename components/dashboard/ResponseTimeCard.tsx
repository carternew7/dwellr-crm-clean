'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Clock } from 'lucide-react';
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

const ResponseTimeCard: React.FC = () => {
  return (
<Card className="h-full flex flex-col justify-between col-span-1 row-span-1">
      <CardHeader className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Avg Response Time</h3>
          <p className="text-sm text-gray-500">4.2h avg</p>
        </div>
        <div className="p-2 bg-green-100 rounded-full text-green-700">
          <Clock className="w-5 h-5" />
        </div>
      </CardHeader>
      <CardContent className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ResponseTimeCard;