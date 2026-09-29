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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const POSAdvanceFilterDrawer = ({ open, onClose, brands = [], categories = [] }) => {
  const [activeTab, setActiveTab] = useState("filters"); // 'filters' | 'brands' | 'categories'

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        "& *": { fontFamily: "'Poppins', sans-serif !important" },
        "& .MuiDrawer-paper": {
          width: "520px",
          maxWidth: "100%",
          bgcolor: "#ffffff",
          p: 3,
          boxShadow: "-20px 0 50px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        },
      }}
    >
      {/* Top Header & Close */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Tabs Navigation */}
      <Box sx={{ display: "flex", borderBottom: "1px solid #cbd5e1", mb: 3, gap: 4 }}>
        <Button
          onClick={() => setActiveTab("filters")}
          sx={{
            fontSize: "13.5px",
            fontWeight: 700,
            textTransform: "none",
            px: 1,
            py: 1.5,
            borderRadius: 0,
            color: activeTab === "filters" ? "#dc2626" : "#64748b",
            borderBottom: activeTab === "filters" ? "2px solid #dc2626" : "2px solid transparent",
            mb: "-1px",
            "&:hover": { color: "#dc2626", bgcolor: "transparent" },
          }}
        >
          Advance Filters
        </Button>
        <Button
          onClick={() => setActiveTab("brands")}
          sx={{
            fontSize: "13.5px",
            fontWeight: 700,
            textTransform: "none",
            px: 1,
            py: 1.5,
            borderRadius: 0,
            color: activeTab === "brands" ? "#dc2626" : "#64748b",
            borderBottom: activeTab === "brands" ? "2px solid #dc2626" : "2px solid transparent",
            mb: "-1px",
            "&:hover": { color: "#dc2626", bgcolor: "transparent" },
          }}
        >
          Brands
        </Button>
        <Button
          onClick={() => setActiveTab("categories")}
          sx={{
            fontSize: "13.5px",
            fontWeight: 700,
            textTransform: "none",
            px: 1,
            py: 1.5,
            borderRadius: 0,
            color: activeTab === "categories" ? "#dc2626" : "#64748b",
            borderBottom: activeTab === "categories" ? "2px solid #dc2626" : "2px solid transparent",
            mb: "-1px",
            "&:hover": { color: "#dc2626", bgcolor: "transparent" },
          }}
        >
          Categories
        </Button>
      </Box>

      {/* TAB 1: ADVANCE FILTERS */}
      {activeTab === "filters" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Stock Status</Typography>
              <TextField select defaultValue="All" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>Status</Typography>
              <TextField select defaultValue="Published" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}>
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
              </TextField>
            </Box>
          </Box>

          {["Series", "Quality", "Color", "Type", "Ram", "Storage", "Processor"].map((filterField, idx) => (
            <Box key={idx}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11px" }}>{filterField}</Typography>
              <TextField select defaultValue="" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }}>
                <MenuItem value="">Select {filterField}</MenuItem>
              </TextField>
            </Box>
          ))}
        </Box>
      )}

      {/* TAB 2: BRANDS */}
      {activeTab === "brands" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField placeholder="Enter Brand Name" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }} />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ bgcolor: "#dc2626", fontWeight: 600, fontSize: "12px", textTransform: "none", px: 2.5, height: "38px", borderRadius: "8px", boxShadow: "none", "&:hover": { bgcolor: "#b91c1c" } }}
            >
              add
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
            {["All", "SAMSUNG", "IPHONE", "NOKIA", "HUAWEI", "HONOR", "GOOGLE", "ACER", "ASUS", "DELL", "HP", "APPLE"].map((brand, idx) => (
              <Paper key={idx} elevation={0} sx={{ p: 1.5, border: "1px solid #e2e8f0", borderRadius: "8px", bgcolor: "#ffffff", cursor: "pointer", "&:hover": { bgcolor: "#fff5f5", borderColor: "#fecaca" } }}>
                <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{brand}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      {/* TAB 3: CATEGORIES */}
      {activeTab === "categories" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField placeholder="Enter Category Name" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12.5px", borderRadius: "8px" } }} />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ bgcolor: "#dc2626", fontWeight: 600, fontSize: "12px", textTransform: "none", px: 2.5, height: "38px", borderRadius: "8px", boxShadow: "none", "&:hover": { bgcolor: "#b91c1c" } }}
            >
              add
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
            {["Hot List", "All", "dddd", "Iphone Box", "Printer Desing", "IPhone Modal 11", "Test level 1", "Design", "New Mobile Phone Category", "fdsafdsfasdf"].map((cat, idx) => (
              <Paper key={idx} elevation={0} sx={{ p: 1.5, border: "1px solid #e2e8f0", borderRadius: "8px", bgcolor: "#ffffff", cursor: "pointer", "&:hover": { bgcolor: "#fff5f5", borderColor: "#fecaca" } }}>
                <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{cat}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default POSAdvanceFilterDrawer;