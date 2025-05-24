// app/api/twiml-voice/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Dial>+18592403338</Dial>
      </Response>`,
    {
      headers: {
        'Content-Type': 'text/xml',
      },
    }
  );
}
