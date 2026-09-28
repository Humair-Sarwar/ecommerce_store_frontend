import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const POSLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "#f1f5f9",
        // Apply Poppins exclusively to this layout and its children
        fontFamily: "'Poppins', sans-serif",
        "& *": {
          fontFamily: "'Poppins', sans-serif !important",
        },
      }}
    >
      <Box sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default POSLayout;