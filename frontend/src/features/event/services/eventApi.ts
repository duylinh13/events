// src/features/event/services/eventApi.ts
import axios from 'axios';
import type { Event, EventPayload } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getEvents = () => axios.get<Event[]>(`${API_URL}/events`);
export const createEvent = (data: EventPayload) => axios.post<Event>(`${API_URL}/events`, data);
export const updateEvent = (id: number, data: EventPayload) =>
  axios.put<Event>(`${API_URL}/events/${id}`, data);
export const deleteEvent = (id: number) => axios.delete(`${API_URL}/events/${id}`);
