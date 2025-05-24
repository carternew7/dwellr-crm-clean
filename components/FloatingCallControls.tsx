// components/FloatingCallControls.tsx
"use client";

import { useState } from "react";
import { PhoneCall, MessageSquare, Mic } from "lucide-react";
import SMSPopup from "./SMSPopup";
import RecordPopup from "./RecordPopup";
import CallPopup from "./CallPopup";

export default function FloatingCallControls() {
  const [smsOpen, setSmsOpen] = useState(false);
  const [recordOpen, setRecordOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  return (
<div className="flex flex-col gap-3 fixed right-6 top-36 z-50">
      {/* Call Button */}
      <button
        onClick={() => setCallOpen(true)}
        className="rounded-full p-4 bg-green-500 shadow-md hover:scale-105 transition"
      >
        <PhoneCall className="text-white w-5 h-5" />
      </button>

      {/* SMS Button */}
      <button
        onClick={() => setSmsOpen(true)}
        className="rounded-full p-4 bg-green-500 shadow-md hover:scale-105 transition"
      >
        <MessageSquare className="text-white w-5 h-5" />
      </button>

      {/* Record Button */}
      <button
        onClick={() => setRecordOpen(true)}
        className="rounded-full p-4 bg-green-500 shadow-md hover:scale-105 transition"
      >
        <Mic className="text-white w-5 h-5" />
      </button>

      <CallPopup open={callOpen} setOpen={setCallOpen} />
      <SMSPopup open={smsOpen} setOpen={setSmsOpen} />
      <RecordPopup open={recordOpen} setOpen={setRecordOpen} />
    </div>
  );
}
