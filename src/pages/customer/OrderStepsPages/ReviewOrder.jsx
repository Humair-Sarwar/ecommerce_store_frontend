import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CustomerOrderSteps from "../../../components/CustomerOrderSteps";
import { NavLink, useNavigate } from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OrderRightSummary from "./OrderRightSummary";

const ReviewOrder = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ backgroundColor: "#f0f0f0", py: 5 }}>
        <Container sx={{ maxWidth: "1470px !important" }}>
          <CustomerOrderSteps level={5} />
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


<Typography variant="h3" sx={{ fontSize: "20px", mb: 2, mt: 3}}>
                 Billing Address
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

  <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid rgb(166, 23, 240)",
                    borderRadius: "5px",
                    p: 2,
                    mt: 2,
                  }}
                >
                  <Typography sx={{fontSize: '14px'}}>Card Preview</Typography>
                   <Typography sx={{fontSize: '14px' , fontWeight: '600'}}>
**** **** **** 4242</Typography>
 <Typography sx={{fontSize: '14px'}}>
Brand: VISA</Typography>
                </Box>

                </Box>
                


                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <NavLink
                    to={
                      "/cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/payment"
                    }
                    className={"b-btn-style-target"}
                    style={{
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowBackIosNewIcon sx={{ fontSize: "13px" }} /> Return to
                    Payment
                  </NavLink>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor: "black",
                    }}
                    onClick={()=>navigate("/orders/66672287-e33f-4705-b863-124d7f8408f1")}
                  >
                    Confirm & Pay
                  </Button>
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

export default ReviewOrder;
