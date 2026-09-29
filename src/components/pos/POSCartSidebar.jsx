import React, { useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReplayIcon from "@mui/icons-material/Replay";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import POSPendingDrawer from "./POSPendingDrawer";
import POSInProgressDrawer from "./POSInProgressDrawer";
import POSCompletedDrawer from "./POSCompletedDrawer";
import POSCustomerDrawer from "./POSCustomerDrawer";
import POSOpenOrderModal from "./POSOpenOrderModal";
import POSQuoteReceiptDrawer from "./POSQuoteReceiptDrawer";
import POSQuantityModal from "./POSQuantityModal";
import POSItemEditModal from "./POSItemEditModal";
import POSProcessPaymentDrawer from "./POSProcessPaymentDrawer";

const POSCartSidebar = ({ cart, updateQuantity, removeFromCart }) => {
  const [activeTab, setActiveTab] = useState("sales");
  const [pendingDrawerOpen, setPendingDrawerOpen] = useState(false);
  const [inProgressDrawerOpen, setInProgressDrawerOpen] = useState(false);
  const [completedDrawerOpen, setCompletedDrawerOpen] = useState(false);
  const [customerDrawerOpen, setCustomerDrawerOpen] = useState(false);
  const [openOrderModalOpen, setOpenOrderModalOpen] = useState(false);
  const [quoteDrawerOpen, setQuoteDrawerOpen] = useState(false);
  const [processPaymentDrawerOpen, setProcessPaymentDrawerOpen] = useState(false);
  const [selectedItemForQty, setSelectedItemForQty] = useState(null);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  };

  const tabs = [
    { id: "sales", label: "Sales", count: cart.length, icon: <TrendingUpIcon sx={{ fontSize: "14px" }} /> },
    { id: "returns", label: "Returns", count: 0, icon: <ReplayIcon sx={{ fontSize: "14px" }} /> },
    { id: "replace", label: "Replace", count: 0, icon: <SwapHorizIcon sx={{ fontSize: "14px" }} /> },
    { id: "trade", label: "Trade", count: 0, icon: <CompareArrowsIcon sx={{ fontSize: "14px" }} /> },
  ];

  return (
    <>
      <Box
        sx={{
          flex: 5,
          bgcolor: "#ffffff",
          borderLeft: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          "& *::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "& *::-webkit-scrollbar-track": {
            background: "#f1f5f9",
            borderRadius: "4px",
          },
          "& *::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "4px",
            transition: "background 0.2s ease",
          },
          "& *::-webkit-scrollbar-thumb:hover": {
            background: "#ef4444",
          },
        }}
      >
        
        {/* 1. TOP HEADER STATUS BAR */}
        <Box sx={{ bgcolor: "#f8fafc", p: 1, borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            
            {/* Pending Button */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Button
                variant="contained"
                color="error"
                size="medium"
                onClick={() => setPendingDrawerOpen(true)}
                sx={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2px", borderRadius: "20px", px: 2.5, boxShadow: "none" }}
              >
                Pending
              </Button>
              <Box component="span" sx={{ position: "absolute", top: "-6px", right: "-6px", bgcolor: "#0f172a", color: "#ffffff", fontSize: "10px", fontWeight: 700, px: 0.6, py: 0.1, minWidth: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #f8fafc", zIndex: 1 }}>
                5
              </Box>
            </Box>

            {/* In-Progress Button */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Button
                variant="contained"
                color="warning"
                size="medium"
                onClick={() => setInProgressDrawerOpen(true)}
                sx={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2px", borderRadius: "20px", px: 2.5, boxShadow: "none" }}
              >
                In-Progress
              </Button>
              <Box component="span" sx={{ position: "absolute", top: "-6px", right: "-6px", bgcolor: "#0f172a", color: "#ffffff", fontSize: "10px", fontWeight: 700, px: 0.6, py: 0.1, minWidth: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #f8fafc", zIndex: 1 }}>
                8
              </Box>
            </Box>

            {/* Completed Button */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Button
                variant="contained"
                color="success"
                size="medium"
                onClick={() => setCompletedDrawerOpen(true)}
                sx={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2px", borderRadius: "20px", px: 2.5, boxShadow: "none" }}
              >
                Completed
              </Button>
              <Box component="span" sx={{ position: "absolute", top: "-6px", right: "-6px", bgcolor: "#0f172a", color: "#ffffff", fontSize: "10px", fontWeight: 700, px: 0.6, py: 0.1, minWidth: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #f8fafc", zIndex: 1 }}>
                0
              </Box>
            </Box>

          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {/* Customer Add Button */}
            <IconButton
              size="small"
              onClick={() => setCustomerDrawerOpen(true)}
              sx={{ bgcolor: "#dc2626", color: "#ffffff", "&:hover": { bgcolor: "#b91c1c" }, width: "32px", height: "32px", boxShadow: "0 2px 4px rgba(220,38,38,0.2)" }}
            >
              <PersonAddIcon sx={{ fontSize: "16px" }} />
            </IconButton>

            {/* Cart Button with Badge */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Button
                variant="contained"
                color="error"
                size="medium"
                startIcon={<ShoppingCartIcon sx={{ fontSize: "16px !important" }} />}
                sx={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2px", borderRadius: "20px", px: 2, boxShadow: "0 2px 4px rgba(220,38,38,0.2)" }}
              >
                Cart
              </Button>
              <Box component="span" sx={{ position: "absolute", top: "-6px", right: "-6px", bgcolor: "#0f172a", color: "#ffffff", fontSize: "10px", fontWeight: 700, px: 0.6, py: 0.1, minWidth: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #f8fafc", zIndex: 1 }}>
                {cart.length}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 2. TRANSACTION TYPE TABS */}
        <Box sx={{ display: "flex", bgcolor: "#f1f5f9", borderBottom: "1px solid #e2e8f0", p: 1, gap: 1 }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                size="small"
                variant={isActive ? "contained" : "outlined"}
                color="error"
                onClick={() => setActiveTab(tab.id)}
                startIcon={tab.icon}
                sx={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2px",
                  textTransform: "uppercase",
                  flex: 1,
                  borderRadius: "6px",
                  py: 0.75,
                  borderColor: isActive ? "transparent" : "#cbd5e1",
                  bgcolor: isActive ? "#dc2626" : "#ffffff",
                  color: isActive ? "#ffffff" : "#475569",
                  boxShadow: isActive ? "0 2px 5px rgba(220,38,38,0.3)" : "none",
                  "&:hover": { bgcolor: isActive ? "#b91c1c" : "#f8fafc" },
                  "& .MuiButton-startIcon": { marginRight: "4px" },
                }}
              >
                {tab.label} ({tab.count})
              </Button>
            );
          })}
        </Box>

        {/* 3. CART TABLE COLUMN HEADERS */}
        <Box sx={{ display: "flex", px: 2, py: 1, bgcolor: "#64748b", color: "#ffffff", borderBottom: "1px solid #475569", alignItems: "center" }}>
          <Typography variant="caption" sx={{ flex: 2.2, fontWeight: 600, fontSize: "11px" }}>Product</Typography>
          <Typography variant="caption" sx={{ flex: 0.9, fontWeight: 600, textAlign: "center", fontSize: "11px" }}>Qty</Typography>
          <Typography variant="caption" sx={{ flex: 1, fontWeight: 600, textAlign: "right", fontSize: "11px" }}>Each</Typography>
          <Typography variant="caption" sx={{ flex: 1, fontWeight: 600, textAlign: "right", fontSize: "11px" }}>Discount</Typography>
          <Typography variant="caption" sx={{ flex: 1.1, fontWeight: 600, textAlign: "right", fontSize: "11px" }}>Total</Typography>
        </Box>

        {/* 4. CART ITEMS AREA */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 1, bgcolor: "#f8fafc" }}>
          {cart.length === 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "text.secondary" }}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 48, color: "#cbd5e1", mb: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "12px" }}>Please add items to cart.</Typography>
            </Box>
          ) : (
            cart.map((item, index) => (
              <Box key={index} sx={{ mb: 1, p: 1.2, border: "1px solid #fecaca", borderRadius: "8px", bgcolor: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ flex: 2.2, fontWeight: 600, fontSize: "12.5px", color: "#1e293b", pr: 1 }}>{item.name}</Typography>
                  <Typography
                    variant="body2"
                    onClick={() => setSelectedItemForQty(item)}
                    sx={{ flex: 0.9, textAlign: "center", fontWeight: 600, fontSize: "12px", color: "#dc2626", bgcolor: "#fff5f5", py: 0.5, borderRadius: "4px", cursor: "pointer", "&:hover": { bgcolor: "#fee2e2" } }}
                  >
                    {item.qty}
                  </Typography>
                  <Typography variant="body2" sx={{ flex: 1, textAlign: "right", fontWeight: 600, fontSize: "12px", color: "#1e293b" }}>£{item.price.toFixed(2)}</Typography>
                  <Typography variant="body2" sx={{ flex: 1, textAlign: "right", fontWeight: 600, fontSize: "12px", color: "#64748b" }}>£0.00</Typography>
                  <Typography variant="body2" sx={{ flex: 1.1, textAlign: "right", fontWeight: 700, fontSize: "12.5px", color: "#dc2626" }}>£{(item.price * item.qty).toFixed(2)}</Typography>
                </Box>
                <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: "10px", mb: 1.5, fontWeight: 400 }}>{item.vatStatus || "VAT Exempt"}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 1, borderTop: "1px solid #f1f5f9" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => setSelectedItemForEdit(item)}
                    sx={{ minWidth: "40px", height: "32px", borderColor: "#fecaca", bgcolor: "#fff5f5", borderRadius: "6px" }}
                  >
                    <EditNoteIcon sx={{ fontSize: "18px", color: "#dc2626" }} />
                  </Button>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Button size="small" variant="outlined" onClick={() => updateQuantity(item.id, item.qty - 1)} sx={{ minWidth: "32px", height: "32px", borderColor: "#cbd5e1", color: "#64748b", borderRadius: "6px", p: 0 }}><RemoveIcon sx={{ fontSize: "14px" }} /></Button>
                    <Box sx={{ minWidth: "40px", height: "32px", bgcolor: "#fff5f5", border: "1px solid #fecaca", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}><Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{item.qty}</Typography></Box>
                    <Button size="small" variant="outlined" color="error" onClick={() => updateQuantity(item.id, item.qty + 1)} sx={{ minWidth: "32px", height: "32px", borderColor: "#fecaca", bgcolor: "#fff5f5", color: "#dc2626", borderRadius: "6px", p: 0 }}><AddIcon sx={{ fontSize: "14px" }} /></Button>
                  </Box>
                  <Button size="small" variant="outlined" color="error" onClick={() => removeFromCart(item.id)} sx={{ minWidth: "40px", height: "32px", borderColor: "#fecaca", bgcolor: "#fff5f5", borderRadius: "6px" }}><CloseIcon sx={{ fontSize: "18px", color: "#dc2626" }} /></Button>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* 5. BOTTOM CHECKOUT FOOTER */}
        <Box sx={{ p: 1, bgcolor: "#ffffff", borderTop: "1px solid #e2e8f0" }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Box
              onClick={() => setOpenOrderModalOpen(true)}
              sx={{ flex: 1, border: "1px solid #cbd5e1", borderRadius: "6px", p: "6px 10px", bgcolor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", "&:hover": { borderColor: "#dc2626" } }}
            >
              <Typography variant="caption" sx={{ color: "#dc2626", fontWeight: 600, fontSize: "10.5px" }}>Order: 198-0926-20</Typography>
              <SearchIcon sx={{ fontSize: "14px", color: "#dc2626" }} />
            </Box>
            <Box sx={{ flex: 1, border: "1px solid #cbd5e1", borderRadius: "6px", p: "6px 10px", bgcolor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 400, fontSize: "10.5px" }}>Order Type: <span style={{ color: "#dc2626", fontWeight: 600 }}>dasd (fasdf)</span></Typography>
            </Box>
          </Box>
          <Box sx={{ bgcolor: "#fff1f2", p: 2, borderRadius: "8px", mb: 1, border: "1px solid #fecaca", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1e293b", fontSize: "14px" }}>Total</Typography>
            <Typography variant="h4" color="error.main" sx={{ fontWeight: 700, fontSize: "24px" }}>£{calculateTotal()}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" size="small" startIcon={<SaveIcon sx={{ fontSize: "15px !important" }} />} sx={{ bgcolor: "#e2e8f0", color: "#334155", fontSize: "10px", fontWeight: 600, flex: 1, py: 1, textTransform: "none", boxShadow: "none" }}>In-Progress</Button>
            <Button variant="contained" color="error" size="small" startIcon={<DeleteOutlineIcon sx={{ fontSize: "15px !important" }} />} sx={{ fontSize: "10px", fontWeight: 600, flex: 1, py: 1, textTransform: "none", boxShadow: "none" }}>Delete</Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setQuoteDrawerOpen(true)}
              startIcon={<PrintOutlinedIcon sx={{ fontSize: "15px !important" }} />}
              sx={{ bgcolor: "#3b82f6", fontSize: "10px", fontWeight: 600, flex: 1, py: 1, textTransform: "none", boxShadow: "none", "&:hover": { bgcolor: "#2563eb" } }}
            >
              Quote
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => setProcessPaymentDrawerOpen(true)}
              startIcon={<CreditCardIcon sx={{ fontSize: "15px !important" }} />}
              sx={{ bgcolor: "#10b981", fontSize: "10px", fontWeight: 600, flex: 1.3, py: 1, textTransform: "none", boxShadow: "none", "&:hover": { bgcolor: "#059669" } }}
            >
              PROCESS & PAY
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Render All Modals & Drawers */}
      <POSPendingDrawer open={pendingDrawerOpen} onClose={() => setPendingDrawerOpen(false)} />
      <POSInProgressDrawer open={inProgressDrawerOpen} onClose={() => setInProgressDrawerOpen(false)} />
      <POSCompletedDrawer open={completedDrawerOpen} onClose={() => setCompletedDrawerOpen(false)} />
      <POSCustomerDrawer open={customerDrawerOpen} onClose={() => setCustomerDrawerOpen(false)} />
      <POSOpenOrderModal open={openOrderModalOpen} onClose={() => setOpenOrderModalOpen(false)} />
      <POSQuoteReceiptDrawer open={quoteDrawerOpen} onClose={() => setQuoteDrawerOpen(false)} cart={cart} subtotal={`£${calculateTotal()}`} />
      <POSProcessPaymentDrawer open={processPaymentDrawerOpen} onClose={() => setProcessPaymentDrawerOpen(false)} cart={cart} total={calculateTotal()} />
      {selectedItemForQty && (
        <POSQuantityModal
          open={Boolean(selectedItemForQty)}
          onClose={() => setSelectedItemForQty(null)}
          item={selectedItemForQty}
          onSave={updateQuantity}
        />
      )}
      {selectedItemForEdit && (
        <POSItemEditModal
          open={Boolean(selectedItemForEdit)}
          onClose={() => setSelectedItemForEdit(null)}
          item={selectedItemForEdit}
        />
      )}
    </>
  );
};

export default POSCartSidebar;