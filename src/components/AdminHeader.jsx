import { Button } from '@mui/material'
import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import MenuIcon from '@mui/icons-material/Menu';

const AdminHeader = ({handleLeftSidebar}) => {
  const navigation = useNavigate();
  return (
    <header className='admin-header'>
        <Button variant='outlined' size='small' onClick={handleLeftSidebar} className='menu-mobile-btn' color='secondary' sx={{mr: 2, minWidth: '43px'}}><MenuIcon/></Button>
        <Button className="custom-primary-btn-bw" onClick={()=>navigation('/')} target='_blank' sx={{mr: 1}} size='small'><LanguageIcon/> Browse Web</Button>
    </header>
  )
}

export default AdminHeader
