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

const POSOpenOrderModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="open-order-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "560px",
          bgcolor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          p: 3.5,
          fontFamily: "'Poppins', sans-serif",
          "& *": { fontFamily: "'Poppins', sans-serif !important" },
        }}
      >
        {/* Modal Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "16px" }}>
            Open order (Pending or In-Progress)
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: "#64748b", "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Input Field */}
        <Box sx={{ mb: 3 }}>
          <TextField
            defaultValue="432442342"
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                borderRadius: "8px",
                color: "#0f172a",
                fontWeight: 600,
              },
            }}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "#dc2626",
              borderColor: "#fecaca",
              bgcolor: "#ffffff",
              fontWeight: 700,
              fontSize: "12.5px",
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "8px",
              "&:hover": { bgcolor: "#fff5f5", borderColor: "#f87171" },
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: "#dc2626",
              fontWeight: 700,
              fontSize: "12.5px",
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": { bgcolor: "#b91c1c" },
            }}
          >
            SEARCH
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default POSOpenOrderModal;