'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-14 w-full bg-white border-b shadow-sm px-4 flex items-center justify-between fixed top-0 left-0 z-20 rounded-tr-2xl">
      <div className="flex items-center gap-4">
        <Image
          src="/dwellr-main-logo.png"
          alt="Dwellr Logo"
          width={135}
          height={44}
          priority
        />
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        <Link
          href="/logs"
          className="px-3 py-1.5 border border-[#00C853] rounded-md text-[#00C853] hover:bg-[#00C853] hover:text-white transition"
        >
          My Logs
        </Link>
        <Link
          href="/summaries"
          className="px-3 py-1.5 border border-[#00C853] rounded-md text-[#00C853] hover:bg-[#00C853] hover:text-white transition"
        >
          My Summaries
        </Link>
        <Link
          href="/assistant"
          className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center gap-1"
        >
          <Bot className="w-4 h-4" />
          Assistant
        </Link>
      </div>
    </header>
  );
}
