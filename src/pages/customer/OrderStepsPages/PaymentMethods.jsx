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
import PaymentsIcon from '@mui/icons-material/Payments';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { NavLink } from 'react-router';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function PaymentMethods() {
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
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography sx={{ fontSize: '14px', textWrap: 'nowrap' }}>Cash On Delivery</Typography>
            </Box>
          </Typography>
          <Typography
            component="span"
            sx={{ color: 'text.secondary', display: 'flex' }}
          >
            <Typography sx={{ color: 'black', fontSize: '14px' }}>
              Pay On Delivery
            </Typography>
            <PaymentsIcon sx={{ ml: 2 }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{p: 2}}>
          
          <Box>
                <Typography sx={{fontSize: '15px', color: '#707070ff', mb: 2}}>You'll pay when the product is delivered to your doorstep.</Typography>

<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1}}>
           <NavLink
                               to={
                                 "/cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/shipping"
                               }
                               className={"b-btn-style-target"}
                               style={{
                                 fontSize: "15px",
                                 display: "flex",
                                 alignItems: "center",
                               }}
                             >
                               <ArrowBackIosNewIcon sx={{ fontSize: "13px" }} /> Return to
                               Shipping
                             </NavLink>
          <Button  variant='outlined' sx={{textTransform: 'capitalize', borderRadius: '10px !important', backgroundColor: 'black', color: 'white', border: '0'}}>Confirm Order</Button>
          
            
          </Box>


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
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography sx={{ fontSize: '14px', textWrap: 'nowrap' }}>Credit Card</Typography>
            
            </Box>
          </Typography>
          <Typography
            component="span"
            sx={{ color: 'text.secondary', display: 'flex' }}
          >
            <CreditCardIcon sx={{ ml: 2 }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1}}>
           <NavLink
                               to={
                                 "/cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/shipping"
                               }
                               className={"b-btn-style-target"}
                               style={{
                                 fontSize: "15px",
                                 display: "flex",
                                 alignItems: "center",
                               }}
                             >
                               <ArrowBackIosNewIcon sx={{ fontSize: "13px" }} /> Return to
                               Shipping
                             </NavLink>
          <Button  variant='outlined' sx={{textTransform: 'capitalize', borderRadius: '10px !important', backgroundColor: 'black', color: 'white', border: '0'}}>Review Order</Button>
          
            
          </Box>
        </AccordionDetails>
      </Accordion>


    </Box>
  );
}
