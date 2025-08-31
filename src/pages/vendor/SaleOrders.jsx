import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from "@mui/material/Paper";
import {



  IconButton,
  Pagination,
  Switch,

 

 


  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from 'react-router';


const SaleOrders = () => {
const navigate = useNavigate();
const [searchBy, setSearchBy] = React.useState('');
      const handleChange = (event) => {
    setSearchBy(event.target.value);
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
          <ShoppingCartIcon 
            sx={{ mr: 1, fontSize: "17px" }}
            color="secondary"
          />{" "}
          Sales
        </Box>
          <Box sx={{ mb: 3}}>
             <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                     <FormControl sx={{  minWidth: 120, backgroundColor: 'white' }} size="small" fullWidth>
      <InputLabel id="demo-select-small-label" color='secondary'>Search By</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={searchBy}
        label="Age"
        onChange={handleChange}
        color='secondary'
        
      >
        
          <MenuItem value={10} sx={{fontSize: '14px'}}>ID</MenuItem>
    <MenuItem value={20} sx={{fontSize: '14px'}}>Customer</MenuItem>
      </Select>
    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                     <TextField sx={{backgroundColor: 'white'}} id="outlined-basic" label="Search..." fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                     <FormControl sx={{  minWidth: 120, backgroundColor: 'white' }} size="small" fullWidth>
      <InputLabel id="demo-select-small-label" color='secondary'>Payment Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={searchBy}
        label="Age"
        onChange={handleChange}
        color='secondary'
        
      >
        
          <MenuItem value={10} sx={{fontSize: '14px'}}>All</MenuItem>
    <MenuItem value={20} sx={{fontSize: '14px'}}>Cash</MenuItem>
      <MenuItem value={30} sx={{fontSize: '14px'}}>Card</MenuItem>
      </Select>
    </FormControl>
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                     <FormControl sx={{  minWidth: 120, backgroundColor: 'white' }} size="small" fullWidth>
      <InputLabel id="demo-select-small-label" color='secondary'>Status</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={searchBy}
        label="Age"
        onChange={handleChange}
        color='secondary'
        
      >
        
          <MenuItem value={10} sx={{fontSize: '14px'}}>All</MenuItem>
    <MenuItem value={20} sx={{fontSize: '14px'}}>Cash</MenuItem>
      <MenuItem value={30} sx={{fontSize: '14px'}}>Card</MenuItem>
      </Select>
    </FormControl>
                  </Grid>
                  </Grid>
          </Box>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "15px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            overflowX: "auto",
          }}
          className="table-scroll-design-set"
        >
          <Table sx={{ minWidth: 650 }} aria-label="responsive table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f5f9" }}>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                 ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Customer
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Shipping Address	
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Shipping Method	
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Status
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Estimated Delivery
                </TableCell>
               
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                    textAlign: 'center'
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontSize: "12px", padding: "10px" }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                    }}
                  >
                    15968932
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", padding: "12px", minWidth: "200px" }}
                >
                  23, Aug 2025 10:45 PM
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#dbf0fe",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "#4e97fd",
                    }}
                  >
                   humair@gmail.com
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: '#e7f9ed', color: '#33d08c',
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                    }}
                  >
                    N/A
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                 test 1
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  £81.00 / Cash
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: '#fff8e5', color: '#ffcd4e',
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Accept
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  26, Aug 2025 10:45 PM
                </TableCell>
                
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                   <Box sx={{display: 'flex', alignItems: 'center'}}>
                  
                    <Tooltip title="View" arrow onClick={()=>navigate(`/vendor/orders/buy/1`)}>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="primary"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                       
                       
                        </Box>
                </TableCell>
              </TableRow>
         
            </TableBody>
          </Table>
         
        </TableContainer>
         <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        my: 4,
                      }}
                    >
                      <Pagination
                        count={3}
                        page={1}
                        // onChange={(event, value) => setPage(value)}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2 }}
                      />
                    </Box>
      </Container>
    </Box>
  )
}

export default SaleOrders
