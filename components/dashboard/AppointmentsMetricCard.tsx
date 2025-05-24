'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { CalendarCheck2 } from 'lucide-react';
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

const AppointmentsMetricCard: React.FC = () => {
  return (
<Card className="h-full flex flex-col justify-between col-span-1 row-span-1">
      <CardHeader className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Appointments</h3>
          <p className="text-sm text-gray-500">79 scheduled</p>
        </div>
        <div className="p-2 bg-green-100 rounded-full text-green-700">
          <CalendarCheck2 className="w-5 h-5" />
        </div>
      </CardHeader>
      <CardContent className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AppointmentsMetricCard;