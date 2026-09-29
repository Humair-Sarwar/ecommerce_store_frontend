import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  Avatar,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const POSViewCustomerModal = ({ open, onClose, customer }) => {
  const [activeTab, setActiveTab] = useState("loyalty");

  const tabs = [
    { id: "loyalty", label: "Loyalty Points", icon: <LoyaltyIcon sx={{ fontSize: "16px" }} /> },
    { id: "gift", label: "Gift Cards", icon: <CardGiftcardIcon sx={{ fontSize: "16px" }} /> },
    { id: "voucher", label: "Voucher Usage", icon: <ConfirmationNumberIcon sx={{ fontSize: "16px" }} /> },
  ];

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="view-customer-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "740px",
          maxHeight: "90vh",
          bgcolor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          p: 3.5,
          overflowY: "auto",
          fontFamily: "'Poppins', sans-serif",
          "& *": { fontFamily: "'Poppins', sans-serif !important" },
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        }}
      >
        {/* Top Header with Avatar and Close Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: customer?.avatarBg || "#0284c7", width: 44, height: 44, fontWeight: 700, fontSize: "16px" }}>
              {customer?.name ? customer.name.charAt(0) : "A"}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "18px" }}>
              {customer?.name || "adnan javed"}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Customer Information Card */}
        <Paper elevation={0} sx={{ border: "1px solid #cbd5e1", borderRadius: "12px", p: 2.5, mb: 3, bgcolor: "#ffffff" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 3, mb: 2.5 }}>
            <Box sx={{ flex: 1, minWidth: "180px" }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 0.5 }}>EMAIL</Typography>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>{customer?.email || "-"}</Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: "180px" }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 0.5 }}>COMPANY</Typography>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>{customer?.company || "-"}</Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: "180px" }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 0.5 }}>ADDRESS</Typography>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>{customer?.location || "-"}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 3, pt: 2, borderTop: "1px solid #f1f5f9" }}>
            <Box sx={{ flex: 1, minWidth: "180px" }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 0.5 }}>ID TYPE</Typography>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>-</Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: "180px" }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 0.5 }}>ID NUMBER</Typography>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>-</Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: "180px" }} />
          </Box>
        </Paper>

        {/* Tabs Row */}
        <Box sx={{ display: "flex", borderBottom: "1px solid #cbd5e1", mb: 3 }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                startIcon={tab.icon}
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 3,
                  py: 1.5,
                  borderRadius: 0,
                  color: isActive ? "#dc2626" : "#64748b",
                  borderBottom: isActive ? "2px solid #dc2626" : "2px solid transparent",
                  mb: "-1px",
                  "&:hover": { color: "#dc2626", bgcolor: "transparent" },
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Box>

        {/* Tab Content: Loyalty Points */}
        {activeTab === "loyalty" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
              <Box>
                <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 0.5 }}>AVAILABLE</Typography>
                <Typography sx={{ fontSize: "24px", fontWeight: 800, color: "#dc2626" }}>0 pts</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 0.5 }}>LIFETIME EARNED</Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>0 pts</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 0.5 }}>CARD NUMBER</Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>-</Typography>
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 0.5 }}>TIER</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>-</Typography>
            </Box>

            <Box>
              <Button
                variant="outlined"
                startIcon={<CreditCardIcon />}
                sx={{
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "none",
                  px: 2.5,
                  py: 1,
                  borderRadius: "8px",
                  bgcolor: "#ffffff",
                  "&:hover": { bgcolor: "#f8fafc", borderColor: "#94a3b8" },
                }}
              >
                Generate Card
              </Button>
            </Box>

            <Box sx={{ pt: 2, borderTop: "1px solid #f1f5f9" }}>
              <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", mb: 1 }}>POINTS HISTORY</Typography>
              <Typography sx={{ fontSize: "12px", color: "#94a3b8" }}>No loyalty point activity yet.</Typography>
            </Box>
          </Box>
        )}

        {/* Tab Content: Gift Cards / Voucher Usage */}
        {activeTab !== "loyalty" && (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>No {activeTab === "gift" ? "gift cards" : "voucher usage"} found for this customer.</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default POSViewCustomerModal;