// lib/pollTranscript.ts
export async function pollTranscript(id: string, onUpdate: (status: string, text?: string) => void) {
  let done = false;

  while (!done) {
    const res = await fetch(`/api/transcript-status?id=${id}`);
    const data = await res.json();

    if (data.status === 'completed') {
      onUpdate('completed', data.text);
      done = true;
    } else if (data.status === 'error') {
      onUpdate('error');
      done = true;
    } else {
      onUpdate(data.status);
      await new Promise(r => setTimeout(r, 4000)); // wait 4s before retry
    }
  }
}
