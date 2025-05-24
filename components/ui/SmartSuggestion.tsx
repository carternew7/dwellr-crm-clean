'use client';

import React from "react";
import { Sparkles } from "lucide-react";

const SmartSuggestion: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all group">
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 rounded-full blur-2xl opacity-30 group-hover:scale-110 transition-transform" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-20 group-hover:scale-125 transition-transform" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700">
        <Sparkles className="w-4 h-4 text-green-600 animate-bounce" />
        AI Smart Suggestion
      </div>

      {/* Message */}
      <p className="text-sm text-gray-800 leading-snug">
        Text all leads from last week who opened their quote but didn’t respond. Include a personal note to re-engage.
      </p>

      {/* CTA */}
      <div className="text-xs font-medium text-green-600 mt-4 underline cursor-pointer hover:text-green-800">
        Preview Suggested Message
      </div>
    </div>
  );
};

export default SmartSuggestion;
