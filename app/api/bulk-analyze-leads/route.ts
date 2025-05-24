// app/api/bulk-analyze-leads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('id, summary, status')
      .is('status', null); // Only update leads without a status

    if (error) throw error;
    if (!leads || leads.length === 0) {
      return NextResponse.json({ updated: 0, message: 'No stale leads found.' });
    }

    let updatedCount = 0;

    for (const lead of leads) {
      const prompt = `You are an AI CRM assistant. Analyze this lead summary and classify urgency.

Summary:
${lead.summary}

Classify status as one of: hot, warm, cold
Return JSON:
{
  "status": "hot" | "warm" | "cold",
  "follow_up_reason": "",
  "coaching_tip": "",
  "message_options": {
    "sms": "",
    "email": ""
  }
}`;

      const result = await openai.chat.completions.create({
        model: 'gpt-4',
        temperature: 0.2,
        messages: [
          { role: 'system', content: 'You return JSON with urgency classification and follow-up help.' },
          { role: 'user', content: prompt }
        ]
      });

      const parsed = JSON.parse(result.choices[0]?.message?.content || '{}');

      const { error: updateError } = await supabase.from('leads').update({
        status: parsed.status || 'warm',
        follow_up_reason: parsed.follow_up_reason || '',
        coaching_tip: parsed.coaching_tip || '',
        message_options: parsed.message_options || {}
      }).eq('id', lead.id);

      if (!updateError) updatedCount++;
    }

    return NextResponse.json({ updated: updatedCount });
  } catch (err) {
    console.error('Bulk lead analysis error:', err);
    return NextResponse.json({ error: 'Failed to analyze leads' }, { status: 500 });
  }
}
