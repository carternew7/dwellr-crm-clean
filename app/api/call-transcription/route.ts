// app/api/call-transcription/route.ts
import { NextRequest, NextResponse } from 'next/server';
// Update the import paths below to the correct location of your assemblyai utilities
import { requestTranscription, uploadAudio } from '../../../lib/assemblyai';

export async function POST(req: NextRequest) {
  const buffer = await req.arrayBuffer();
  const audioBuffer = Buffer.from(buffer);

  try {
    const audioUrl = await uploadAudio(audioBuffer);
    const transcriptId = await requestTranscription(audioUrl);

    return NextResponse.json({ transcriptId });
  } catch (error) {
    console.error('AssemblyAI call transcription error:', error);
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
  }
}
