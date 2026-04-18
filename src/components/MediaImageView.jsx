import * as React from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SimpleDialog(props) {
  // imageUrl hum props se le rahe hain
  const { onClose, open, imageUrl } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden", // Taaki image corners rounded rahein
        },
      }}
      sx={{ zIndex: "55510 !important" }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        <DialogTitle sx={{ fontSize: "16px", fontWeight: 600 }}>
          View Image
        </DialogTitle>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      {/* Image Container */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <img
          src={imageUrl}
          alt="Media View"
          style={{
            maxWidth: "100%",
            maxHeight: "70vh",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            objectFit: "contain",
          }}
        />
      </Box>
    </Dialog>
  );
}

// Component jo button aur dialog ko handle karta hai
export default function MediaImageView({ src }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <Tooltip describeChild title="View" arrow>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          size="small"
          sx={{
            position: "absolute",
            bottom: 4,
            right: 4,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "#454545",
            "&:hover": {
              backgroundColor: "#454545",
              color: "#fff",
            },
            padding: "2px",
          }}
        >
          <VisibilityIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      </Tooltip>

      <SimpleDialog
        open={open}
        onClose={(e) =>{
          e.stopPropagation()
          setOpen(false)}
        }
           
        imageUrl={src} // Image URL pass kar rahe hain
      />
    </Box>
  );
}
