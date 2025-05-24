'use client';
import Link from 'next/link';
import { Bell, MessageSquare, User } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b">
      {/* Logo */}
      <div className="text-xl font-bold text-green-600 tracking-tight">
        dwellr<span className="text-gray-900">.ai</span>
      </div>

      {/* Navigation Links */}
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

      {/* Icons */}
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600 hover:text-green-600 transition" />
        <MessageSquare className="w-5 h-5 text-gray-600 hover:text-green-600 transition" />
        <User className="w-5 h-5 text-gray-600 hover:text-green-600 transition" />
      </div>
    </header>
  );
}
