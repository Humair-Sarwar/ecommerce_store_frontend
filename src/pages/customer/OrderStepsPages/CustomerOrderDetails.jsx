import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AfterOrderCompletionSteps from "./AfterOrderCompletionSteps";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatModal from "../../../components/ChatModal";

const CustomerOrderDetails = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "25px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <LocalMallIcon sx={{ mr: 1 }} /> Order Details
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
              backgroundColor: "#f3f5f9",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
              flexDirection: {lg: 'row', md: 'row', sm: 'column', xs: 'column'}
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#797979ff" }}>
                Order ID:{" "}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}> 32787755</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#797979ff" }}>
                
Placed on:

{" "}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}> 21, Sep 2025 11:15 AM</Typography>
            </Box>
             <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", color: "#797979ff" }}>
                
Pending on:

{" "}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}> 
21, Sep 2025 11:15 AM</Typography>
            </Box>
          </Box>

          <Box sx={{p: 2}}>
            <Typography sx={{textAlign: 'center', fontWeight: '600'}}>My Site Business</Typography>
            <AfterOrderCompletionSteps/>
          </Box>
          <Divider/>
        <Box sx={{p: 2}}>
             <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "1px solid #ccc",
                          pb: 2,
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              height: "60px",
                              width: "60px",
                              border: "1px solid #cbcbcb",
                              borderRadius: "8px",
                              //   overflow: "hidden",
                              mr: 2,
                              position: "relative",
                            }}
                          >
                            <img
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                              src="/playstation-5-pro-console-advanced-graphics-ultra-high-definition-image-1.png"
                              alt=""
                            />
                            <Box
                              sx={{
                                borderRadius: "50%",
                                backgroundColor: "#666666",
                                height: "20px",
                                width: "20px",
                                color: "white",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "12px",
                                position: "absolute",
                                right: "-8px",
                                top: "-8px",
                              }}
                            >
                              10
                            </Box>
                          </Box>
                          <Typography variant="h6" sx={{ fontSize: "14px" }}>
                            iPhone 16 Pro Max
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "14px" }}>£100.00</Typography>
                      </Box>
        </Box>
         <Divider/>
         <Box sx={{display: 'flex', justifyContent: 'end'}}>
 <Box sx={{p: 2, minWidth: '300px'}}>
                              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, width: '100%'}}>
                                <Typography sx={{fontSize: '15px', color: '#7b7b7bff'}}>Sub Total: </Typography><Typography sx={{fontSize: '15px', fontWeight: '600'}}>£22.00</Typography>
                              </Box>
                              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, width: '100%'}}>
                                <Typography sx={{fontSize: '15px', color: '#7b7b7bff'}}>Express: </Typography><Typography sx={{fontSize: '15px', fontWeight: '600'}}>£5.00</Typography>
                              </Box>
                              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, width: '100%'}}>
                                <Typography sx={{fontSize: '19px', color: '#7b7b7bff'}}>Total: </Typography><Typography sx={{fontSize: '19px', fontWeight: '600'}}>£27.00</Typography>
                              </Box>
        </Box>
         </Box>
       

         <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', px: 2, pb: 2, flexDirection: {lg: 'row', md: 'row', sm: 'column', xs: 'column'}}}>
                                    
        <ChatModal/>
          <Button
          className="custom-secondary-btn-admin-side"
          onClick={()=>handleNextStep()}
          sx={{whiteSpace: 'nowrap', ml: 1, mb: 1}}
        >
          <AccessTimeIcon sx={{mr: 1}}/> Estimated Delivery Date 24, Sep 2025 11:15 AM
        </Button>
                                  </Box>
        </Box>
        <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6, md:6 }}>
 <Box sx={{borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", backgroundColor: 'white', mt: 3, p: 2}}>
                <Typography variant='h4' sx={{fontSize: '16px', fontWeight: '600', marginBottom: '5px'}}>Shipping Method</Typography>
                <Typography variant='body2' sx={{fontSize: '13px', color: '#717171ff'}}>Express</Typography>
                <Typography variant='body2' sx={{fontSize: '13px', color: '#717171ff'}}>1-2 Days</Typography>
                <Divider sx={{my: 1}} />
                <Typography variant='h4' sx={{fontSize: '16px', fontWeight: '600', marginBottom: '5px'}}>Shipping Address</Typography>
                <Typography variant='body2' sx={{fontSize: '13px', color: '#717171ff'}}>Humair</Typography>
                <Typography variant='body2' sx={{fontSize: '13px', color: '#717171ff'}}>07768378472</Typography>
                 <Typography variant='body2' sx={{fontSize: '13px', color: '#717171ff'}}>76 Grange Road, Romford, London, United Kingdom, RM37DX

</Typography>
 <Divider sx={{my: 1}} />
                <Typography variant='h4' sx={{fontSize: '16px', fontWeight: '600', marginBottom: '5px'}}>Billing Address</Typography>
                <Typography variant='body2' sx={{fontSize: '13px', color: '#717171ff'}}>Humair</Typography>
                <Typography variant='body2' sx={{fontSize: '13px', color: '#717171ff'}}>07768378472</Typography>
                 <Typography variant='body2' sx={{fontSize: '13px', color: '#717171ff'}}>76 Grange Road, Romford, London, United Kingdom, RM37DX

</Typography>
                <Divider sx={{my: 1}} />
                <Typography variant='h4' sx={{fontSize: '16px', fontWeight: '600', marginBottom: '5px'}}>Customer’s Note</Typography>
                <Typography variant='body2' sx={{fontSize: '13px', color: '#717171ff'}}>faf note...</Typography>
            </Box>
                  </Grid>



                  <Grid size={{ xs: 12, sm: 6, md:6 }}>
                      <Box sx={{borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", backgroundColor: 'white', mt: 3, p: 2}}>
                <Typography variant='h4' sx={{fontSize: '16px', fontWeight: '600', marginBottom: '5px'}}>Total Summary
</Typography>
                <Typography variant='body2' sx={{fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Box sx={{color: '#919191ff'}}>Subtotal :</Box><Box sx={{fontWeight: '600'}}>£3,406.00</Box></Typography>
                <Typography variant='body2' sx={{fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Box sx={{color: '#919191ff'}}>Shipping Fee(test 1) :</Box><Box sx={{fontWeight: '600'}}>£0.00</Box></Typography>
                <Divider sx={{my: 1}} />
                <Typography variant='body2' sx={{fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Box sx={{fontWeight: '600'}}>Total:</Box><Box sx={{fontWeight: '600'}}>£3,406.00</Box></Typography>
                <Typography variant='body2' sx={{fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Box sx={{fontWeight: '600'}}>Payment Method:</Box><Box sx={{fontWeight: '500'}}>Cash On Delivery</Box></Typography>
            
            </Box>
                  </Grid>
                  </Grid>
      </Box>
    </>
  );
};

export default CustomerOrderDetails;
