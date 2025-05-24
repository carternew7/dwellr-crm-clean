'use client';
import { Card, CardContent } from '../../components/ui/card';
const stages = {
  'Proposal': [{ title: 'Lead #1094', amount: '$55,000' }],
  'Hot': [{ title: 'Landowner A', amount: '$89,000' }],
  'In the Works': [{ title: 'Mobile Park Deal', amount: '$125,000' }],
  'Closed': [{ title: 'Sale #9883', amount: '$134,500' }],
};

export default function DealsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(stages).map(([stage, cards], i) => (
          <div key={i}>
            <h2 className="text-sm font-semibold text-gray-500 mb-2">{stage}</h2>
            <div className="space-y-2">
              {cards.map((deal, j) => (
                <div key={j} className="shadow border-l-4 border-green-500">
                  <Card>
                    <CardContent>
                      <div className="p-4">
                        <p className="font-semibold">{deal.title}</p>
                        <p className="text-sm text-gray-500">{deal.amount}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
