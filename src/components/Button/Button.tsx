import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { shades } from '../../Theme';

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
        marginTop: '8px',
        marginBottom: '8px',
        background: shades.primary[400],
        '&:hover': shades.secondary[500],
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
