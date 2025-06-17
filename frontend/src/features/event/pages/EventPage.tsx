import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EventIcon from '@mui/icons-material/Event';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/eventApi';
import type { Event } from '../types';
import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';

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
        date: event.date.slice(0, 9),
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
    <Box>
      <Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              color: '#388e3c',
            }}
          >
            <EventIcon sx={{ mr: 1 }} />
            Event Management
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => handleOpen()}
            sx={{
              bgcolor: '#388e3c',
              fontWeight: 'bold',
              px: 2.5,
              py: 1.2,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#2e7d32',
              },
            }}
          >
            Add Event
          </Button>
        </Box>

        <Box>
          <EventTable events={events} onEdit={handleOpen} onDelete={handleDelete} />
        </Box>
      </Paper>

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
    </Box>
  );
};

export default EventPage;
