import React from 'react';
import { Modal as MuiModal, Fade, Box } from '@mui/material';

interface GenericModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<GenericModalProps> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <MuiModal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
