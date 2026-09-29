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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import MoneyIcon from "@mui/icons-material/Money";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const POSProcessPaymentDrawer = ({ open, onClose, cart = [], total = "1.00" }) => {
  const [cashAmount, setCashAmount] = useState(total);
  const [cardAmount, setCardAmount] = useState("0");
  const [bankAmount, setBankAmount] = useState("0");

  const quickAmounts = [1.00, 5.00, 10.00];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        "& *": { fontFamily: "'Poppins', sans-serif !important" },
        "& .MuiDrawer-paper": {
          width: "82vw",
          maxWidth: "1000px",
          bgcolor: "#f8fafc",
          p: 3,
          boxShadow: "20px 0 60px rgba(0, 0, 0, 0.15)",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "7px" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        },
      }}
    >
      {/* 1. TOP HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, bgcolor: "#ffffff", p: 2, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ bgcolor: "#eff6ff", color: "#2563eb", p: 1, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            💳
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "16px" }}>
            PROCESS ORDER & PAYMENTS
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        
        {/* ROW 1: Left Inputs & Right Order Summary */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", flexWrap: { xs: "wrap", md: "nowrap" } }}>
          
          {/* Left Side: Customer & Note Editor */}
          <Box sx={{ flex: 1.3, display: "flex", flexDirection: "column", gap: 2 }}>
            
            {/* Customer Selection Row */}
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              <TextField
                select
                defaultValue="Customer"
                size="small"
                fullWidth
                sx={{ bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "13px", borderRadius: "8px" } }}
              >
                <MenuItem value="Customer">Customer</MenuItem>
              </TextField>
              <IconButton
                sx={{ bgcolor: "#0f172a", color: "#ffffff", width: "42px", height: "42px", borderRadius: "8px", "&:hover": { bgcolor: "#1e293b" } }}
              >
                <PersonAddIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Note Editor Box */}
            <Paper elevation={0} sx={{ border: "1px solid #cbd5e1", borderRadius: "10px", bgcolor: "#ffffff", overflow: "hidden" }}>
              <Box sx={{ p: 1, borderBottom: "1px solid #e2e8f0", bgcolor: "#f8fafc", display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                <TextField select defaultValue="None" size="small" sx={{ width: "130px", "& .MuiOutlinedInput-root": { fontSize: "11px", height: "28px" } }}>
                  <MenuItem value="None">None</MenuItem>
                </TextField>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                  <span style={{ fontSize: "11.5px", color: "#334155", padding: "0 4px" }}>Normal</span>
                  <span style={{ fontSize: "10px", color: "#64748b" }}>▼</span>
                </Box>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <Button size="small" sx={{ minWidth: "28px", height: "28px", color: "#334155", fontWeight: 700 }}>B</Button>
                <Button size="small" sx={{ minWidth: "28px", height: "28px", color: "#334155", fontStyle: "italic" }}>I</Button>
                <Button size="small" sx={{ minWidth: "28px", height: "28px", color: "#334155", textDecoration: "underline" }}>U</Button>
                <Button size="small" sx={{ minWidth: "28px", height: "28px", color: "#334155" }}>S</Button>
                <Button size="small" sx={{ minWidth: "28px", height: "28px", color: "#334155" }}>🔗</Button>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <Button size="small" sx={{ minWidth: "28px", height: "28px", color: "#334155" }}>≡</Button>
                <Button size="small" sx={{ minWidth: "28px", height: "28px", color: "#334155" }}>☰</Button>
                <Button size="small" sx={{ minWidth: "28px", height: "28px", color: "#334155" }}>Tx</Button>
              </Box>
              <TextField
                multiline
                rows={4}
                placeholder=""
                fullWidth
                variant="standard"
                sx={{ p: 1.5, "& .MuiInput-root": { fontSize: "13px", "&::before, &::after": { display: "none" } } }}
              />
            </Paper>

            {/* Discount & Voucher Row */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1 }}>
              <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>DISCOUNT & VOUCHER</Typography>
              <Button
                size="small"
                startIcon={<LocalOfferIcon sx={{ fontSize: "14px !important" }} />}
                sx={{ color: "#2563eb", fontWeight: 600, fontSize: "12px", textTransform: "none", bgcolor: "#eff6ff", px: 2, py: 0.5, borderRadius: "6px", "&:hover": { bgcolor: "#dbeafe" } }}
              >
                Add Discount
              </Button>
            </Box>
          </Box>

          {/* Right Side: Order Summary Card */}
          <Box sx={{ flex: 1, minWidth: "320px" }}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: "12px", border: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
              <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", mb: 2, pb: 1, borderBottom: "1px solid #f1f5f9", letterSpacing: "0.5px" }}>
                ORDER SUMMARY
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8, fontSize: "13px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
                  <span>No of item(s)</span>
                  <span style={{ fontWeight: 600 }}>{cart.length || 1}</span>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>£{total}</span>
                </Box>

                <Box sx={{ pt: 1.5, mt: 0.5, borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
                  <span>Grand Total</span>
                  <span>£{total}</span>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 700, color: "#dc2626" }}>
                  <span>Due</span>
                  <span>£{total}</span>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", color: "#2563eb", fontWeight: 600 }}>
                  <span>Received</span>
                  <span>£0.00</span>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
                  <span>Status</span>
                  <span style={{ fontWeight: 600 }}>Pending</span>
                </Box>

                <Box sx={{ pt: 1.5, mt: 0.5, borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                  <span>Change</span>
                  <span>£0.00</span>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* ROW 2: Quick Amounts & Gift Card */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
          {quickAmounts.map((amt) => (
            <Button
              key={amt}
              variant="contained"
              onClick={() => setCashAmount(amt.toFixed(2))}
              sx={{ bgcolor: "#dc2626", fontWeight: 700, fontSize: "12px", textTransform: "none", px: 3.5, py: 0.9, borderRadius: "8px", boxShadow: "none", "&:hover": { bgcolor: "#b91c1c" } }}
            >
              £{amt.toFixed(2)}
            </Button>
          ))}
          <Button
            variant="outlined"
            startIcon={<CardGiftcardIcon />}
            sx={{ ml: "auto", borderColor: "#fef3c7", color: "#d97706", fontWeight: 600, fontSize: "12px", textTransform: "none", bgcolor: "#fffbeb", borderRadius: "8px", py: 0.8, "&:hover": { bgcolor: "#fef3c7", borderColor: "#fde68a" } }}
          >
            Apply Gift Card
          </Button>
        </Box>

        {/* ROW 3: Payment Methods Grid */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
          <Paper elevation={0} sx={{ flex: 1, p: 2, borderRadius: "12px", border: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, color: "#16a34a", fontWeight: 700, fontSize: "13px" }}>
              <MoneyIcon fontSize="small" /> Cash
            </Box>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#64748b", mb: 0.5, fontSize: "10.5px" }}>Amount</Typography>
            <TextField
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              size="small"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { fontSize: "13px", fontWeight: 700, borderRadius: "8px" } }}
            />
          </Paper>

          <Paper elevation={0} sx={{ flex: 1, p: 2, borderRadius: "12px", border: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, color: "#2563eb", fontWeight: 700, fontSize: "13px" }}>
              <CreditCardIcon fontSize="small" /> Card
            </Box>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#64748b", mb: 0.5, fontSize: "10.5px" }}>Amount</Typography>
            <TextField
              value={cardAmount}
              onChange={(e) => setCardAmount(e.target.value)}
              size="small"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { fontSize: "13px", fontWeight: 700, borderRadius: "8px" } }}
            />
          </Paper>

          <Paper elevation={0} sx={{ flex: 1, p: 2, borderRadius: "12px", border: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, color: "#7c3aed", fontWeight: 700, fontSize: "13px" }}>
              <AccountBalanceIcon fontSize="small" /> Bank Transfer
            </Box>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#64748b", mb: 0.5, fontSize: "10.5px" }}>Amount</Typography>
            <TextField
              value={bankAmount}
              onChange={(e) => setBankAmount(e.target.value)}
              size="small"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { fontSize: "13px", fontWeight: 700, borderRadius: "8px" } }}
            />
          </Paper>
        </Box>

        {/* ROW 4: Action Status Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ flex: 1, bgcolor: "#fb7185", fontWeight: 700, fontSize: "14px", textTransform: "none", py: 1.8, borderRadius: "10px", boxShadow: "none", "&:hover": { bgcolor: "#f43f5e" } }}
          >
            Pending
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ flex: 1, bgcolor: "#facc15", color: "#0f172a", fontWeight: 700, fontSize: "14px", textTransform: "none", py: 1.8, borderRadius: "10px", boxShadow: "none", "&:hover": { bgcolor: "#eab308" } }}
          >
            In-Process
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ flex: 1, bgcolor: "#22c55e", fontWeight: 700, fontSize: "14px", textTransform: "none", py: 1.8, borderRadius: "10px", boxShadow: "none", "&:hover": { bgcolor: "#16a34a" } }}
          >
            Complete
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default POSProcessPaymentDrawer;