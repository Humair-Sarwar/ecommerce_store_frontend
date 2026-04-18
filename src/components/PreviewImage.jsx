import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Tooltip } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function PreviewImage({list}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Preview Image" arrow>
      <Box onClick={handleClickOpen}
                              sx={{
                                height: "40px",
                                width: "40px",
                                border: "1px solid #dddddd",
                                borderRadius: "5px",
                                overflow: "hidden",
                                cursor: 'pointer',

                              }}
                            >
                              <img
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                                src={
                                  list?.media
                                    ? `${import.meta.env.VITE_BASE_URL}/storage/${list.media.media_path}`
                                    : "/empty-image.jpg"
                                }
                                alt=""
                              />
                            </Box>
                            </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', fontSize: '14px' }} id="customized-dialog-title">
          <PhotoIcon sx={{mr: 1}}/> Preview Image 
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Box sx={{ width: '400px'}}>
            <img style={{width: '100%', height: '200px', objectFit: 'contain'}} src={
                                  list?.media
                                    ? `${import.meta.env.VITE_BASE_URL}/storage/${list.media.media_path}`
                                    : "/empty-image.jpg"
                                } alt="" />
        </Box>
        </DialogContent>
   
      </BootstrapDialog>
    </>
  );
}
