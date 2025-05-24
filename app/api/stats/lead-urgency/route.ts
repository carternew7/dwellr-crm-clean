import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const labels = ['hot', 'warm', 'cold'];
  const data = [];

  for (const label of labels) {
    const { count } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('status', label);

    data.push({ label, value: count || 0 });
  }

  return NextResponse.json(data);
}
