import { Alert, AlertProps } from '@mui/material';
import React, { useState, useEffect } from 'react';

type Infotype = {
  text: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
} & AlertProps;

const Info: React.FC<Infotype> = ({ text, severity = 'success', ...rest }) => {
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    if (showInfo) {
      const timeoutId = setTimeout(() => {
        setShowInfo(false);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showInfo]);

  return (
    <React.Fragment>
      {showInfo && (
        <Alert {...rest} severity={severity}>
          {text}
        </Alert>
      )}
    </React.Fragment>
  );
};

export default Info;
