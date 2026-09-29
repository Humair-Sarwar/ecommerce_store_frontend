import React from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import BarcodeIcon from "@mui/icons-material/ViewWeek";

const POSQuoteReceiptDrawer = ({ open, onClose, cart = [], subtotal = "£1.00" }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        "& *": { fontFamily: "'Poppins', sans-serif !important" },
        "& .MuiDrawer-paper": {
          width: "450px",
          maxWidth: "100%",
          bgcolor: "#f1f5f9",
          pl: 2,
          boxShadow: "-20px 0 50px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "row",
          gap: 2,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        },
      }}
    >
      {/* Left Vertical Action Toolbar */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1, minWidth: "42px" }}>
        <IconButton
          onClick={onClose}
          sx={{ bgcolor: "#ffffff", border: "1px solid #cbd5e1", color: "#0f172a", width: "42px", height: "42px", borderRadius: "50%", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", "&:hover": { bgcolor: "#f8fafc" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{ bgcolor: "#dc2626", color: "#ffffff", width: "42px", height: "42px", borderRadius: "50%", boxShadow: "0 4px 10px rgba(220,38,38,0.3)", "&:hover": { bgcolor: "#b91c1c" } }}
        >
          <PrintIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{ bgcolor: "#ffffff", border: "1px solid #cbd5e1", color: "#16a34a", width: "42px", height: "42px", borderRadius: "50%", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", "&:hover": { bgcolor: "#f8fafc" } }}
        >
          <WhatsAppIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{ bgcolor: "#ffffff", border: "1px solid #cbd5e1", color: "#2563eb", width: "42px", height: "42px", borderRadius: "50%", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", "&:hover": { bgcolor: "#f8fafc" } }}
        >
          <FileCopyIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{ bgcolor: "#dc2626", color: "#ffffff", width: "42px", height: "42px", borderRadius: "50%", boxShadow: "0 4px 10px rgba(220,38,38,0.3)", "&:hover": { bgcolor: "#b91c1c" } }}
        >
          <BarcodeIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Right Receipt Paper Preview */}
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          bgcolor: "#ffffff",
          p: 4,
          borderRadius: "0px",
          color: "#0f172a",
          minHeight: "680px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowX: "hidden",
        }}
      >
        <Box>
          {/* Logo & Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box sx={{ display: "inline-block", fontWeight: 900, fontSize: "22px", letterSpacing: "1px", lineHeight: 1.1, mb: 1 }}>
              GADGETS<br />SOLUTION
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: "14px", letterSpacing: "1px", mt: 1 }}>
              GADGETS SOLUTIONS
            </Typography>
          </Box>

          <Box sx={{ fontSize: "11.5px", color: "#334155", mb: 2, lineHeight: 1.5 }}>
            <Typography sx={{ fontSize: "11.5px" }}>163 South St, Romford</Typography>
            <Typography sx={{ fontSize: "11.5px" }}>RM1 1PL</Typography>
            <Typography sx={{ fontSize: "11.5px" }}>Tel: +44 1708 743222</Typography>
            <Typography sx={{ fontSize: "11.5px" }}>Whatsapp: +44 1708 743222</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#334155", mb: 2.5, flexWrap: "wrap", gap: 1 }}>
            <span>Date: 29, Sep 2026 09:46 AM</span>
            <span>Order Type: Sale</span>
          </Box>
          <Typography sx={{ fontSize: "11.5px", color: "#334155", mb: 2.5 }}>
            Receipt#: 198-0926-24
          </Typography>

          <Divider sx={{ borderStyle: "dashed", borderColor: "#cbd5e1", mb: 2 }} />

          {/* Items Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "12px", mb: 1.5 }}>
            <span>Items</span>
            <span>Amount</span>
          </Box>

          <Divider sx={{ borderColor: "#0f172a", mb: 1.5 }} />

          {/* Cart Item Row */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, gap: 2 }}>
              <span>iphone without brands</span>
              <span>£1.00</span>
            </Box>
            <Typography sx={{ fontSize: "11px", color: "#64748b" }}>1 x £1.00 = £1.00</Typography>
            <Typography sx={{ fontSize: "10.5px", color: "#64748b", fontStyle: "italic" }}>VAT Exempt</Typography>
          </Box>

          <Divider sx={{ borderStyle: "dashed", borderColor: "#cbd5e1", mb: 2 }} />

          {/* Subtotal & Grand Total */}
          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "12px", mb: 1.5 }}>
            <span>Subtotal:</span>
            <span>{subtotal}</span>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 800, mb: 2 }}>
            <span style={{ textDecoration: "underline" }}>Grand Total</span>
            <span style={{ textDecoration: "underline" }}>{subtotal}</span>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", mb: 1 }}>
            <span>Balance:</span>
            <span>{subtotal}</span>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", mb: 3 }}>
            <span>Status:</span>
            <span style={{ textDecoration: "underline", fontWeight: 600 }}>In-Progress</span>
          </Box>
        </Box>

        {/* Footer & Barcode */}
        <Box sx={{ textAlign: "center", pt: 2 }}>
          <Typography sx={{ fontSize: "11.5px", fontWeight: 500, mb: 2 }}>
            Thank You for Your order! See you again soon!
          </Typography>
          <Box sx={{ fontSize: "24px", letterSpacing: "-1px", fontWeight: 300, lineHeight: 1, overflow: "hidden", whiteSpace: "nowrap" }}>
            |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          </Box>
          <Typography sx={{ fontSize: "13px", fontWeight: 700, mt: 0.5 }}>
            198-0926-24
          </Typography>
        </Box>
      </Paper>
    </Drawer>
  );
};

export default POSQuoteReceiptDrawer;