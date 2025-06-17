import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Stack,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

// Component mỗi hàng input
const InputRow = ({
  icon,
  label,
  type = 'text',
  value,
  onChange,
}: {
  icon: React.ReactElement;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Stack direction="row" spacing={2} alignItems="flex-start" my={2}>
    <Box sx={{ mt: 2, color: 'primary.main' }}>{icon}</Box>
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      margin="dense"
      slotProps={{
        inputLabel: type === 'date' ? { shrink: true } : undefined,
      }}
      sx={{
        '& input': {
          pt: type === 'date' ? 1.5 : 2,
          pb: type === 'date' ? 1.5 : 1,
        },
        '& label': {
          zIndex: 1,
          background: 'white',
          px: 0.5,
          ml: 0.5,
        },
      }}
    />
  </Stack>
);

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          bgcolor: '#26a69a', // teal nhẹ
          color: 'white',

          px: 3,
          fontSize: '1.25rem',
        }}
      >
        {isEditing ? 'Edit Event' : 'Add New Event'}
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 3 }}>
        <InputRow
          icon={<EventIcon />}
          label="Title"
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
        />
        <InputRow
          icon={<DescriptionIcon />}
          label="Description"
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
        />
        <InputRow
          icon={<CalendarTodayIcon />}
          label="Date"
          type="date"
          value={date}
          onChange={(e) => onChange('date', e.target.value)}
        />
        <InputRow
          icon={<LocationOnIcon />}
          label="Location"
          value={location}
          onChange={(e) => onChange('location', e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#26a69a',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              bgcolor: '#1e8887',
            },
          }}
          onClick={onSave}
        >
          {isEditing ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventForm;
