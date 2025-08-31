import { Box, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import PeopleIcon from '@mui/icons-material/People';

import Paper from "@mui/material/Paper";
import Visibility from '@mui/icons-material/Visibility';



const Dashboard = () => {
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
          <Box component={"h2"} sx={{ display: "flex", alignItems: "center", fontSize: '17px', mb: 3 }}>
            {" "}
             <DashboardIcon sx={{ mr: 1, fontSize: '17px' }} color="secondary"  /> Dashboard
          </Box>
        <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Box sx={{width: '100%', background: 'linear-gradient(86deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 184, 1) 56%, rgba(0, 212, 255, 1) 100%)', borderRadius: '20px', p: 3, height: '100%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                      <Grid container spacing={3} sx={{height: '100%'}}>
                  <Grid size={{ xs: 12, sm: 6, md: 7 }}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
                      <Box>
                    <Box component={'h2'} sx={{color: 'white', fontWeight: '400', mb: 2}}>Welcome to the Store!</Box>

                    <Box component={'p'} sx={{color: 'white', fontSize: '13px', fontWeight:'100'}}>Explore the latest trends, shop our curated collections, and enjoy exclusive dscounts and offers.</Box>
</Box>
<Box>

                    <Button className="custom-primary-btn-bw-2" onClick={()=>navigation('/')} target='_blank' sx={{mt: 4}} size='small'>Browse Web <ArrowCircleRightIcon/></Button>
</Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                    <Box className='dashboard-img-target'>
                      <img src="/dashboard.png" alt="" />
                    </Box>
                  </Grid>
                  </Grid>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Box sx={{backgroundColor: 'white', p: 2, borderRadius: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                      <Box sx={{mb: 2}}><Box component={'h4'} sx={{display: 'flex', alignItems: 'center', fontWeight: '400'}}><AttachMoneyIcon sx={{backgroundColor:'orange', color: 'white', borderRadius: '50%', height: '40px', width: '40px', mr: 1, p: 1}}/> Today’s Sale</Box></Box>
                      <Box sx={{fontSize: '30px', fontWeight: '600'}}>$0.00</Box>
                    </Box>
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Box sx={{backgroundColor: 'white', p: 2, borderRadius: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                      <Box sx={{mb: 2}}><Box component={'h4'} sx={{display: 'flex', alignItems: 'center', fontWeight: '400'}}><TrendingUpIcon sx={{backgroundColor:'#0060fe', color: 'white', borderRadius: '50%', height: '40px', width: '40px', mr: 1, p: 1}}/> Current month sales

</Box></Box>
                      <Box sx={{fontSize: '30px', fontWeight: '600'}}>$0.00</Box>
                    </Box>
                  </Grid>

<Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Box sx={{backgroundColor: 'white', p: 2, borderRadius: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                      <Box sx={{mb: 2}}><Box component={'h4'} sx={{display: 'flex', alignItems: 'center', fontWeight: '400'}}><ShoppingCartIcon sx={{backgroundColor:'red', color: 'white', borderRadius: '50%', height: '40px', width: '40px', mr: 1, p: 1}}/> Orders

</Box></Box>
                      <Box sx={{fontSize: '30px', fontWeight: '600'}}>0</Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Box sx={{backgroundColor: 'white', p: 2, borderRadius: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                      <Box sx={{mb: 2}}><Box component={'h4'} sx={{display: 'flex', alignItems: 'center', fontWeight: '400'}}><DevicesOtherIcon sx={{backgroundColor:'green', color: 'white', borderRadius: '50%', height: '40px', width: '40px', mr: 1, p: 1}}/> Sold Items



</Box></Box>
                      <Box sx={{fontSize: '30px', fontWeight: '600'}}>0</Box>
                    </Box>
                  </Grid>


                  </Grid>
                  </Grid>
                  </Grid>

                  <Grid container spacing={1} sx={{mt: 1}}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                     <Box sx={{backgroundColor: 'white', p: 2, borderRadius: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                      <Box sx={{mb: 2}}><Box component={'h4'} sx={{display: 'flex', alignItems: 'center', fontWeight: '400'}}><CrisisAlertIcon sx={{backgroundColor:'#efcf4dff', color: 'white', borderRadius: '50%', height: '40px', width: '40px', mr: 1, p: 1}}/> Net Sale




</Box></Box>
                      <Box sx={{fontSize: '30px', fontWeight: '600'}}>$0.00</Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{backgroundColor: 'white', p: 2, borderRadius: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                      <Box sx={{mb: 2}}><Box component={'h4'} sx={{display: 'flex', alignItems: 'center', fontWeight: '400'}}><LocalShippingIcon sx={{backgroundColor:'purple', color: 'white', borderRadius: '50%', height: '40px', width: '40px', mr: 1, p: 1}}/> Shipping Charges





</Box></Box>
                      <Box sx={{fontSize: '30px', fontWeight: '600'}}>$0.00</Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{backgroundColor: 'white', p: 2, borderRadius: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                      <Box sx={{mb: 2}}><Box component={'h4'} sx={{display: 'flex', alignItems: 'center', fontWeight: '400'}}><PaymentsIcon sx={{backgroundColor:'orangeRed', color: 'white', borderRadius: '50%', height: '40px', width: '40px', mr: 1, p: 1}}/> VAT





</Box></Box>
                      <Box sx={{fontSize: '30px', fontWeight: '600'}}>$0.00</Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{backgroundColor: 'white', p: 2, borderRadius: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                      <Box sx={{mb: 2}}><Box component={'h4'} sx={{display: 'flex', alignItems: 'center', fontWeight: '400'}}><PeopleIcon sx={{backgroundColor:'#00fc2e', color: 'white', borderRadius: '50%', height: '40px', width: '40px', mr: 1, p: 1}}/> Total Signup Customers





</Box></Box>
                      <Box sx={{fontSize: '30px', fontWeight: '600'}}>0</Box>
                    </Box>
                  </Grid>
                  </Grid>

          <Grid container spacing={1} sx={{mt: 3}}>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <TableContainer component={Paper} sx={{ borderRadius: "15px", boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                      <Box sx={{padding: '8px 15px', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>Recent Sale Orders (3) <Button size='small' color='secondary' variant='outlined' sx={{textTransform: 'capitalize', borderRadius: '35px', fontWeight: '600', fontSize: '12px'}}>All Sales</Button></Box>
            <Table
              size="small"
              sx={{ minWidth: 250 }}
              aria-label="simple table"
            >
              
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f3f5f9", fontSize: '1px !important' }}>
                  
                  <TableCell sx={{ fontWeight: "bold", fontSize: '12px' }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: '12px' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: '12px' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: '12px', textAlign: 'center' }}>Action</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0, color: 'rgb(125, 135, 156)' } }}
                    >
                      
                        
                      <TableCell sx={{fontSize: '12px'}}>
                    02933935
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 150,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: '12px'
                        }}
                      >
                     <Box sx={{borderRadius: '35px', backgroundColor: '#e7f9ed', color: '#33d08c', fontWeight: '600', display: 'inline-block', padding: '3px 10px'}}>Complete</Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 150,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: '12px'
                        }}
                      >
                    £1,414.09
                      </TableCell>
                      <TableCell sx={{fontSize: '12px', textAlign: 'center'}}>
                        <Visibility color='success' sx={{cursor: 'pointer'}}/>
                      </TableCell>
                      
                    </TableRow>
                 
              </TableBody>
            </Table>
          </TableContainer>
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <TableContainer component={Paper} sx={{ borderRadius: "15px", boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                      <Box sx={{padding: '8px 15px', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>Out of Stock Products (228) <Button size='small' color='secondary' variant='outlined' sx={{textTransform: 'capitalize', borderRadius: '35px', fontWeight: '600', fontSize: '12px'}}>All Products</Button></Box>
            <Table
              size="small"
              sx={{ minWidth: 250 }}
              aria-label="simple table"
            >
              
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f3f5f9" }}>
                  
                  <TableCell sx={{ fontWeight: "bold", fontSize: '12px' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: '12px' }}>SKU</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: '12px' }}>Active</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: '12px' }}>Stock</TableCell>
                 <TableCell sx={{ fontWeight: "bold", fontSize: '12px' }}>Min Stock Alert</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0, color: 'rgb(125, 135, 156)' } }}
                    >
                      
                        
                      <TableCell sx={{fontSize: '12px'}}>
                    iPhone 16 Pro Max
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 150,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: '12px'
                        }}
                      >
                     123456
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 150,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: '12px'
                        }}
                      >
                    Sale
                      </TableCell>
                      <TableCell sx={{fontSize: '12px'}}>
                        12
                      </TableCell>
                      <TableCell sx={{fontSize: '12px', color: 'red !important', fontWeight: '600'}}>
                        0
                      </TableCell>
                    </TableRow>
                 
              </TableBody>
            </Table>
          </TableContainer>
                  </Grid>
                  </Grid>
          
        </Container>
      </Box>
  )
}

export default Dashboard