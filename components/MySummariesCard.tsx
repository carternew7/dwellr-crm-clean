// components/cards/MySummariesCard.tsx
"use client";

import { useEffect, useState } from "react";
// Update the import path if the card components are located elsewhere, for example:
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
// import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../components/ui/button";
import { FileText } from "lucide-react";

interface Summary {
  id: string;
  summary: string;
  source_type: string; // call | sms | record
  created_at: string;
  lead_id?: string;
  transcript?: string;
}

export default function MySummariesCard() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [selected, setSelected] = useState<Summary | null>(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      const res = await fetch("/api/summaries");
      const data = await res.json();
      setSummaries(data);
    };
    fetchSummaries();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-green-600" /> My Summaries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56 pr-2 overflow-y-auto">
          <ul className="space-y-2 text-sm">
            {summaries.map((s) => (
              <li key={s.id}>
                <Button
                  variant="ghost"
                  className="w-full text-left px-2 py-1 hover:bg-gray-100"
                  onClick={() => setSelected(s)}
                >
                  <span className="font-medium capitalize">{s.source_type}</span> · {new Date(s.created_at).toLocaleString()}
                </Button>
              </li>
            ))}
            {summaries.length === 0 && <p className="text-muted-foreground">No summaries yet.</p>}
          </ul>
        </div>
      </CardContent>

      {selected && (
        <Dialog open onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Summary Details</DialogTitle>
            </DialogHeader>
            <div className="text-sm space-y-2">
              <p><strong>Summary:</strong> {selected.summary}</p>
              <p><strong>Transcript:</strong></p>
              <div className="bg-gray-50 border p-2 rounded whitespace-pre-wrap">
                {selected.transcript || "(No transcript available)"}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
