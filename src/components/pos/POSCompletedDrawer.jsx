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
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReplayIcon from "@mui/icons-material/Replay";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const POSCompletedDrawer = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("orders");
  const [returnsOpen, setReturnsOpen] = useState(true);
  const [tradeInOpen, setTradeInOpen] = useState(true);
  const [supplierOpen, setSupplierOpen] = useState(true);
  const [expenseOpen, setExpenseOpen] = useState(true);

  const tabs = [
    { id: "orders", label: "Orders" },
    { id: "products", label: "Products" },
    { id: "purchase", label: "Purchase Orders & Payments" },
    { id: "supplier", label: "Supplier Payments" },
    { id: "expenses", label: "Expenses" },
    { id: "customer", label: "Customer Payments" },
    { id: "logs", label: "Order Payment Logs" },
  ];

  const ordersData = [
    { id: "217-0926-128", name: "Ali", totalSale: "-PKR 50.00", received: "-PKR 50.00\nCard: -PKR 50.00", balance: "PKR 0.00", date: "28, Sep 2026 09:46 PM\nOrdered: 28, Sep 2026 09:46 PM", creator: "M Tech\nServed: M Tech" },
    { id: "217-0926-127", name: "N/A", totalSale: "PKR 0.00", received: "", balance: "PKR 0.00", date: "28, Sep 2026 09:46 PM\nOrdered: 28, Sep 2026 09:46 PM", creator: "M Tech" },
    { id: "217-0926-126", name: "N/A", totalSale: "-PKR 3.00\nReturn: PKR 3.00", received: "-PKR 3.00\nCash: -PKR 3.00", balance: "PKR 0.00", date: "28, Sep 2026 09:45 PM\nOrdered: 28, Sep 2026 09:45 PM", creator: "M Tech" },
    { id: "217-0926-125", name: "N/A", totalSale: "PKR 10.00\nSale: PKR 10.00", received: "PKR 10.00\nCash: PKR 10.00", balance: "PKR 0.00", date: "28, Sep 2026 09:45 PM\nOrdered: 28, Sep 2026 09:44 PM", creator: "M Tech" },
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
          width: "98vw",
          maxWidth: "1550px",
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
      {/* TOP HEADER TITLE & CLOSE */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "18px" }}>
          Completed
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#ffffff", border: "1px solid #e2e8f0", color: "#64748b", "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* MAIN LAYOUT: LEFT CONTENT & RIGHT GRAND TOTAL SIDEBAR */}
      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
        
        {/* LEFT CONTAINER: Sub-tabs, filters & dynamic tables */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          
          {/* SUB-TABS */}
          <Paper elevation={0} sx={{ p: 1.5, mb: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff", display: "flex", gap: 1, overflowX: "auto" }}>
            {tabs.map((t) => {
              const active = activeTab === t.id;
              return (
                <Button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "none",
                    px: 2.5,
                    py: 1,
                    borderRadius: "8px",
                    bgcolor: active ? "#fee2e2" : "transparent",
                    color: active ? "#dc2626" : "#64748b",
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    "&:hover": { bgcolor: active ? "#fee2e2" : "#f1f5f9" },
                  }}
                >
                  {t.label}
                </Button>
              );
            })}
          </Paper>

          {/* FILTER ROW */}
          <Paper elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
              <Box sx={{ flex: 1, minWidth: "170px" }}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Customers</Typography>
                <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }}>
                  <MenuItem value="">Select Customers</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: 1, minWidth: "170px" }}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Created By</Typography>
                <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }}>
                  <MenuItem value="">Select Created By</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: 1, minWidth: "170px" }}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Served By</Typography>
                <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }}>
                  <MenuItem value="">Select Served By</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: 1.2, minWidth: "200px" }}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Receipt No</Typography>
                <TextField placeholder="Please enter receipt no here" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }} />
              </Box>
              <Box sx={{ alignSelf: "flex-end", display: "flex", gap: 1, pb: 0.2 }}>
                <Button variant="contained" sx={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", fontWeight: 600, fontSize: "12px", textTransform: "none", px: 3, height: "38px", borderRadius: "8px", boxShadow: "none" }}>Search</Button>
                <Button variant="outlined" sx={{ height: "38px", borderColor: "#cbd5e1", color: "#334155" }}><SearchIcon sx={{ fontSize: "18px" }} /></Button>
              </Box>
            </Box>
          </Paper>

          {/* ORDERS TABLE */}
          {activeTab === "orders" && (
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569", pl: 2 }}>RECEIPT#</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>NAME / MOBILE NO</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>TOTAL SALE</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>RECEIVED</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>BALANCE</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>COMPLETED / ORDER DATE</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569" }}>CREATED / SERVED BY</TableCell>
                    <TableCell padding="checkbox"><Checkbox size="small" /></TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, fontSize: "11.5px", color: "#475569", pr: 2 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersData.map((order, idx) => (
                    <TableRow key={idx} sx={{ bgcolor: "#ffffff", "&:hover": { bgcolor: "#f8fafc" } }}>
                      <TableCell sx={{ pl: 2, verticalAlign: "top", pt: 1.5 }}>
                        <Typography component="a" href="#" sx={{ fontSize: "12px", fontWeight: 700, color: "#dc2626", textDecoration: "none" }}>{order.id}</Typography>
                        <Box sx={{ mt: 0.5 }}><Chip label="Sale" size="small" sx={{ fontSize: "9.5px", height: "18px", bgcolor: "#f1f5f9", fontWeight: 600 }} /></Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", color: "#334155", verticalAlign: "top", pt: 1.5 }}>{order.name}</TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#0f172a", whiteSpace: "pre-line", verticalAlign: "top", pt: 1.5 }}>{order.totalSale}</TableCell>
                      <TableCell sx={{ fontSize: "12px", color: "#334155", whiteSpace: "pre-line", verticalAlign: "top", pt: 1.5 }}>
                        {order.received}
                        {order.received && <Box sx={{ mt: 0.5 }}><Chip label="Deducted" size="small" sx={{ fontSize: "9.5px", height: "18px", bgcolor: "#dcfce7", color: "#16a34a", fontWeight: 700 }} /></Box>}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", verticalAlign: "top", pt: 1.5 }}>{order.balance}</TableCell>
                      <TableCell sx={{ fontSize: "11.5px", color: "#64748b", whiteSpace: "pre-line", verticalAlign: "top", pt: 1.5 }}>
                        {order.date}
                        <Box sx={{ mt: 0.5 }}><Chip label="Complete" size="small" sx={{ fontSize: "9.5px", height: "18px", bgcolor: "#dcfce7", color: "#16a34a", fontWeight: 700 }} /></Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "11.5px", color: "#64748b", whiteSpace: "pre-line", verticalAlign: "top", pt: 1.5 }}>{order.creator}</TableCell>
                      <TableCell padding="checkbox" sx={{ verticalAlign: "top", pt: 1.5 }}><Checkbox size="small" /></TableCell>
                      <TableCell align="right" sx={{ pr: 2, verticalAlign: "top", pt: 1.5 }}>
                        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
                          <IconButton size="small" sx={{ color: "#dc2626", bgcolor: "#fee2e2", p: 0.75, borderRadius: "6px" }}><ReplayIcon sx={{ fontSize: "16px" }} /></IconButton>
                          <IconButton size="small" sx={{ color: "#dc2626", bgcolor: "#fee2e2", p: 0.75, borderRadius: "6px" }}><ReceiptIcon sx={{ fontSize: "16px" }} /></IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {activeTab !== "orders" && (
            <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
              <Typography variant="body2" sx={{ color: "#64748b" }}>Displaying data for {activeTab.toUpperCase()}</Typography>
            </Paper>
          )}

        </Box>

        {/* RIGHT SIDEBAR: EXACT MATCH GRAND TOTAL & FINANCIAL BREAKDOWN WIDGET */}
        <Paper elevation={0} sx={{ width: "360px", p: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff", flexShrink: 0 }}>
          
          {/* Grand Total Header Box */}
          <Box sx={{ bgcolor: "#2563eb", color: "#ffffff", p: 2, borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px" }}>GRAND TOTAL</Typography>
              <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: 800 }}>PKR 2,000,000,010.00</Typography>
            </Box>
            <KeyboardArrowUpIcon />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, px: 0.5 }}>
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Balance Due</Typography>
            <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 700, color: "#dc2626" }}>PKR 0.00</Typography>
          </Box>

          {/* Total Sale Card */}
          <Box sx={{ border: "1px solid #bbf7d0", bgcolor: "#f0fdf4", p: 1.5, borderRadius: "8px", mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700, color: "#16a34a" }}>🛍️ Total Sale</Typography>
              <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 800, color: "#16a34a" }}>PKR 2,000,000,010.00</Typography>
            </Box>
            <Typography variant="caption" sx={{ display: "block", fontSize: "10px", color: "#64748b", fontWeight: 600, mb: 0.5 }}>MADE UP OF</Typography>
            <Box sx={{ bgcolor: "#ffffff", p: 1, borderRadius: "6px", border: "1px solid #dcfce7", display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: "#16a34a" }}>💵 RECEIVED</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#0f172a" }}>PKR 1,000,000,010.00</Typography>
            </Box>
          </Box>

          {/* Discount & Orders Row */}
          <Box sx={{ display: "flex", gap: 1, mb: 2.5 }}>
            <Box sx={{ flex: 1, border: "1px solid #e2e8f0", p: 1, borderRadius: "8px" }}>
              <Typography variant="caption" sx={{ fontSize: "10px", color: "#64748b", fontWeight: 600 }}>🏷️ DISCOUNT</Typography>
              <Typography variant="subtitle2" sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>PKR 0.00</Typography>
            </Box>
            <Box sx={{ flex: 1, border: "1px solid #e2e8f0", p: 1, borderRadius: "8px" }}>
              <Typography variant="caption" sx={{ fontSize: "10px", color: "#64748b", fontWeight: 600 }}>📋 ORDERS</Typography>
              <Typography variant="subtitle2" sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>4</Typography>
            </Box>
          </Box>

          <Typography variant="caption" sx={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#334155", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.3px" }}>
            Payment Breakdown
          </Typography>

          {/* Cash breakdown */}
          <Box sx={{ border: "1px solid #e2e8f0", p: 1.5, borderRadius: "8px", mb: 1, bgcolor: "#f8fafc" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700, color: "#16a34a" }}>💵 Cash</Typography>
              <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 800, color: "#16a34a" }}>PKR 1,000,000,010.00</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b" }}>
              <span>Paid (Returns + Trade-ins)</span>
              <span>PKR 3.00</span>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b" }}>
              <span>Expense</span>
              <span>PKR 1.00</span>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, color: "#dc2626", mt: 0.5, pt: 0.5, borderTop: "1px solid #e2e8f0" }}>
              <span>Available</span>
              <span>PKR 1,000,000,006.00</span>
            </Box>
          </Box>

          {/* Card breakdown */}
          <Box sx={{ border: "1px solid #e2e8f0", p: 1.5, borderRadius: "8px", mb: 1, bgcolor: "#f8fafc" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700, color: "#0284c7" }}>💳 Card</Typography>
              <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 800, color: "#16a34a" }}>PKR 0.00</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b" }}>
              <span>Paid (Returns + Trade-ins)</span>
              <span>PKR 50.00</span>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, color: "#dc2626", mt: 0.5, pt: 0.5, borderTop: "1px solid #e2e8f0" }}>
              <span>Available</span>
              <span>-PKR 50.00</span>
            </Box>
          </Box>

          {/* Bank breakdown */}
          <Box sx={{ border: "1px solid #e2e8f0", p: 1.5, borderRadius: "8px", mb: 2, bgcolor: "#f8fafc" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700, color: "#7c3aed" }}>🏛️ Bank</Typography>
              <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 800, color: "#16a34a" }}>PKR 0.00</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, color: "#0f172a", mt: 0.5, pt: 0.5, borderTop: "1px solid #e2e8f0" }}>
              <span>Available</span>
              <span>PKR 0.00</span>
            </Box>
          </Box>

          {/* Total Received & Available Footer */}
          <Box sx={{ bgcolor: "#0f172a", color: "#ffffff", p: 1.5, borderRadius: "8px", display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ fontSize: "9.5px", color: "#94a3b8", fontWeight: 600 }}>TOTAL RECEIVED</Typography>
              <Typography variant="subtitle2" sx={{ fontSize: "11.5px", fontWeight: 700, color: "#4ade80" }}>PKR 1,000,000,010.00</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" sx={{ fontSize: "9.5px", color: "#94a3b8", fontWeight: 600 }}>TOTAL AVAILABLE</Typography>
              <Typography variant="subtitle2" sx={{ fontSize: "11.5px", fontWeight: 700, color: "#60a5fa" }}>PKR 999,999,956.00</Typography>
            </Box>
          </Box>

          {/* Collapsible Accordions (Returns, Trade-In, Supplier Payments, Expenses, Total Payments) */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            
            {/* Returns Total */}
            <Box sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
              <Box onClick={() => setReturnsOpen(!returnsOpen)} sx={{ p: 1.5, bgcolor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700, color: "#dc2626" }}>🔄 RETURNS TOTAL</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700 }}>PKR 3.00</Typography>
                  {returnsOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                </Box>
              </Box>
              <Collapse in={returnsOpen}>
                <Box sx={{ p: 1.5, bgcolor: "#ffffff", borderTop: "1px solid #e2e8f0", fontSize: "11.5px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <span style={{ color: "#64748b" }}>Paid from Sales</span>
                    <span style={{ fontWeight: 600 }}>PKR 3.00</span>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", color: "#ca8a04", fontWeight: 600 }}>
                    <span>Paid to Customer</span>
                    <span>PKR 3.00</span>
                  </Box>
                </Box>
              </Collapse>
            </Box>

            {/* Trade-In Total */}
            <Box sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
              <Box onClick={() => setTradeInOpen(!tradeInOpen)} sx={{ p: 1.5, bgcolor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700, color: "#0284c7" }}>💱 TRADE-IN TOTAL</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700 }}>PKR 50.00</Typography>
                  {tradeInOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                </Box>
              </Box>
              <Collapse in={tradeInOpen}>
                <Box sx={{ p: 1.5, bgcolor: "#ffffff", borderTop: "1px solid #e2e8f0", fontSize: "11.5px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <span style={{ color: "#64748b" }}>By Sale Orders</span>
                    <span style={{ fontWeight: 600 }}>PKR 50.00</span>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", color: "#ca8a04", fontWeight: 600 }}>
                    <span>Paid to Customer</span>
                    <span>PKR 50.00</span>
                  </Box>
                </Box>
              </Collapse>
            </Box>

            {/* Supplier Payments */}
            <Box sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
              <Box onClick={() => setSupplierOpen(!supplierOpen)} sx={{ p: 1.5, bgcolor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700, color: "#2563eb" }}>🚚 SUPPLIER PAYMENTS</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700 }}>PKR 3.00</Typography>
                  {supplierOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                </Box>
              </Box>
              <Collapse in={supplierOpen}>
                <Box sx={{ p: 1.5, bgcolor: "#ffffff", borderTop: "1px solid #e2e8f0", fontSize: "11.5px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <span style={{ color: "#64748b" }}>Paid from Reserve</span>
                    <span style={{ fontWeight: 600 }}>PKR 3.00</span>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                    <span>done tech</span>
                    <span>PKR 3.00</span>
                  </Box>
                </Box>
              </Collapse>
            </Box>

            {/* Total Expense */}
            <Box sx={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
              <Box onClick={() => setExpenseOpen(!expenseOpen)} sx={{ p: 1.5, bgcolor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700, color: "#d97706" }}>🏷️ Total Expense</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 700 }}>PKR 1.00</Typography>
                  {expenseOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                </Box>
              </Box>
              <Collapse in={expenseOpen}>
                <Box sx={{ p: 1.5, bgcolor: "#ffffff", borderTop: "1px solid #e2e8f0", fontSize: "11.5px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                    <span>Paid from Sales:</span>
                    <span>💵 PKR 1.00</span>
                  </Box>
                </Box>
              </Collapse>
            </Box>

            {/* Total Payments Summary Box */}
            <Box sx={{ border: "1px solid #cbd5e1", borderRadius: "8px", p: 1.5, bgcolor: "#f8fafc" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>Total Payments</Typography>
                <Typography variant="subtitle2" sx={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>PKR 57.00</Typography>
              </Box>
              <Typography variant="caption" sx={{ display: "block", fontSize: "10.5px", color: "#64748b", mb: 1 }}>
                Returns PKR 3.00 + Trade-in PKR 50.00 + Supplier Payments PKR 3.00 + Expense PKR 1.00
              </Typography>
              <Typography variant="caption" sx={{ display: "block", fontSize: "10px", fontStyle: "italic", color: "#94a3b8", mb: 1.5 }}>
                That's what today's Total Payments (Paid from Sales + Paid from Reserve) went towards, in full.
              </Typography>

              {/* Paid from Sales */}
              <Box sx={{ border: "1px solid #bbf7d0", bgcolor: "#f0fdf4", p: 1, borderRadius: "6px", mb: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "11.5px", color: "#16a34a", mb: 0.5 }}>
                  <span>🟢 Paid from Sales (Today's Till)</span>
                  <span>PKR 54.00</span>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "#64748b" }}>
                  <span>Cash: PKR 4.00</span>
                  <span>Card: PKR 50.00</span>
                  <span>Bank: PKR 0.00</span>
                </Box>
              </Box>

              {/* Paid from Reserve */}
              <Box sx={{ border: "1px solid #bbf7d0", bgcolor: "#f0fdf4", p: 1, borderRadius: "6px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "11.5px", color: "#16a34a", mb: 0.5 }}>
                  <span>🟢 Paid from Reserve (Reserved Funds)</span>
                  <span>PKR 3.00</span>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "#64748b" }}>
                  <span>Cash: PKR 3.00</span>
                  <span>Card: PKR 0.00</span>
                  <span>Bank: PKR 0.00</span>
                </Box>
              </Box>
            </Box>

          </Box>

        </Paper>

      </Box>
    </Drawer>
  );
};

export default POSCompletedDrawer;