// components/notifications/NotificationsPanel.tsx
'use client';

// import { Card } from '@/components/ui/card';
import { Card } from '../ui/card';

const notifications = [
  { id: 1, type: 'Missed Call', message: 'You missed a call from Brian J.' },
  { id: 2, type: 'New Message', message: 'Makayla M. sent a new lead update.' },
];

export function NotificationsPanel() {
  return (
    <Card className="p-4 space-y-2 w-72">
      <h4 className="font-semibold text-lg">Notifications</h4>
      <ul className="space-y-2">
        {notifications.map(note => (
          <li key={note.id} className="text-sm">
            <strong>{note.type}:</strong> {note.message}
          </li>
        ))}
      </ul>
    </Card>
  );
}
