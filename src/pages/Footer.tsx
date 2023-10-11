import { Box, Typography } from '@mui/material';
import React from 'react';

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Box>
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
        </Box>
        <Box>
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
        </Box>
        <Box>
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
        </Box>
      </Box>

      <Box
        marginTop={'5rem'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant="body2" color={'lightgrey'} gutterBottom>
          WE ACCEPT
        </Typography>

        <Box maxWidth={'500px'}>
          <img
            src="/assets/card.png"
            alt=""
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
