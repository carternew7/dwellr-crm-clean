// components/RightSidebar.tsx
"use client";

import { PhoneCall, MessageSquareText, Mic } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="fixed right-4 top-24 flex flex-col items-center gap-4 z-40">
      <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-md">
        <PhoneCall className="w-4 h-4" />
      </button>
      <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-md">
        <MessageSquareText className="w-4 h-4" />
      </button>
      <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-md">
        <Mic className="w-4 h-4" />
      </button>
    </div>
  );
}
