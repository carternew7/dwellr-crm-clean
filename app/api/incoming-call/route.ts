// app/api/incoming-call/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const from = body.get('From') as string;
  const to = body.get('To') as string;
  const callSid = body.get('CallSid') as string;

  console.log('📞 Incoming call from', from);

  try {
    await supabase.from('call_logs').insert([
      {
        from_number: from,
        to_number: to,
        call_sid: callSid,
        direction: 'inbound'
      }
    ]);
  } catch (err) {
    console.error('Failed to log call:', err);
  }

  const twimlUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/twiml-voice?from=${encodeURIComponent(from)}`;

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Redirect method="POST">${twimlUrl}</Redirect>
      </Response>`,
    {
      headers: {
        'Content-Type': 'text/xml',
      },
    }
  );
}
