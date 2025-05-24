// components/AssistantPopup.tsx
'use client';

import { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Send, Paperclip, X } from 'lucide-react';

export function AssistantPopup({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string; suggestions?: string[] }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetch('/api/assistant', {
        method: 'GET',
        headers: { 'x-user-id': userId },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setMessages(data);
          else setMessages([]);
        })
        .catch(() => setMessages([]));
    }
  }, [open]);

  const handleSend = async () => {
    if (!input.trim() && !file) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('prompt', userMsg.content);
      if (file) formData.append('file', file);

      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'x-user-id': userId },
        body: formData,
      });

      const raw = await res.text();
      try {
        const data = JSON.parse(raw);

        if (!res.ok) {
          setMessages(prev => [...prev, { role: 'assistant', content: data.error || 'Server error.' }]);
          return;
        }

        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.answer, suggestions: data.suggestions || [] },
        ]);
      } catch (err) {
        console.error('❌ Invalid JSON from assistant:', raw);
        setMessages(prev => [...prev, { role: 'assistant', content: 'Invalid response from assistant.' }]);
      }
    } catch (err) {
      console.error('Assistant fetch failed:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'There was an error getting a response.' }]);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-green-600 text-white hover:bg-green-700"
        >
          Ask Assistant
        </Button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] bg-white border border-green-600 rounded-lg shadow-2xl flex flex-col h-[520px]">
          <div className="p-3 border-b border-green-600 flex justify-between items-center bg-green-50">
            <span className="font-medium text-green-800">AI Assistant</span>
            <button onClick={() => setOpen(false)} className="text-green-700 hover:text-green-900">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {Array.isArray(messages) && messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={`inline-block px-3 py-2 rounded-lg max-w-[90%] ${
                    msg.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <ul className="mt-2 text-xs text-green-700">
                      {msg.suggestions.map((suggestion, j) => (
                        <li key={j}>💡 {suggestion}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
            {loading && <div className="text-left text-xs text-muted-foreground">Thinking...</div>}
          </div>

          <div className="border-t border-green-100 p-3 flex gap-2 items-center">
            <label className="cursor-pointer text-green-600 hover:text-green-800">
              <Paperclip className="w-4 h-4" />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            <Input
              placeholder="Type a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="text-sm text-gray-900"
            />
            <Button onClick={handleSend} disabled={loading} className="bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
