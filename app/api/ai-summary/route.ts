import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: 'Missing transcript text' }, { status: 400 });
  }

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a CRM assistant that summarizes customer conversations from the manufactured home sales process and extracts key insights.',
        },
        {
          role: 'user',
          content: `Summarize this transcript into key points, customer wants/needs, objections if any, and clear next steps:\n\n${text}`,
        },
      ],
      temperature: 0.5,
    });

    const summary = chat.choices[0]?.message?.content || 'No summary available.';
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('OpenAI summarization error:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
