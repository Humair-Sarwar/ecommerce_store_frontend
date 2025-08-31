import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const SaleOrderDetails = () => {
    const [activeFor, setActiveFor] = React.useState(10);
          const handleChange = (event) => {
        setActiveFor(event.target.value);
      };
  return (
    <Box
      sx={{
        
        
        width: "100%",
        py: 3,
        overflowY: "auto",
      }}
      className='pages-admin-target-style'
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        <Box
          component={"h2"}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "17px",
            mb: 3,
          }}
        >
          {" "}
          
          Sale Order Details
        </Box>
         <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
            <Box sx={{padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f3f5f9', borderRadius: '10px 10px 0 0'}}>
                <Typography sx={{whiteSpace: 'nowrap', display: 'flex', fontSize: '13px', alignItems: 'center'}}><Box sx={{fontWeight: '600'}}>Order ID:</Box> 123456</Typography>
                <Typography sx={{whiteSpace: 'nowrap', display: 'flex', fontSize: '13px', alignItems: 'center'}}><Box sx={{fontWeight: '600'}}>Status:</Box> Pending</Typography>
                <Typography sx={{whiteSpace: 'nowrap', display: 'flex', fontSize: '13px', alignItems: 'center'}}><Box sx={{fontWeight: '600'}}>Placed on:</Box> 23, Aug 2025 10:38 PM</Typography>
                <Typography sx={{whiteSpace: 'nowrap', display: 'flex', fontSize: '13px', alignItems: 'center'}}><Box sx={{fontWeight: '600'}}>Customer Detail:</Box> humairsarwar.web@gmail.com</Typography>
            </Box>
            <Box sx={{padding: '20px', backgroundColor: 'white', borderRadius: '0 0 10px 10px'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                    <FormControl sx={{  minWidth: 120 }} size="small" fullWidth>
      <InputLabel id="demo-select-small-label" color='secondary'>Order Status</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={activeFor}
        label="Age"
        onChange={handleChange}
        color='secondary'
        
      >
        
          <MenuItem value={10} sx={{fontSize: '14px'}}>Accept</MenuItem>
    <MenuItem value={20} sx={{fontSize: '14px'}}>Reject</MenuItem>
    <MenuItem value={30} sx={{fontSize: '14px'}}>Cancel</MenuItem>
      </Select>
    </FormControl>
    <Button
          className="custom-secondary-btn-admin-side"
          onClick={()=>handleNextStep()}
          sx={{whiteSpace: 'nowrap', ml: 1}}
        >
          Save Changes
        </Button>
                </Box>
                <Grid container spacing={1}>
                                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                    <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor: '#f3f5f9', border: '1px solid #e0e0e0'}}>
                                      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                          <Box className='card-order-detail-img-target'><img src="/Smart-Watches-Products-Eclat-UK.png" alt="" /></Box>
                                          <Box><Typography variant='h5' sx={{fontSize: '14px', mb: 1}}>New test product with open stock</Typography>
                                          <Button variant='outlined' color='secondary' sx={{borderRadius: '35px'}} size='small'>£12.00 * 1</Button></Box>
                                        </Box>
                                        <Box><Typography variant='body2' sx={{fontSize: '15px', fontWeight: '500'}}>£12.00</Typography></Box>

                                      </Box>
                                    </Box>
                                  </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                    <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor: '#f3f5f9', border: '1px solid #e0e0e0'}}>
                                      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                          <Box className='card-order-detail-img-target'><img src="/empty-image.jpg" alt="" /></Box>
                                          <Box><Typography variant='h5' sx={{fontSize: '14px', mb: 1}}>New test product with open stock</Typography>
                                          <Button variant='outlined' color='secondary' sx={{borderRadius: '35px'}} size='small'>£12.00 * 1</Button></Box>
                                        </Box>
                                        <Box><Typography variant='body2' sx={{fontSize: '15px', fontWeight: '500'}}>£12.00</Typography></Box>

                                      </Box>
                                    </Box>
                                  </Grid>
                                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                    <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor: '#f3f5f9', border: '1px solid #e0e0e0'}}>
                                      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                          <Box className='card-order-detail-img-target'><img src="/Smart-Watches-Products-Eclat-UK.png" alt="" /></Box>
                                          <Box><Typography variant='h5' sx={{fontSize: '14px', mb: 1}}>New test product with open stock</Typography>
                                          <Button variant='outlined' color='secondary' sx={{borderRadius: '35px'}} size='small'>£12.00 * 1</Button></Box>
                                        </Box>
                                        <Box><Typography variant='body2' sx={{fontSize: '15px', fontWeight: '500'}}>£12.00</Typography></Box>

                                      </Box>
                                    </Box>
                                  </Grid>
                                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                    <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor: '#f3f5f9', border: '1px solid #e0e0e0'}}>
                                      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                          <Box className='card-order-detail-img-target'><img src="/Smart-Watches-Products-Eclat-UK.png" alt="" /></Box>
                                          <Box><Typography variant='h5' sx={{fontSize: '14px', mb: 1}}>New test product with open stock</Typography>
                                          <Button variant='outlined' color='secondary' sx={{borderRadius: '35px'}} size='small'>£12.00 * 1</Button></Box>
                                        </Box>
                                        <Box><Typography variant='body2' sx={{fontSize: '15px', fontWeight: '500'}}>£12.00</Typography></Box>

                                      </Box>
                                    </Box>
                                  </Grid>
                                  </Grid>

                                  <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2}}>
                                    <Button
          className="custom-primary-btn-admin-side"
          onClick={()=>handleNextStep()}
          sx={{whiteSpace: 'nowrap', ml: 1}}
        >
          <ChatIcon sx={{mr: 1}}/> Contact Client
        </Button>
          <Button
          className="custom-secondary-btn-admin-side"
          onClick={()=>handleNextStep()}
          sx={{whiteSpace: 'nowrap', ml: 1}}
        >
          <AccessTimeIcon sx={{mr: 1}}/> Estimated Delivery Date & Time: 26, Aug 2025 10:38 PM
        </Button>
                                  </Box>
            </Box>
            
         </Box>
         <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md:6 }}>
 <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor: 'white', mt: 3, p: 2}}>
                <Typography variant='h4' sx={{fontSize: '15px', fontWeight: '500', marginBottom: '5px'}}>Shipping Method</Typography>
                <Typography variant='body2' sx={{fontSize: '12px', color: '#717171ff'}}>test1</Typography>
                <Divider sx={{my: 1}} />
                <Typography variant='h4' sx={{fontSize: '15px', fontWeight: '500', marginBottom: '5px'}}>Shipping Address</Typography>
                <Typography variant='body2' sx={{fontSize: '12px', color: '#717171ff'}}>Humair</Typography>
                <Typography variant='body2' sx={{fontSize: '12px', color: '#717171ff'}}>07768378472</Typography>
                 <Typography variant='body2' sx={{fontSize: '12px', color: '#717171ff'}}>76 Grange Road, Romford, London, United Kingdom, RM37DX

</Typography>
                <Divider sx={{my: 1}} />
            </Box>
                  </Grid>



                  <Grid size={{ xs: 12, sm: 6, md:6 }}>
                      <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor: 'white', mt: 3, p: 2}}>
                <Typography variant='h4' sx={{fontSize: '15px', fontWeight: '500', marginBottom: '5px'}}>Total Summary
</Typography>
                <Typography variant='body2' sx={{fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Box>Subtotal :</Box><Box sx={{fontWeight: '600'}}>£3,406.00</Box></Typography>
                <Typography variant='body2' sx={{fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Box>Shipping Fee(test 1) :</Box><Box sx={{fontWeight: '600'}}>£0.00</Box></Typography>
                <Divider sx={{my: 1}} />
                <Typography variant='body2' sx={{fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Box>Total :</Box><Box sx={{fontWeight: '600'}}>£3,406.00</Box></Typography>
                <Typography variant='body2' sx={{fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Box>Payment Method:</Box><Box sx={{fontWeight: '500'}}>Cash On Delivery</Box></Typography>
            
            </Box>
                  </Grid>
                  </Grid>
        
        
      </Container>
    </Box>
  )
}

export default SaleOrderDetails
