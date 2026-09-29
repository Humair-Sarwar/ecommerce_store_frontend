import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const POSItemEditModal = ({ open, onClose, item }) => {
  const [activeTab, setActiveTab] = useState("information"); // 'information' or 'inventory'

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        "& *": { fontFamily: "'Poppins', sans-serif !important" },
        "& .MuiDrawer-paper": {
          width: "720px",
          maxWidth: "100%",
          bgcolor: "#ffffff",
          p: 3.5,
          boxShadow: "20px 0 50px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        },
      }}
    >
      {/* Top Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "#e2e8f0", color: "#64748b", width: 48, height: 48, fontWeight: 700 }}>
            {item && item.name ? item.name.charAt(0) : "P"}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "16px", mb: 0.5 }}>
              {item?.name || "iphone without brands"}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#64748b" }}>
              Regular Price: <Box component="span" sx={{ color: "#dc2626", fontWeight: 700 }}>£{item?.price?.toFixed(2) || "1.00"}</Box>{" "}
              Sale Price: <Box component="span" sx={{ color: "#dc2626", fontWeight: 700 }}>£{item?.price?.toFixed(2) || "1.00"}</Box>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#dc2626", fontWeight: 600, fontSize: "11.5px", textTransform: "none", px: 2.5, py: 0.8, borderRadius: "8px", boxShadow: "none", "&:hover": { bgcolor: "#b91c1c" } }}
          >
            Update Product
          </Button>
          <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Tab Navigation */}
      <Box sx={{ display: "flex", borderBottom: "1px solid #cbd5e1", mb: 3 }}>
        <Button
          onClick={() => setActiveTab("information")}
          sx={{
            fontSize: "12.5px",
            fontWeight: 600,
            textTransform: "none",
            px: 3,
            py: 1.5,
            borderRadius: 0,
            color: activeTab === "information" ? "#dc2626" : "#64748b",
            borderBottom: activeTab === "information" ? "2px solid #dc2626" : "2px solid transparent",
            mb: "-1px",
            "&:hover": { color: "#dc2626", bgcolor: "transparent" },
          }}
        >
          Information
        </Button>
        <Button
          onClick={() => setActiveTab("inventory")}
          sx={{
            fontSize: "12.5px",
            fontWeight: 600,
            textTransform: "none",
            px: 3,
            py: 1.5,
            borderRadius: 0,
            color: activeTab === "inventory" ? "#dc2626" : "#64748b",
            borderBottom: activeTab === "inventory" ? "2px solid #dc2626" : "2px solid transparent",
            mb: "-1px",
            "&:hover": { color: "#dc2626", bgcolor: "transparent" },
          }}
        >
          Inventory Items
        </Button>
      </Box>

      {/* Tab Content: Information */}
      {activeTab === "information" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>IMEI/Serial No</Typography>
              <TextField select defaultValue="IMEI No" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}>
                <MenuItem value="IMEI No">IMEI No</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ flex: 2 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>IMEI/SERIAL NO</Typography>
              <TextField placeholder="IMEI/SERIAL NO" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Notes</Typography>
            <TextField select defaultValue="" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}>
              <MenuItem value="">Select Note</MenuItem>
            </TextField>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Note</Typography>
            <TextField multiline rows={3} placeholder="" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: "#334155",
                borderColor: "#cbd5e1",
                bgcolor: "#ffffff",
                fontWeight: 600,
                fontSize: "12px",
                textTransform: "none",
                px: 4,
                py: 1,
                borderRadius: "8px",
                "&:hover": { bgcolor: "#f8fafc", borderColor: "#94a3b8" },
              }}
            >
              Close
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: "#dc2626",
                borderColor: "#fecaca",
                bgcolor: "#ffffff",
                fontWeight: 600,
                fontSize: "12px",
                textTransform: "none",
                px: 4,
                py: 1,
                borderRadius: "8px",
                "&:hover": { bgcolor: "#fff5f5", borderColor: "#f87171" },
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: "#dc2626",
                fontWeight: 600,
                fontSize: "12px",
                textTransform: "none",
                px: 4,
                py: 1,
                borderRadius: "8px",
                boxShadow: "none",
                "&:hover": { bgcolor: "#b91c1c" },
              }}
            >
              Save & Close
            </Button>
          </Box>
        </Box>
      )}

      {/* Tab Content: Inventory Items */}
      {activeTab === "inventory" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 700, fontSize: "16px", color: "#0f172a" }}>
            Inventory
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #cbd5e1", borderRadius: "8px" }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#64748b" }}>
                <TableRow>
                  <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "12px" }}>Title</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "12px" }}>Pack Price</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "12px" }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ bgcolor: "#ffffff" }}>
                  <TableCell sx={{ fontSize: "12px", color: "#0f172a" }}>{item?.name || "iphone without brands"}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#0f172a" }}>£{item?.price?.toFixed(2) || "1.00"}</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#0f172a" }}>{item?.qty || 1}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: "#dc2626",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "none",
              py: 1.2,
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": { bgcolor: "#b91c1c" },
            }}
          >
            CLOSE
          </Button>
        </Box>
      )}
    </Drawer>
  );
};

export default POSItemEditModal;