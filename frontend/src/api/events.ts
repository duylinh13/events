import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  location?: string;
  createdAt: string;
}

export const getEvents = () => axios.get<Event[]>(`${API_URL}/events`);

export const createEvent = (data: Omit<Event, 'id' | 'createdAt'>) =>
  axios.post<Event>(`${API_URL}/events`, data);

export const updateEvent = (id: number, data: Omit<Event, 'id' | 'createdAt'>) =>
  axios.put<Event>(`${API_URL}/events/${id}`, data);

export const deleteEvent = (id: number) => axios.delete(`${API_URL}/events/${id}`);
