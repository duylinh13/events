import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import EventPage from '../features/event/pages/EventPage';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
