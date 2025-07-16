import { Box, Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'


import CategoryIcon from "@mui/icons-material/Category";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CategoryModal from './CreatedCategoryModal';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BrandModal from './BrandCreateModal';





import { DataGrid } from '@mui/x-data-grid';

import Paper from '@mui/material/Paper';
import { getBrandsApi } from '../../utils/apis/APIs';

const columns = [
  { field: 'id', headerName: 'Name', width: 70 },
  { field: 'firstName', headerName: 'Slug', width: 130 },
  { field: 'lastName', headerName: 'Active', width: 130 },
  {
    field: 'Action',
    headerName: 'Age',
    type: 'number',
    width: 90,
  }
];



const paginationModel = { page: 0, pageSize: 5 };


const Brands = () => {
const [getBrandsDataResult, setBrandsDataResult] = useState([]);
const getBrandsData = async () => {

  let res = await getBrandsApi({business_id: '123'});
  if(res.status == 200){
    setBrandsDataResult(res.data.result);
    console.log(res.data.result)
  }
}
useEffect(()=>{
  getBrandsData();
}, [])
  const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
  return (
    <>
      <Box sx={{ backgroundColor: '#f0f0f0', height: '100%', width: '100%', py: 3, overflowY: 'auto' }}>
      <Container sx={{ maxWidth: '100% !important' }}>
        <Box component={'h2'} sx={{display: 'flex', alignItems: 'center'}}> <LocalOfferIcon sx={{mr: 1}}/> Brands</Box>
        <Box sx={{display: 'flex', justifyContent: 'end', mb: 2}}> 
          <BrandModal/>
        </Box>





 <TableContainer component={Paper}>
     <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    </TableContainer>






      </Container>
      </Box>
    </>
  )
}

export default Brands