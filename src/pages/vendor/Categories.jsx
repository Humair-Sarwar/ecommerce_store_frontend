import { Box, Button, Container } from '@mui/material'
import React from 'react'


import CategoryIcon from "@mui/icons-material/Category";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CategoryModal from './CreatedCategoryModal';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];





const Categories = () => {

  
  return (
    <>
      <Box sx={{ backgroundColor: '#f0f0f0', height: '100%', width: '100%', py: 3, overflowY: 'auto' }}>
      <Container sx={{ maxWidth: '100% !important' }}>
        <Box component={'h2'} sx={{display: 'flex', alignItems: 'center'}}> <CategoryIcon sx={{mr: 1}}/> Categories</Box>
        <Box sx={{display: 'flex', justifyContent: 'end', mb: 2}}> 
          <CategoryModal/>
        </Box>





 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">	Name</TableCell>
            <TableCell align="left">Slug</TableCell>
            <TableCell align="left">	Sort Order</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
             
fas







            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>






      </Container>
      </Box>
    </>
  )
}

export default Categories