import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const { transcriptText, transcriptId } = await req.json();

  if (!transcriptText || !transcriptId) {
    return NextResponse.json({ error: 'Missing transcriptText or transcriptId' }, { status: 400 });
  }

  const prompt = `
You are a CRM assistant for a manufactured home dealership.

Read the transcript below and extract all lead data, follow-up suggestions, and urgency level.

Transcript:
${transcriptText}

Return a JSON object like this:
{
  "name": "",
  "phone": "",
  "email": "",
  "budget": "",
  "land_status": "",
  "timeline": "",
  "wants": "",
  "summary": "",
  "follow_up_reason": "",
  "coaching_tip": "",
  "message_options": {
    "sms": "",
    "email": ""
  },
  "status": "hot" | "warm" | "cold"
}
- Use "hot" if they are ready to buy soon or requested next steps.
- Use "warm" if they’re interested but not urgent.
- Use "cold" if they’re unsure or far from a decision.
`;

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Extract CRM lead data, urgency, and follow-up suggestions from transcripts. Return JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3
    });

    const response = chat.choices[0]?.message?.content;
    const parsed = JSON.parse(response || '{}');

    const { data, error } = await supabase.from('leads').insert([
      {
        name: parsed.name || 'Unknown',
        phone: parsed.phone || '',
        email: parsed.email || '',
        budget: parsed.budget || '',
        land_status: parsed.land_status || '',
        wants: parsed.wants || '',
        summary: parsed.summary || '',
        transcript_id: transcriptId,
        follow_up_reason: parsed.follow_up_reason || '',
        coaching_tip: parsed.coaching_tip || '',
        message_options: parsed.message_options || {},
        status: parsed.status || 'warm' // default to warm if AI can't tell
      }
    ]);

    if (error) throw error;

    return NextResponse.json({ lead: data?.[0] || null });
  } catch (err) {
    console.error('AI urgency + lead creation error:', err);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
