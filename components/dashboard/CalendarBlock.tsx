'use client';

import { useEffect, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { format } from 'date-fns';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Event = {
  id: string;
  title: string;
  event_date: string;
};

export default function CalendarBlockCard() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('id, title, event_date')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(3);

      if (!error && data) {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Link href="/dashboard/calendar" className="block h-full">
      <Card className="h-full flex flex-col justify-between col-span-1 row-span-1 shadow-sm rounded-2xl hover:shadow-md transition">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 tracking-tight">
            Calendar Events
          </CardTitle>
          <CalendarIcon className="w-5 h-5 text-green-600" />
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 justify-end">
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground">No upcoming events</p>
          ) : (
            events.map((event) => (
              <div key={event.id}>
                <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(event.event_date), 'PPpp')}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
