// components/CallTextButtons.tsx

import React from "react";
import { Phone, MessageSquare } from "lucide-react";

const CallTextButtons: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-3">
      <button className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg shadow hover:bg-green-700 transition">
        <Phone size={16} className="mr-1" />
        Call
      </button>
      <button className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg shadow hover:bg-gray-200 transition">
        <MessageSquare size={16} className="mr-1" />
        SMS
      </button>
    </div>
  );
};

export default CallTextButtons;
