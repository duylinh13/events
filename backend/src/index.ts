import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API CRUD cho Event

// Lấy danh sách event
app.get('/events', async (req, res) => {
  const events = await prisma.event.findMany();
  res.json(events);
});

// Tạo event mới
app.post('/events', async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Cập nhật event theo id
app.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;
  try {
    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        date: new Date(date),
        location,
      },
    });
    res.json(event);
  } catch (error) {
    res.status(404).json({ error: 'Event not found or invalid data' });
  }
});

// Xóa event theo id
app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Event not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
