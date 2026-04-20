import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomerOrderTabs from "../../components/CustomerOrderTabs";
import Paper from '@mui/material/Paper';
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router";
import { handleSuccess } from "../../toast";
import { useLogout } from "../../hook/auth/useLogout";


const ProfileInfo = () => {
    const navigate = useNavigate()
    const logoutMutation = useLogout();
    const handleLogout = () => {
  logoutMutation.mutate(undefined, {
    onSuccess: () => {
      localStorage.clear();
      setAnchorElUser(null);
      handleSuccess("You are logout!");
      navigate("/");
    },
    onError: () => {
      localStorage.clear();
      setAnchorElUser(null);
      navigate("/");
    },
  });
};
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexDirection: {xs: 'column', sm: "row", md: "row", lg: "row"} }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "25px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <PersonIcon sx={{ mr: 1 }} /> My Profile
          </Typography>
         
          <EditProfile/>
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: 'center',
                height: '100%'
              }}
            >
              
              <Box sx={{display: 'flex', alignItems: 'center'}}><Box
                sx={{
                  height: "60px",
                  width: "60px",
                  border: "1px solid #dddddd",
                  borderRadius: "50%",
                  overflow: "hidden",
                  mr: 2
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={"/empty-image.jpg"}
                  alt=""
                />
              </Box> <Typography
  variant="h3"
  sx={{
    fontSize: { xs: '12px', sm: "15px", md: "18px", lg: "20px" }, // responsive sizes
    fontWeight: 600,
  }}
>
  Humair Sarwar
</Typography></Box>
              <Box>
                {" "}
                <Button
                onClick={handleLogout}
                  variant="outlined"
                  color="secondary"
                  sx={{ borderRadius: "35px", textTransform: "capitalize" }}
                  size="small"
                >
                  <LogoutIcon sx={{ mr: 1, fontSize: "14px" }} /> Logout
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <CustomerOrderTabs/>
          </Grid>
           <Grid size={{ xs: 12}}>
            <TableContainer component={Paper} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px !important', borderRadius: '5px', mb: 1}}>
      <Table aria-label="simple table">
       
        <TableBody>
         
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{textWrap: 'nowrap'}}>
                First Name: <Box sx={{display: 'inline-block', color: '#7a7a7aff'}}>Humair</Box>
              </TableCell>
              <TableCell sx={{textWrap: 'nowrap'}}>Last Name: <Box sx={{display: 'inline-block', color: '#7a7a7aff'}}>Sarwar</Box></TableCell>
            <TableCell sx={{textWrap: 'nowrap'}}>Email: <Box sx={{display: 'inline-block', color: '#7a7a7aff'}}>humair@gmail.com</Box></TableCell>
            <TableCell sx={{textWrap: 'nowrap'}}>Phone: <Box sx={{display: 'inline-block', color: '#7a7a7aff'}}>03088340373</Box></TableCell>
            <TableCell sx={{textWrap: 'nowrap'}}>DOB(Date Of Birth): <Box sx={{display: 'inline-block', color: '#7a7a7aff'}}>28-08-2001</Box></TableCell>
            </TableRow>
    
        </TableBody>
      </Table>
    </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfileInfo;
