import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import TextFieldCommon from "../../components/TextFieldCommon";
import PassHideShow from "../../components/PassHideShow";
import { Link, NavLink, useNavigate } from "react-router";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { useFormik } from "formik";
import * as yup from "yup";
import { handleError, handleSuccess } from "../../toast";
import { signupApi } from "../../utils/apis/APIs";
import { useSignup } from "../../hook/auth/useSignup";

const Signup = () => {
  const navigation = useNavigate();
  const signupMutation = useSignup();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: yup.object({
        first_name: yup.string().min(2).max(255).required(),
        last_name: yup.string().min(2).max(255).required(),
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
        confirm_password: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      }),
      onSubmit: async (values, action) => {
        const data = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
        };

        signupMutation.mutate(data, {
          onSuccess: () => {
            action.resetForm();
            handleSuccess("Successfully User Created!");
            navigation("/login");
          },

          onError: (error) => {
            if (error?.response?.status === 422) {
              handleError("Email Already exist");
            } else {
              handleError("Internal Server Error");
            }
          },
        });
      },
    });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f8fafc",
        backgroundImage: `
          radial-gradient(at 15% 15%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
          radial-gradient(at 85% 85%, rgba(249, 115, 22, 0.08) 0px, transparent 50%),
          radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.03) 0px, transparent 60%)
        `,
        py: 5,
        px: 2,
      }}
    >
      <Box
        className="login-singup-page"
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.07)",
          p: { xs: 3, sm: 4.5 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top Accent Pill Bar */}
        <Box
          sx={{
            width: "48px",
            height: "4px",
            borderRadius: "999px",
            background: "linear-gradient(90deg, #0f172a 0%, #10b981 100%)",
            mx: "auto",
            mb: 3,
          }}
        />

        {/* Brand Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2.25,
                py: 1.25,
                borderRadius: "16px",
                backgroundColor: "#f8fafc",
                border: "1px solid #f1f5f9",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#cbd5e1",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <CardMedia
                component="img"
                style={{
                  height: "36px",
                  width: "auto",
                  objectFit: "contain",
                }}
                image="/self_mart_1755699970080.png"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo.png";
                }}
                alt="Self Mart Logo"
              />
            </Box>
          </Link>
        </Box>

        {/* Heading & Subtitle */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              fontSize: "24px",
              mb: 0.5,
            }}
          >
            Create an Account
          </Typography>
          <Typography
            sx={{
              fontSize: "13.5px",
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            Join Self Mart to track orders, save favorites & checkout faster
          </Typography>
        </Box>

        <form action="" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldCommon
                label={"First Name"}
                variant={"outlined"}
                type={"text"}
                mb={"8px"}
                name={"first_name"}
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.first_name && touched.first_name}
                errormessage={errors.first_name}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldCommon
                label={"Last Name"}
                variant={"outlined"}
                type={"text"}
                mb={"8px"}
                name={"last_name"}
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.last_name && touched.last_name}
                errormessage={errors.last_name}
              />
            </Grid>
          </Grid>

          <TextFieldCommon
            label={"Email Address"}
            variant={"outlined"}
            type={"email"}
            mb={"18px"}
            name={"email"}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            errormessage={errors.email}
          />

          <PassHideShow
            mb={"18px"}
            label={"Password"}
            name={"password"}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            errormessage={errors.password}
          />

          <PassHideShow
            mb={"18px"}
            label={"Retype Password"}
            name={"confirm_password"}
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirm_password && touched.confirm_password}
            errormessage={errors.confirm_password}
          />

          {/* Terms & Condition Notice */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
              mt: 2.5,
              mb: 2,
            }}
          >
            <VerifiedUserOutlinedIcon
              sx={{ fontSize: "16px", color: "#10b981" }}
            />
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "12.5px",
                fontWeight: 500,
              }}
            >
              By signing up, you agree to our
              <NavLink
                to={"/signup"}
                style={{
                  marginLeft: "5px",
                  fontWeight: 700,
                  color: "#0f172a",
                  textDecoration: "underline",
                }}
              >
                Terms & Condition
              </NavLink>
            </Typography>
          </Box>

          {/* Create Account Button */}
          <Button
            className="custom-primary-btn"
            onClick={handleSubmit}
            fullWidth
            disabled={signupMutation.isPending}
            sx={{
              mb: 2,
              py: 1.4,
              borderRadius: "12px",
              backgroundColor: "#0f172a",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.18)",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#1e293b",
                transform: "translateY(-1px)",
                boxShadow: "0 12px 24px rgba(15, 23, 42, 0.24)",
              },
              "&.Mui-disabled": {
                backgroundColor: "#cbd5e1 !important",
                color: "#64748b !important",
                boxShadow: "none",
                cursor: "not-allowed !important",
              },
            }}
          >
            <SaveAsIcon sx={{ mr: 1, fontSize: "19px" }} />
            {signupMutation.isPending ? "Creating..." : "Create Account"}
          </Button>

          {/* Already have an account Footer Box */}
          <Box
            sx={{
              p: 1.5,
              backgroundColor: "#f8fafc",
              border: "1px solid #f1f5f9",
              borderRadius: "12px",
              mt: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "13.5px",
                fontWeight: 500,
              }}
            >
              Already have an account?
              <NavLink
                to={"/login"}
                style={{
                  marginLeft: "6px",
                  fontWeight: 700,
                  color: "#0f172a",
                  textDecoration: "none",
                }}
              >
                Log In
              </NavLink>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
