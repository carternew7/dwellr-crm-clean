// components/SMSPopup.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

export default function SMSPopup({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const sendMessage = async () => {
    setLoading(true);
    setResult("");
    const res = await fetch("/api/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, message }),
    });
    const data = await res.json();
    setResult(data.result || "Sent!");
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send SMS</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
            rows={4}
          />
          <Button onClick={sendMessage} disabled={loading || !phone || !message}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
          {result && <div className="text-sm text-green-600 pt-1">{result}</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
