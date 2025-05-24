// components/TotalLeadsCard.tsx

import React from "react";
import { Users } from "lucide-react";

const TotalLeadsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between min-h-[120px]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">Total Leads</h3>
        <Users size={18} className="text-green-600" />
      </div>
      <p className="text-2xl font-bold text-green-700 mt-2">1,500</p>
      <span className="text-xs text-green-600 mt-1">+12% since last month</span>
    </div>
  );
};

export default TotalLeadsCard;
