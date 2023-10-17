import { Box } from '@mui/material';
import React from 'react';
import Button from '../Button/Button';

type AdminSideBarPropsType = {
  handleOpen: () => void;
};

const AdminSideBar: React.FC<AdminSideBarPropsType> = ({ handleOpen }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#0d2134',
        padding: '2px',
        height: ' 100%',
      }}
    >
      <Button fullWidth onClick={handleOpen}>
        Add Product
      </Button>

      <Button fullWidth>Users</Button>
    </Box>
  );
};

export default AdminSideBar;
