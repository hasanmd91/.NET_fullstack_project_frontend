import { Box } from '@mui/material';
import React from 'react';
import Button from '../Button/Button';
import { shades } from '../../Theme';
import Link from '../Link/Link';

type AdminSideBarPropsType = {};

const AdminSideBar: React.FC<AdminSideBarPropsType> = () => {
  return (
    <Box
      sx={{
        backgroundColor: shades.primary[500],
        padding: '20px',
        minHeight: '70vh',
      }}
    >
      <Link to={'/admidashbord/allCategory'}>
        <Button fullWidth> Categories</Button>
      </Link>
      <Link to={'/admidashbord/allproduct'}>
        <Button fullWidth> ProductS</Button>
      </Link>

      <Link to={'/admidashbord/allOrders'}>
        <Button fullWidth>OrderS</Button>
      </Link>

      <Link to={'/admidashbord/allUserList'}>
        <Button fullWidth>UserS </Button>
      </Link>
    </Box>
  );
};

export default AdminSideBar;
