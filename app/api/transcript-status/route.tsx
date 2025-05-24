// app/api/transcript-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const ASSEMBLY_API_KEY = process.env.ASSEMBLYAI_API_KEY;

  if (!id || !ASSEMBLY_API_KEY) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

  const res = await axios.get(`https://api.assemblyai.com/v2/transcript/${id}`, {
    headers: {
      authorization: ASSEMBLY_API_KEY,
    },
  });

  return NextResponse.json(res.data);
}
