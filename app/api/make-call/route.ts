// app/api/make-call/route.ts
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  const { to } = await req.json();

  if (!to) {
    return NextResponse.json({ error: 'Missing target phone number' }, { status: 400 });
  }

  try {
    const call = await client.calls.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
      url: 'https://dwellr-crm.vercel.app/api/twiml-voice', // Update this to your deployed TwiML URL
      method: 'POST',
    });

    return NextResponse.json({ sid: call.sid });
  } catch (err) {
    console.error('Twilio outbound call error:', err);
    return NextResponse.json({ error: 'Call initiation failed' }, { status: 500 });
  }
}
