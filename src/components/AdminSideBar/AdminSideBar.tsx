import { Box } from '@mui/material';
import React from 'react';
import Button from '../Button/Button';
import Link from '../Link/Link';

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

      <Link to="/admidashbord/users">
        <Button fullWidth>Users</Button>
      </Link>
    </Box>
  );
};

export default AdminSideBar;
