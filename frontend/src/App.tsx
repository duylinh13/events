import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { getEvents, createEvent, updateEvent, deleteEvent, type Event } from './api/events';

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const fetchEvents = () => {
    getEvents()
      .then(res => setEvents(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpen = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setTitle(event.title);
      setDescription(event.description || '');
      setDate(event.date.slice(0, 10));
      setLocation(event.location || '');
    } else {
      setEditingEvent(null);
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const eventData = { title, description, date, location };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData)
        .then(() => {
          fetchEvents();
          handleClose();
        })
        .catch(console.error);
    } else {
      createEvent(eventData)
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
      <Typography variant="h4" gutterBottom>Event Management</Typography>
      <Button variant="contained" onClick={() => handleOpen()}>Add Event</Button>

      <Box mt={3}>
        {events.map(event => (
          <Box key={event.id} mb={2} p={2} border="1px solid #ccc" borderRadius={1}>
            <Typography variant="h6">{event.title}</Typography>
            <Typography>{event.description}</Typography>
            <Typography>Date: {new Date(event.date).toLocaleDateString()}</Typography>
            <Typography>Location: {event.location}</Typography>
            <Button size="small" onClick={() => handleOpen(event)}>Edit</Button>
            <Button size="small" color="error" onClick={() => handleDelete(event.id)}>Delete</Button>
          </Box>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="dense"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Location"
            fullWidth
            margin="dense"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">{editingEvent ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
