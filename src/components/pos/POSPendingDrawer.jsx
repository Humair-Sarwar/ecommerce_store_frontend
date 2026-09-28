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
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const POSPendingDrawer = ({ open, onClose, pendingOrders = [] }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const ordersList = pendingOrders.length > 0 ? pendingOrders : [
    { id: "95408047", date: "20, Jun 2026 07:37 PM", name: "N/A", mobile: "N/A", total: 0.00, received: 0.00, balance: 0.00, status: "Pending", createdBy: "Humair Sarwar", servedBy: "N/A" },
    { id: "20292859", date: "20, Jun 2026 05:08 PM", name: "N/A", mobile: "N/A", total: 49.00, received: 0.00, balance: 49.00, status: "Pending", createdBy: "Humair Sarwar", servedBy: "N/A" },
    { id: "73607067", date: "13, Jun 2026 08:36 PM", name: "N/A", mobile: "N/A", total: 12.00, received: 0.00, balance: 12.00, status: "Pending", createdBy: "Humair Sarwar", servedBy: "N/A" },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(ordersList.map((o) => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((item) => item !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

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
          // Sleek eye-catching scrollbar
          "&::-webkit-scrollbar": { width: "7px" },
          "&::-webkit-scrollbar-track": { background: "#f1f5f9" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
          "&::-webkit-scrollbar-thumb:hover": { background: "#94a3b8" },
        },
      }}
    >
      {/* 1. TOP HEADER TITLE & CLOSE */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ bgcolor: "#fee2e2", p: 1, borderRadius: "10px", color: "#dc2626", display: "flex" }}>
            <ReceiptLongIcon sx={{ fontSize: "20px" }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "18px", letterSpacing: "0.2px" }}>
            Pending Orders
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            bgcolor: "#ffffff",
            border: "1px solid #e2e8f0",
            color: "#64748b",
            transition: "all 0.2s ease",
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
              <MenuItem value="">Select Customers</MenuItem>
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
              <MenuItem value="">Select Served By</MenuItem>
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

          <Box sx={{ flex: 1.2, minWidth: "210px" }}>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>
              Receipt No
            </Typography>
            <TextField placeholder="Please enter receipt no here" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }} />
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

      {/* 3. MODERNIZED SUMMARY STATS PANEL (Matching Reference Structure) */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "stretch", flexWrap: "wrap", gap: 3 }}>
          
          {/* Left Block */}
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1, minWidth: "220px" }}>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Type: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>Sale</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Status: <Box component="span" sx={{ fontWeight: 700, color: "#d97706", ml: 1.5 }}>Pending</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Total Orders: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>3</Box></Typography>
          </Box>

          {/* Middle Block */}
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1, minWidth: "220px" }}>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Cash: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>£0.00</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Card: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>£0.00</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#334155" }}>Bank: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", ml: 1.5 }}>£0.00</Box></Typography>
          </Box>

          {/* Right Summary Card Box */}
          <Box sx={{ minWidth: "260px", bgcolor: "#f8fafc", p: 1.5, borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "center", gap: 0.75 }}>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#475569" }}>Received: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", float: "right" }}>£0.00</Box></Typography>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#475569" }}>Balance: <Box component="span" sx={{ fontWeight: 700, color: "#0f172a", float: "right" }}>£61.00</Box></Typography>
            <Box sx={{ pt: 0.75, mt: 0.5, borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1" sx={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Total:</Typography>
              <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 800, color: "#dc2626" }}>£61.00</Typography>
            </Box>
          </Box>

        </Box>

        {/* Bottom Ticker Badges */}
        <Box sx={{ display: "flex", gap: 4, mt: 2.5, pt: 2, borderTop: "1px solid #f1f5f9", fontSize: "12px", fontWeight: 600 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#16a34a" }}>🛍️ Sale <Box component="span" sx={{ color: "#0f172a", fontWeight: 700 }}>£61.00</Box></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#dc2626" }}>🔄 Return <Box component="span" sx={{ color: "#0f172a", fontWeight: 700 }}>£0.00</Box></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#0284c7" }}>💱 Trade-In <Box component="span" sx={{ color: "#0f172a", fontWeight: 700 }}>£0.00</Box></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#d97706" }}>🏷️ Discount <Box component="span" sx={{ color: "#0f172a", fontWeight: 700 }}>£0.00</Box></Box>
        </Box>
      </Paper>

      {/* 4. PENDING ORDERS TABLE */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#f1f5f9" }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ pl: 2 }}>
                <Checkbox
                  size="small"
                  indeterminate={selectedOrders.length > 0 && selectedOrders.length < ordersList.length}
                  checked={selectedOrders.length === ordersList.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Select All</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>Date/Time</TableCell>
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
            {ordersList.map((order) => {
              const isChecked = selectedOrders.includes(order.id);
              return (
                <TableRow key={order.id} sx={{ bgcolor: "#ffffff", "&:hover": { bgcolor: "#f8fafc" }, transition: "background 0.2s ease" }}>
                  <TableCell padding="checkbox" sx={{ pl: 2 }}>
                    <Checkbox
                      size="small"
                      checked={isChecked}
                      onChange={() => handleSelectOne(order.id)}
                    />
                  </TableCell>
                  <TableCell />
                  <TableCell sx={{ fontSize: "12px", color: "#334155", py: 1.5 }}>{order.date}</TableCell>
                  <TableCell>
                    <Typography component="a" href="#" sx={{ fontSize: "12px", fontWeight: 700, color: "#dc2626", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>{order.name}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>{order.mobile}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>£{order.total.toFixed(2)}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>£{order.received.toFixed(2)}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>£{order.balance.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      size="small"
                      sx={{ fontSize: "10.5px", fontWeight: 700, bgcolor: "#fef3c7", color: "#d97706", height: "22px" }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#334155" }}>{order.createdBy}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>{order.servedBy}</TableCell>
                  <TableCell align="right" sx={{ pr: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCartIcon sx={{ fontSize: "14px !important" }} />}
                      onClick={onClose}
                      sx={{
                        bgcolor: "#0f172a",
                        color: "#ffffff",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "8px",
                        py: 0.5,
                        px: 1.5,
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#dc2626" },
                      }}
                    >
                      Resume
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Drawer>
  );
};

export default POSPendingDrawer;