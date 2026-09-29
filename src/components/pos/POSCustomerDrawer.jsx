import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PaymentIcon from "@mui/icons-material/Payment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import POSCreateCustomerModal from "./POSCreateCustomerModal";
import POSDownloadDrawer from "./POSDownloadDrawer";
import POSCustomerLedgerDrawer from "./POSCustomerLedgerDrawer";
import POSCustomerPaymentStatementDrawer from "./POSCustomerPaymentStatementDrawer";
import POSViewCustomerModal from "./POSViewCustomerModal";
import POSShopModal from "./POSShopModal";

const POSCustomerDrawer = ({ open, onClose }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [downloadDrawerOpen, setDownloadDrawerOpen] = useState(false);
  const [ledgerDrawerOpen, setLedgerDrawerOpen] = useState(false);
  const [statementDrawerOpen, setStatementDrawerOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    { name: "Test User", balance: 0.00, limit: 0.00, contact: "No contact details", avatarBg: "#dc2626" },
    { name: "Jjjjj", balance: 19806.53, limit: 0.00, contact: "No contact details", avatarBg: "#9333ea" },
    { name: "Muhammad Qaisar Lli", balance: 26284.99, limit: 0.00, phone: "+07 7683 78472", email: "qaisarmalik.web@gmail.com", avatarBg: "#2563eb" },
    { name: "Malik Asif", balance: 1.30, limit: 0.00, contact: "No contact details", avatarBg: "#0284c7" },
    { name: "My New Customer 1", balance: 0.00, limit: 0.00, contact: "No contact details", avatarBg: "#4f46e5" },
    { name: "Humair Sarwar 1", balance: 0.00, limit: 0.00, phone: "+03 0883 40373", email: "humairsarwar956@gmail.com", avatarBg: "#0d9488" },
    { name: "Test 2 Customer", balance: 0.00, limit: 0.00, phone: "+44 4543 54354", avatarBg: "#4f46e5" },
    { name: "Shafiq", balance: 8.00, limit: 0.00, phone: "+44 1234 5", email: "shafiz@gmail.com", location: "london", avatarBg: "#d97706" },
    { name: "Tttt", balance: 1.00, limit: 0.00, phone: "+44 4324 324324", avatarBg: "#0891b2" },
  ];

  const handleOpenLedger = (cust) => {
    setSelectedCustomer(cust);
    setLedgerDrawerOpen(true);
  };

  const handleOpenStatement = (cust) => {
    setSelectedCustomer(cust);
    setStatementDrawerOpen(true);
  };

  const handleOpenView = (cust) => {
    setSelectedCustomer(cust);
    setViewModalOpen(true);
  };

  const handleOpenShop = (cust) => {
    setSelectedCustomer(cust);
    setShopModalOpen(true);
  };

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
            width: "70vw",
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
        {/* TOP HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "18px" }}>
            Customers
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#ffffff", border: "1px solid #e2e8f0", color: "#64748b", "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* FILTER & ADD BAR */}
        <Paper elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1.5, flex: 1, flexWrap: "wrap", alignItems: "center" }}>
              <Box sx={{ minWidth: "180px" }}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Filter By</Typography>
                <TextField select size="small" defaultValue="Customer Name" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }}>
                  <MenuItem value="Customer Name">Customer Name</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: 1.5, minWidth: "240px" }}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Search</Typography>
                <TextField placeholder="Search Customer..." size="small" fullWidth InputProps={{ startAdornment: <SearchIcon sx={{ fontSize: "16px", color: "#94a3b8", mr: 1 }} /> }} sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }} />
              </Box>
              <Box sx={{ minWidth: "180px" }}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Served By</Typography>
                <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px", bgcolor: "#f8fafc" } }}>
                  <MenuItem value="">Select Served By</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignSelf: "flex-end", pb: 0.2 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateModalOpen(true)}
                sx={{ bgcolor: "#dc2626", fontWeight: 600, fontSize: "12px", textTransform: "none", px: 3, height: "38px", borderRadius: "8px", boxShadow: "none", "&:hover": { bgcolor: "#b91c1c" } }}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                onClick={() => setDownloadDrawerOpen(true)}
                sx={{ height: "38px", borderColor: "#cbd5e1", color: "#334155", bgcolor: "#ffffff", "&:hover": { bgcolor: "#f1f5f9" } }}
              >
                <DownloadIcon sx={{ fontSize: "18px" }} />
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* TOTAL BALANCE HEADER */}
        <Paper elevation={0} sx={{ p: 1.5, mb: 2, borderRadius: "8px", border: "1px solid #e2e8f0", bgcolor: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" sx={{ fontSize: "11.5px", fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px" }}>TOTAL BALANCE</Typography>
          <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: 800, color: "#dc2626" }}>£48,577.11</Typography>
        </Paper>

        {/* CUSTOMERS TABLE */}
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <Table size="small">
            <TableBody>
              {customers.map((cust, idx) => (
                <TableRow key={idx} sx={{ bgcolor: "#ffffff", "&:hover": { bgcolor: "#f8fafc" }, transition: "background 0.2s ease" }}>
                  <TableCell sx={{ pl: 2, py: 1.5, width: "35%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: cust.avatarBg, width: 36, height: 36, fontSize: "14px", fontWeight: 700 }}>
                        {cust.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography sx={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>{cust.name}</Typography>
                          {cust.avatarBg === "#dc2626" && <span style={{ fontSize: "10px", background: "#f1f5f9", padding: "1px 6px", borderRadius: "4px", color: "#475569", fontWeight: 600 }}>🛒 1</span>}
                        </Box>
                        {cust.contact && <Typography sx={{ fontSize: "11px", color: "#94a3b8" }}>{cust.contact}</Typography>}
                        {cust.phone && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.3 }}>
                            <span style={{ fontSize: "11.5px", color: "#475569" }}>{cust.phone}</span>
                            <WhatsAppIcon sx={{ fontSize: "14px", color: "#16a34a", cursor: "pointer" }} />
                          </Box>
                        )}
                        {cust.email && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.2 }}>
                            <EmailIcon sx={{ fontSize: "12px", color: "#94a3b8" }} />
                            <span style={{ fontSize: "11px", color: "#64748b" }}>{cust.email}</span>
                          </Box>
                        )}
                        {cust.location && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.2 }}>
                            <LocationOnIcon sx={{ fontSize: "12px", color: "#94a3b8" }} />
                            <span style={{ fontSize: "11px", color: "#64748b" }}>{cust.location}</span>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ width: "25%" }}>
                    <Box sx={{ display: "flex", gap: 4 }}>
                      <Box>
                        <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>BALANCE</Typography>
                        <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>£{cust.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>LIMIT</Typography>
                        <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>£{cust.limit.toFixed(2)}</Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="right" sx={{ pr: 2 }}>
                    <Box sx={{ display: "flex", gap: 0.75, justifyContent: "flex-end" }}>
                      <IconButton size="small" onClick={() => setCreateModalOpen(true)} sx={{ color: "#0284c7", bgcolor: "#f0f9ff", p: 0.75, borderRadius: "6px", "&:hover": { bgcolor: "#e0f2fe" } }}><EditIcon sx={{ fontSize: "16px" }} /></IconButton>
                      <IconButton size="small" onClick={() => handleOpenLedger(cust)} sx={{ color: "#334155", bgcolor: "#f1f5f9", p: 0.75, borderRadius: "6px", "&:hover": { bgcolor: "#e2e8f0" } }}><ListAltIcon sx={{ fontSize: "16px" }} /></IconButton>
                      <IconButton size="small" onClick={() => handleOpenStatement(cust)} sx={{ color: "#d97706", bgcolor: "#fef3c7", p: 0.75, borderRadius: "6px", "&:hover": { bgcolor: "#fde68a" } }}><PaymentIcon sx={{ fontSize: "16px" }} /></IconButton>
                      <IconButton size="small" onClick={() => handleOpenView(cust)} sx={{ color: "#0284c7", bgcolor: "#f0f9ff", p: 0.75, borderRadius: "6px", "&:hover": { bgcolor: "#e0f2fe" } }}><VisibilityIcon sx={{ fontSize: "16px" }} /></IconButton>
                      <IconButton size="small" onClick={() => handleOpenShop(cust)} sx={{ color: "#7c3aed", bgcolor: "#f5f3ff", p: 0.75, borderRadius: "6px", "&:hover": { bgcolor: "#ede9fe" } }}><StorefrontIcon sx={{ fontSize: "16px" }} /></IconButton>
                      <IconButton size="small" sx={{ color: "#16a34a", bgcolor: "#f0fdf4", p: 0.75, borderRadius: "6px", "&:hover": { bgcolor: "#dcfce7" } }}><ShoppingCartIcon sx={{ fontSize: "16px" }} /></IconButton>
                      <IconButton size="small" sx={{ color: "#dc2626", bgcolor: "#fee2e2", p: 0.75, borderRadius: "6px", "&:hover": { bgcolor: "#fecaca" } }}><DeleteIcon sx={{ fontSize: "16px" }} /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Drawer>

      {/* Modals & Drawers */}
      <POSCreateCustomerModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
      <POSDownloadDrawer open={downloadDrawerOpen} onClose={() => setDownloadDrawerOpen(false)} title="Download Customers" />
      <POSCustomerLedgerDrawer open={ledgerDrawerOpen} onClose={() => setLedgerDrawerOpen(false)} customer={selectedCustomer} />
      <POSCustomerPaymentStatementDrawer open={statementDrawerOpen} onClose={() => setStatementDrawerOpen(false)} customer={selectedCustomer} />
      <POSViewCustomerModal open={viewModalOpen} onClose={() => setViewModalOpen(false)} customer={selectedCustomer} />
      <POSShopModal open={shopModalOpen} onClose={() => setShopModalOpen(false)} customer={selectedCustomer} />
    </>
  );
};

export default POSCustomerDrawer;