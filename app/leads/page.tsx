'use client';

import { useState, useEffect } from 'react';
import Topbar from '../../components/dashboard/Topbar';
import Sidebar from '../../components/dashboard/Sidebar';
import { AssistantPopup } from '../../components/AssistantPopup';
import FloatingCallControls from '../../components/FloatingCallControls';
import { LeadCard } from '../../components/LeadCard';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading leads:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <AssistantPopup userId="example-user-id" />
        <FloatingCallControls />

        <main className="mt-[56px] p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Leads</h1>
            <input
              type="text"
              placeholder="Search leads..."
              className="border border-gray-300 px-3 py-2 rounded-md w-full max-w-sm"
            />
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading leads...</p>
          ) : leads.length === 0 ? (
            <p className="text-sm text-gray-500">No leads found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  name={lead.name}
                  source={lead.source}
                  stage={lead.stage}
                  status={lead.status}
                  phone={lead.phone}
                  notes={lead.notes}
                  lastActivity={lead.last_activity}
                  nextAction={lead.next_action}
                  rep={lead.rep}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
