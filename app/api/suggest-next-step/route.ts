import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { transcript } = body;

  if (!transcript) {
    return NextResponse.json({ error: 'Missing transcript' }, { status: 400 });
  }

  try {
    const chat = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a CRM assistant. Based on a call transcript, suggest the most important next sales step.',
        },
        {
          role: 'user',
          content: `Transcript: ${transcript}`,
        },
      ],
      model: 'gpt-4',
    });

    const suggestion = chat.choices[0].message.content;
    return NextResponse.json({ suggestion });
  } catch (error) {
    return NextResponse.json({ error: 'OpenAI API error' }, { status: 500 });
  }
}
