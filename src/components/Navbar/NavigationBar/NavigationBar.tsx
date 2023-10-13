import React from 'react';
import { Box, Button } from '@mui/material';
import Link from '../../Link/Link';

const pages = [
  { page: 'Home', route: '' },
  { page: 'Products', route: '/products' },
  { page: 'About', route: '/about' },
];
const NavigationBar = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page, index) => (
        <Link to={page.route} key={`${page}-${index}`}>
          <Button
            key={index}
            sx={{
              my: 2,
              color: 'white',
              display: 'block',
              margin: 'auto',
            }}
          >
            {page.page}
          </Button>
        </Link>
      ))}
    </Box>
  );
};

export default NavigationBar;
