import * as React from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from "@mui/icons-material/Publish";
import { useUploadMedia } from "../hook/vendor/useMedia";
import { handleError, handleSuccess } from "../toast";

function SimpleDialog(props) {
  const uploadMutation = useUploadMedia();
  const { onClose, open } = props;
  const [previews, setPreviews] = React.useState([]);
  const [isDragging, setIsDragging] = React.useState(false);

  // Helper function to process files
  const processFiles = (files) => {
    const newPreviews = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file: file,
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) processFiles(files);
    event.target.value = null;
  };

  // --- Drag & Drop Handlers ---
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length > 0) processFiles(files);
  };

  const removeImage = (id, url) => {
    URL.revokeObjectURL(url);
    setPreviews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClose = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews([]);
    onClose();
  };

  const handleUpload = () => {
    if (previews.length === 0) return;

    const formData = new FormData();

    previews.forEach((item) => {
      formData.append("images[]", item.file); // ✅ correct key
    });

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        handleSuccess("Uploaded successfully");
        previews.forEach((p) => URL.revokeObjectURL(p.url));
        setPreviews([]);
        onClose();
      },
      onError: () => {
        handleError("Upload failed ");
      },
    });
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: "16px" } }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        <DialogTitle sx={{ fontSize: "16px", fontWeight: 600 }}>
          Upload Media
        </DialogTitle>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 3 }}>
        {/* Dropzone Area with Drag & Drop Logic */}
        <Box
          component="label"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: isDragging ? "2px dashed #1976d2" : "2px dashed #e0e4f0",
            borderRadius: "12px",
            backgroundColor: isDragging ? "#e3f2fd" : "#f8faff",
            textAlign: "center",
            py: 4,
            cursor: "pointer",
            display: "block",
            transition: "0.3s",
            "&:hover": { backgroundColor: "#f0f4ff", borderColor: "#cbd2e1" },
          }}
        >
          <input
            type="file"
            hidden
            multiple
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
          />

          <Typography sx={{ color: "#5f6368", fontWeight: 600 }}>
            {isDragging ? "Drop images here!" : "Drag & drop images here"}
          </Typography>

          {/* Validation Info Text */}
          <Typography sx={{ fontSize: "11px", color: "#888", mt: 0.5 }}>
            JPG, JPEG, PNG, WEBP (Max: 2MB per file)
          </Typography>

          <Typography sx={{ my: 1, fontSize: "12px", color: "#aaa" }}>
            OR
          </Typography>

          <Button
            variant="outlined"
            component="span"
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            Select Media
          </Button>
        </Box>

        {/* Preview Section */}
        {previews.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={1.5}>
              {previews.map((item) => (
                <Grid item key={item.id} sx={{ width: "16.66%" }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: "8px",
                      border: "1px solid #eee",
                      overflow: "visible",
                    }}
                  >
                    <img
                      src={item.url}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <IconButton
                      onClick={() => removeImage(item.id, item.url)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        bgcolor: "#d32f2f",
                        color: "white",
                        width: 18,
                        height: 18,
                        "&:hover": { bgcolor: "#b71c1c" },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: "10px" }} />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Upload Button - Original Red Style */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                onClick={handleUpload}
                variant="contained"
                startIcon={<PublishIcon />}
                className="custom-secondary-btn-admin-side"
                disabled={uploadMutation.isPending}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#ccc !important",
                    color: "#666 !important",
                    cursor: "not-allowed",
                  },
                }}
              >
                {uploadMutation.isPending ? "Uploading..." : "Upload"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}

export default function UploadMediaModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      {/* Add Media Button - Original Style */}
      <Button
        className="custom-secondary-btn-admin-side"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        Add Media
      </Button>
      <SimpleDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
