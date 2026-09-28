import React from "react";
import { Paper, InputBase } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

const POSBarcodeScanner = ({ value, onChange, onKeyDown }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: "8px 16px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #79818c",
        bgcolor: "#ffffff",
        
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "#94a3b8",
        },
        "&:focus-within": {
          borderColor: "#3b82f6",
          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
        },
      }}
    >
      <QrCodeScannerIcon sx={{ color: "#64748b", mr: 1.5, fontSize: "22px" }} />
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          fontSize: "13px",
          fontWeight: 600,
          color: "#0f172a",
          letterSpacing: "0.5px",
          "& input::placeholder": {
            color: "#64748b",
            opacity: 1,
          },
        }}
        placeholder="SCAN ITEM, ENTER BARCODE, OR IMEI/SERIAL NUMBER"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputProps={{ "aria-label": "scan item, enter barcode, or imei/serial number" }}
      />
    </Paper>
  );
};

export default POSBarcodeScanner;