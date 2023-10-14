import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        marginTop: '2rem',
        backgroundColor: '#0d2134',
        color: 'whitesmoke',
        padding: '16px',
      }}
    >
      <Grid container display={'flex'} justifyContent={'space-evenly'}>
        <Grid item xs={12} md={2}>
          <Typography variant="h5" gutterBottom>
            Opening Time
          </Typography>
          <Typography variant="body2" color={'lightgrey'}>
            SAT- THU : 11:00 AM - 8:00 PM
          </Typography>
          <Typography variant="body2" color={'lightgrey'}>
            Friday Closed
          </Typography>
          <Typography variant="body2" color={'lightgrey'}>
            We Work All The Holidays
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h5" gutterBottom>
            My Account
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            My Account
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            Wish List
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            Pre Order
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            Order Tracking
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            FAQs
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h5" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            Payment Policy
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            Shipping Policy
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            Exchange & Return
          </Typography>
          <Typography variant="body2" color={'lightgrey'} gutterBottom>
            Terms & Conditions
          </Typography>
        </Grid>
        <Grid md={12} item margin={'0 auto'}>
          <Box maxWidth={'500px'} margin={'5rem auto'}>
            <img
              src="/assets/card.png"
              alt=""
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
