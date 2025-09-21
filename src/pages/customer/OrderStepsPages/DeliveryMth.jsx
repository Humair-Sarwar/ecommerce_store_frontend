import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Autocomplete, Box, Button, Grid, Radio, TextField } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddressModalSelect from './AddressModalSelect';
import SelectStore from './SelectStore';

export default function DeliveryMth() {
  const [expanded, setExpanded] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleChange = (panel, value) => (event, isExpanded) => {
    if (isExpanded) {
      setExpanded(panel);
      setSelectedValue(value);
    } else {
      // agar already koi radio select hai to collapse naa kare
      if (!selectedValue) {
        setExpanded(false);
      }
    }
  };

  const handleChangeR = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setExpanded(value === 'a' ? 'panel1' : 'panel2'); // radio select karte hi panel open ho
  };

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        overflow: 'hidden'
      }}
      className="acc-header-style-target"
    >
      {/* Express */}
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1', 'a')}
      >
        <AccordionSummary>
          <Typography
            component="span"
            sx={{ width: '33%', flexShrink: 0, display: 'flex' }}
          >
            <Radio
            size='small'
              checked={selectedValue === 'a'}
              onChange={handleChangeR}
              value="a"
              name="delivery-method"
              color="secondary"
            />
            <Box>
              <Typography sx={{ fontSize: '14px', textWrap: 'nowrap' }}>Express</Typography>
              <Typography sx={{ fontSize: '13px', textWrap: 'nowrap' }}>1-2 Days</Typography>
            </Box>
          </Typography>
          <Typography
            component="span"
            sx={{ color: 'text.secondary', display: 'flex' }}
          >
            <Typography sx={{ color: 'black', fontSize: '14px' }}>
              £7.00
            </Typography>
            <LocalShippingIcon sx={{ ml: 2 }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{p: 2}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h3' sx={{fontSize: '18px'}}>Shipping Address</Typography>
            <AddressModalSelect/>
          </Box>
          <Box>
            <Grid container spacing={2} sx={{mt: 2}}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Autocomplete
                //   size="small"
                  disablePortal
                  options={["one", "two"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      color='secondary'
                    
                    />
                  )}
                />
          </Grid>
           <Grid size={{ xs: 12, sm: 12, md: 6 }}>
           <TextField label='First Name' color='secondary' fullWidth/>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
           <TextField label='Last Name' color='secondary' fullWidth/>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
           <TextField label='Address' color='secondary' fullWidth/>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
           <TextField label='Apartment, suite, etc' color='secondary' fullWidth/>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
           <TextField label='City' color='secondary' fullWidth/>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
           <TextField label='Postcode' color='secondary' fullWidth/>
          </Grid>
           <Grid size={{ xs: 12, sm: 12, md: 12 }}>
           <TextField label='Phone' color='secondary' fullWidth/>
          </Grid>
          </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* In-Store Pickup */}
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2', 'b')}
      >
        <AccordionSummary>
          <Typography
            component="span"
            sx={{ width: '33%', flexShrink: 0, display: 'flex' }}
          >
            <Radio
             size='small'
              checked={selectedValue === 'b'}
              onChange={handleChangeR}
              value="b"
              name="delivery-method"
              color="secondary"
            />
            <Box>
              <Typography sx={{ fontSize: '14px', textWrap: 'nowrap' }}>In-Store Pickup</Typography>
              <Typography sx={{ fontSize: '13px', textWrap: 'nowrap' }}>
                Collection On Store
              </Typography>
            </Box>
          </Typography>
          <Typography
            component="span"
            sx={{ color: 'text.secondary', display: 'flex' }}
          >
            <Typography sx={{ color: 'black', fontSize: '14px' }}>Free</Typography>
            <StorefrontIcon sx={{ ml: 2 }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1}}>
            <Typography variant='h3' sx={{fontSize: '16px'}}>Store Locations</Typography>
            <SelectStore/>
            
          </Box>
        </AccordionDetails>
      </Accordion>


    </Box>
  );
}
