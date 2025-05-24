'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { Badge } from '../ui/badge';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Activity = {
  id: string;
  type: 'call' | 'note';
  message: string;
  created_at: string;
  source?: string;
};

export default function RecentActivityCard() {
  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [calls, notes] = await Promise.all([
        supabase
          .from('call_logs')
          .select('id, agent_id, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('lead_notes')
          .select('id, note, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      const formatted: Activity[] = [];

      if (calls.data) {
        calls.data.forEach((c) => {
          formatted.push({
            id: c.id,
            type: 'call',
            message: '📞 Call logged',
            created_at: c.created_at,
            source: c.agent_id ?? 'Unknown',
          });
        });
      }

      if (notes.data) {
        notes.data.forEach((n) => {
          formatted.push({
            id: n.id,
            type: 'note',
            message: `📝 ${n.note.slice(0, 60)}${n.note.length > 60 ? '...' : ''}`,
            created_at: n.created_at,
          });
        });
      }

      const sorted = formatted.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setActivity(sorted.slice(0, 6));
    };

    fetchData();
  }, []);

  return (
    <Link href="/dashboard/activity" className="block h-full">
      <Card className="h-full flex flex-col justify-between col-span-1 row-span-1 shadow-sm rounded-2xl hover:shadow-md transition">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 tracking-tight">
            Recent Activity
          </CardTitle>
          <Clock className="w-5 h-5 text-green-600" />
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-2">
          {activity.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          ) : (
            activity.map((a) => (
              <div
                key={a.id}
                className="flex justify-between items-center p-2 rounded-md hover:bg-muted transition text-sm"
              >
                <div>
                  <p className="font-medium">{a.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(a.created_at), { addSuffix: true })}
                    {a.source ? ` • by ${a.source}` : ''}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs capitalize">{a.type}</Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
