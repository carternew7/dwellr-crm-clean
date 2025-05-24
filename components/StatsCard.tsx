'use client';

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-xl px-5 py-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-green-600" />}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
};

export default StatsCard;

