// components/ActivityLog.tsx

import React from "react";
import { CheckCircle, Upload, Mail, CalendarCheck } from "lucide-react";

const logs = [
  { icon: <CheckCircle size={16} className="text-green-600" />, text: "Called Jane – 1 hour ago" },
  { icon: <Upload size={16} className="text-blue-500" />, text: "Uploaded driver's license for Mark" },
  { icon: <Mail size={16} className="text-gray-500" />, text: "Sent follow-up to lead #202" },
  { icon: <CalendarCheck size={16} className="text-indigo-500" />, text: "Scheduled on-site tour" },
];

const ActivityLog: React.FC = () => {
  return (
    <div className="h-[120px] overflow-y-auto pr-2">
      <h3 className="text-sm font-medium text-gray-600 mb-2">Last CRM Actions</h3>
      <ul className="space-y-1 text-sm">
        {logs.map((log, index) => (
          <li key={index} className="flex items-center space-x-2">
            {log.icon}
            <span className="text-gray-700">{log.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
