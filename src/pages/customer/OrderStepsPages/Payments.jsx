import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CustomerOrderSteps from "../../../components/CustomerOrderSteps";
import { NavLink } from "react-router";

import OrderRightSummary from "./OrderRightSummary";
import PaymentMethods from "./PaymentMethods";

const Payments = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#f0f0f0", py: 5 }}>
        <Container sx={{ maxWidth: "1470px !important" }}>
          <CustomerOrderSteps level={4} />
          <Box sx={{ mx: { lg: 9, md: 8 }, mt: 7 }}>
            <Grid container spacing={10}>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 7 }}>
                <Box sx={{p: 4, border: '1px solid rgb(26 26 26 / 12%)', borderRadius: '15px', backgroundColor: 'white'}}>

                  <Typography variant="h3" sx={{ fontSize: "20px", mb: 2 }}>
                  Shipping Method
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid rgb(166, 23, 240)",
                    borderRadius: "5px",
                    p: 2,
                    backgroundColor: "rgb(249, 245, 255)",
                  }}
                >
                  <Typography sx={{fontSize: '14px'}}>Delivery</Typography>
                   <Typography sx={{fontSize: '14px'}}>
£7.00</Typography>
<NavLink className={'change-btn-style-g'}>Change</NavLink>
                </Box>

<Typography variant="h3" sx={{ fontSize: "20px", mb: 2, mt: 3}}>
                  Shipping Address
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid rgb(166, 23, 240)",
                    borderRadius: "5px",
                    p: 2,
                    backgroundColor: "rgb(249, 245, 255)",
                  }}
                >
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '14px'}}>Humair Sarwar</Typography>
                   <Typography sx={{fontSize: '14px'}}>
California, H 8, United Kingdom, Cal, 43242</Typography>
                  </Box>
<NavLink className={'change-btn-style-g'}>Change</NavLink>
                </Box>

                   <Typography variant="h3" sx={{ fontSize: "20px", mt: 3 }}>
                  Payment
                </Typography>
                <Typography sx={{fontSize: '15px', color: '#929292ff', mb: 2}}>All transactions are secure and encrypted....</Typography>
                
                <PaymentMethods/>
                </Box>
                
                  

           
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5 }}>
                <OrderRightSummary />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Payments;
