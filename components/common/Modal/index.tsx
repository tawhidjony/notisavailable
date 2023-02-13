import { CloseOutlined } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import ModalProps from './propType';

const ThemeModal: React.FC<ModalProps> = ({
  open,
  handleClose,
  title = "Modal",
  children = (<Box></Box>),
  maxWidht = "xl"
}) => {

  return (
    <Dialog
      maxWidth={maxWidht}
      open={open}
    >
      <DialogTitle display={'flex'} alignItems="center" justifyContent={'space-between'}>
        {title}
        <span onClick={handleClose}>
          <CloseOutlined />
        </span>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default ThemeModal