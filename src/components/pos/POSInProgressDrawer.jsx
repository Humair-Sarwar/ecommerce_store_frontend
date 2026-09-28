import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Chip from "@mui/icons-material/CompareArrows";

const POSInProgressDrawer = ({ open, onClose }) => {
  const [activeSubTab, setActiveSubTab] = useState("cart"); // 'cart' or 'orders'

  // Dummy data for Tab 1: In-Progress Cart
  const cartOrders = [
    { id: "217-0926-77", date: "02, Sep 2026 10:19 PM", name: "N/A", mobile: "N/A", total: 0.00, received: 0.00, balance: 0.00, status: "In-Process", createdBy: "M Tech", servedBy: "N/A" },
    { id: "217-0826-55", date: "29, Aug 2026 02:16 PM", name: "N/A", mobile: "N/A", total: 0.00, received: 130.00, balance: -130.00, status: "In-Process", createdBy: "M Tech", servedBy: "N/A" },
    { id: "217-0826-44", date: "28, Aug 2026 07:06 PM", name: "N/A", mobile: "N/A", total: -1.00, received: -16.00, balance: 15.00, status: "In-Process", createdBy: "M Tech", servedBy: "N/A" },
    { id: "217-0826-34", date: "28, Aug 2026 05:24 PM", name: "N/A", mobile: "N/A", total: 0.00, received: 0.00, balance: 0.00, status: "In-Process", createdBy: "M Tech", servedBy: "N/A" },
    { id: "217-0826-28", date: "28, Aug 2026 04:57 PM", name: "User 1", mobile: "N/A", total: 495.00, received: 15.00, balance: 480.00, status: "In-Process", createdBy: "M Tech", servedBy: "N/A" },
  ];

  // Dummy data for Tab 2: Credit / In-Progress Orders
  const creditOrders = [
    { id: "217-0926-120", name: "Ali", totalSale: 50.00, received: 25.00, balance: 25.00, orderDate: "-", completedDate: "-", status: "Complete", createdBy: "M Tech", servedBy: "M Tech" },
    { id: "217-0926-110", name: "Ali", totalSale: 1.00, received: 0.00, balance: 1.00, orderDate: "-", completedDate: "-", status: "Complete", createdBy: "M Tech", servedBy: "M Tech" },
    { id: "217-0926-104", name: "N/A", totalSale: 5.00, received: 5.00, balance: 0.00, orderDate: "-", completedDate: "-", status: "Complete", createdBy: "M Tech", servedBy: "N/A" },
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
          width: "96vw",
          maxWidth: "1400px",
          bgcolor: "#f8fafc",
          p: 3.5,
          boxShadow: "20px 0 60px rgba(0, 0, 0, 0.15)",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "7px" },
          "&::-webkit-scrollbar-track": { background: "#f1f5f9" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        },
      }}
    >
      {/* 1. TOP HEADER NAVIGATION TABS & CLOSE BUTTON */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", mb: 2.5 }}>
        {/* Centered Sub-Tabs */}
        <Box sx={{ display: "flex", bgcolor: "#f1f5f9", p: "4px", borderRadius: "24px", border: "1px solid #e2e8f0", gap: 1 }}>
          <Button
            onClick={() => setActiveSubTab("cart")}
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "none",
              px: 3,
              py: 0.75,
              borderRadius: "20px",
              bgcolor: activeSubTab === "cart" ? "#dc2626" : "transparent",
              color: activeSubTab === "cart" ? "#ffffff" : "#64748b",
              boxShadow: activeSubTab === "cart" ? "0 4px 12px rgba(220,38,38,0.3)" : "none",
              "&:hover": { bgcolor: activeSubTab === "cart" ? "#b91c1c" : "rgba(0,0,0,0.04)" },
            }}
          >
            In-Progress Cart <Box component="span" sx={{ ml: 1, bgcolor: activeSubTab === "cart" ? "#ffffff" : "#e2e8f0", color: activeSubTab === "cart" ? "#dc2626" : "#334155", px: 1, py: 0.1, borderRadius: "10px", fontSize: "10px" }}>7</Box>
          </Button>
          <Button
            onClick={() => setActiveSubTab("orders")}
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "none",
              px: 3,
              py: 0.75,
              borderRadius: "20px",
              bgcolor: activeSubTab === "orders" ? "#dc2626" : "transparent",
              color: activeSubTab === "orders" ? "#ffffff" : "#64748b",
              boxShadow: activeSubTab === "orders" ? "0 4px 12px rgba(220,38,38,0.3)" : "none",
              "&:hover": { bgcolor: activeSubTab === "orders" ? "#b91c1c" : "rgba(0,0,0,0.04)" },
            }}
          >
            Credit / In-Progress Orders <Box component="span" sx={{ ml: 1, bgcolor: activeSubTab === "orders" ? "#ffffff" : "#16a34a", color: activeSubTab === "orders" ? "#dc2626" : "#ffffff", px: 1, py: 0.1, borderRadius: "10px", fontSize: "10px" }}>3</Box>
          </Button>
        </Box>

        {/* Right Close Button */}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: "absolute",
            right: 0,
            bgcolor: "#ffffff",
            border: "1px solid #e2e8f0",
            color: "#64748b",
            "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 2. FILTER SEARCH BAR ROW */}
      <Paper elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
          
          <Box sx={{ flex: 1, minWidth: "180px" }}>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>
              Customers
            </Typography>
            <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }}>
              <MenuItem value="">Customers</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ flex: 1, minWidth: "180px" }}>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>
              Created By
            </Typography>
            <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }}>
              <MenuItem value="">Select Created By</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ flex: 1, minWidth: "180px" }}>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>
              Served By
            </Typography>
            <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }}>
              <MenuItem value="">Select served by</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ flex: 1, minWidth: "180px" }}>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>
              Technician
            </Typography>
            <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }}>
              <MenuItem value="">Select technician</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ flex: 1.2, minWidth: "220px" }}>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>
              Search
            </Typography>
            <TextField placeholder="Receipt no, product, device or job" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }} />
          </Box>

          <Box sx={{ alignSelf: "flex-end", pb: 0.2 }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon sx={{ fontSize: "16px !important" }} />}
              sx={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                fontWeight: 600,
                fontSize: "12px",
                textTransform: "none",
                px: 3,
                height: "38px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
                "&:hover": { background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" },
              }}
            >
              Search
            </Button>
          </Box>

        </Box>
      </Paper>

      {/* 3. SUMMARY STATS PANEL */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "stretch", flexWrap: "wrap", gap: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1, minWidth: "220px" }}>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Type: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>Sale</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Status: <Box component="span" sx={{ fontWeight: 700, color: "#0284c7", ml: 1.5 }}>In-Progress</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Total Orders: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>{activeSubTab === "cart" ? "7" : "3"}</Box></Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1, minWidth: "220px" }}>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Cash: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>PKR 650.00</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Card: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>PKR 0.00</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Bank: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>-PKR 16.00</Box></Typography>
          </Box>

          <Box sx={{ minWidth: "260px", bgcolor: "#f8fafc", p: 1.5, borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "center", gap: 0.75 }}>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#475569" }}>Received: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", float: "right" }}>{activeSubTab === "cart" ? "PKR 679.00" : "PKR 30.00"}</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#475569" }}>Balance: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", float: "right" }}>{activeSubTab === "cart" ? "PKR 365.00" : "PKR 26.00"}</Box></Typography>
            <Box sx={{ pt: 0.75, mt: 0.5, borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1" sx={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Total:</Typography>
              <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 800, color: "#dc2626" }}>{activeSubTab === "cart" ? "PKR 1,044.00" : "PKR 56.00"}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 4, mt: 2.5, pt: 2, borderTop: "1px solid #f1f5f9", fontSize: "12px", fontWeight: 600 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#16a34a" }}>🛍️ Sale <Box component="span" sx={{ color: "#0f172a", fontWeight: 700 }}>{activeSubTab === "cart" ? "PKR 1,060.00" : "PKR 30.00"}</Box></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#dc2626" }}>🔄 Return <Box component="span" sx={{ color: "#0f172a", fontWeight: 700 }}>{activeSubTab === "cart" ? "-PKR 16.00" : "PKR 0.00"}</Box></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#0284c7" }}>💱 Trade-In <Box component="span" sx={{ color: "#0f172a", fontWeight: 700 }}>PKR 0.00</Box></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#d97706" }}>🏷️ Discount <Box component="span" sx={{ color: "#0f172a", fontWeight: 700 }}>PKR 0.00</Box></Box>
        </Box>
      </Paper>

      {/* 4. DYNAMIC TABLES BASED ON ACTIVE SUB-TAB */}
      {activeSubTab === "cart" ? (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f1f5f9" }}>
              <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 2 }}><Checkbox size="small" /></TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Select All</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Date/time</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Receipt#</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Mobile No</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Received</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Balance</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Created By</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Served By</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569", pr: 2 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartOrders.map((order) => (
                <TableRow key={order.id} sx={{ bgcolor: "#ffffff", "&:hover": { bgcolor: "#f8fafc" }, transition: "background 0.2s ease" }}>
                  <TableCell padding="checkbox" sx={{ pl: 2 }}><Checkbox size="small" /></TableCell>
                  <TableCell />
                  <TableCell sx={{ fontSize: "12px", color: "#334155", py: 1.5 }}>{order.date}</TableCell>
                  <TableCell><Typography component="a" href="#" sx={{ fontSize: "12px", fontWeight: 700, color: "#dc2626", textDecoration: "none" }}>{order.id}</Typography></TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>{order.name}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>{order.mobile}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>PKR {order.total.toFixed(2)}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>PKR {order.received.toFixed(2)}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>PKR {order.balance.toFixed(2)}</TableCell>
                  <TableCell><Chip label={order.status} size="small" sx={{ fontSize: "10.5px", fontWeight: 700, bgcolor: "#e0f2fe", color: "#0284c7", height: "22px" }} /></TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#334155" }}>{order.createdBy}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>{order.servedBy}</TableCell>
                  <TableCell align="right" sx={{ pr: 2 }}>
                    <IconButton size="small" onClick={onClose} sx={{ bgcolor: "#f1f5f9", color: "#0f172a", borderRadius: "6px", p: 1, "&:hover": { bgcolor: "#dc2626", color: "#ffffff" } }}>
                      <ShoppingCartIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f1f5f9" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569", pl: 2 }}>Receipt#</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Total Sale</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Received</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Balance</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Order Date</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Completed Date</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Created By</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Served By</TableCell>
                <TableCell padding="checkbox"><Checkbox size="small" /></TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569", pr: 2 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditOrders.map((order) => (
                <TableRow key={order.id} sx={{ bgcolor: "#ffffff", "&:hover": { bgcolor: "#f8fafc" }, transition: "background 0.2s ease" }}>
                  <TableCell sx={{ pl: 2 }}><Typography component="a" href="#" sx={{ fontSize: "12px", fontWeight: 700, color: "#dc2626", textDecoration: "none" }}>{order.id}</Typography></TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#334155" }}>{order.name}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>PKR {order.totalSale.toFixed(2)}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>PKR {order.received.toFixed(2)}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>PKR {order.balance.toFixed(2)}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>{order.orderDate}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>{order.completedDate}</TableCell>
                  <TableCell><Chip label={order.status} size="small" sx={{ fontSize: "10.5px", fontWeight: 700, bgcolor: "#dcfce7", color: "#16a34a", height: "22px" }} /></TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#334155" }}>{order.createdBy}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>{order.servedBy}</TableCell>
                  <TableCell padding="checkbox"><Checkbox size="small" /></TableCell>
                  <TableCell align="right" sx={{ pr: 2 }}>
                    <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
                      <Button size="small" variant="contained" startIcon={<EditIcon sx={{ fontSize: "12px !important" }} />} sx={{ bgcolor: "#dc2626", fontSize: "10px", fontWeight: 600, py: 0.3, px: 1, textTransform: "none", boxShadow: "none" }}>Edit</Button>
                      <Button size="small" variant="contained" startIcon={<PaymentIcon sx={{ fontSize: "12px !important" }} />} sx={{ bgcolor: "#dc2626", fontSize: "10px", fontWeight: 600, py: 0.3, px: 1, textTransform: "none", boxShadow: "none" }}>Pay</Button>
                      <Button size="small" variant="contained" startIcon={<BlockIcon sx={{ fontSize: "12px !important" }} />} sx={{ bgcolor: "#dc2626", fontSize: "10px", fontWeight: 600, py: 0.3, px: 1, textTransform: "none", boxShadow: "none" }}>Void</Button>
                      <IconButton size="small" sx={{ color: "#dc2626", bgcolor: "#fee2e2", p: 0.5, borderRadius: "4px" }}><ReceiptIcon sx={{ fontSize: "16px" }} /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* 5. FOOTER PAGINATION */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, pt: 1, px: 1 }}>
        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 500 }}>
          Showing {activeSubTab === "cart" ? "1 - 7 of 7" : "1 - 3 of 3"}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Button size="small" variant="outlined" sx={{ minWidth: "28px", height: "28px", p: 0, borderColor: "#cbd5e1", color: "#64748b" }}>&lt;</Button>
            <Button size="small" variant="contained" sx={{ minWidth: "28px", height: "28px", p: 0, bgcolor: "#dc2626", boxShadow: "none" }}>1</Button>
            <Button size="small" variant="outlined" sx={{ minWidth: "28px", height: "28px", p: 0, borderColor: "#cbd5e1", color: "#64748b" }}>&gt;</Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 500 }}>Rows per page</Typography>
            <Select defaultValue={60} size="small" sx={{ height: "30px", fontSize: "11px", bgcolor: "#ffffff" }}>
              <MenuItem value={60}>60</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default POSInProgressDrawer;