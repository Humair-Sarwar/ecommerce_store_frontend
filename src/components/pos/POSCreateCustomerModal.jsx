import React from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const POSCreateCustomerModal = ({ open, onClose, customerData }) => {
  const isEditing = Boolean(customerData);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-customer-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "680px",
          maxHeight: "92vh",
          bgcolor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Poppins', sans-serif",
          "& *": { fontFamily: "'Poppins', sans-serif !important" },
        }}
      >
        {/* White Header Bar matching UI reference */}
        <Box sx={{ bgcolor: "#ffffff", color: "#0f172a", px: 3, py: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "16px", letterSpacing: "0.3px", color: "#0f172a" }}>
            {isEditing ? "Update Customer" : "Create Customer"}
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: "#64748b", "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Scrollable Form Body */}
        <Box sx={{ p: 3, overflowY: "auto", flex: 1, "&::-webkit-scrollbar": { width: "6px" }, "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" } }}>
          
          {/* SECTION 1: CUSTOMER DETAILS */}
          <Box sx={{ border: "1px solid #cbd5e1", borderRadius: "8px", p: 2.5, mb: 3, position: "relative" }}>
            <Typography component="span" sx={{ position: "absolute", top: "-10px", left: "16px", bgcolor: "#ffffff", px: 1, fontSize: "10.5px", fontWeight: 700, color: "#475569", letterSpacing: "0.5px" }}>
              CUSTOMER DETAILS
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 0.5 }}>
              <Box>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Full Name</Typography>
                <TextField placeholder="Enter full name" size="small" defaultValue={customerData?.name || ""} fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "6px", bgcolor: "#ffffff" } }} />
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                <Box sx={{ flex: 1, minWidth: "220px" }}>
                  <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Mobile Number</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #cbd5e1", borderRadius: "6px", overflow: "hidden", height: "40px", bgcolor: "#ffffff" }}>
                    <Box sx={{ display: "flex", alignItems: "center", px: 1.5, borderRight: "1px solid #cbd5e1", gap: 0.75, bgcolor: "#f8fafc" }}>
                      <span style={{ fontSize: "16px" }}>🇬🇧</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#334155" }}>+44</span>
                    </Box>
                    <input type="text" placeholder="" style={{ border: "none", outline: "none", padding: "0 12px", fontSize: "12px", width: "100%", fontFamily: "Poppins" }} />
                  </Box>
                </Box>

                <Box sx={{ flex: 1, minWidth: "220px" }}>
                  <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Email</Typography>
                  <TextField placeholder="Enter email address" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "6px", bgcolor: "#ffffff" } }} />
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                <Box sx={{ flex: 1, minWidth: "220px" }}>
                  <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Date of birth</Typography>
                  <TextField placeholder="mm/dd/yyyy" size="small" fullWidth InputProps={{ endAdornment: <span style={{ fontSize: "14px", color: "#64748b" }}>📅</span> }} sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "6px", bgcolor: "#ffffff" } }} />
                </Box>

                <Box sx={{ flex: 1, minWidth: "220px" }}>
                  <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Company</Typography>
                  <TextField placeholder="Enter company name" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "6px", bgcolor: "#ffffff" } }} />
                </Box>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Address</Typography>
                <TextField placeholder="Enter address" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "6px", bgcolor: "#ffffff" } }} />
              </Box>
            </Box>
          </Box>

          {/* SECTION 2: IDENTITY INFORMATION */}
          <Box sx={{ border: "1px solid #cbd5e1", borderRadius: "8px", p: 2.5, mb: 3, position: "relative" }}>
            <Typography component="span" sx={{ position: "absolute", top: "-10px", left: "16px", bgcolor: "#ffffff", px: 1, fontSize: "10.5px", fontWeight: 700, color: "#475569", letterSpacing: "0.5px" }}>
              IDENTITY INFORMATION
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 0.5, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
              <Box sx={{ flex: 1, minWidth: "220px" }}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>ID Type</Typography>
                <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "6px", bgcolor: "#ffffff" } }}>
                  <MenuItem value="">Select ID Type</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ flex: 1, minWidth: "220px" }}>
                <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>ID No</Typography>
                <TextField placeholder="Enter ID number" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "6px", bgcolor: "#ffffff" } }} />
              </Box>
            </Box>
          </Box>

          {/* SECTION 3: ACCOUNT SETTINGS */}
          <Box sx={{ border: "1px solid #cbd5e1", borderRadius: "8px", p: 2.5, mb: 1, position: "relative" }}>
            <Typography component="span" sx={{ position: "absolute", top: "-10px", left: "16px", bgcolor: "#ffffff", px: 1, fontSize: "10.5px", fontWeight: 700, color: "#475569", letterSpacing: "0.5px" }}>
              ACCOUNT SETTINGS
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 0.5 }}>
              <Box sx={{ border: "1px solid #fecaca", bgcolor: "#fff5f5", p: 1, borderRadius: "6px" }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked sx={{ color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }} size="small" />}
                  label={<Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#1e293b" }}>Manage payments against total balance</Typography>}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                <Box sx={{ flex: 1, minWidth: "220px" }}>
                  <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Maximum Balance Limit</Typography>
                  <TextField type="number" size="small" defaultValue={0} fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "6px", bgcolor: "#ffffff" } }} />
                </Box>

                <Box sx={{ flex: 1, minWidth: "220px" }}>
                  <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#334155", mb: 0.5, fontSize: "11.5px" }}>Assign To</Typography>
                  <TextField select size="small" defaultValue="" fullWidth sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px", borderRadius: "6px", bgcolor: "#ffffff" } }}>
                    <MenuItem value="">Select Assign To</MenuItem>
                  </TextField>
                </Box>
              </Box>

              <Box sx={{ border: "1px solid #cbd5e1", borderRadius: "6px", p: "6px 12px", bgcolor: "#ffffff" }}>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={<Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#1e293b" }}>Hide Receipt Balance</Typography>}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* MODAL FOOTER BUTTONS */}
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
              px: 4,
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
            startIcon={<SaveIcon />}
            sx={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "none",
              px: 3.5,
              py: 0.8,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
              "&:hover": { background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" },
            }}
          >
            {isEditing ? "Update Customer" : "Create Customer"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default POSCreateCustomerModal;