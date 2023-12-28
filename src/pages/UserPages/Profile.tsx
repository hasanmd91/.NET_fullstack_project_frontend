import React from 'react';
import UserDetails from './UserDetails';
import { Container, Grid } from '@mui/material';
import OrderList from './OrderReview';

const Profile = () => {
  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Grid container>
        <Grid item md={6} xs={12}>
          <UserDetails />
        </Grid>
        <Grid item md={6} xs={12}>
          <OrderList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
