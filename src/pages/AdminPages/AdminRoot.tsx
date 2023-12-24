import React from 'react';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';
import { Outlet } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

const AdminRoot = () => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: '1rem' }}>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <AdminSideBar />
        </Grid>
        <Grid item md={10} xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminRoot;
