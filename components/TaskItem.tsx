'use client';

import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface TaskItemProps {
  task: string;
  completed: boolean;
}

const TaskItem = ({ task, completed }: TaskItemProps) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border hover:shadow-sm transition-all bg-white">
      <div>
        {completed ? (
          <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
        ) : (
          <Circle className="text-gray-400 w-5 h-5 mt-1" />
        )}
      </div>
      <div>
        <p
          className={`text-sm ${
            completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {task}
        </p>
      </div>
    </div>
  );
};

export default TaskItem;
