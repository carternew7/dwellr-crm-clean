'use client';

import { useEffect, useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SalesPipelineCard() {
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchStatusCounts = async () => {
      const { data: leads, error } = await supabase.from('leads').select('status');
      if (leads && !error) {
        const counts: Record<string, number> = {};
        leads.forEach((lead) => {
          const status = lead.status ?? 'unknown';
          counts[status] = (counts[status] || 0) + 1;
        });
        setData(counts);
      }
    };

    fetchStatusCounts();
  }, []);

  return (
    <Link href="/dashboard/pipeline-summary" className="block h-full">
      <Card className="h-full flex flex-col justify-between col-span-1 row-span-1 shadow-sm rounded-2xl hover:shadow-md transition">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 tracking-tight">
            Sales Pipeline
          </CardTitle>
          <BarChart2 className="w-5 h-5 text-green-600" />
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 justify-end">
          {Object.keys(data).length === 0 ? (
            <p className="text-sm text-muted-foreground">No leads available</p>
          ) : (
            Object.entries(data).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center text-sm">
                <span className="capitalize">{status.replace(/_/g, ' ')}</span>
                <Badge variant="outline" className="text-xs">{count}</Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
