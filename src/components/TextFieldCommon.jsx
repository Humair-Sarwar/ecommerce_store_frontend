import { TextField, Typography } from '@mui/material'
import React from 'react'

const TextFieldCommon = (props) => {
   
  return (
   <>
      <TextField  {...props}  autoComplete="off" id="outlined-basic" fullWidth  sx={{
        marginTop: props.mb,
    '& label': {
      color: 'black',
    },
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  }}/>
  {props.error && <Typography sx={{fontSize: '12px', color: 'red'}}>{props.errormessage}</Typography>}
   </>
  )
}

export default TextFieldCommon