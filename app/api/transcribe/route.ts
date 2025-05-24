// app/api/transcribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import { requestTranscription } from '@/lib/assemblyai';
import axios from 'axios';
// import uploadAudio from the correct path if it is a default export, or implement/uploadAudio if missing
// import uploadAudio from '@/lib/assemblyai'; // Uncomment and adjust if uploadAudio is a default export or add its implementation

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const form = new formidable.IncomingForm();

  const buffer = await new Promise<Buffer>((resolve, reject) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err || !files.file) return reject('Upload error');
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      const audio = fs.readFileSync(file.filepath);
      resolve(audio);
    });
  });

  const audioUrl = await uploadAudio(buffer);
  const transcriptId = await requestTranscription(audioUrl);

  return NextResponse.json({ transcriptId });
}
async function uploadAudio(buffer: Buffer) {
    // Replace with your actual upload endpoint and API key if needed
    const response = await axios.post(
        'https://api.assemblyai.com/v2/upload',
        buffer,
        {
            headers: {
                'authorization': process.env.ASSEMBLYAI_API_KEY || '',
                'content-type': 'application/octet-stream',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        }
    );
    return response.data.upload_url;
}

