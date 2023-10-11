import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface CenteredContainerProps {
  children: ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => (
  <Box
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    {children}
  </Box>
);

export default CenteredContainer;
