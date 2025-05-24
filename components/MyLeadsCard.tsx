'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { createClient } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { Badge } from '../components/ui/badge';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Lead = {
  id: string;
  name: string;
  status: string;
  created_at: string;
};

export default function MyLeadsCard() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('id, name, status, created_at')
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) setLeads(data);
    };

    fetchLeads();
  }, []);

  return (
    <Card className="col-span-1 row-span-1 h-full overflow-hidden flex flex-col">
      <CardHeader>
        <div className="text-lg font-semibold">My Leads</div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-2">
        {leads.length === 0 ? (
          <p className="text-sm text-muted-foreground">No leads found.</p>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="flex justify-between items-center p-2 rounded-md hover:bg-muted cursor-pointer"
            >
              <div>
                <p className="text-sm font-medium">{lead.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {lead.status}
              </Badge>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
