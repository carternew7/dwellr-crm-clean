'use client';

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { UploadCloud, Loader2, CheckCircle2 } from 'lucide-react';
import { pollTranscript } from '../lib/pollTranscript';

export default function UploadAudio() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [transcriptText, setTranscriptText] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setTranscriptText(null);
    setStatus('uploading');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    const id = data.transcriptId;

    pollTranscript(id, (newStatus, text) => {
      setStatus(newStatus);
      if (newStatus === 'completed' && text) {
        setTranscriptText(text);
        handleAISummary(text); // ⬅️ Send to OpenAI here
      }
    });

    setLoading(false);
  };

  const handleAISummary = async (text: string) => {
    const res = await fetch('/api/ai-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    console.log('AI Summary:', data.summary);
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <UploadCloud className="w-5 h-5" />
          Upload Audio for Transcription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <Button onClick={handleSubmit} disabled={!file || loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            'Upload & Transcribe'
          )}
        </Button>

        {status && (
          <div className="text-sm text-muted-foreground">Status: <strong>{status}</strong></div>
        )}
        {transcriptText && (
          <div className="text-sm text-foreground mt-2">
            <strong>Transcript:</strong><br />
            <pre className="text-xs whitespace-pre-wrap">{transcriptText}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
