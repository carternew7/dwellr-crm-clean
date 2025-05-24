// lib/dummyData.ts
import { Lead } from "../components/ContactCard";

export const detailedDummyLeads: Lead[] = [
  {
    id: "1",
    name: "Jane Doe",
    phone: "859-555-1234",
    email: "jane@example.com",
    status: "Hot",
    notes: "Looking for 3 bed, land-owned.",
  },
  {
    id: "2",
    name: "Brian Smith",
    phone: "606-555-9876",
    email: "brian@outlook.com",
    status: "In the Works",
    notes: "Waiting on credit pre-approval.",
  },
  {
    id: "3",
    name: "Lisa Thompson",
    phone: "502-555-4321",
    email: "lisa@gmail.com",
    status: "Fresh",
    notes: "Found us on Facebook.",
  },
];
// lib/dummyData.ts

// 📝 Tasks
export const dummyTasks = [
  { id: 1, label: 'Follow up with John D.', status: 'due-today' },
  { id: 2, label: 'Send thank you letter to new client', status: 'completed' },
  { id: 3, label: 'Schedule home walkthrough - Nancy', status: 'overdue' },
  { id: 4, label: 'Email new lead - Chris G.', status: 'due-today' },
];

// 📞 Notifications
export const dummyNotifications = [
  { id: 1, type: 'Missed Call', message: 'You missed a call from Brian J.' },
  { id: 2, type: 'New Message', message: 'Makayla M. sent a new lead update.' },
];

// 👤 Leads
export const dummyLeads = [
  { id: 1, name: 'John D.', status: 'Fresh', phone: '+1-859-123-4567' },
  { id: 2, name: 'Nancy W.', status: 'Hot', phone: '+1-859-987-6543' },
  { id: 3, name: 'Chris G.', status: 'In the Works', phone: '+1-606-555-1212' },
];

// 📊 Reports
export const dummyReports = [
  { name: 'Jan', leads: 20, closed: 4 },
  { name: 'Feb', leads: 25, closed: 7 },
  { name: 'Mar', leads: 30, closed: 10 },
  { name: 'Apr', leads: 40, closed: 14 },
  { name: 'May', leads: 32, closed: 9 },
];
