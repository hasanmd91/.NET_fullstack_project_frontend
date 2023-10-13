import * as React from 'react';
import { Alert, Box, Button, Modal as MuiModal } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
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

const Modal: React.FC<ModalType> = ({
  children,
  open,
  handleClose,
  handleOpen,
  error,
}) => {
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
