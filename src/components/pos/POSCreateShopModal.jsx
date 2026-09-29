import React from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StorefrontIcon from "@mui/icons-material/Storefront";

const POSCreateShopModal = ({ open, onClose, shopData }) => {
  const isEditing = Boolean(shopData);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-shop-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "620px",
          bgcolor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Poppins', sans-serif",
          "& *": { fontFamily: "'Poppins', sans-serif !important" },
        }}
      >
        {/* Header Bar */}
        <Box sx={{ bgcolor: "#ffffff", color: "#0f172a", px: 3, py: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "16px", color: "#0f172a" }}>
            {isEditing ? "Update Shop" : "Create Shop"}
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: "#64748b", "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Form Body */}
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Shop Name</Typography>
              <TextField placeholder="Enter shop name" size="small" defaultValue={shopData?.name || ""} fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Contact Person</Typography>
              <TextField placeholder="Enter contact person" size="small" defaultValue={shopData?.contactPerson || ""} fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Contact No.</Typography>
            <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden", height: "40px", bgcolor: "#ffffff" }}>
              <Box sx={{ display: "flex", alignItems: "center", px: 1.5, borderRight: "1px solid #cbd5e1", gap: 0.75, bgcolor: "#f8fafc" }}>
                <span style={{ fontSize: "16px" }}>🇬🇧</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#334155" }}>+44</span>
              </Box>
              <input type="text" placeholder="" style={{ border: "none", outline: "none", padding: "0 12px", fontSize: "12px", width: "100%", fontFamily: "Poppins" }} />
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Address</Typography>
            <TextField placeholder="Enter address" size="small" defaultValue={shopData?.address || ""} fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
          </Box>
        </Box>

        {/* Footer Buttons */}
        <Box sx={{ p: 2.5, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
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
              px: 3.5,
              py: 0.8,
              borderRadius: "8px",
              "&:hover": { bgcolor: "#fff5f5", borderColor: "#f87171" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            startIcon={<StorefrontIcon />}
            sx={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "none",
              px: 3,
              py: 0.8,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
              "&:hover": { background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" },
            }}
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default POSCreateShopModal;