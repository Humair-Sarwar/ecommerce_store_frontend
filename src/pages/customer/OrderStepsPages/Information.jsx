import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import CustomerOrderSteps from '../../../components/CustomerOrderSteps'
import OrderRightSummary from './OrderRightSummary'
import { NavLink, useNavigate } from 'react-router'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeliveryMth from './DeliveryMth'

const Information = () => {
    const navigate = useNavigate()
  return (
    <>
       <Box sx={{ backgroundColor: "#f0f0f0", py: 5}}>
        <Container sx={{maxWidth: '1470px !important'}}>
          <CustomerOrderSteps level={2}/>
          <Box sx={{mx: {lg: 9, md: 8}, mt: 7}}>
            
            <Grid container spacing={10}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 7 }}>
            <Typography variant='h3' sx={{fontSize: '20px', mb: 2}}>Delivery Method</Typography>
            <DeliveryMth/>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                <NavLink to={'/cart'} className={'b-btn-style-target'} style={{fontSize: '15px', display: 'flex', alignItems: 'center'}}><ArrowBackIosNewIcon sx={{fontSize: '13px'}}/> Return to Cart</NavLink>
                <Button size='large' onClick={()=>navigate('/cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/shipping')} variant='contained' sx={{textTransform: 'capitalize', backgroundColor: 'black'}}>Continue To Shipping</Button>
            </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5 }}>
               
                <OrderRightSummary/>
              
            </Grid>
          </Grid>
          </Box>
          </Container>
          </Box>
    </>
  )
}

export default Information
