import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Divider,
  Chip,
  Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "20px",
    padding: theme.spacing(1),
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
}));

export default function ViewBrandDetails({ list }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Detail Row Component for consistency
  const DetailRow = ({ label, value, isStatus }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.5 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#5f6368" }}>
        {label}
      </Typography>
      {isStatus ? (
        <Chip 
          label={list?.status ? "Active" : "Inactive"} 
          size="small"
          sx={{ 
            fontWeight: 'bold',
            fontSize: '11px',
            bgcolor: list?.status ? "#e8f5e9" : "#ffebee",
            color: list?.status ? "#2e7d32" : "#d32f2f",
            border: `1px solid ${list?.status ? "#a5d6a7" : "#ef9a9a"}`
          }} 
        />
      ) : (
        <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#202124" }}>
          {value || "N/A"}
        </Typography>
      )}
    </Box>
  );

  return (
    <>
      <Tooltip title="View Details" arrow>
        <IconButton
          onClick={handleClickOpen}
          size="small"
          sx={{ 
            color: "#19d219", 
            bgcolor: "#e3fde4", 
            "&:hover": { bgcolor: "#c2fbbb" } 
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      

      <BootstrapDialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: "700",
            color: "#3c4043"
          }}
        >
          <LocalOfferIcon sx={{ mr: 1.5, color: "#9c27b0" }} /> 
          Brand Information
        </DialogTitle>
        
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 16, top: 16, color: "#9aa0a6" }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          {/* Image Section */}
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: "180px",
              borderRadius: "12px",
              overflow: "hidden",
              mb: 3,
              border: "1px solid #f1f3f4",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#f8f9fa'
            }}
          >
            <img
              style={{ width: "100%", height: "100%", objectFit: "contain", padding: '10px' }}
              src={
                list?.media 
                  ? `${import.meta.env.VITE_BASE_URL}/storage/${list.media.media_path}`
                  : "/empty-image.jpg"
              }
              alt={list?.title}
            />
          </Paper>

          {/* Details List */}
          <Box sx={{ px: 1 }}>
            <DetailRow label="Brand Name" value={list?.title} />
            <Divider sx={{ borderStyle: 'dashed' }} />
            
            <DetailRow label="Slug" value={list?.slug} />
            <Divider sx={{ borderStyle: 'dashed' }} />
            
            <DetailRow label="Sort Order" value={list?.sort_order} />
            <Divider sx={{ borderStyle: 'dashed' }} />
            
            <DetailRow label="Status" isStatus />
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}