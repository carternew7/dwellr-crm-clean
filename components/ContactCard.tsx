// components/ContactCard.tsx
import React from "react";
import { PhoneCall, Mail, User } from "lucide-react";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  notes?: string;
}

interface ContactCardProps {
  lead: Lead;
}

const ContactCard: React.FC<ContactCardProps> = ({ lead }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
      <div className="flex items-center space-x-3">
        <User className="text-green-600" />
        <h2 className="text-lg font-semibold">{lead.name}</h2>
      </div>
      <p className="text-sm text-gray-500">{lead.notes}</p>
      <div className="flex items-center space-x-3 text-sm mt-2 text-gray-700">
        <PhoneCall size={16} />
        <a href={`tel:${lead.phone}`}>{lead.phone}</a>
      </div>
      <div className="flex items-center space-x-3 text-sm text-gray-700">
        <Mail size={16} />
        <a href={`mailto:${lead.email}`}>{lead.email}</a>
      </div>
      <div className="mt-2 text-xs inline-block px-2 py-1 rounded-full bg-green-100 text-green-800">
        {lead.status}
      </div>
    </div>
  );
};

export default ContactCard;
