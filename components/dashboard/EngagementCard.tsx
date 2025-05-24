'use client';

import React from "react";
import { Activity } from "lucide-react";

const EngagementCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 bg-white shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 rounded-full blur-2xl opacity-40 group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-30 group-hover:scale-125 transition-transform duration-500"></div>

      <div className="flex items-center justify-between mb-2 relative z-10">
        <h3 className="text-sm font-semibold text-gray-700 tracking-wide">Lead Engagement</h3>
        <div className="bg-green-600 text-white p-2 rounded-full shadow-md">
          <Activity className="w-5 h-5" />
        </div>
      </div>

      <p className="text-4xl font-extrabold text-gray-900 tracking-tight relative z-10">65%</p>

      <div className="relative z-10 mt-2 text-green-600 text-xs font-medium flex items-center gap-1">
        ↑ Improved engagement
      </div>
    </div>
  );
};

export default EngagementCard;