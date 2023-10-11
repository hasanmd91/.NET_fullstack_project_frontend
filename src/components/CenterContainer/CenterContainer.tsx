import { Box, BoxProps } from '@mui/material';
import React, { ReactNode } from 'react';

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
      height: '100vh',
    }}
    {...rest}
  >
    {children}
  </Box>
);

export default CenteredContainer;
