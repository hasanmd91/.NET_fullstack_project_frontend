import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from '../components/Navbar/Navbar';
import { Box } from '@mui/material';

const Root: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={'space-between'}
      minHeight={'100vh'}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Root;
