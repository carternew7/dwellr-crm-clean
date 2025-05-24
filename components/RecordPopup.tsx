"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useUploadAudio } from "../lib/hooks/useUploadAudio";

export default function RecordPopup({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [status, setStatus] = useState("Idle");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { uploadAudio } = useUploadAudio();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([audioBlob], "recording.webm", { type: "audio/webm" });
        const path = `in-person/${Date.now()}-${file.name}`;

        setStatus("Uploading...");
        await uploadAudio(file, path);
        setStatus("Uploaded");

        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setStatus("Recording...");
    } catch (err) {
      console.error("Mic access error:", err);
      setStatus("Microphone access denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Record In-Person Con</DialogTitle>
                </DialogHeader>
                    {/* Add your dialog content here */}
              </DialogContent>
          </Dialog>
        );
      }
