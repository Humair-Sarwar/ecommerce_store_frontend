import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Tooltip, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import ExploreIcon from '@mui/icons-material/Explore';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function SelectStore() {
  const [open, setOpen] = React.useState(false);
  const [inputData, setInputData] = useState('');

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

const handleChangeSearch = (e) => {
    setInputData(e.target.value);
}

const handleClearInput = ()=>{
    setInputData('');
}
  const DrawerList = (
    <Box sx={{ width: 600, p: 4 }} role="presentation" className='inner-modal-search-view-set'>
    <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "600" }}>
          Select Your Store
        </Typography>{" "}
        <Tooltip title="Close" arrow onClick={toggleDrawer(false)}>
          <IconButton size="small" aria-label="edit">
            <CloseIcon sx={{ fontSize: "23px" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box className='search-row'>
        <input type="text" placeholder="Search by store name..." onChange={handleChangeSearch} value={inputData}/>
        <Box className='right-clear-close-btn-style'>
            {inputData != '' && <Box className='clear-modal-input-data' sx={{mr: 2, cursor: 'pointer'}} onClick={handleClearInput}>Clear</Box>}
            
        </Box>
      </Box>
      <Button variant="contained" fullWidth sx={{mt: 2, borderRadius: '35px', textTransform: 'capitalize', backgroundColor: 'black'}}><ExploreIcon sx={{mr: 1}}/> Use Current Location</Button>

        <Box className='left-slt-filters-target slt-store-target-set' sx={{mt: 1}}>
            <Accordion
                    className="accordion-expand-left-filter-target "
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      borderTop: "1px solid rgb(26 26 26 / 12%)",
                      borderRadius: "0 !important",
                    
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="price-filter"
                      sx={{ px: 0, py: 0 }}
                    >
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography sx={{ fontWeight: "600" }}>My Store</Typography>
                      <Typography sx={{fontSize: '12px', fontWeight: '600', color: '#64cf4fff'}}>Open 24 Hrs</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0, pb: 2 }}>
                     <Box sx={{display:'flex', alignItems: 'center'}}> <Typography sx={{fontWeight: '600', fontSize: '13px'}}>Address: </Typography><LocationPinIcon  color="error" sx={{fontSize: '17px'}}/><Typography sx={{ fontSize: '13px'}}>861 High Rd, Ilford IG3 8TG, London, Essex, 4544</Typography></Box>

                     <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1}}><Typography sx={{fontWeight: '600', fontSize: '14px'}}>Store Timings </Typography><Typography sx={{fontWeight: '600', fontSize: '14px'}}>Status</Typography></Box>

 <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', py: 1}}><Typography sx={{ fontSize: '14px'}}>Monday </Typography><Typography sx={{fontSize: '14px', color: '#64cf4fff'}}>Open 24 hrs</Typography></Box>

 <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', py: 1}}><Typography sx={{ fontSize: '14px'}}>Tuesday </Typography><Typography sx={{fontSize: '14px', color: '#cf4f51ff'}} color="error">Closed</Typography></Box>

      <Button variant="contained" fullWidth sx={{mt: 2, borderRadius: '35px', textTransform: 'capitalize', backgroundColor: '#f0c417', boxShadow: 'none', color: 'black'}}><StorefrontIcon sx={{mr: 1}}/>Select Store</Button>


                    </AccordionDetails>
                  </Accordion>

                   <Accordion
                    className="accordion-expand-left-filter-target "
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      borderTop: "1px solid rgb(26 26 26 / 12%)",
                      borderRadius: "0 !important",
                    
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="price-filter"
                      sx={{ px: 0, py: 0 }}
                    >
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography sx={{ fontWeight: "600" }}>Rawalpindi Giga Mall</Typography>
                      <Typography sx={{fontSize: '12px', fontWeight: '600', color: '#64cf4fff'}}>Open 24 Hrs</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0, pb: 2 }}>
                     <Box sx={{display:'flex', alignItems: 'center'}}> <Typography sx={{fontWeight: '600', fontSize: '13px'}}>Address: </Typography><LocationPinIcon  color="error" sx={{fontSize: '17px'}}/><Typography sx={{ fontSize: '13px'}}>861 High Rd, Ilford IG3 8TG, London, Essex, 4544</Typography></Box>

                     <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1}}><Typography sx={{fontWeight: '600', fontSize: '14px'}}>Store Timings </Typography><Typography sx={{fontWeight: '600', fontSize: '14px'}}>Status</Typography></Box>

 <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', py: 1}}><Typography sx={{ fontSize: '14px'}}>Monday </Typography><Typography sx={{fontSize: '14px', color: '#64cf4fff'}}>Open 24 hrs</Typography></Box>

 <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', py: 1}}><Typography sx={{ fontSize: '14px'}}>Tuesday </Typography><Typography sx={{fontSize: '14px', color: '#cf4f51ff'}} color="error">Closed</Typography></Box>

      <Button variant="contained" fullWidth sx={{mt: 2, borderRadius: '35px', textTransform: 'capitalize', backgroundColor: '#f0c417', boxShadow: 'none', color: 'black'}}><StorefrontIcon sx={{mr: 1}}/>Select Store</Button>


                    </AccordionDetails>
                  </Accordion>
        </Box>

         


      <Box sx={{height: '100%', width: '100%', position: 'relative'}}>
            <Typography sx={{fontWeight: '500', textWrap: 'nowrap', fontSize: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>No results could be found.

</Typography>
      </Box>

       
    </Box>
  );

  return (
    <>
     

<Button onClick={toggleDrawer(true)} variant='outlined' size='small' sx={{textTransform: 'capitalize', borderRadius: '10px !important', backgroundColor: 'black', color: 'white', border: '0'}}>Select Store</Button>

      <Drawer
      anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        className="search-modal-panel-style-set"
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
