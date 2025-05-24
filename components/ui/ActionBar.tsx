'use client';

import { Phone, Mic, MessageCircle } from 'lucide-react';

export default function ActionBar() {
  return (
    <div className="fixed top-1/3 right-4 z-50 flex flex-col items-center gap-4">
      {/* Call Button */}
      <button
        title="Call Lead"
        className="bg-green-600 text-white p-3 rounded-full shadow hover:bg-green-700 transition duration-200"
        onClick={() => console.log('📞 Initiating phone call...')}
      >
        <Phone className="w-5 h-5" />
      </button>

      {/* Record Meeting */}
      <button
        title="Record In-Person Meeting"
        className="bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition duration-200"
        onClick={() => console.log('🎤 Start recording...')}
      >
        <Mic className="w-5 h-5" />
      </button>

      {/* SMS */}
      <button
        title="Send SMS"
        className="bg-gray-800 text-white p-3 rounded-full shadow hover:bg-gray-900 transition duration-200"
        onClick={() => console.log('💬 Sending SMS...')}
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    </div>
  );
}
