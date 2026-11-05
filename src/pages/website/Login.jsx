import { Box, Button, CardMedia, Typography } from "@mui/material";
import React from "react";
import TextFieldCommon from "../../components/TextFieldCommon";
import PassHideShow from "../../components/PassHideShow";
import { Link, NavLink, useNavigate } from "react-router";
import LoginIcon from "@mui/icons-material/Login";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginApi } from "../../utils/apis/APIs";
import { handleError, handleSuccess } from "../../toast";
import { useLogin } from "../../hook/auth/useLogin";

const Login = () => {
  const navigation = useNavigate();
  const loginMutation = useLogin();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
      }),
      onSubmit: (values) => {
        loginMutation.mutate(
          {
            email: values.email,
            password: values.password,
          },
          {
            onSuccess: (data) => {
              handleSuccess("You're Successfully Login!");

              localStorage.setItem("token", data?.token);
              localStorage.setItem("user_id", data.user?.id);
              localStorage.setItem("user_type", data.user?.user_type);
              // console.log(data)
              if (data?.user?.user_type == 1) {
                navigation("/");
              } else {
                navigation("/vendor/dashboard");
              }
            },

            onError: (error) => {
              if (
                error?.response?.status === 401 ||
                error?.response?.status === 404
              ) {
                handleError("Email or password is wrong!");
              } else {
                handleError("Something went wrong!");
              }
            },
          },
        );
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
          maxWidth: "460px",
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
            Welcome Back
          </Typography>
          <Typography
            sx={{
              fontSize: "13.5px",
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            Log in to your account to continue shopping & managing orders
          </Typography>
        </Box>

        <form action="" onSubmit={handleSubmit}>
          <TextFieldCommon
            label={"Email Address"}
            variant={"outlined"}
            type={"email"}
            mb={"16px"}
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

          {/* Primary Login Button */}
          <Button
            onClick={handleSubmit}
            className="custom-primary-btn"
            fullWidth
            disabled={loginMutation.isPending}
            sx={{
              mt: 3,
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
                cursor: "not-allowed",
              },
            }}
          >
            {loginMutation.isPending ? (
              "Logging in..."
            ) : (
              <>
                <LoginIcon sx={{ mr: 1, fontSize: "19px" }} /> Log In
              </>
            )}
          </Button>

          {/* Styled Divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              my: 2,
            }}
          >
            <Box sx={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
            <Typography
              sx={{
                fontSize: "11.5px",
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "0.08em",
              }}
            >
              OR
            </Typography>
            <Box sx={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
          </Box>

          {/* Continue as Guest Button */}
          <Button
            className="custom-secondary-btn"
            onClick={() => navigation("/")}
            fullWidth
            sx={{
              mb: 2.5,
              py: 1.25,
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1.5px solid #e2e8f0",
              fontWeight: 600,
              fontSize: "13.5px",
              textTransform: "none",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#f8fafc",
                borderColor: "#cbd5e1",
                color: "#0f172a",
              },
            }}
          >
            <PersonOutlineIcon sx={{ mr: 1, fontSize: "19px", color: "#64748b" }} />
            Continue As Guest
          </Button>

          {/* Sign Up Link */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "13.5px",
              fontWeight: 500,
            }}
          >
            Don't have an account?
            <NavLink
              to={"/signup"}
              style={{
                marginLeft: "6px",
                fontWeight: 700,
                color: "#0f172a",
                textDecoration: "none",
              }}
            >
              Sign Up
            </NavLink>
          </Typography>

          {/* Forgot Password Footer Box */}
          <Box
            sx={{
              mt: 2.5,
              p: 1.5,
              backgroundColor: "#f8fafc",
              border: "1px solid #f1f5f9",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
            }}
          >
            <LockResetRoundedIcon sx={{ fontSize: "18px", color: "#64748b" }} />
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Forgot your password?
              <NavLink
                to={"/signup"}
                style={{
                  marginLeft: "6px",
                  fontWeight: 700,
                  color: "#f97316",
                  textDecoration: "none",
                }}
              >
                Reset It
              </NavLink>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
