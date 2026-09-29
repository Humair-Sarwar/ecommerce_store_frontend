import React from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const POSUpdateLastPaymentModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="update-last-payment-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "640px",
          bgcolor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          p: 3,
          fontFamily: "'Poppins', sans-serif",
          "& *": { fontFamily: "'Poppins', sans-serif !important" },
        }}
      >
        {/* Modal Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "17px" }}>
            Update Last Payment
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Form Fields */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 4 }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Amount</Typography>
              <TextField defaultValue="1" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Transaction Date</Typography>
              <TextField defaultValue="09/29/2026" size="small" fullWidth InputProps={{ endAdornment: <span style={{ fontSize: "14px", color: "#64748b" }}>📅</span> }} sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Payment Type</Typography>
            <TextField select defaultValue="Cash" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }}>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
            </TextField>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>Description</Typography>
            <TextField multiline rows={3} placeholder="" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "8px" } }} />
          </Box>
        </Box>

        {/* Modal Footer Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
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
              px: 3,
              py: 0.8,
              borderRadius: "8px",
              "&:hover": { bgcolor: "#fff5f5", borderColor: "#f87171" },
            }}
          >
            Delete Payment
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
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
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default POSUpdateLastPaymentModal;