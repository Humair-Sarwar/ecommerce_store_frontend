import { Button } from "@mui/material";
import React from "react";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useNavigate } from "react-router";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import MenuIcon from "@mui/icons-material/Menu";

const AdminHeader = ({ handleLeftSidebar }) => {
  const navigation = useNavigate();
  return (
    <header className="admin-header" style={{ height: "66px" }}>
      <Button
        variant="outlined"
        size="small"
        onClick={handleLeftSidebar}
        className="menu-mobile-btn"
        color="secondary"
        sx={{ mr: 2, minWidth: "43px" }}
      >
        <MenuIcon />
      </Button>
      <Button
        component="a"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        startIcon={<TravelExploreIcon sx={{ fontSize: "20px" }} />}
        sx={{
          mr: 1,
          px: 3,
          py: 1,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "25px", // Smooth rounded corners

          // Modern Indigo Gradient
          background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
          color: "#ffffff",

          // Glass effect and shadow
          boxShadow:
            "0 4px 15px rgba(168, 85, 247, 0.25), inset 0 1px 1px rgba(255,255,255,0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",

          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", // Bouncy premium feel
          cursor: "pointer",

          "&:hover": {
            // Glow effect on hover
            boxShadow:
              "0 8px 25px rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)",
            transform: "scale(1.05) translateY(-2px)",
            background: "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
          },

          "&:active": {
            transform: "scale(0.98)",
          },

          // Subtle icon animation
          "& .MuiButton-startIcon": {
            transition: "transform 0.4s ease",
          },
          "&:hover .MuiButton-startIcon": {
            transform: "translateX(-2px) scale(1.1)",
          },
        }}
      >
        Browse Web
      </Button>
    </header>
  );
};

export default AdminHeader;
