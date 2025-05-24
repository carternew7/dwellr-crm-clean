'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TotalLeadsCard() {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchTotal = async () => {
      const { count } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });
      if (typeof count === 'number') setTotal(count);
    };

    fetchTotal();
  }, []);

  return (
    <Link href="/leads" className="block h-full">
      <Card className="h-full flex flex-col justify-between col-span-1 row-span-1 shadow-sm rounded-2xl hover:shadow-md transition">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 tracking-tight">
            Total Leads
          </CardTitle>
          <Users className="w-5 h-5 text-green-600" />
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-end">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <p className="text-xs text-muted-foreground pt-1">All-time total</p>
        </CardContent>
      </Card>
    </Link>
  );
}
