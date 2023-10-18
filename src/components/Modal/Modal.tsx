import * as React from 'react';
import { Alert, Box, Modal as MuiModal } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  p: 4,
};

type ModalType = {
  children: React.ReactElement;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  error: string;
};

const Modal: React.FC<ModalType> = ({ children, open, handleClose, error }) => {
  return (
    <div>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: 'auto' }}
      >
        <Box sx={style}>
          {children}
          {error && <Alert>{error}</Alert>}
        </Box>
      </MuiModal>
    </div>
  );
};

export default Modal;
