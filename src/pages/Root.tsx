import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from '../components/Navbar/Navbar';

const Root: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Root;
