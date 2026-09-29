import React from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
  TextField,
  Paper,
  Avatar,
  Chip,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import EditIcon from "@mui/icons-material/Edit";

const POSCustomerLedgerDrawer = ({ open, onClose, customer }) => {
  const transactions = [
    { receipt: "52885539", date: "21, Apr 2026 01:04 PM", type: "Sale", totalSale: "£19,806.53", discount: "£0.00", grandTotal: "£19,806.53", balance: "£19,806.53" },
    { receipt: "41094959", date: "21, Apr 2026 12:15 PM", type: "Sale", totalSale: "£361.00", discount: "£61.00", grandTotal: "£300.00", received: "£300.00", balance: "£0.00" },
  ];

  return (
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
      {/* 1. TOP FILTER BAR & CLOSE BUTTON */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
        <TextField
          size="small"
          defaultValue="2026-03-29 - 2026-09-29"
          InputProps={{ endAdornment: <span style={{ fontSize: "14px", color: "#64748b" }}>📅</span> }}
          sx={{ width: "240px", bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}
        />
        <Box sx={{ flex: 1, display: "flex", gap: 1.5 }}>
          <TextField
            placeholder="Enter receipt no"
            size="small"
            sx={{ flex: 1, maxWidth: "260px", bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}
          />
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "none",
              px: 3,
              borderRadius: "8px",
              boxShadow: "none",
            }}
          >
            Search
          </Button>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ bgcolor: "#ffffff", border: "1px solid #e2e8f0", color: "#64748b", "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 2. CUSTOMER INFO CARD */}
      <Paper elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: "200px" }}>
            <Avatar sx={{ bgcolor: "#2563eb", width: 40, height: 40, fontWeight: 700, fontSize: "15px" }}>
              {customer?.name ? customer.name.charAt(0) : "J"}
            </Avatar>
            <Typography sx={{ fontWeight: 700, fontSize: "15px", color: "#0f172a" }}>
              {customer?.name || "Jjjjj"}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>ID NO</Typography>
            <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>-</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>COMPANY</Typography>
            <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>-</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>ADDRESS</Typography>
            <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>-</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>BALANCE LIMIT</Typography>
            <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>£0.00</Typography>
          </Box>
        </Box>
      </Paper>

      {/* 3. FINANCIAL SUMMARY PANEL */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#334155" }}>Type: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1 }}>Sale</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#334155" }}>Status: <Box component="span" sx={{ fontWeight: 700, color: "#16a34a", ml: 1 }}>Completed</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#334155" }}>Total Orders: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1 }}>2</Box></Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#334155" }}>Cash: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1 }}>£300.00</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#334155" }}>Card: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1 }}>£0.00</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#334155" }}>Bank: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1 }}>£0.00</Box></Typography>
          </Box>

          <Box sx={{ minWidth: "260px", bgcolor: "#f8fafc", p: 1.5, borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontSize: "11.5px", color: "#64748b" }}>Received: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", float: "right" }}>£300.00</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "11.5px", color: "#64748b" }}>Balance: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", float: "right" }}>£19,806.53</Box></Typography>
            <Box sx={{ pt: 0.5, mt: 0.5, borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>Total:</Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: 800, color: "#dc2626" }}>£20,106.53</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 4, mt: 2, pt: 1.5, borderTop: "1px solid #f1f5f9", fontSize: "12px", fontWeight: 600 }}>
          <Box sx={{ color: "#16a34a" }}>🛍️ Sale <Box component="span" sx={{ color: "#0f172a", ml: 0.5 }}>£631.00</Box></Box>
          <Box sx={{ color: "#dc2626" }}>🔄 Return <Box component="span" sx={{ color: "#0f172a", ml: 0.5 }}>£0.00</Box></Box>
          <Box sx={{ color: "#0284c7" }}>💱 Trade-In <Box component="span" sx={{ color: "#0f172a", ml: 0.5 }}>£331.00</Box></Box>
          <Box sx={{ color: "#d97706" }}>🏷️ Discount <Box component="span" sx={{ color: "#0f172a", ml: 0.5 }}>£61.00</Box></Box>
        </Box>
      </Paper>

      {/* 4. TRANSACTIONS LIST */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {transactions.map((tx, idx) => (
          <Paper key={idx} elevation={0} sx={{ p: 2, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#dc2626" }}>{tx.receipt}</Typography>
              <Typography sx={{ fontSize: "11px", color: "#64748b" }}>{tx.date}</Typography>
            </Box>

            <Chip label={tx.type} size="small" sx={{ fontSize: "10px", fontWeight: 700, bgcolor: "#dcfce7", color: "#16a34a", height: "20px" }} />

            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>TOTAL SALE</Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{tx.totalSale}</Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>DISCOUNT</Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{tx.discount}</Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>GRAND TOTAL</Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{tx.grandTotal}</Typography>
            </Box>

            {tx.received && (
              <Box>
                <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>RECEIVED</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{tx.received}</Typography>
              </Box>
            )}

            <Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>BALANCE</Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{tx.balance}</Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Checkbox size="small" />
              <IconButton size="small" sx={{ bgcolor: "#f0f9ff", color: "#0284c7", borderRadius: "6px" }}><EditIcon sx={{ fontSize: "16px" }} /></IconButton>
              <IconButton size="small" sx={{ bgcolor: "#f1f5f9", color: "#334155", borderRadius: "6px" }}><ReceiptIcon sx={{ fontSize: "16px" }} /></IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Drawer>
  );
};

export default POSCustomerLedgerDrawer;