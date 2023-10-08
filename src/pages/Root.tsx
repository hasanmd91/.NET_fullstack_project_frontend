import React from 'react';
import ResponsiveAppBar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};

export default Root;
