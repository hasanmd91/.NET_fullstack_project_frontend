import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Button>
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '1rem',
        }}
      >
        <Typography
          fontFamily="cursive"
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          IL
          <span
            style={{
              color: '#d93226',
              fontWeight: 900,
              fontSize: '35px',
            }}
          >
            H
          </span>
        </Typography>
      </Link>
    </Button>
  );
};

export default Logo;
