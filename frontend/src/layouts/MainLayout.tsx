import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <Box>
      <Box sx={{ flex: 1, px: 2, py: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
