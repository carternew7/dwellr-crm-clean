// app/api/test-openai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function GET(req: NextRequest) {
  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Hello from Dwellr CRM' }],
    });

    return NextResponse.json({ reply: chat.choices[0].message?.content });
  } catch (err: any) {
    console.error('🔴 OPENAI ERROR:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
