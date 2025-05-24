// app/api/send-sms/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { processTranscript } from "@/lib/ai/processTranscript";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  try {
    const { phone, message } = await req.json();

    if (!phone || !message) {
      return NextResponse.json({ result: "Missing phone or message" }, { status: 400 });
    }

    // Send SMS via Twilio
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phone
    });

    // Run AI pipeline
    await processTranscript({
      source: "sms",
      transcript: message
    });

    return NextResponse.json({ result: "Message sent and summarized." });
  } catch (error) {
    console.error("SMS API error:", error);
    return NextResponse.json({ result: "Internal server error" }, { status: 500 });
  }
}