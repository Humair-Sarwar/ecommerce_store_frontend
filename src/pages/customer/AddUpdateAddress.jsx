import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CloseIcon from '@mui/icons-material/Close';
import BasicDatePicker from '../../components/DatePicker';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export default function AddUpdateProfile() {
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
            <AddIcon sx={{ mr: 1 }} />
            Add New Address
          </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='model-content-target-cross-icon'
      >
       
        <DialogContent>
         <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Typography sx={{display: 'flex', alignItems: 'center', fontSize: '13px'}}><LocationOnIcon sx={{mr: 1}}/> Add Address</Typography>
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
            <Autocomplete
      size="small"
      disablePortal
      options={["one", "two"]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country"
          sx={{
            "& .MuiInputBase-input": { color: "black" }, // text color
            "& .MuiInputLabel-root": { color: "black" }, // label color
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "black", // default border
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "black", // hover border
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black", // focus border
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black", // label focus color
            },
          }}
        />
      )}
    />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField size='small' label='Address' type='text' autoComplete="off" id="outlined-basic" fullWidth  sx={{
                
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
            <TextField size='small' label='Apartment, suite, etc. (optional)' type='text' autoComplete="off" id="outlined-basic" fullWidth  sx={{
                
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
            <TextField size='small' label='City' type='text' autoComplete="off" id="outlined-basic" fullWidth  sx={{
                
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
            <TextField size='small' label='Postcode' type='text' autoComplete="off" id="outlined-basic" fullWidth  sx={{
                
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
         
          </Grid>
         <Box sx={{textAlign: 'end', mt: 2}}> <Button
          onClick={()=>handleBackStep()}
         
          className="custom-primary-btn-admin-side"
          
        >
           Save
        </Button></Box>
        </DialogContent>
        
      </Dialog>
    </React.Fragment>
  );
}
