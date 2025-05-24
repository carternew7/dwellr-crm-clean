// components/dashboard/UrgencyChartCard.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';

const COLORS = {
  hot: '#ef4444',
  warm: '#facc15',
  cold: '#3b82f6'
};

type UrgencyData = {
  label: keyof typeof COLORS;
  value: number;
};

export default function UrgencyChartCard() {
  const [data, setData] = useState<UrgencyData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUrgencyCounts = async () => {
    const res = await fetch('/api/stats/lead-urgency');
    const json = await res.json();
    setData(json || []);
  };

  useEffect(() => {
    fetchUrgencyCounts();
  }, []);

  const handleBulkAnalyze = async () => {
    setLoading(true);
    await fetch('/api/bulk-analyze-leads', { method: 'POST' });
    await fetchUrgencyCounts();
    setLoading(false);
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Lead Urgency Breakdown</span>
          <Button onClick={handleBulkAnalyze} disabled={loading} size="sm">
            {loading ? 'Analyzing...' : 'Update'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.label]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
