import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import React from "react";
import TextFieldCommon from "../../components/TextFieldCommon";
import PassHideShow from "../../components/PassHideShow";
import { Link, NavLink, useNavigate } from "react-router";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useFormik } from "formik";
import * as yup from "yup";
import { signupApi } from "../../utils/apis/apis";
import { handleError, handleSuccess } from "../../toast";

const Signup = () => {
  const navigation = useNavigate()
    const {values,  errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        validationSchema: yup.object({
             first_name: yup.string().min(2).max(100).required(),
            last_name: yup.string().min(2).max(100).required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
              confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
        }), onSubmit: async (values, action) =>{
            let data = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
                confirm_password: values.confirm_password
            }
            const response = await signupApi(data);
            if(response.status == 201){
                action.resetForm();
                handleSuccess('Successfully User Created!');
                navigation('/login')
            }else if(response.status == 409){
              handleError('Email Already exist');
            }else{
              handleError('Internal Server Error')
            }
        }
    })
  return (
    <>
      <Box sx={{ backgroundColor: "#f5f5f5", height: "120vh", width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          className="login-singup-page"
          sx={{ padding: "25px", borderRadius: "10px", width: "450px", my: 10, mx: 1 }}
        >
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Link to={"/"}>
                <CardMedia
                  component="img"
                  style={{ height: "auto", width: "70px" }}
                  image="/logo.png"
                  alt="Footer Logo"
                />
              </Link></Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", marginBottom: '0' }}
          >
            Sign Up
          </Typography>
          <form action="" onSubmit={handleSubmit}>
            <TextFieldCommon
              label={"First Name"}
              variant={"outlined"}
              type={"text"}
              mb={"25px"}

               name={"first_name"}
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.first_name && touched.first_name}
                errormessage={errors.first_name}
            />
            <TextFieldCommon
              label={"Last Name"}
              variant={"outlined"}
              type={"text"}
              mb={"25px"}

              name={"last_name"}
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.last_name && touched.last_name}
                errormessage={errors.last_name}
            />
            <TextFieldCommon
              label={"Email"}
              variant={"outlined"}
              type={"email"}
              mb={"25px"}
               name={"email"}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                errormessage={errors.email}
            />
            <PassHideShow mb={"25px"} label={'Password'}    name={"password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                errormessage={errors.password}/>
            <PassHideShow mb={"25px"} label={'Retype Password'} name={"confirm_password"}
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirm_password && touched.confirm_password}
                errormessage={errors.confirm_password}/>
              <Typography variant="body2" sx={{ textAlign: "center", marginBottom: '15px', marginTop: '20px'}}>
              By signing up, you agree to 

              <NavLink
                to={"/signup"}
                style={{ marginLeft: "5px", fontWeight: "600", color: "black", }}
              >
                Terms & Condtion
              </NavLink>
            </Typography>
            
                <Button className="custom-primary-btn" onClick={handleSubmit} fullWidth sx={{marginBottom: "15px"}}><SaveAsIcon sx={{marginRight: '10px'}}/> Create Account</Button>

          
            <Box
              sx={{
                padding: "15px",
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                marginTop: "14px",
              }}
            >
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Already have an account?
                <NavLink
                  to={"/login"}
                  style={{
                    marginLeft: "5px",
                    fontWeight: "600",
                    color: "black",
                  }}
                >
                  Log In 
                </NavLink>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
