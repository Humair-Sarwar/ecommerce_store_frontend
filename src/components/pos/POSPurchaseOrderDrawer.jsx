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
  Switch,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";

const POSPurchaseOrderDrawer = ({ open, onClose, product }) => {
  const [tradeIn, setTradeIn] = useState(false);
  const [useTodaySales, setUseTodaySales] = useState(false);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        "& *": { fontFamily: "'Poppins', sans-serif !important" },
        "& .MuiDrawer-paper": {
          width: "100vw",
          maxWidth: "1550px",
          bgcolor: "#f8fafc",
          p: 3,
          boxShadow: "20px 0 60px rgba(0, 0, 0, 0.15)",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "7px" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        },
      }}
    >
      {/* TOP HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, bgcolor: "#ffffff", p: 2, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <Box sx={{ bgcolor: "#fff5f5", color: "#dc2626", px: 1, py: 0.2, borderRadius: "6px", fontWeight: 800, fontSize: "12px" }}>
              PO
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "16px" }}>
              Purchase Order
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "11.5px" }}>
            Add products, supplier details and payment information.
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* THREE-COLUMN LAYOUT */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", flexWrap: { xs: "wrap", lg: "nowrap" } }}>
        
        {/* COLUMN 1: Add Products & Search Results */}
        <Box sx={{ flex: 0.8, display: "flex", flexDirection: "column", gap: 1, minWidth: "300px" }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: "12px", border: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", mb: 1 }}>
              Add Products
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b", mb: 1.5, display: "block" }}>
              Search by name or barcode
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ bgcolor: "#dc2626", fontWeight: 700, fontSize: "11.5px", textTransform: "none", flex: 1, borderRadius: "8px", boxShadow: "none", "&:hover": { bgcolor: "#b91c1c" } }}
              >
                New Product
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ borderColor: "#cbd5e1", color: "#334155", fontWeight: 700, fontSize: "11.5px", textTransform: "none", flex: 1, borderRadius: "8px", bgcolor: "#ffffff" }}
              >
                New Item
              </Button>
            </Box>

            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#64748b", mb: 0.5, fontSize: "11px" }}>
              Search & Add Products
            </Typography>
            <TextField placeholder="Search name or scan barcode" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
          </Paper>

          {/* Search Results Mock Items */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[
              { name: "MACBOOK PRO 16\" 2019 A2141 6-CORE IN...", sku: "108394", stock: "Stock 13", price: "699.99" },
              { name: "HONOR P SMART PRO 2019 LCD", sku: "944020", stock: "Out of stock", price: "0.00" },
              { name: "MACBOOK PRO 15.4\" 2019 A1990 6-CORE I...", sku: "108389", stock: "Out of stock", price: "649.99" },
            ].map((item, idx) => (
              <Paper key={idx} elevation={0} sx={{ p: 1.5, borderRadius: "10px", border: "1px solid #cbd5e1", bgcolor: "#ffffff", display: "flex", gap: 1.5, alignItems: "center" }}>
                <Box sx={{ width: 40, height: 40, bgcolor: "#f1f5f9", borderRadius: "6px", flexShrink: 0 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: "11.5px", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</Typography>
                  <Typography sx={{ fontSize: "10.5px", color: "#64748b" }}>SKU: {item.sku} | <span style={{ color: item.stock.includes("Stock") ? "#16a34a" : "#dc2626", fontWeight: 600 }}>{item.stock}</span></Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: 800, color: "#dc2626", mt: 0.5 }}>£{item.price}</Typography>
                </Box>
                <Button variant="contained" color="error" size="small" sx={{ bgcolor: "#dc2626", minWidth: "48px", height: "30px", fontSize: "11px", fontWeight: 700, boxShadow: "none", "&:hover": { bgcolor: "#b91c1c" } }}>
                  Add
                </Button>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* COLUMN 2: Added Items List */}
        <Box sx={{ flex: 1.9, display: "flex", flexDirection: "column", gap: 2, minWidth: "350px" }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: "12px", border: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", mb: 2, pb: 1, borderBottom: "1px solid #f1f5f9" }}>
              Added Items (1)
            </Typography>

            <Paper elevation={0} sx={{ p: 2, borderRadius: "10px", border: "1px solid #fecaca", bgcolor: "#fff5f5" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>
                  1. {product?.name || "iphone with image"}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>Total: £0.00</Typography>
                  <IconButton size="small" sx={{ color: "#dc2626" }}><DeleteOutlineIcon fontSize="small" /></IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
                <Typography variant="caption" sx={{ color: "#64748b" }}>SKU: <span style={{ color: "#2563eb", fontWeight: 600 }}>{product?.sku || "328899"}</span></Typography>
                <Typography variant="caption" sx={{ color: "#16a34a", fontWeight: 600, bgcolor: "#ecfdf5", px: 1, py: 0.2, borderRadius: "4px" }}>Show Last Cost Price</Typography>
              </Box>

              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 1 }}>
                {product?.condition || "Brand New"} | SMART WATCH
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5, mb: 1.5 }}>
                <TextField label="Unit Cost" size="small" defaultValue="" sx={{ bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
                <TextField label="Pack Price" size="small" defaultValue="" sx={{ bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
                <TextField label="Quantity" size="small" defaultValue="" sx={{ bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
              </Box>

              <Box sx={{ display: "flex", gap: 1.5 }}>
                <TextField label="Description" size="small" fullWidth sx={{ bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
                <TextField select label="Status" defaultValue="Ready for sell" size="small" sx={{ width: "160px", bgcolor: "#ffffff", "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}>
                  <MenuItem value="Ready for sell">Ready for sell</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </TextField>
              </Box>
            </Paper>
          </Paper>
        </Box>

        {/* COLUMN 3: Suppliers, Payment Methods & Actions */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: "320px" }}>
          
          {/* Supplier Card */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: "12px", border: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#64748b", mb: 0.5, fontSize: "10.5px" }}>Suppliers</Typography>
            <TextField select defaultValue="Gadgets Solution" size="small" fullWidth sx={{ mb: 2, "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}>
              <MenuItem value="Gadgets Solution">Gadgets Solution</MenuItem>
            </TextField>

            <Paper elevation={0} sx={{ p: 1.5, bgcolor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Box sx={{ bgcolor: "#e2e8f0", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "11px" }}>G</Box>
                  <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>Gadgets Solution</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#64748b" }}>Selected supplier</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#334155" }}>
                <span>SUPPLIER NAME: <b>Gadgets Solution</b></span>
                <span>CONTACT NAME: <b>Instore</b></span>
              </Box>
            </Paper>

            <FormControlLabel
              control={<Switch checked={tradeIn} onChange={(e) => setTradeIn(e.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#dc2626" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#dc2626" } }} />}
              label={<span style={{ fontSize: "12px", fontWeight: 600 }}>Customer Trade-In Purchase</span>}
              sx={{ mt: 2 }}
            />

            <Box sx={{ display: "flex", gap: 15, mt: 1 }}>
              <TextField label="Order Date" defaultValue="09/29/2026" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
              <Box sx={{ border: "1px dashed #cbd5e1", borderRadius: "8px", p: 1.5, textAlign: "center", bgcolor: "#f8fafc", flex: 1 }}>
                <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a" }}>Upload Document</Typography>
                <Typography variant="caption" sx={{ fontSize: "9.5px", color: "#64748b", display: "block", mb: 0.5 }}>JPG, PNG, WebP or PDF</Typography>
                <Button variant="outlined" size="small" startIcon={<CloudUploadIcon />} sx={{ fontSize: "10px", borderColor: "#cbd5e1", color: "#2563eb", textTransform: "none", py: 0.2 }}>Choose File</Button>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2, fontSize: "12.5px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}><span>Grand Total</span><span>£0.00</span></Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}><span>Paid Amount</span><span>£0.00</span></Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", color: "#16a34a", fontWeight: 700 }}><span>Balance</span><span>£0.00</span></Box>
            </Box>
          </Paper>

          {/* Payment Methods Card */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: "12px", border: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", mb: 1.5 }}>
              Payment Methods
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
              <TextField label="Cash" defaultValue="0" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
              <TextField label="Card" defaultValue="0" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
              <TextField label="Bank" defaultValue="0" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
            </Box>

            <FormControlLabel
              control={<Switch checked={useTodaySales} onChange={(e) => setUseTodaySales(e.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#dc2626" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#dc2626" } }} />}
              label={<span style={{ fontSize: "12px", fontWeight: 600 }}>Use Today's Sales Payment</span>}
            />
          </Paper>

          {/* Actions Footer */}
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", bgcolor: "#ffffff", p: 2, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Actions</Typography>
            <Button variant="outlined" onClick={onClose} sx={{ ml: "auto", color: "#dc2626", borderColor: "#fecaca", fontWeight: 700, fontSize: "12px", textTransform: "none", px: 3, borderRadius: "8px", "&:hover": { bgcolor: "#fff5f5" } }}>
              Save Draft
            </Button>
            <Button variant="contained" onClick={onClose} sx={{ bgcolor: "#dc2626", fontWeight: 700, fontSize: "12px", textTransform: "none", px: 3, borderRadius: "8px", boxShadow: "none", "&:hover": { bgcolor: "#b91c1c" } }}>
              Create Order
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default POSPurchaseOrderDrawer;