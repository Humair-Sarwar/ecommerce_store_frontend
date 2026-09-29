import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SearchIcon from "@mui/icons-material/Search";

const POSDownloadDrawer = ({
  open,
  onClose,
  title = "Download",
  columns = [
    { id: "name", label: "Customer Name" },
    { id: "balance", label: "Balance" },
    { id: "limit", label: "Balance Limit" },
    { id: "mobile", label: "Mobile Number" },
    { id: "email", label: "Email" },
    { id: "address", label: "Address" },
    { id: "servedBy", label: "Served By" },
  ],
}) => {
  const [format, setFormat] = useState("csv"); // 'csv' or 'pdf'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCols, setSelectedCols] = useState(columns.map((c) => c.id)); // Default all selected

  const filteredColumns = columns.filter((col) =>
    col.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCols(columns.map((c) => c.id));
    } else {
      setSelectedCols([]);
    }
  };

  const handleToggleCol = (id) => {
    if (selectedCols.includes(id)) {
      setSelectedCols(selectedCols.filter((item) => item !== id));
    } else {
      setSelectedCols([...selectedCols, id]);
    }
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
          width: "420px",
          maxWidth: "100%",
          bgcolor: "#ffffff",
          p: 3,
          boxShadow: "-20px 0 50px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        },
      }}
    >
      <Box>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "17px" }}>
            {title}
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", "&:hover": { bgcolor: "#e2e8f0", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Format Selector Toggle Buttons matching reference UI */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
          <Button
            variant={format === "csv" ? "outlined" : "text"}
            onClick={() => setFormat("csv")}
            startIcon={<DownloadIcon />}
            sx={{
              flex: 1,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "12.5px",
              borderRadius: "10px",
              py: 1,
              borderColor: format === "csv" ? "#2563eb" : "#cbd5e1",
              bgcolor: format === "csv" ? "#ffffff" : "#ffffff",
              color: format === "csv" ? "#2563eb" : "#64748b",
              boxShadow: format === "csv" ? "0 0 0 1px #2563eb" : "none",
              "&:hover": { borderColor: "#2563eb", bgcolor: "#f8fafc" },
            }}
          >
            CSV
          </Button>
          <Button
            variant={format === "pdf" ? "contained" : "outlined"}
            onClick={() => setFormat("pdf")}
            startIcon={<PictureAsPdfIcon />}
            sx={{
              flex: 1,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "12.5px",
              borderRadius: "10px",
              py: 1,
              bgcolor: format === "pdf" ? "#dc2626" : "#ffffff",
              borderColor: format === "pdf" ? "#dc2626" : "#cbd5e1",
              color: format === "pdf" ? "#ffffff" : "#64748b",
              boxShadow: "none",
              "&:hover": { bgcolor: format === "pdf" ? "#b91c1c" : "#f8fafc", borderColor: format === "pdf" ? "#b91c1c" : "#cbd5e1" },
            }}
          >
            PDF
          </Button>
        </Box>

        {/* Search Columns Input */}
        <TextField
          placeholder="Search columns..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon sx={{ fontSize: "16px", color: "#94a3b8", mr: 1 }} />,
          }}
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "10px", bgcolor: "#ffffff" } }}
        />

        {/* Outer Container Matching Reference Box Structure */}
        <Box sx={{ border: "1px solid #cbd5e1", borderRadius: "12px", overflow: "hidden", bgcolor: "#ffffff" }}>
          
          {/* Select All Row */}
          <Box sx={{ p: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #cbd5e1", bgcolor: "#ffffff" }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={selectedCols.length === columns.length}
                  indeterminate={selectedCols.length > 0 && selectedCols.length < columns.length}
                  onChange={handleSelectAll}
                  sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }}
                />
              }
              label={<Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>Select All</Typography>}
            />
            <Typography variant="caption" sx={{ fontSize: "11.5px", fontWeight: 600, color: "#64748b" }}>
              {selectedCols.length}/{columns.length} selected
            </Typography>
          </Box>

          {/* Columns Checkbox List */}
          <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "380px", overflowY: "auto" }}>
            {filteredColumns.map((col, idx) => {
              const isChecked = selectedCols.includes(col.id);
              return (
                <Box
                  key={col.id}
                  onClick={() => handleToggleCol(col.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: "10px 14px",
                    cursor: "pointer",
                    borderBottom: idx < filteredColumns.length - 1 ? "1px solid #f1f5f9" : "none",
                    transition: "background 0.2s ease",
                    "&:hover": { bgcolor: "#f8fafc" },
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={isChecked}
                    onChange={() => handleToggleCol(col.id)}
                    sx={{ color: "#cbd5e1", "&.Mui-checked": { color: "#dc2626" }, p: 0, mr: 1.5 }}
                  />
                  <Typography sx={{ fontSize: "12.5px", fontWeight: 500, color: "#334155" }}>{col.label}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default POSDownloadDrawer;