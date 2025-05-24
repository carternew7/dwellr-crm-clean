'use client';

import React from "react";
import { AlertTriangle, Clock } from "lucide-react";

interface Task {
  id: number;
  title: string;
  due: string;
}

const tasks: Task[] = [
  { id: 1, title: "Follow-up call: Jane Doe", due: "Today 3PM" },
  { id: 2, title: "Send quote: Brian Smith", due: "Tomorrow 10AM" },
  { id: 3, title: "Review docs: Oak Valley Project", due: "Friday 1PM" },
];

const UrgentTasks: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-red-600">
          <AlertTriangle className="w-4 h-4" />
          Urgent Action Needed
        </h2>
        <span className="text-xs text-gray-400">{tasks.length} tasks</span>
      </div>

      {/* Tasks List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-white rounded-md p-3 border border-gray-100 hover:border-green-200 hover:bg-green-50 transition"
          >
            <span className="text-sm font-medium text-gray-800">{task.title}</span>
            <span className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
              <Clock className="w-3 h-3 text-gray-400" />
              {task.due}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrgentTasks;
