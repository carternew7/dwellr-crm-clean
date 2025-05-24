'use client';

import { Card, CardContent } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', leads: 20, closed: 4 },
  { name: 'Feb', leads: 25, closed: 7 },
  { name: 'Mar', leads: 30, closed: 10 },
  { name: 'Apr', leads: 40, closed: 14 },
  { name: 'May', leads: 32, closed: 9 },
];

export default function ReportsPage() {
  return (
    <div className="grid gap-4 p-4">
      <Card>
        <h2 className="p-4 text-lg font-semibold">Leads & Closings Per Month</h2>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#22c55e" />
              <Bar dataKey="closed" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
