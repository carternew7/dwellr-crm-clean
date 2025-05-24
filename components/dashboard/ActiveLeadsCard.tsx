'use client';

import { useEffect, useState } from 'react';
import { LineChart } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ActiveLeadsCard() {
  const [data, setData] = useState<{ status: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: leads, error } = await supabase.from('leads').select('status');
      if (leads && !error) {
        const counts: Record<string, number> = {};
        leads.forEach((lead) => {
          const status = lead.status ?? 'unknown';
          counts[status] = (counts[status] || 0) + 1;
        });

        const chartData = Object.entries(counts).map(([status, count]) => ({
          status,
          count
        }));

        setData(chartData);
      }
    };

    fetchData();
  }, []);

  return (
    <Link href="/dashboard/pipeline" className="block h-full">
      <Card className="h-full flex flex-col justify-between col-span-1 row-span-1 shadow-sm rounded-2xl hover:shadow-md transition">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 tracking-tight">
            Active Leads
          </CardTitle>
          <LineChart className="w-5 h-5 text-green-600" />
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-end">
          {data.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={data}>
                <XAxis dataKey="status" style={{ fontSize: '10px' }} />
                <YAxis allowDecimals={false} style={{ fontSize: '10px' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
