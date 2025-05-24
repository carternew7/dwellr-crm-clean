'use client';

import React from 'react';

type LeadCardProps = {
  name: string;
  source: string;
  stage: string;
  status: string;
  lastActivity: string;
  nextAction: string;
  rep: string;
  phone: string;
  notes: string;
};

export function LeadCard({
  name,
  source,
  stage,
  status,
  lastActivity,
  nextAction,
  rep,
  phone,
  notes
}: LeadCardProps) {
  return (
    <div className="border p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-bold text-lg">{name}</h2>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">{status}</span>
      </div>

      {/* Metadata Row */}
      <div className="text-sm text-gray-500 flex justify-between items-center mb-2">
        <span>Source: {source}</span>
        <span>Stage: {stage}</span>
      </div>

      {/* Notes */}
      {notes && <p className="text-sm text-gray-700 mb-2">📝 {notes}</p>}

      {/* Footer Actions */}
      <div className="text-sm flex flex-col gap-1 text-gray-600">
        <div>📞 {phone}</div>
        <div>🕒 Last Activity: {lastActivity}</div>
        <div>✅ Next Action: {nextAction}</div>
        <div>👤 Rep: {rep}</div>
      </div>
    </div>
  );
}
