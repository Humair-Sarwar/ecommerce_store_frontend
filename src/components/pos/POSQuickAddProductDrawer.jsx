import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const POSQuickAddProductDrawer = ({ open, onClose }) => {
  const [manageStock, setManageStock] = useState("yes");
  const [purchaseOrder, setPurchaseOrder] = useState("no");

  // Form Fields State
  const [formData, setFormData] = useState({
    activeFor: "Sale",
    condition: "",
    title: "",
    sku: "",
    category: "",
    brand: "",
    status: "In Stock",
    minStockAlert: "1",
    regularPrice: "",
    salePrice: "",
    minSalePrice: "",
    unitOfMeasure: "Piece",
    packQuantity: "1",
    serialized: "No",
    taxDefinition: "N/A",
  });

  // Touched state to control when errors appear (live as user types/interacts)
  const [touched, setTouched] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Live Validation Logic
  const errors = {
    condition: !formData.condition ? "Required" : "",
    title: !formData.title.trim() ? "Required" : "",
    category: !formData.category ? "Please select a category" : "",
    brand: !formData.brand ? "Required" : "",
    regularPrice: !formData.regularPrice ? "Required" : "",
    salePrice: !formData.salePrice ? "Required" : "",
  };

  const handleSubmit = () => {
    // Mark all required fields as touched on submit
    setTouched({
      condition: true,
      title: true,
      category: true,
      brand: true,
      regularPrice: true,
      salePrice: true,
    });

    // You can add additional submission logic here
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        "& *": { fontFamily: "'Poppins', sans-serif !important" },
        "& .MuiDrawer-paper": {
          width: "72vw",
          maxWidth: "1150px",
          bgcolor: "#f8fafc",
          p: 3,
          boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.15)",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "7px" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        },
      }}
    >
      {/* 1. TOP HEADER & TOGGLES */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, bgcolor: "#ffffff", p: 2, borderRadius: "12px", border: "1px solid #e2e8f0", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "16px" }}>
            Quick Add Product
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "11.5px" }}>
            Create a product and optionally add stock through a purchase order.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#334155" }}>Manage Stock</Typography>
            <RadioGroup row value={manageStock} onChange={(e) => setManageStock(e.target.value)}>
              <FormControlLabel value="yes" control={<Radio size="small" sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} />} label={<span style={{ fontSize: "12px" }}>Yes</span>} />
              <FormControlLabel value="no" control={<Radio size="small" sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} />} label={<span style={{ fontSize: "12px" }}>No</span>} />
            </RadioGroup>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#334155" }}>Purchase Order</Typography>
            <RadioGroup row value={purchaseOrder} onChange={(e) => setPurchaseOrder(e.target.value)}>
              <FormControlLabel value="yes" control={<Radio size="small" sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} />} label={<span style={{ fontSize: "12px" }}>Yes</span>} />
              <FormControlLabel value="no" control={<Radio size="small" sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} />} label={<span style={{ fontSize: "12px" }}>No</span>} />
            </RadioGroup>
          </Box>

          <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* 2. FORM BODY CONTAINER */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        
        {/* SECTION A: PRODUCT DETAILS */}
        <Box sx={{ bgcolor: "#ffffff", p: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <span>📌</span> PRODUCT DETAILS
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: { xs: "wrap", md: "nowrap" } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Active For</Typography>
              <TextField select value={formData.activeFor} onChange={handleChange("activeFor")} size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}>
                <MenuItem value="Sale">Sale</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Product Condition</Typography>
              <TextField
                select
                value={formData.condition}
                onChange={handleChange("condition")}
                onBlur={handleBlur("condition")}
                size="small"
                fullWidth
                error={touched.condition && Boolean(errors.condition)}
                sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}
              >
                <MenuItem value="">Select Condition</MenuItem>
                <MenuItem value="Brand New">Brand New</MenuItem>
                <MenuItem value="Like New">Like New</MenuItem>
                <MenuItem value="Refurbished">Refurbished</MenuItem>
              </TextField>
              {touched.condition && errors.condition && (
                <Typography variant="caption" sx={{ color: "#dc2626", fontSize: "10px", mt: 0.3, display: "block", fontWeight: 600 }}>{errors.condition}</Typography>
              )}
            </Box>
            <Box sx={{ flex: 2 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Title</Typography>
              <TextField
                value={formData.title}
                onChange={handleChange("title")}
                onBlur={handleBlur("title")}
                size="small"
                fullWidth
                error={touched.title && Boolean(errors.title)}
                sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}
              />
              {touched.title && errors.title && (
                <Typography variant="caption" sx={{ color: "#dc2626", fontSize: "10px", mt: 0.3, display: "block", fontWeight: 600 }}>{errors.title}</Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", md: "nowrap" } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Sku or Barcode</Typography>
              <TextField value={formData.sku} onChange={handleChange("sku")} size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Category</Typography>
              <TextField
                select
                value={formData.category}
                onChange={handleChange("category")}
                onBlur={handleBlur("category")}
                size="small"
                fullWidth
                error={touched.category && Boolean(errors.category)}
                sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Cables">Cables</MenuItem>
                <MenuItem value="Phones">Phones</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
              </TextField>
              {touched.category && errors.category && (
                <Typography variant="caption" sx={{ color: "#dc2626", fontSize: "10px", mt: 0.3, display: "block", fontWeight: 600 }}>{errors.category}</Typography>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Brand</Typography>
              <TextField
                select
                value={formData.brand}
                onChange={handleChange("brand")}
                onBlur={handleBlur("brand")}
                size="small"
                fullWidth
                error={touched.brand && Boolean(errors.brand)}
                sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}
              >
                <MenuItem value="">Select Brand</MenuItem>
                <MenuItem value="HOCO">HOCO</MenuItem>
                <MenuItem value="Apple">Apple</MenuItem>
                <MenuItem value="Samsung">Samsung</MenuItem>
              </TextField>
              {touched.brand && errors.brand && (
                <Typography variant="caption" sx={{ color: "#dc2626", fontSize: "10px", mt: 0.3, display: "block", fontWeight: 600 }}>{errors.brand}</Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* SECTION B: PRODUCT IMAGE */}
        <Box sx={{ bgcolor: "#ffffff", p: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <span>🖼️</span> Product Image
          </Typography>

          <Box sx={{ display: "flex", gap: 3, flexWrap: { xs: "wrap", md: "nowrap" }, alignItems: "center" }}>
            <Box sx={{ flex: 1, border: "1px dashed #cbd5e1", borderRadius: "10px", p: 3, textAlign: "center", bgcolor: "#f8fafc", display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
              <IconButton sx={{ bgcolor: "#fff5f5", color: "#dc2626", width: 44, height: 44 }}><PhotoCameraIcon /></IconButton>
              <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#334155" }}>Select from Media Library</Typography>
            </Box>
            <Box sx={{ flex: 1, border: "1px dashed #cbd5e1", borderRadius: "10px", p: 3, textAlign: "center", bgcolor: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
              <CloudUploadIcon sx={{ color: "#dc2626", fontSize: "28px" }} />
              <Typography sx={{ fontSize: "11.5px", color: "#64748b" }}>Drag & drop product image here</Typography>
              <Button variant="outlined" size="small" sx={{ borderColor: "#fecaca", color: "#dc2626", fontWeight: 600, fontSize: "11px", textTransform: "none", borderRadius: "6px", "&:hover": { bgcolor: "#fff5f5", borderColor: "#f87171" } }}>Select Images</Button>
            </Box>
          </Box>
        </Box>

        {/* SECTION C: STOCK & PRICING */}
        <Box sx={{ bgcolor: "#ffffff", p: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <span>📦</span> STOCK & PRICING
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: { xs: "wrap", md: "nowrap" } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Status</Typography>
              <TextField select value={formData.status} onChange={handleChange("status")} size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}>
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Min Stock Alert</Typography>
              <TextField value={formData.minStockAlert} onChange={handleChange("minStockAlert")} size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Regular Price</Typography>
              <TextField
                value={formData.regularPrice}
                onChange={handleChange("regularPrice")}
                onBlur={handleBlur("regularPrice")}
                size="small"
                fullWidth
                error={touched.regularPrice && Boolean(errors.regularPrice)}
                sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}
              />
              {touched.regularPrice && errors.regularPrice && (
                <Typography variant="caption" sx={{ color: "#dc2626", fontSize: "10px", mt: 0.3, display: "block", fontWeight: 600 }}>{errors.regularPrice}</Typography>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Sale Price</Typography>
              <TextField
                value={formData.salePrice}
                onChange={handleChange("salePrice")}
                onBlur={handleBlur("salePrice")}
                size="small"
                fullWidth
                error={touched.salePrice && Boolean(errors.salePrice)}
                sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}
              />
              {touched.salePrice && errors.salePrice && (
                <Typography variant="caption" sx={{ color: "#dc2626", fontSize: "10px", mt: 0.3, display: "block", fontWeight: 600 }}>{errors.salePrice}</Typography>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Min Sale Price</Typography>
              <TextField value={formData.minSalePrice} onChange={handleChange("minSalePrice")} size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", md: "nowrap" } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Unit of Measure</Typography>
              <TextField select value={formData.unitOfMeasure} onChange={handleChange("unitOfMeasure")} size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}>
                <MenuItem value="Piece">Piece</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Pack Quantity</Typography>
              <TextField value={formData.packQuantity} onChange={handleChange("packQuantity")} size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Serialized</Typography>
              <TextField select value={formData.serialized} onChange={handleChange("serialized")} size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Tax Definition</Typography>
              <TextField select value={formData.taxDefinition} onChange={handleChange("taxDefinition")} size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}>
                <MenuItem value="N/A">N/A</MenuItem>
              </TextField>
            </Box>
          </Box>
        </Box>

        {/* SECTION D: OTHER OPTIONAL & OPTIONS */}
        <Box sx={{ bgcolor: "#ffffff", p: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <span>⚙️</span> OTHER OPTIONAL
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mb: 3 }}>
            {["Warranty", "Series", "Color", "Quality", "Type", "Network", "Storage", "Ram", "Processor", "Release Year", "Carrier Option", "Sim"].map((field, idx) => (
              <Box key={idx}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>{field}</Typography>
                <TextField select defaultValue="" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}>
                  <MenuItem value="">Select {field}</MenuItem>
                </TextField>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Box sx={{ flex: 1 }}><Typography variant="caption" sx={{ fontWeight: 600, fontSize: "11px" }}>Battery Health</Typography><TextField size="small" fullWidth sx={{ mt: 0.5 }} /></Box>
            <Box sx={{ flex: 1 }}><Typography variant="caption" sx={{ fontWeight: 600, fontSize: "11px" }}>Screen Size</Typography><TextField size="small" fullWidth sx={{ mt: 0.5 }} /></Box>
            <Box sx={{ flex: 2 }}><Typography variant="caption" sx={{ fontWeight: 600, fontSize: "11px" }}>Comments</Typography><TextField size="small" fullWidth sx={{ mt: 0.5 }} /></Box>
          </Box>

          {/* Product Options Checkboxes */}
          <Box sx={{ pt: 2, borderTop: "1px solid #f1f5f9" }}>
            <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", mb: 1.5 }}>PRODUCT OPTIONS</Typography>
            <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <FormControlLabel control={<Checkbox size="small" sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} />} label={<span style={{ fontSize: "12px", fontWeight: 600 }}>Is on Sale</span>} />
              <FormControlLabel control={<Checkbox defaultChecked size="small" sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} />} label={<span style={{ fontSize: "12px", fontWeight: 600 }}>Get Stock Alert</span>} />
              <FormControlLabel control={<Checkbox size="small" sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} />} label={<span style={{ fontSize: "12px", fontWeight: 600 }}>Hot</span>} />
              <FormControlLabel control={<Checkbox size="small" sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} />} label={<span style={{ fontSize: "12px", fontWeight: 600 }}>Keep Category And Brand</span>} />
              <FormControlLabel control={<Checkbox size="small" sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} />} label={<span style={{ fontSize: "12px", fontWeight: 600 }}>Keep Pricing Values</span>} />
            </Box>
          </Box>
        </Box>

        {/* FOOTER BUTTONS */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, bgcolor: "#ffffff", p: 2.5, borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ color: "#dc2626", borderColor: "#fecaca", bgcolor: "#ffffff", fontWeight: 700, fontSize: "12px", textTransform: "none", px: 4, py: 1, borderRadius: "8px", "&:hover": { bgcolor: "#fff5f5", borderColor: "#f87171" } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
              "&:hover": { background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" },
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default POSQuickAddProductDrawer;