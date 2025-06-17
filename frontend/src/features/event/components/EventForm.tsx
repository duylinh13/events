import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

interface Props {
  open: boolean;
  title: string;
  description: string;
  date: string;
  location: string;
  isEditing: boolean;
  onClose: () => void;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
}

const EventForm: React.FC<Props> = ({
  open,
  title,
  description,
  date,
  location,
  isEditing,
  onClose,
  onChange,
  onSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditing ? 'Edit Event' : 'Add Event'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="dense"
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="dense"
          value={date}
          onChange={(e) => onChange('date', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Location"
          fullWidth
          margin="dense"
          value={location}
          onChange={(e) => onChange('location', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">
          {isEditing ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventForm;
