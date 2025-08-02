import { Box, Button, Checkbox, Container, IconButton, Pagination, Switch, TextField } from '@mui/material'
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
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { getBrandsApi } from '../../utils/apis/APIs';

const label = { inputProps: { 'aria-label': 'Color switch demo' } };





const Brands = () => {
  const [reload, setReload] = useState(false);
const [getBrandsDataResult, setBrandsDataResult] = useState([]);
const getBrandsData = async () => {

  let res = await getBrandsApi({business_id: '123'});
  if(res.status == 200){
    setBrandsDataResult(res.data.result);
    console.log(res.data.result)
  }
}
const handleSetReloadFunc = ()=>{
  setReload(!reload)
  console.log('fffffffffffff')
}
useEffect(()=>{
  getBrandsData();
}, [reload, setReload])
 
  return (
    <>
      <Box sx={{ backgroundColor: '#f0f0f0', height: '100%', width: '100%', py: 3, overflowY: 'auto' }}>
      <Container sx={{ maxWidth: '100% !important' }}>
        <Box component={'h2'} sx={{display: 'flex', alignItems: 'center'}}> <LocalOfferIcon sx={{mr: 1}} color='secondary'/> Brands</Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3, mt: 3}}> 
          <TextField id="outlined-basic" label="Search Brand" sx={{backgroundColor: 'white', borderRadius: '5px'}} variant="outlined" size='small' color='secondary' />
          <BrandModal handleSetReloadFunc={handleSetReloadFunc}/>
        </Box>





   <TableContainer component={Paper}>
      <Table size='small' sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
             <TableCell sx={{fontWeight: 'bold'}}><Checkbox size='small' {...label} defaultChecked color="secondary" /></TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Image</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Brand Name</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Slug</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Active</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getBrandsDataResult.map((list)=>(
             <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Checkbox size='small' {...label} defaultChecked color="secondary" />
              </TableCell>
               <TableCell>
               <Box sx={{height: '40px', width: '40px', border: '1px solid #dddddd', borderRadius: '5px', overflow: 'hidden'}}>
                <img style={{height: '100%', width: '100%', objectFit: 'cover'}} src={list?.brand_image ? import.meta.env.VITE_BASE_URL+'/uploads/'+list?.brand_image : '/empty-image.jpg'} alt="" />
               </Box>
              </TableCell>
              <TableCell>
                {list?.brand_name}
              </TableCell>
              <TableCell>{list?.slug}</TableCell>
              <TableCell><Switch size='small' {...label} defaultChecked color="secondary" /></TableCell>
              <TableCell >
                <IconButton size='small' aria-label="edit" color='primary'>
  <EditIcon />
</IconButton>
                 <IconButton size='small' aria-label="delete" color='error'>
  <DeleteIcon />
</IconButton></TableCell>
            </TableRow>
          ))}
           
       
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
                <Pagination count={10} variant="outlined" color='secondary' />
              </Box>





      </Container>
      </Box>
    </>
  )
}

export default Brands