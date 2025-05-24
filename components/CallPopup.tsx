// components/CallPopup.tsx
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface Lead {
  id: string;
  name: string;
  phone: string;
}

export default function CallPopup({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const [status, setStatus] = useState("Idle");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data);
    };
    fetchLeads();
  }, []);

  const initiateCall = async () => {
    if (!selected?.phone) return;
    setStatus("Calling...");
    try {
      const res = await fetch("/api/make-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: selected.phone })
      });
      const data = await res.json();
      setStatus(data.result || "Call placed.");
    } catch (err) {
      console.error("Call error:", err);
      setStatus("Call failed.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Call a Lead</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <label className="block text-sm font-medium">Select Lead</label>
          <select
            className="w-full border rounded px-2 py-1"
            onChange={(e) => {
              const lead = leads.find((l) => l.id === e.target.value);
              setSelected(lead || null);
            }}
          >
            <option value="">-- Select a Lead --</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name} ({lead.phone})
              </option>
            ))}
          </select>

          <Button onClick={initiateCall} disabled={!selected}>
            {status === "Idle" ? "Call Now" : status}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
