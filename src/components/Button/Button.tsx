import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

type ButtonType = {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: 'default' | 'primary' | 'secondary';
  sx?: object;
} & ButtonProps;

const Button: React.FC<ButtonType> = ({
  type = 'submit',
  children,
  variant = 'contained',
  size = 'medium',
  sx = {},
  ...rest
}) => {
  return (
    <MuiButton
      type={type}
      variant="contained"
      size="large"
      sx={{
        marginTop: '16px',
        background: '#0d2134',
        '&:hover': { background: '#d93226' },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
