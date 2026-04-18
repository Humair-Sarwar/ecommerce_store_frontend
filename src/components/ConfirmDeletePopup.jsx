import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ConfirmDeletePopup({title, description, handleDeleteAllSltBrands, singleImageDelRec, selectedBrandIds, showSltDelBtn, showDelBtn, handleDeleteBrand, handleDeleteImage, singleBrandDelRec, showMediaDelBtn}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };
  const handleTargetSingleBrandDel = ()=>{
    handleDeleteBrand(singleBrandDelRec);
     setOpen(false);
  }

  const handleTargetImageDel = (e)=>{
    e.stopPropagation();
    handleDeleteImage(singleImageDelRec);
     setOpen(false);
  }


  return (
    <>
      
       {showSltDelBtn && <Box onClick={handleClickOpen} sx={{display: 'flex', alignItems: 'center', ml: 1}}>
                    

                       <Tooltip title="Delete" arrow>
                              <IconButton
                                 onClick={handleClickOpen}
                                size="small"
                                sx={{ 
                                  color: "#d21925", 
                                  ml: 1,
                                  mr: '3px',
                                  bgcolor: "#fde9e3", 
                                  "&:hover": { bgcolor: "#fbc8bb" } 
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                      

                      <Typography sx={{ fontSize: "10px" }}>
                          ({selectedBrandIds.length}) Delete Selected Brands
                        </Typography>
                          </Box>}
                          {showDelBtn && 
                   
                      
                      <Tooltip title="Delete" arrow>
                              <IconButton
                                 onClick={handleClickOpen}
                                size="small"
                                sx={{ 
                                  color: "#d21925", 
                                  ml: 1,
                                  bgcolor: "#fde9e3", 
                                  "&:hover": { bgcolor: "#fbc8bb" } 
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                      
                      
                      }
                      {showMediaDelBtn && <Tooltip describeChild title="Delete" arrow>
                        <IconButton
                          size="small"
                          onClick={handleClickOpen}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            color: "#d32f2f",
                            "&:hover": {
                              backgroundColor: "#d32f2f",
                              color: "#fff",
                            },
                            padding: "2px",
                          }}
                        >
                          <DeleteForeverIcon sx={{ fontSize: "16px" }} />
                        </IconButton>
                      </Tooltip>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='confirm-delete-popup-target'
        sx={{ zIndex: "55510 !important" }}
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
           {showMediaDelBtn && <Button onClick={handleTargetImageDel} autoFocus variant='contained' sx={{textTransform: 'capitalize'}} fullWidth color='error'>
            Delete
          </Button>}
          
          
        </DialogActions>
      </Dialog>
    </>
  );
}
