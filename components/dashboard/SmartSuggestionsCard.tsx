'use client';

import { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SmartSuggestionsCard() {
  const [suggestion, setSuggestion] = useState<string>('Loading AI suggestion...');

  useEffect(() => {
    const fetchSuggestion = async () => {
      const { data, error } = await supabase
        .from('call_transcripts')
        .select('transcript')
        .order('created_at', { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        const latestTranscript = data[0].transcript;

        const res = await fetch('/api/suggest-next-step', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript: latestTranscript }),
        });

        const json = await res.json();
        setSuggestion(json.suggestion || 'No suggestion returned.');
      } else {
        setSuggestion('No recent calls found.');
      }
    };

    fetchSuggestion();
  }, []);

  return (
    <Link href="/dashboard/ai-suggestions" className="block h-full">
      <Card className="h-full flex flex-col justify-between col-span-1 row-span-1 shadow-sm rounded-2xl hover:shadow-md transition">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 tracking-tight">
            Smart Suggestion
          </CardTitle>
          <Bot className="w-5 h-5 text-green-600 animate-pulse" />
        </CardHeader>
        <CardContent className="flex flex-col justify-end flex-1">
          <p className="text-sm text-gray-800">{suggestion}</p>
          <p className="text-xs text-muted-foreground pt-1">AI-powered next step</p>
        </CardContent>
      </Card>
    </Link>
  );
}
