// lib/ai/processTranscript.ts
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function processTranscript({
  source,
  transcript
}: {
  source: "sms" | "call" | "record",
  transcript: string
}) {
  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an AI CRM agent. Analyze this transcript. Return:
1) a summary,
2) structured lead data (name, phone, budget, landOwnership, timeline, features),
3) a suggested next step.

Format your response as JSON with keys: summary, lead, task.`
      },
      {
        role: "user",
        content: transcript
      }
    ]
  });

  const result = chat.choices[0].message?.content;
  if (!result) return { ok: false };

  const parsed = JSON.parse(result);

  const { summary, lead, task } = parsed;

  // Save transcript
  await supabase.from("call_transcripts").insert([
    {
      source_type: source,
      summary,
      transcript
    }
  ]);

  // Create or update lead
  const { data: existingLead } = await supabase
    .from("leads")
    .select("id")
    .eq("phone", lead.phone)
    .single();

  let leadId;
  if (existingLead) {
    const { data } = await supabase
      .from("leads")
      .update({ ...lead })
      .eq("id", existingLead.id)
      .select()
      .single();
    leadId = data?.id;
  } else {
    const { data } = await supabase.from("leads").insert([lead]).select().single();
    leadId = data?.id;
  }

  // Create follow-up task
  await supabase.from("tasks").insert([
    {
      lead_id: leadId,
      description: task,
      status: "pending"
    }
  ]);

  return { ok: true };
}
