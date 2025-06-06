import { Box, Button, CardMedia, TextField, Typography } from '@mui/material'
import React from 'react'
import TextFieldCommon from '../../components/TextFieldCommon'
import PassHideShow from '../../components/PassHideShow'
import { Link, NavLink } from 'react-router'
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
        <Box sx={{backgroundColor: '#f5f5f5', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box className='login-singup-page' sx={{padding: '25px', borderRadius: '10px', width: '450px', my: 10}}>
                  <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Link to={"/"}>
                <CardMedia
                  component="img"
                  style={{ height: "auto", width: "70px" }}
                  image="/logo.png"
                  alt="Footer Logo"
                />
              </Link></Box>
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
                <Button className="custom-primary-btn" fullWidth sx={{marginBottom: '10px', marginTop: '25px'}}><LoginIcon sx={{marginRight: '10px'}}/> Login</Button>
                  <Typography sx={{textAlign: 'center', marginBottom: '10px'}}>OR</Typography>
                  <Button className="custom-secondary-btn" sx={{marginBottom: '20px'}} fullWidth><PersonOutlineIcon sx={{marginRight: '10px'}}/> Continue As Guest</Button>
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