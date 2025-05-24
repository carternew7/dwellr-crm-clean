// components/sidebar/AIAssistantSidebar.tsx
'use client';

// import { Card } from '@/components/ui/card';
import { Card } from '../ui/card';
import { Brain } from 'lucide-react';

const followUps = [
  'Send reminder text to John D.',
  'Draft thank-you letter for signed contract',
  'Call Nancy re: walkthrough time confirmation',
];

export function AIAssistantSidebar() {
  return (
    <aside className="w-72 bg-white shadow-md p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="text-green-600 w-5 h-5" />
        <h3 className="text-lg font-semibold">AI Assistant</h3>
      </div>
      <Card className="p-3 space-y-2">
        <p className="text-sm text-muted-foreground">Suggested Next Steps:</p>
        <ul className="list-disc list-inside text-sm text-gray-800">
          {followUps.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
