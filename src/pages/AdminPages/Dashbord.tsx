import React from 'react';
import { Container } from '@mui/material';
import AdminProductList from './ProductList';

const AdminDashbord = () => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: '1rem' }}>
      <AdminProductList />
    </Container>
  );
};

export default AdminDashbord;
