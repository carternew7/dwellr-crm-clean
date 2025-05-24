'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Handshake,
  CheckSquare,
  Bot,
  BarChart2
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Contacts', href: '/contacts', icon: <Users className="w-5 h-5" /> },
  { name: 'Deals', href: '/deals', icon: <Handshake className="w-5 h-5" /> },
  { name: 'Tasks', href: '/tasks', icon: <CheckSquare className="w-5 h-5" /> },
  { name: 'AI Feed', href: '/ai-feed', icon: <Bot className="w-5 h-5" /> },
  { name: 'Reports', href: '/reports', icon: <BarChart2 className="w-5 h-5" /> }
];

export default function Sidebar() {
  return (
    <aside className="bg-[#00C853] text-white w-56 h-[calc(100vh-56px)] mt-14 fixed left-0 top-0 z-10 shadow-md rounded-br-2xl px-3 pt-6 pb-4 flex flex-col justify-between">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:text-[#00C853] transition-colors"
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="flex justify-center">
        <div className="h-10 w-10 bg-white text-[#00C853] rounded-full flex items-center justify-center font-bold">
          N
        </div>
      </div>
    </aside>
  );
}
