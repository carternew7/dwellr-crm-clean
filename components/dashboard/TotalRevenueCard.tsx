'use client';

import { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfWeek } from 'date-fns';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type RevenuePoint = {
  week: string;
  total: number;
};

export default function TotalRevenueCard() {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [chartData, setChartData] = useState<RevenuePoint[]>([]);

  useEffect(() => {
    const fetchRevenue = async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('estimated_value, status, created_at');

      if (data && !error) {
        const filtered = data.filter((lead) => lead.status === 'closed_won');

        const total = filtered.reduce((sum, lead) => sum + (lead.estimated_value || 0), 0);
        setTotalRevenue(total);

        const grouped: Record<string, number> = {};

        filtered.forEach((lead) => {
          const week = format(startOfWeek(new Date(lead.created_at)), 'MM/dd');
          grouped[week] = (grouped[week] || 0) + (lead.estimated_value || 0);
        });

        const chartFormatted = Object.entries(grouped).map(([week, total]) => ({
          week,
          total,
        }));

        setChartData(chartFormatted.sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime()));
      }
    };

    fetchRevenue();
  }, []);

  return (
    <Link href="/dashboard/revenue" className="block h-full">
      <Card className="h-full flex flex-col justify-between col-span-1 row-span-1 shadow-sm rounded-2xl hover:shadow-md transition">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 tracking-tight">
            Total Revenue
          </CardTitle>
          <DollarSign className="w-5 h-5 text-green-600" />
        </CardHeader>
        <CardContent className="flex flex-col justify-end space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <XAxis dataKey="week" stroke="#888" fontSize={10} />
              <YAxis stroke="#888" fontSize={10} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground">Revenue trend by week</p>
        </CardContent>
      </Card>
    </Link>
  );
}
