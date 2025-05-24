// components/notifications/NotificationBell.tsx
'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';

export function NotificationBell() {
  const [hasUnread, setHasUnread] = useState(true);

  return (
    <div className="relative cursor-pointer">
      <Bell className="w-6 h-6 text-green-600" />
      {hasUnread && (
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
      )}
    </div>
  );
}