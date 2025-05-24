// app/calendar/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogContent, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : '';

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/calendar-events', {
          headers: { 'x-user-id': userId || '' },
        });
        const data = await res.json();
        const mapped = data.map((e: any) => ({
          ...e,
          title: `${e.type === 'reminder' ? '🔔' : '📅'} ${e.title}`,
          start: new Date(e.start || e.created_at),
          end: new Date(e.end || new Date(e.created_at).getTime() + 30 * 60 * 1000),
        }));
        setEvents(mapped);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchEvents();
  }, [userId]);

  const handleEventResize = async ({ event, start, end }: any) => {
    const updated = { ...event, start, end };
    setEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)));
    await fetch(`/api/calendar-events/${event.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-user-id': userId || '' },
      body: JSON.stringify({ start, end })
    });
  };

  const handleEventDrop = async ({ event, start, end }: any) => {
    const updated = { ...event, start, end };
    setEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)));
    await fetch(`/api/calendar-events/${event.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-user-id': userId || '' },
      body: JSON.stringify({ start, end })
    });
  };

  const handleSelectEvent = (event: any) => {
    setEditingEvent(event);
  };

  const handleSaveEdit = async () => {
  if (!editingEvent) return;
  const method = editingEvent.id ? 'PATCH' : 'POST';
  const url = editingEvent.id ? `/api/calendar-events/${editingEvent.id}` : '/api/calendar-events';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'x-user-id': userId || '' },
    body: JSON.stringify(editingEvent),
  });
  const updated = await res.json();
  const decoratedTitle = `${updated.type === 'reminder' ? '🔔' : '📅'} ${updated.title}`;

  if (method === 'POST') {
    setEvents((prev) => [...prev, { ...updated, title: decoratedTitle, start: new Date(updated.start), end: new Date(updated.end) }]);
  } else {
    setEvents((prev) => prev.map(e => e.id === updated.id ? { ...updated, title: decoratedTitle, start: new Date(updated.start), end: new Date(updated.end) } : e));
  }
  setEditingEvent(null);
};

  const eventStyleGetter = (event: any) => {
    const bgColor = event.type === 'reminder' ? '#FEF3C7' : '#DCFCE7';
    const borderColor = event.type === 'reminder' ? '#FACC15' : '#22C55E';
    return {
      style: {
        backgroundColor: bgColor,
        borderLeft: `4px solid ${borderColor}`,
        color: '#1F2937',
        paddingLeft: '6px'
      }
    };
  };

  const handleSelectSlot = async ({ start, end }: any) => {
    try {
      const res = await fetch('/api/assistant/suggest-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId || ''
        },
        body: JSON.stringify({ start, end })
      });
      const data = await res.json();
      const aiSuggestedTitle = data?.title || '';
      setEditingEvent({
        title: aiSuggestedTitle,
        start,
        end,
        type: 'appointment',
        notes: '',
        lead_id: ''
      });
    } catch (err) {
      console.error('Failed to suggest title:', err);
      setEditingEvent({
        title: '',
        start,
        end,
        type: 'appointment',
        notes: '',
        lead_id: ''
      });
    }
  };

const components = {
  event: ({ event }: any) => (
    <span title={event.notes || ''}>{event.title}</span>
  )
};

return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">📆 Interactive Calendar</h1>
      {loading ? (
        <div className="text-center text-muted-foreground">Loading events...</div>
      ) : (
        <>
          <BigCalendar
            selectable
            onSelectSlot={handleSelectSlot}
            components={components}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '80vh', backgroundColor: 'white', borderRadius: '12px', padding: '1rem' }}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            defaultView={Views.WEEK}
            step={15}
            timeslots={4}
            // onEventDrop={handleEventDrop} // Removed because it's not a valid prop for BigCalendar
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
          />

          <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
            <DialogContent className="p-6">
  <h3 className="text-lg font-semibold mb-2 text-green-700">{editingEvent?.id ? 'Edit Event' : 'Create Event'}</h3>
  <Input
    className="mb-2"
    placeholder="Event Title"
    value={editingEvent?.title?.replace(/^🔔 |^📅 /, '') || ''}
    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
  />
  <Input
    className="mb-2"
    placeholder="Lead ID (optional)"
    value={editingEvent?.lead_id || ''}
    onChange={(e) => setEditingEvent({ ...editingEvent, lead_id: e.target.value })}
  />
  <div className="flex items-center gap-4 mb-4">
    <label className="flex items-center gap-1">
      <input
        type="radio"
        value="appointment"
        checked={editingEvent?.type === 'appointment'}
        onChange={() => setEditingEvent({ ...editingEvent, type: 'appointment' })}
      /> Appointment
    </label>
    <label className="flex items-center gap-1">
      <input
        type="radio"
        value="reminder"
        checked={editingEvent?.type === 'reminder'}
        onChange={() => setEditingEvent({ ...editingEvent, type: 'reminder' })}
      /> Reminder
    </label>
  </div>
  <div className="flex justify-end gap-2">
    {editingEvent?.id && (
      <Button variant="outline" onClick={async () => {
        await fetch(`/api/calendar-events/${editingEvent.id}`, {
          method: 'DELETE',
          headers: { 'x-user-id': userId || '' }
        });
        setEvents((prev) => prev.filter(e => e.id !== editingEvent.id));
        setEditingEvent(null);
      }}>
        Delete
      </Button>
    )}
    <Button variant="outline" onClick={() => setEditingEvent(null)}>Cancel</Button>
    <Button onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700 text-white">Save</Button>
  </div>
</DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
