// app/api/incoming-sms/route.ts
import { NextRequest, NextResponse } from "next/server";
import { processTranscript } from "@/lib/ai/processTranscript";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const from = formData.get("From") as string;
  const body = formData.get("Body") as string;

  if (!from || !body) {
    return NextResponse.json({ result: "Missing SMS data" }, { status: 400 });
  }

  // Format SMS to mention all reps
  const fullTranscript = `Incoming SMS from ${from}: ${body}`;

  await processTranscript({
    source: "sms",
    transcript: fullTranscript
  });

  return new Response(
    `<Response><Message>Thanks! A team member will respond shortly.</Message></Response>`,
    { headers: { "Content-Type": "text/xml" } }
  );
}
