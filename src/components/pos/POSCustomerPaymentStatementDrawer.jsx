import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Paper,
  Avatar,
  Chip,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import POSUpdateLastPaymentModal from "./POSUpdateLastPaymentModal";

const POSCustomerPaymentStatementDrawer = ({ open, onClose, customer }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const statementItems = [
    { date: "29, Sep 2026 09:24 AM", type: "Balance", typeBg: "#fef3c7", typeColor: "#d97706", desc: "testing..", sales: "£2.00", payments: "£0.00", balance: "£1.00" },
    { date: "29, Sep 2026 09:24 AM", type: "Payment by Cash", typeBg: "#e0f2fe", typeColor: "#0284c7", desc: "-", sales: "£0.00", payments: "£1.00", balance: "-£1.00" },
  ];

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          fontFamily: "'Poppins', sans-serif",
          "& *": { fontFamily: "'Poppins', sans-serif !important" },
          "& .MuiDrawer-paper": {
            width: "92vw",
            maxWidth: "1400px",
            bgcolor: "#f8fafc",
            p: 3,
            boxShadow: "20px 0 60px rgba(0, 0, 0, 0.15)",
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "7px" },
            "&::-webkit-scrollbar-track": { background: "#f1f5f9" },
            "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
          },
        }}
      >
        {/* 1. TOP HEADER ACTION BAR */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3, flexWrap: "wrap", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
            <TextField
              size="small"
              defaultValue="2026-07-01 - 2026-10-25"
              InputProps={{ endAdornment: <span style={{ fontSize: "14px", color: "#64748b" }}>📅</span> }}
              sx={{ width: "240px", bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}
            />
            <TextField
              select
              size="small"
              defaultValue="All"
              sx={{ width: "320px", bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}
            >
              <MenuItem value="All">All</MenuItem>
            </TextField>
            <Button variant="outlined" sx={{ height: "38px", borderColor: "#cbd5e1", color: "#334155", bgcolor: "#ffffff" }}><DownloadIcon sx={{ fontSize: "18px" }} /></Button>
            <Button
              variant="contained"
              onClick={() => setUpdateModalOpen(true)}
              sx={{ bgcolor: "#eab308", fontWeight: 600, fontSize: "12px", textTransform: "none", px: 2.5, height: "38px", borderRadius: "8px", boxShadow: "none", color: "#ffffff", "&:hover": { bgcolor: "#ca8a04" } }}
            >
              Update Last
            </Button>
            <Button variant="contained" sx={{ bgcolor: "#2563eb", fontWeight: 600, fontSize: "12px", textTransform: "none", px: 2.5, height: "38px", borderRadius: "8px", boxShadow: "none" }}>+ Receive</Button>
            <Button variant="contained" sx={{ bgcolor: "#2563eb", fontWeight: 600, fontSize: "12px", textTransform: "none", px: 2.5, height: "38px", borderRadius: "8px", boxShadow: "none" }}>+ Add Previous</Button>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#ffffff", border: "1px solid #e2e8f0", color: "#64748b", "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* 2. CUSTOMER & STATEMENT SUMMARY CARD */}
        <Paper elevation={0} sx={{ p: 2.5, mb: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 3, pb: 2.5, borderBottom: "1px solid #e2e8f0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: "180px" }}>
              <Avatar sx={{ bgcolor: "#0284c7", width: 40, height: 40, fontWeight: 700, fontSize: "15px" }}>
                {customer?.name ? customer.name.charAt(0) : "C"}
              </Avatar>
              <Typography sx={{ fontWeight: 700, fontSize: "15px", color: "#0f172a" }}>
                {customer?.name || "cc1"}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>ID NO</Typography>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>524234</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>COMPANY</Typography>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>Donesol</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>ADDRESS</Typography>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>fasdfdaf</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>BALANCE LIMIT</Typography>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>£100.00</Typography>
            </Box>
          </Box>

          {/* Ticker Row */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 2.5, gap: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b" }}>START BALANCE</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>£0.00</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#16a34a" }}>SALES</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#16a34a" }}>£0.00</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#2563eb" }}>PAYMENTS</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#2563eb" }}>£1.00</Typography>
              <Typography sx={{ fontSize: "10px", color: "#64748b" }}>Cash £1.00 - Card £0.00 - Bank £0.00</Typography>
            </Box>
            <Box sx={{ bgcolor: "#f0fdf4", p: 1.5, borderRadius: "8px", border: "1px solid #bbf7d0", minWidth: "180px" }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#16a34a" }}>END BALANCE</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#16a34a" }}>£1.00</Typography>
            </Box>
          </Box>
        </Paper>

        {/* 3. PRINT SELECTED ACTION BAR */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox size="small" />
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>Select all</Typography>
          </Box>
          <Button variant="outlined" disabled startIcon={<PrintIcon />} sx={{ fontSize: "12px", fontWeight: 600, textTransform: "none", borderColor: "#cbd5e1", color: "#94a3b8", bgcolor: "#f1f5f9" }}>
            Print Selected
          </Button>
        </Box>

        {/* 4. STATEMENT ITEMS LIST */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {statementItems.map((item, idx) => (
            <Paper key={idx} elevation={0} sx={{ p: 2, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Checkbox size="small" />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "12.5px", color: "#dc2626" }}>-</Typography>
                  <Typography sx={{ fontSize: "11px", color: "#64748b" }}>{item.date}</Typography>
                </Box>
              </Box>

              <Chip label={item.type} size="small" sx={{ fontSize: "10.5px", fontWeight: 700, bgcolor: item.typeBg, color: item.typeColor, height: "22px" }} />

              <Typography sx={{ fontSize: "12px", color: "#334155" }}>{item.desc}</Typography>

              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>SALES</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{item.sales}</Typography>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>PAYMENTS</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{item.payments}</Typography>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>BALANCE</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: 700, color: item.balance.startsWith("-") ? "#dc2626" : "#0f172a" }}>{item.balance}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Drawer>

      {/* Update Last Payment Modal */}
      <POSUpdateLastPaymentModal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)} />
    </>
  );
};

export default POSCustomerPaymentStatementDrawer;