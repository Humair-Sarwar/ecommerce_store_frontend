import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import POSNavDrawer from "./POSNavDrawer";

const POSHeader = ({ activeMode, setActiveMode, showScanner, setShowScanner }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: "52px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          px: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
          gap: 1,
        }}
      >
        {/* LEFT SECTION: Menu, Logo, Sale/Repair, Scan */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          {/* Sidebar Menu Toggle */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.08)",
              color: "#ffffff",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)", transform: "scale(1.05)" },
            }}
          >
            <MenuIcon sx={{ fontSize: "18px" }} />
          </IconButton>

          {/* Modern Glass Store Brand / Logo Badge */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
              color: "#0f172a",
              px: 1.2,
              py: 0.3,
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: 800,
              lineHeight: 1.1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <span style={{ fontWeight: 800, letterSpacing: "0.3px" }}>GADGETS</span>
            <span style={{ fontSize: "6.5px", color: "#64748b", fontWeight: 600, letterSpacing: "0.6px" }}>SOLUTION</span>
          </Box>

          {/* Sale & Repair Toggle Buttons */}
          <Button
            variant={activeMode === "sale" ? "contained" : "outlined"}
            onClick={() => setActiveMode("sale")}
            sx={{
              background: activeMode === "sale" ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" : "transparent",
              color: "#ffffff",
              borderColor: activeMode === "sale" ? "transparent" : "rgba(255, 255, 255, 0.2)",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "11.5px",
              letterSpacing: "0.2px",
              height: "32px",
              px: 1.5,
              borderRadius: "8px",
              boxShadow: activeMode === "sale" ? "0 4px 12px rgba(239, 68, 68, 0.35)" : "none",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                background: activeMode === "sale" ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" : "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.4)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Sale
          </Button>

          <Button
            variant={activeMode === "repair" ? "contained" : "outlined"}
            onClick={() => setActiveMode("repair")}
            sx={{
              background: activeMode === "repair" ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" : "transparent",
              color: "#ffffff",
              borderColor: activeMode === "repair" ? "transparent" : "rgba(255, 255, 255, 0.2)",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "11.5px",
              letterSpacing: "0.2px",
              height: "32px",
              px: 1.5,
              borderRadius: "8px",
              boxShadow: activeMode === "repair" ? "0 4px 12px rgba(239, 68, 68, 0.35)" : "none",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                background: activeMode === "repair" ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" : "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.4)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Repair
          </Button>

          {/* SCAN Button (Hides when scanner input is active) */}
          {!showScanner && (
            <Button
              variant="outlined"
              onClick={() => setShowScanner(true)}
              startIcon={<QrCodeScannerIcon sx={{ fontSize: "15px !important" }} />}
              sx={{
                color: "#fca5a5",
                borderColor: "rgba(239, 68, 68, 0.4)",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "10.5px",
                letterSpacing: "0.3px",
                height: "32px",
                px: 1.2,
                borderRadius: "8px",
                bgcolor: "rgba(239, 68, 68, 0.05)",
                transition: "all 0.2s ease",
                "&:hover": { borderColor: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.15)", color: "#ffffff" },
              }}
            >
              SCAN
            </Button>
          )}
        </Box>

        {/* CENTER SECTION: Barcode / Item Search Bar */}
        <Box sx={{ flex: 1, maxWidth: "420px" }}>
          <TextField
            placeholder="TITLE, BARCODE, OR IMEI/SERIAL NUMBER"
            size="small"
            fullWidth
            onFocus={() => setShowScanner(false)}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.06)",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "& .MuiOutlinedInput-root": {
                height: "34px",
                fontSize: "11px",
                color: "#ffffff",
                fontWeight: 500,
                letterSpacing: "0.3px",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&.Mui-focused fieldset": { borderColor: "#ef4444", borderWidth: "1.5px" },
              },
              "& input::placeholder": { color: "#94a3b8", opacity: 0.85, fontWeight: 400, fontSize: "10px" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: "16px", color: "#94a3b8" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* RIGHT SECTION: Notifications, Product Button, Order Search, Profile, Logout */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          {/* Notification Bell */}
          <IconButton
            size="small"
            sx={{
              color: "#cbd5e1",
              bgcolor: "rgba(255, 255, 255, 0.05)",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.12)", color: "#ffffff" },
            }}
          >
            <NotificationsNoneIcon sx={{ fontSize: "18px" }} />
          </IconButton>

          {/* + Product Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: "15px !important" }} />}
            sx={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "11.5px",
              letterSpacing: "0.2px",
              height: "32px",
              px: 1.5,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
              transition: "all 0.2s ease",
              "&:hover": { background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", transform: "translateY(-1px)" },
            }}
          >
            Product
          </Button>

          {/* Order Search Button */}
          <Button
            variant="outlined"
            startIcon={<SearchIcon sx={{ fontSize: "15px !important" }} />}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.08)",
              color: "#ffffff",
              borderColor: "rgba(255, 255, 255, 0.2)",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.3px",
              height: "32px",
              px: 1.5,
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)", borderColor: "rgba(255, 255, 255, 0.4)" },
            }}
          >
            ORDER
          </Button>

          {/* Store Name / Profile */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: "11.5px",
              color: "#f1f5f9",
              px: 0.5,
              letterSpacing: "0.3px",
            }}
          >
            Gadgets Solutionsf
          </Typography>

          {/* Exit / Logout to Admin */}
          <IconButton
            size="small"
            onClick={() => navigate("/vendor/dashboard")}
            sx={{
              bgcolor: "rgba(239, 68, 68, 0.15)",
              color: "#fca5a5",
              height: "32px",
              width: "32px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": { bgcolor: "#ef4444", color: "#ffffff", transform: "scale(1.05)" },
            }}
          >
            <LogoutIcon sx={{ fontSize: "15px" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Render the Separate Navigation Drawer Component */}
      <POSNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default POSHeader;