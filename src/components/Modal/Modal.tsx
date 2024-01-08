import React from 'react';
import { Modal as MuiModal, Fade, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface GenericModalProps {
  isModalOpen?: boolean;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<GenericModalProps> = ({
  open,
  handleClose,
  children,
  isModalOpen,
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
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
            }}
          >
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
