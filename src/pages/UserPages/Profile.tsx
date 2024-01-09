import React, { useState } from 'react';
import UserDetails from './UserDetails';
import OrderList from './OrderList';
import { Container, Grid, Box } from '@mui/material';
import { shades } from '../../Theme';
import Button from '../../components/Button/Button';

const Profile: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('orderList');

  const handleButtonClick = (component: string) => {
    setActiveComponent(component);
  };

  const renderActiveComponent = () => {
    if (activeComponent === 'userDetails') {
      return <UserDetails />;
    } else if (activeComponent === 'orderList') {
      return <OrderList />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Grid container>
        <Grid item md={2} xs={12}>
          <Box
            sx={{
              marginTop: '1px',
              backgroundColor: shades.primary[500],
              padding: '20px',
              height: '100%',
            }}
          >
            <Button fullWidth onClick={() => handleButtonClick('orderList')}>
              Orders
            </Button>
            <Button fullWidth onClick={() => handleButtonClick('userDetails')}>
              My Profile
            </Button>
          </Box>
        </Grid>
        <Grid item md={10} xs={12}>
          {renderActiveComponent()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
