'use client';

import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card, CardContent } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
// Update the import path below if Checkbox is located elsewhere
import { Checkbox } from '../../components/ui/checkbox';
// If the above import fails, try the following (uncomment the correct one):
// import { Checkbox } from '../../components/ui/checkbox';

const mockTasks = [
  { id: 1, label: 'Follow up with John D.', status: 'due-today' },
  { id: 2, label: 'Send thank you letter to new client', status: 'completed' },
  { id: 3, label: 'Schedule home walkthrough - Nancy', status: 'overdue' },
  { id: 4, label: 'Email new lead - Chris G.', status: 'due-today' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, status: task.status === 'completed' ? 'due-today' : 'completed' } : task
    ));
  };

  const filteredTasks = (filter: string) =>
    tasks.filter(task =>
      filter === 'all' ? true : task.status === filter
    );

  return (
    <Card className="m-4">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Tasks</h2>
      </div>
      <CardContent>
        <Tabs defaultValue="due-today">
          <TabsList className="mb-4">
            <TabsTrigger value="due-today">Due Today</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {['due-today', 'overdue', 'completed'].map(status => (
            <TabsContent key={status} value={status}>
              <ul className="space-y-2">
                {filteredTasks(status).map(task => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <span>{task.label}</span>
                    <Checkbox checked={task.status === 'completed'} onCheckedChange={() => toggleTask(task.id)} />
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
