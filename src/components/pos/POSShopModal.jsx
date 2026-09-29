import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
  TextField,
  Paper,
  Avatar,
  Pagination,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import POSCreateShopModal from "./POSCreateShopModal";

const POSShopModal = ({ open, onClose, customer }) => {
  const [createShopModalOpen, setCreateShopModalOpen] = useState(false);

  const shops = [
    { name: "Test shop", contactPerson: "john", phone: "+44 1234 5", address: "london" },
  ];

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          fontFamily: "'Poppins', sans-serif",
          "& *": { fontFamily: "'Poppins', sans-serif !important" },
          "& .MuiDrawer-paper": {
            width: "92vw",
            maxWidth: "1100px",
            bgcolor: "#ffffff",
            p: 3,
            boxShadow: "-20px 0 50px rgba(0, 0, 0, 0.15)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
          },
        }}
      >
        <Box>
          {/* Header */}
          <Box sx={{ bgcolor: "#ffffff", color: "#0f172a", pb: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "18px", color: "#0f172a", margin: "0 auto" }}>
              Shops
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Body Content */}
          <Box sx={{ pt: 3 }}>
            {/* Top Search & Create Button Bar */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5, gap: 2, flexWrap: "wrap" }}>
              <TextField
                placeholder="Search Shop..."
                size="small"
                InputProps={{ startAdornment: <SearchIcon sx={{ fontSize: "16px", color: "#94a3b8", mr: 1 }} /> }}
                sx={{ width: "320px", bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateShopModalOpen(true)}
                sx={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  borderRadius: "8px",
                  boxShadow: "none",
                  "&:hover": { background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" },
                }}
              >
                Create Shop
              </Button>
            </Box>

            {/* Customer Header Info Card inside Shops Drawer */}
            <Paper elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: "10px", border: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: "180px" }}>
                  <Avatar sx={{ bgcolor: customer?.avatarBg || "#0284c7", width: 36, height: 36, fontWeight: 700, fontSize: "14px" }}>
                    {customer?.name ? customer.name.charAt(0) : "A"}
                  </Avatar>
                  <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#0f172a" }}>
                    {customer?.name || "adnan javed"}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b" }}>ID NO</Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>-</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b" }}>COMPANY</Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>-</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b" }}>ADDRESS</Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>-</Typography>
                </Box>
              </Box>
            </Paper>

            {/* Shops List Item */}
            {shops.map((shop, idx) => (
              <Paper key={idx} elevation={0} sx={{ p: 2, borderRadius: "10px", border: "1px solid #cbd5e1", bgcolor: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "13.5px", color: "#0f172a", mb: 0.5 }}>{shop.name}</Typography>
                  <Typography sx={{ fontSize: "11px", color: "#64748b" }}>👤 {shop.contactPerson}</Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: "11.5px", color: "#334155" }}>📞 {shop.phone}</Typography>
                  <Typography sx={{ fontSize: "11px", color: "#64748b" }}>📍 {shop.address}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton size="small" onClick={() => setCreateShopModalOpen(true)} sx={{ bgcolor: "#f0f9ff", color: "#0284c7", borderRadius: "6px" }}><EditIcon sx={{ fontSize: "16px" }} /></IconButton>
                  <IconButton size="small" sx={{ bgcolor: "#fee2e2", color: "#dc2626", borderRadius: "6px" }}><DeleteIcon sx={{ fontSize: "16px" }} /></IconButton>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Pagination Footer */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3, pt: 2, borderTop: "1px solid #e2e8f0" }}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "11.5px" }}>1-1 of 1 Page 1/1</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Pagination count={1} shape="rounded" size="small" />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" sx={{ color: "#64748b", fontSize: "11.5px" }}>Rows</Typography>
              <TextField select size="small" defaultValue={15} sx={{ width: "75px", "& .MuiOutlinedInput-root": { fontSize: "11.5px", borderRadius: "6px", bgcolor: "#ffffff" } }}>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </TextField>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Create / Update Shop Modal */}
      <POSCreateShopModal open={createShopModalOpen} onClose={() => setCreateShopModalOpen(false)} />
    </>
  );
};

export default POSShopModal;