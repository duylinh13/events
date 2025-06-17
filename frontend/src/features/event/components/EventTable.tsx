import React, { useState, useMemo } from 'react';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip, Typography, TextField, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Event } from '../types';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Component highlight search
const HighlightedText: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ backgroundColor: '#ffeb3b' }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};

const isUpcomingEvent = (eventDateStr: string) => {
  const eventDate = dayjs(eventDateStr);
  const now = dayjs();
  return eventDate.isSameOrAfter(now, 'day') && eventDate.diff(now, 'day') <= 3;
};

interface Props {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventTable: React.FC<Props> = ({ events, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const query = searchQuery.toLowerCase();
      const eventDate = dayjs(event.date);

      if (!event.date || !eventDate.isValid()) return false;

      const matchesSearch =
        event.title.toLowerCase().includes(query) ||
        (event.description?.toLowerCase().includes(query) ?? false) ||
        (event.location?.toLowerCase().includes(query) ?? false) ||
        eventDate.format('DD/MM/YYYY').includes(query);

      const withinDateRange =
        (!startDate || (startDate && eventDate.isSameOrAfter(startDate, 'day'))) &&
        (!endDate || (endDate && eventDate.isSameOrBefore(endDate, 'day')));

      return matchesSearch && withinDateRange;
    });
  }, [events, searchQuery, startDate, endDate]);

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Typography variant="body2" sx={{ width: '100%' }}>
            <HighlightedText text={params.value ?? ''} query={searchQuery} />
          </Typography>
        </Box>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Typography variant="body2" sx={{ width: '100%' }}>
            <HighlightedText text={params.value ?? ''} query={searchQuery} />
          </Typography>
        </Box>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => {
        const formattedDate = dayjs(params.value).format('DD/MM/YYYY');
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
            <Typography variant="body2" sx={{ width: '100%' }}>
              <HighlightedText text={formattedDate} query={searchQuery} />
            </Typography>
          </Box>
        );
      },
    },

    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Typography variant="body2" sx={{ width: '100%' }}>
            <HighlightedText text={params.value ?? ''} query={searchQuery} />
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(params.row)}>
              <EditIcon sx={{ color: '#FFA726' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(params.row.id)}>
              <DeleteIcon sx={{ color: '#EF5350' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          slotProps={{ textField: { size: 'small' } }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          slotProps={{ textField: { size: 'small' } }}
        />
      </Stack>

      <Box sx={{ height: 'calc(100vh - 240px)', width: '100%' }}>
        <DataGrid
          rows={filteredEvents}
          columns={columns}
          pagination
          autoPageSize
          getRowClassName={(params) =>
            isUpcomingEvent(params.row.date) ? 'upcoming-event-row' : ''
          }
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'nowrap',
            },
            // Optional: custom highlight styling
            '& .upcoming-event-row': {
              backgroundColor: '#FFF8E1', // vàng nhạt
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default EventTable;
