import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BackspaceIcon from "@mui/icons-material/Backspace";

const POSQuantityModal = ({ open, onClose, item, onSave }) => {
  const [qty, setQty] = useState(item?.qty?.toString() || "1");

  const handleKeyPress = (val) => {
    if (val === "C") {
      setQty("0");
    } else if (val === "backspace") {
      setQty((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else {
      setQty((prev) => (prev === "0" ? val : prev + val));
    }
  };

  const handleSave = () => {
    if (item && onSave) {
      onSave(item.id, parseFloat(qty) || 1);
    }
    onClose();
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "C"];

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="quantity-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "460px",
          bgcolor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          p: 3.5,
          fontFamily: "'Poppins', sans-serif",
          "& *": { fontFamily: "'Poppins', sans-serif !important" },
        }}
      >
        {/* Modal Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "16px", mb: 0.5 }}>
              {item?.name || "Product Name"}
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              <Box sx={{ border: "1px solid #cbd5e1", borderRadius: "6px", px: 1.5, py: 0.5, fontSize: "12px", fontWeight: 600, color: "#dc2626" }}>
                1 x £{item?.price?.toFixed(2) || "0.00"}
              </Box>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#dc2626" }}>
                £{((item?.price || 0) * (parseFloat(qty) || 0)).toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ display: "block", color: "#64748b", mt: 0.5, fontSize: "11.5px" }}>
              Discounted Price: £{item?.price?.toFixed(2) || "0.00"}
            </Typography>
            <Typography variant="caption" sx={{ display: "block", color: "#64748b", fontSize: "11.5px" }}>
              In-Stock: 1
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: "#64748b", "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Quantity Input Field */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#475569", mb: 0.5, fontSize: "11px" }}>
            Quantity (pcs)
          </Typography>
          <TextField
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            size="small"
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { fontSize: "14px", fontWeight: 600, borderRadius: "8px" } }}
          />
        </Box>

        {/* Numeric Keypad Grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1.5, mb: 3 }}>
          {keys.map((key) => (
            <Button
              key={key}
              variant="outlined"
              onClick={() => handleKeyPress(key)}
              sx={{
                height: "52px",
                borderColor: key === "C" ? "#fecaca" : "#cbd5e1",
                bgcolor: key === "C" ? "#fff5f5" : "#ffffff",
                color: key === "C" ? "#dc2626" : "#dc2626",
                fontWeight: 700,
                fontSize: "18px",
                borderRadius: "10px",
                boxShadow: "none",
                "&:hover": { bgcolor: key === "C" ? "#fee2e2" : "#f8fafc", borderColor: key === "C" ? "#f87171" : "#94a3b8" },
              }}
            >
              {key}
            </Button>
          ))}
          <Button
            variant="outlined"
            onClick={() => handleKeyPress("backspace")}
            sx={{
              height: "52px",
              borderColor: "#cbd5e1",
              bgcolor: "#ffffff",
              color: "#334155",
              borderRadius: "10px",
              gridColumn: "span 4",
              "&:hover": { bgcolor: "#f8fafc", borderColor: "#94a3b8" },
            }}
          >
            <BackspaceIcon fontSize="small" />
          </Button>
        </Box>

        {/* Footer Action Buttons */}
        <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "#dc2626",
              borderColor: "#fecaca",
              bgcolor: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
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
            onClick={handleSave}
            sx={{
              bgcolor: "#dc2626",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": { bgcolor: "#b91c1c" },
            }}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default POSQuantityModal;