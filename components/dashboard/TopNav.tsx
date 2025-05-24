'use client';

import Link from 'next/link';
import { Bell, MessageSquare, User } from 'lucide-react';
import { CallTextButtons } from '../controls/CallTextButtons';

export function Topbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b z-50">
      {/* Logo */}
      <div className="text-xl font-bold text-green-600 tracking-tight">
        dwellr<span className="text-gray-900">.ai</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
        <Link href="/">Dashboard</Link>
        <Link href="/contacts">Contacts</Link>
        <Link href="/deals">Deals</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/ai">AI</Link>
        <Link href="/feed">Feed</Link>
        <Link href="/pipeline">Pipeline</Link>
        <Link href="/reports">Reports</Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600 hover:text-green-600 cursor-pointer" />
        <MessageSquare className="w-5 h-5 text-gray-600 hover:text-green-600 cursor-pointer" />
        <User className="w-5 h-5 text-gray-600 hover:text-green-600 cursor-pointer" />
      </div>

      {/* Floating call/text buttons (optional, can remove from here if already floating) */}
      <CallTextButtons />
    </header>
  );
}
