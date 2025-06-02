import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import TextFieldCommon from '../../components/TextFieldCommon'
import PassHideShow from '../../components/PassHideShow'
import { NavLink } from 'react-router'
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useFormik } from 'formik'
import * as yup from "yup";
const Login = () => {
  const {values, errors, touched, handleBlur, handleChange,  handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required()
    }),
    onSubmit: async (values, action) => {

    }
  })
  return (
    <>
        <Box sx={{backgroundColor: '#f5f5f5', height: '100vh', width: '100%'}}>
            <Box className='login-singup-page' sx={{padding: '25px', borderRadius: '10px', width: '450px'}}>
                   <Typography
            variant="h4"
            noWrap
            component="a"
            href="https://example.com"
            sx={{ display: {display: 'block', marginBottom: '10px' },
    '&::first-letter': {
      color: '#f76209', // Or any custom color like '#f00'
    }, fontWeight: 'bold', color: 'black', textDecoration: 'none', textAlign: 'center' }}
          >
            STORE
          </Typography>
          <Typography variant='h6' sx={{fontWeight: '600'}}>Log In</Typography>
                <form action="" onSubmit={handleSubmit}>
              
                <TextFieldCommon label={'Email'} variant={'outlined'} type={'email'} mb={'25px'} 
                  name={"email"}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                errormessage={errors.email}/>
                  <PassHideShow mb={'25px'} 
                   label={'Password'}
                  name={"password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                errormessage={errors.password}/>
                  <Button fullWidth variant='contained' sx={{marginBottom: '10px', marginTop: '25px', padding: '10px', backgroundColor: '#f76209', textTransform: 'capitalize', fontWeight: '600'}}><LoginIcon sx={{marginRight: '10px'}}/> Login</Button>
                  <Typography sx={{textAlign: 'center', marginBottom: '10px'}}>OR</Typography>
                                    <Button type='submit' fullWidth variant='outlined' sx={{marginBottom: '20px', padding: '9px', border: '1px solid #f76209', color: '#f76209', textTransform: 'capitalize', fontWeight: '600'}}><PersonOutlineIcon sx={{marginRight: '10px'}}/> Continue As Guest</Button>
                                    <Typography variant='body2' sx={{textAlign: 'center'}}>Don't have an account?
<NavLink to={'/signup'} style={{marginLeft: '5px', fontWeight: '600', color: 'black'}}>Sign Up</NavLink></Typography>
<Box sx={{padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px', marginTop: '14px'}}>
    <Typography variant='body2' sx={{textAlign: 'center'}}>Forgot your password?

<NavLink to={'/signup'} style={{marginLeft: '5px', fontWeight: '600', color: 'black'}}>Reset It</NavLink></Typography>
</Box>
            </form>
            </Box>
        </Box>
    </>
  )
}

export default Login