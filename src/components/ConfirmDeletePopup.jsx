import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

export default function ConfirmDeletePopup({title, description, handleDeleteAllSltBrands, selectedBrandIds, showSltDelBtn, showDelBtn, handleDeleteBrand, singleBrandDelRec}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTargetSingleBrandDel = ()=>{
    handleDeleteBrand(singleBrandDelRec);
     setOpen(false);
  }


  return (
    <>
      
       {showSltDelBtn && <Box onClick={handleClickOpen} sx={{display: 'flex', alignItems: 'center', ml: 1}}>
                      <IconButton
                        
                        size="small"
                        aria-label="delete"
                        color="error"
                        sx={{mr: '3px'}}
                      >
                        <DeleteIcon />
                        
                      </IconButton>
                      <Typography sx={{ fontSize: "10px" }}>
                          ({selectedBrandIds.length}) Delete Selected Brands
                        </Typography>
                          </Box>}
                          {showDelBtn && <IconButton onClick={handleClickOpen}
                        size="small"
                        aria-label="delete"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='confirm-delete-popup-target'
      >
        <Box sx={{textAlign: 'center'}}><InfoOutlineIcon sx={{backgroundColor: '#f7d6d2', borderRadius: '50%', padding: '5px', fontSize: '50px'}} color='error'/></Box>
        <DialogTitle id="alert-dialog-title" sx={{textAlign: 'center', fontWeight: '600'}}>
          {`Delete ${title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={handleClose} variant='contained' sx={{backgroundColor: '#dcdcdcff', color: 'black', textTransform: 'capitalize'}} fullWidth>Cancel</Button>
          {showSltDelBtn ? <Button onClick={()=>handleDeleteAllSltBrands()} autoFocus variant='contained' sx={{textTransform: 'capitalize'}} fullWidth color='error'>
            Delete ({selectedBrandIds.length}) 
          </Button> : ''}
          {showDelBtn && <Button onClick={handleTargetSingleBrandDel} autoFocus variant='contained' sx={{textTransform: 'capitalize'}} fullWidth color='error'>
            Delete {selectedBrandIds && `(${selectedBrandIds.length})`}
          </Button>}
          
          
        </DialogActions>
      </Dialog>
    </>
  );
}
