// app/api/assistant/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    const formData = await req.formData();

    const rawPrompt = formData.get('prompt');
    const prompt = typeof rawPrompt === 'string' ? rawPrompt : rawPrompt?.toString() || '';

    if (!prompt.trim() || !userId) {
      return NextResponse.json({ error: 'Missing or empty prompt or user ID' }, { status: 400 });
    }

    const file = formData.get('file') as File | null;
    let fileUrl: string | null = null;

    if (file && file.name) {
      try {
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const filename = `chat_uploads/${uuidv4()}-${file.name}`;

        const { error } = await supabase.storage
          .from('uploads')
          .upload(filename, fileBuffer, {
            contentType: file.type,
            upsert: true,
          });

        if (error) {
          console.error('Upload error:', error);
        } else {
          const { publicUrl } = supabase.storage
            .from('uploads')
            .getPublicUrl(filename).data;
          fileUrl = publicUrl;
        }
      } catch (err) {
        console.error('File upload failed:', err);
      }
    }

    const fullPrompt = fileUrl ? `${prompt}\n\n(Attached file: ${fileUrl})` : prompt;

    if (typeof fullPrompt !== 'string' || !fullPrompt.trim()) {
      console.error('Invalid fullPrompt:', fullPrompt);
      return NextResponse.json({ error: 'Invalid prompt content' }, { status: 400 });
    }

    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant supporting CRM users in sales, housing, and service tasks.',
        },
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
      temperature: 0.5,
    });

    const answer = chat.choices?.[0]?.message?.content || 'No response generated.';

    await supabase.from('chat_messages').insert([
      { user_id: userId, role: 'user', content: prompt },
      { user_id: userId, role: 'assistant', content: answer },
    ]);

    return NextResponse.json({
      answer,
      suggestions: [
        'Would you like to send this answer via SMS?',
        'Need help calculating price per square foot?',
        'Want to tag this lead based on urgency?',
      ],
    });
  } catch (err: any) {
    console.error('POST handler failure:', err);
    return NextResponse.json({ error: err.message || 'Unexpected error occurred' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .select('role, content, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }

  return NextResponse.json(data);
}
