// components/controls/CallTextButtons.tsx
'use client';

import { Phone, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';

export function CallTextButtons() {
  const handleCall = () => {
    alert('Dialing assigned contact...');
  };

  const handleText = () => {
    alert('Opening SMS composer...');
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Button
        onClick={handleCall}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 shadow-sm"
        size="sm"
      >
        <Phone className="w-5 h-5" />
      </Button>

      <Button
        onClick={handleText}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 shadow-sm"
        size="sm"
      >
        <MessageSquare className="w-5 h-5" />
      </Button>
    </div>
  );
}
