import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';

type CenteredContainerProps = {
  children: ReactNode;
} & BoxProps;

const CenteredContainer: React.FC<CenteredContainerProps> = ({
  children,
  ...rest
}) => (
  <Box
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      marginTop: '16px',
    }}
    {...rest}
  >
    {children}
  </Box>
);

export default CenteredContainer;
