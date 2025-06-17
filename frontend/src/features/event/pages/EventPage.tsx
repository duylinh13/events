import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/eventApi';
import type { Event } from '../types';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  const fetchEvents = () => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpen = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description || '',
        date: event.date.slice(0, 10),
        location: event.location || '',
      });
    } else {
      setEditingEvent(null);
      setFormData({ title: '', description: '', date: '', location: '' });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const data = { ...formData };
    if (editingEvent) {
      updateEvent(editingEvent.id, data)
        .then(() => {
          fetchEvents();
          handleClose();
        })
        .catch(console.error);
    } else {
      createEvent(data)
        .then(() => {
          fetchEvents();
          handleClose();
        })
        .catch(console.error);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this event?')) {
      deleteEvent(id)
        .then(() => fetchEvents())
        .catch(console.error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Event Management
      </Typography>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add Event
      </Button>
      <Box mt={3}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onEdit={handleOpen} onDelete={handleDelete} />
        ))}
      </Box>
      <EventForm
        open={open}
        title={formData.title}
        description={formData.description}
        date={formData.date}
        location={formData.location}
        isEditing={!!editingEvent}
        onClose={handleClose}
        onChange={handleChange}
        onSave={handleSave}
      />
    </Container>
  );
};

export default EventPage;
