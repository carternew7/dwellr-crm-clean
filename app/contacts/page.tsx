'use client';
// Update the import path below to the correct relative path if needed
// Update the import path below to the correct relative path if needed
import { Card, CardContent } from '../../components/ui/card';

const contacts = [
  { name: 'Eric Gordon', phone: '555-1928', email: 'eric@leadmail.com', status: 'Hot' },
  { name: 'Makayla Jones', phone: '555-9090', email: 'makayla@buyerx.com', status: 'In the Works' },
  { name: 'Brian Chen', phone: '555-3345', email: 'brian@followup.ai', status: 'Follow Up Needed' },
];

const statusColors: any = {
  'Hot': 'bg-red-500 text-white',
  'In the Works': 'bg-yellow-400 text-black',
  'Follow Up Needed': 'bg-blue-500 text-white',
};

export default function ContactsPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Contacts</h1>
      {contacts.map((contact, i) => (
        <Card key={i}>
          <CardContent className="p-4 space-y-1 shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{contact.name}</h2>
                <p className="text-sm text-gray-500">{contact.email}</p>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[contact.status]}`}>
                {contact.status}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
