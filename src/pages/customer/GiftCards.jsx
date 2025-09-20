import { Box, Typography } from '@mui/material'
import React from 'react'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const GiftCards = () => {
  return (
    <>
      <Box sx={{width: '100%'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                          <Typography variant='h2' sx={{fontSize: '25px', fontWeight: '600', display: 'flex', alignItems: 'center', mb: 3}}><CardGiftcardIcon sx={{mr: 1}}/> My Gift Cards</Typography>

        </Box>
        <Box sx={{textAlign: 'center', }}><Typography sx={{color: 'black', fontSize: '14px'}}>No Gift Cards Available!</Typography></Box>
      </Box>
    </>
  )
}

export default GiftCards
