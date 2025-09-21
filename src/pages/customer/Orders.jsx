import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React from 'react'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Paper from '@mui/material/Paper';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OrderProcessingSection from '../../components/OrderProcessingSection';

const Orders = () => {
  return (
    <>
      <Box sx={{width: '100%'}}>
      <Typography variant='h2' sx={{fontSize: '25px', fontWeight: '600', display: 'flex', alignItems: 'center', mb: 3}}><LocalMallIcon sx={{mr: 1}}/> My Orders</Typography>
     <TableContainer component={Paper} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px !important', borderRadius: '5px', mb: 1, cursor: 'pointer'}}>
      <Table aria-label="simple table">
       
        <TableBody>
         
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{textWrap: 'nowrap'}}>
                Order # <Box sx={{display: 'inline-block', color: '#7a7a7aff'}}>123456</Box>
              </TableCell>
              <TableCell sx={{textWrap: 'nowrap'}}>Created: <Box sx={{display: 'inline-block', color: '#7a7a7aff'}}>02, Aug 2025 05:53 PM</Box></TableCell>
            <TableCell sx={{textWrap: 'nowrap'}}>Shipping Method: <Box sx={{display: 'inline-block', color: '#7a7a7aff'}}>Ship</Box></TableCell>
            <TableCell sx={{textWrap: 'nowrap'}}>Total: <Box sx={{display: 'inline-block', color: '#7a7a7aff'}}>£1,414.10</Box></TableCell>
 <TableCell sx={{textWrap: 'nowrap'}}><Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: '#e7f9ed', color: '#33d08c',
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      fontSize: '12px'
                    }}
                  >
                    Complete
                  </Box></TableCell>
<TableCell><Box sx={{backgroundColor: 'black', borderRadius: '50%', cursor: 'pointer', width: '20px', height: '20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ChevronRightIcon sx={{fontSize: '14px'}}/></Box></TableCell>
            </TableRow>
    
        </TableBody>
      </Table>
    </TableContainer>
  
     <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            my: 2,
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
      </Box>
      
    </>
  )
}

export default Orders
