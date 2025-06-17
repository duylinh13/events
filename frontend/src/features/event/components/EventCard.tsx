import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import type { Event } from '../types';

interface Props {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventCard: React.FC<Props> = ({ event, onEdit, onDelete }) => {
  return (
    <Box key={event.id} mb={2} p={2} border="1px solid #ccc" borderRadius={1}>
      <Typography variant="h6">{event.title}</Typography>
      <Typography>{event.description}</Typography>
      <Typography>Date: {new Date(event.date).toLocaleDateString()}</Typography>
      <Typography>Location: {event.location}</Typography>
      <Button size="small" onClick={() => onEdit(event)}>
        Edit
      </Button>
      <Button size="small" color="error" onClick={() => onDelete(event.id)}>
        Delete
      </Button>
    </Box>
  );
};

export default EventCard;
