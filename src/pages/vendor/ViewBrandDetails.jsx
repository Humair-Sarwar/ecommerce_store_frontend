import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Paper from "@mui/material/Paper";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ViewBrandDetails({ list }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="View" arrow>
        <IconButton
          onClick={handleClickOpen}
          size="small"
          aria-label="edit"
          color="success"
        >
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
          }}
          id="customized-dialog-title"
        >
          <LocalOfferIcon sx={{ mr: 1 }} color="secondary" /> View Brand Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ width: "400px" }}>
            <img
              style={{ width: "100%", height: "200px", objectFit: "contain" }}
              src={
                list?.brand_image
                  ? import.meta.env.VITE_BASE_URL +
                    "/uploads/" +
                    list?.brand_image
                  : "/empty-image.jpg"
              }
              alt=""
            />
          </Box>

          <Box
            sx={{
              backgroundColor: "#ecececff",
              borderRadius: "10px",
              p: 2,
              border: "1px solid #dadadaff",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}>
                Sort Order:
              </Typography>{" "}
              <Typography sx={{ fontSize: "14px" }}>
                {list?.sort_order}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}>
                Brand Name:
              </Typography>{" "}
              <Typography sx={{ fontSize: "14px" }}>
                {list?.brand_name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}>
                Slug:
              </Typography>{" "}
              <Typography sx={{ fontSize: "14px" }}>{list?.slug}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                Active:
              </Typography>{" "}
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: list?.is_active ? "green" : "red",
                  fontSize: "14px",
                }}
              >
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: list?.is_active ? "green" : "red",
                    borderRadius: "50%",
                    mr: 1,
                  }}
                ></Box>
                {list?.is_active ? "ON" : "OFF"}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
