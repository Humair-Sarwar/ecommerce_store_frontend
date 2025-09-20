import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CloseIcon from '@mui/icons-material/Close';
import BasicDatePicker from '../../components/DatePicker';

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      
       <Button
            className="custom-secondary-btn-admin-side"
             onClick={handleClickOpen}
          >
            <EditIcon sx={{ mr: 1 }} />
            Edit Profile
          </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='model-content-target-cross-icon'
      >
       
        <DialogContent>
         <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Typography sx={{display: 'flex', alignItems: 'center', fontSize: '13px'}}><ManageAccountsIcon sx={{mr: 1}}/> Edit Profile</Typography>
          <Tooltip title="Close" arrow onClick={handleClose}>
                          <IconButton
                             
                            size="small"
                            aria-label="edit"
                          >
                            <CloseIcon sx={{fontSize: '19px'}}/>
                          </IconButton>
                        </Tooltip>
         </Box>
         

              <Grid container spacing={2} sx={{mt: 2}}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField size='small' label='First Name' autoComplete="off" id="outlined-basic" fullWidth  sx={{
                
             '& label': {
               color: 'black',
             },
             '& label.Mui-focused': {
               color: 'black',
             },
             '& .MuiOutlinedInput-root': {
               
               '&:hover fieldset': {
                 borderColor: 'black',
               },
               '&.Mui-focused fieldset': {
                 borderColor: 'black',
               },
             },
           }}/>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField size='small' label='Last Name' autoComplete="off" id="outlined-basic" fullWidth  sx={{
                
             '& label': {
               color: 'black',
             },
             '& label.Mui-focused': {
               color: 'black',
             },
             '& .MuiOutlinedInput-root': {
               
               '&:hover fieldset': {
                 borderColor: 'black',
               },
               '&.Mui-focused fieldset': {
                 borderColor: 'black',
               },
             },
           }}/>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField size='small' label='Email' type='email' autoComplete="off" id="outlined-basic" fullWidth  sx={{
                
             '& label': {
               color: 'black',
             },
             '& label.Mui-focused': {
               color: 'black',
             },
             '& .MuiOutlinedInput-root': {
               
               '&:hover fieldset': {
                 borderColor: 'black',
               },
               '&.Mui-focused fieldset': {
                 borderColor: 'black',
               },
             },
           }}/>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField size='small' label='Phone' type='tel' autoComplete="off" id="outlined-basic" fullWidth  sx={{
                
             '& label': {
               color: 'black',
             },
             '& label.Mui-focused': {
               color: 'black',
             },
             '& .MuiOutlinedInput-root': {
               
               '&:hover fieldset': {
                 borderColor: 'black',
               },
               '&.Mui-focused fieldset': {
                 borderColor: 'black',
               },
             },
           }}/>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            
           <BasicDatePicker/>
          </Grid>
          </Grid>
         <Box sx={{textAlign: 'end', mt: 2}}> <Button
          onClick={()=>handleBackStep()}
         
          className="custom-primary-btn-admin-side"
          
        >
           Update
        </Button></Box>
        </DialogContent>
        
      </Dialog>
    </React.Fragment>
  );
}
