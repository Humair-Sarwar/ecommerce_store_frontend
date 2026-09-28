import React from "react";
import { Box, Button, Typography, Drawer, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Icons for Drawer Navigation
import DashboardIcon from "@mui/icons-material/Dashboard";
import DevicesIcon from "@mui/icons-material/Devices";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ScienceIcon from "@mui/icons-material/Science";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const menuSections = [
  {
    title: "",
    items: [
      { label: "Dashboard", icon: <DashboardIcon sx={{ fontSize: "18px", color: "#3b82f6" }} /> },
      { label: "Payment Devices", icon: <DevicesIcon sx={{ fontSize: "18px", color: "#6366f1" }} /> },
      { label: "Branch Stock Move", icon: <SwapHorizIcon sx={{ fontSize: "18px", color: "#10b981" }} /> },
      { label: "Lab Items", icon: <ScienceIcon sx={{ fontSize: "18px", color: "#8b5cf6" }} /> },
      { label: "Purchase Planner", icon: <ShoppingCartCheckoutIcon sx={{ fontSize: "18px", color: "#f59e0b" }} /> },
    ],
  },
  {
    title: "Expense & Closing",
    items: [
      { label: "End of Day", icon: <EventRepeatIcon sx={{ fontSize: "18px", color: "#06b6d4" }} /> },
      { label: "Business Closing", icon: <BusinessCenterIcon sx={{ fontSize: "18px", color: "#3b82f6" }} /> },
      { label: "Daily Expense", icon: <AttachMoneyIcon sx={{ fontSize: "18px", color: "#ef4444" }} /> },
    ],
  },
  {
    title: "Returns & Credits",
    items: [
      { label: "Create Return", icon: <KeyboardReturnIcon sx={{ fontSize: "18px", color: "#f97316" }} /> },
      { label: "Return Orders", icon: <AssignmentReturnIcon sx={{ fontSize: "18px", color: "#6366f1" }} /> },
      { label: "Credit Orders (33)", icon: <CreditCardIcon sx={{ fontSize: "18px", color: "#10b981" }} /> },
    ],
  },
  {
    title: "Customers & Reports",
    items: [
      { label: "Customers", icon: <PeopleIcon sx={{ fontSize: "18px", color: "#3b82f6" }} /> },
      { label: "Vouchers", icon: <LocalOfferIcon sx={{ fontSize: "18px", color: "#ec4899" }} /> },
      { label: "Gift Cards", icon: <CardGiftcardIcon sx={{ fontSize: "18px", color: "#8b5cf6" }} /> },
      { label: "Customer Report", icon: <AssessmentIcon sx={{ fontSize: "18px", color: "#06b6d4" }} /> },
      { label: "Served By Report", icon: <PersonPinIcon sx={{ fontSize: "18px", color: "#10b981" }} /> },
      { label: "Payments Report", icon: <PaymentIcon sx={{ fontSize: "18px", color: "#f59e0b" }} /> },
      { label: "Order Payment Logs", icon: <ReceiptLongIcon sx={{ fontSize: "18px", color: "#64748b" }} /> },
    ],
  },
  {
    title: "Other Reports",
    items: [
      { label: "Sales By Order", icon: <AssessmentIcon sx={{ fontSize: "18px", color: "#3b82f6" }} /> },
      { label: "Sales By Product", icon: <InventoryIcon sx={{ fontSize: "18px", color: "#10b981" }} /> },
      { label: "Sale By Repair", icon: <BuildIcon sx={{ fontSize: "18px", color: "#f97316" }} /> },
      { label: "Replacements", icon: <SwapHorizIcon sx={{ fontSize: "18px", color: "#8b5cf6" }} /> },
      { label: "Return Items", icon: <AssignmentReturnIcon sx={{ fontSize: "18px", color: "#ef4444" }} /> },
      { label: "Trade-In Items", icon: <SwapHorizIcon sx={{ fontSize: "18px", color: "#06b6d4" }} /> },
      { label: "Stock Reports", icon: <InventoryIcon sx={{ fontSize: "18px", color: "#3b82f6" }} /> },
      { label: "Purchase Order Note", icon: <AssignmentIcon sx={{ fontSize: "18px", color: "#f59e0b" }} /> },
      { label: "Out Of Stock Report", icon: <RemoveShoppingCartIcon sx={{ fontSize: "18px", color: "#ef4444" }} /> },
      { label: "Sales Report", icon: <AssessmentIcon sx={{ fontSize: "18px", color: "#10b981" }} /> },
    ],
  },
];

const POSNavDrawer = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        "& .MuiDrawer-paper": {
          width: "420px",
          bgcolor: "#ffffff",
          px: 2.5,
          py: 0,
          boxShadow: "10px 0 30px rgba(0, 0, 0, 0.15)",
          overflowY: "auto",
          fontFamily: "'Poppins', sans-serif",
          // Custom sleek scrollbar styling
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f8fafc",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "4px",
            transition: "background 0.2s ease",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#94a3b8",
          },
        },
      }}
    >
      {/* Sticky Fixed Header Container with Proper Background & Padding */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "#ffffff",
          zIndex: 1100,
          pt: 2.5,
          pb: 1.5,
          borderBottom: "1px solid #e2e8f0",
          mx: -2.5,
          px: 2.5,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, color: "#0f172a", fontSize: "16px", letterSpacing: "0.3px" }}>
            Navigation Menu
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              bgcolor: "#f1f5f9",
              color: "#64748b",
              transition: "all 0.2s ease",
              "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Scrollable Grouped Sections & Modern Pill Buttons */}
      <Box sx={{ pt: 2.5 }}>
        {menuSections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 3 }}>
            {section.title && (
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  display: "block",
                  fontWeight: 700,
                  color: "#64748b",
                  fontSize: "11.5px",
                  mb: 1.5,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {section.title}
              </Typography>
            )}

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
              {section.items.map((item, itemIdx) => (
                <Button
                  key={itemIdx}
                  variant="outlined"
                  startIcon={item.icon}
                  onClick={onClose}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    justifyContent: "flex-start",
                    textAlign: "left",
                    color: "#334155",
                    borderColor: "#e2e8f0",
                    bgcolor: "#ffffff",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "12px",
                    letterSpacing: "0.1px",
                    borderRadius: "24px",
                    py: 1,
                    px: 2,
                    flex: "1 1 calc(33.333% - 8px)",
                    minWidth: "125px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: "#f8fafc",
                      borderColor: "#cbd5e1",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.label}
                  </Box>
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default POSNavDrawer;