'use client';

import Topbar from '../components/dashboard/Topbar';
import Sidebar from '../components/dashboard/Sidebar';
import FloatingCallControls from '../components/FloatingCallControls';

import TotalLeadsCard from '../components/dashboard/TotalLeadsCard';
import TotalRevenueCard from '../components/dashboard/TotalRevenueCard';
import ActiveLeadsCard from '../components/dashboard/ActiveLeadsCard';
import AppointmentsCard from '../components/dashboard/AppointmentsCard';
import CalendarBlockCard from '../components/dashboard/CalendarBlockCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import SalesPipelineCard from '../components/dashboard/SalesPipelineCard';
import SmartSuggestionsCard from '../components/dashboard/SmartSuggestionsCard';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

<main className="grid grid-cols-4 grid-rows-2 gap-4 px-4 py-2 pt-[72px] pl-[240px] h-[calc(100vh-64px)]">

          <TotalLeadsCard />
          <TotalRevenueCard />
          <ActiveLeadsCard />
          <AppointmentsCard />
          <CalendarBlockCard />
          <RecentActivityCard />
          <SalesPipelineCard />
          <SmartSuggestionsCard />
        </main>

        <FloatingCallControls />
      </div>
    </div>
  );
}
