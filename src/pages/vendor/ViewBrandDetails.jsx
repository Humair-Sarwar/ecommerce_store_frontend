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
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "24px",
    padding: 0,
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.16)",
    border: "1px solid #f1f5f9",
    overflow: "hidden",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
}));

export default function ViewBrandDetails({ list }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const DetailRow = ({ label, value, isStatus }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.5,
      }}
    >
      <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#64748b" }}>
        {label}
      </Typography>
      {isStatus ? (
        <Chip
          label={list?.status ? "Active" : "Inactive"}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: "11.5px",
            borderRadius: "999px",
            bgcolor: list?.status ? "#ecfdf5" : "#fef2f2",
            color: list?.status ? "#059669" : "#dc2626",
            border: `1px solid ${list?.status ? "#a7f3d0" : "#fecaca"}`,
          }}
        />
      ) : (
        <Typography sx={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>
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
            width: 32,
            height: 32,
            borderRadius: "10px",
            color: "#059669",
            bgcolor: "#ecfdf5",
            border: "1px solid #a7f3d0",
            "&:hover": {
              bgcolor: "#10b981",
              color: "#ffffff",
              borderColor: "#10b981",
            },
          }}
        >
          <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>

      <BootstrapDialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            borderBottom: "1px solid #f1f5f9",
            bgcolor: "#ffffff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                bgcolor: "#0f172a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalOfferOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>
            <DialogTitle
              sx={{
                m: 0,
                p: 0,
                fontSize: "16px",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Brand Information
            </DialogTitle>
          </Box>

          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              bgcolor: "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#64748b",
              "&:hover": { bgcolor: "#0f172a", color: "#ffffff", borderColor: "#0f172a" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <DialogContent>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: "170px",
              borderRadius: "16px",
              overflow: "hidden",
              mb: 2.5,
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#f8fafc",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "14px",
              }}
              src={
                list?.media
                  ? `${import.meta.env.VITE_BASE_URL}/storage/${list.media.media_path}`
                  : "/empty-image.jpg"
              }
              alt={list?.title}
            />
          </Paper>

          <Box sx={{ px: 0.5 }}>
            <DetailRow label="Brand Name" value={list?.title} />
            <Divider sx={{ borderStyle: "dashed", borderColor: "#e2e8f0" }} />

            <DetailRow label="Slug" value={list?.slug} />
            <Divider sx={{ borderStyle: "dashed", borderColor: "#e2e8f0" }} />

            <DetailRow label="Sort Order" value={list?.sort_order} />
            <Divider sx={{ borderStyle: "dashed", borderColor: "#e2e8f0" }} />

            <DetailRow label="Status" isStatus />
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
