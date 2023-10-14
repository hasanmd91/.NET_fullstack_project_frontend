import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

type Omited = 'variant' | 'fullWidth' | 'margin';

const TextField: React.FC<Omit<TextFieldProps, Omited>> = (props) => {
  return (
    <MuiTextField variant="outlined" fullWidth margin="normal" {...props} />
  );
};

export default TextField;
