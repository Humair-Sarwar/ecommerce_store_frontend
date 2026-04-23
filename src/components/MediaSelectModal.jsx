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
  Skeleton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import PublishIcon from "@mui/icons-material/Publish";
import {
  fetchMedia,
  useDeleteMedia,
  useUploadMedia,
  useUploadSingleMedia,
} from "../hook/vendor/useMedia";
import { handleError, handleSuccess } from "../toast";
import { useState } from "react";
import PaginationSet from "./PaginationSet";
import MediaImageView from "./MediaImageView";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SimpleDialog(props) {
  const uploadSingleMedia = useUploadSingleMedia();
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(15);
  const { data, isLoading } = fetchMedia(page, per_page);
  const media = data?.data || [];
  const pagination = data?.pagination;
  const deleteMutation = useDeleteMedia();
  const { open, onClose } = props;
  const [snackbar, setSnackbar] = useState({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSnack } = snackbar;

  const handleClick = (newState) => () => {
    setSnackbar({ ...newState, openSnack: true });
  };

  const handleCloseSnack = () => {
    setSnackbar({ ...snackbar, openSnack: false });
  };

  const handleDialogClose = () => {
    onClose();
  };

  const handleDeleteImage = async (data) => {
    deleteMutation.mutate(data.id, {
      onSuccess: () => {
        handleSuccess("Media Deleted Successfully!");
        setPage(1);
      },
    });
  };

  const uploadMutation = useUploadMedia();
  // const { onCloseSnack, openSnack } = props;
  const [isDragging, setIsDragging] = useState(false);

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
    const file = event.target.files[0];
    if (file) handleUpload(file);

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

    const file = Array.from(e.dataTransfer.files).find((f) =>
      f.type.startsWith("image/"),
    );

    if (file) handleUpload(file);
  };

  const handleUpload = (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // 👈 backend expects single file

    uploadSingleMedia.mutate(formData, {
      onSuccess: () => {
        handleSuccess("Uploaded successfully");
        //   onClose();
      },
      onError: () => {
        handleError("Upload failed");
      },
    });
  };

  return (
    <Dialog
      onClose={handleDialogClose}
      open={open}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: "16px" } }}
      sx={{ zIndex: "55510 !important" }}
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
          Select Media
        </DialogTitle>
        <IconButton onClick={handleDialogClose} size="small">
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
        <Box
          sx={{
            // borderRadius: "15px",
            // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            overflowX: "auto",
            // p: 2,
            mt: 3,
            // backgroundColor: "white",
          }}
        >
          <Grid container spacing={1}>
            {isLoading ? (
              Array.from(new Array(22)).map((_, index) => (
                <Grid item key={index} sx={{ width: "10%" }}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                      width: "100%",
                      height: 0,
                      pt: "100%",
                      borderRadius: "10px",
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </Grid>
              ))
            ) : media.length === 0 ? (
              <Grid item xs={12} sx={{ width: "100%" }}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 4,
                    color: "#888",
                    fontSize: "14px",
                    width: "100%",
                  }}
                >
                  No media available!
                </Box>
              </Grid>
            ) : (
              media.map((list) => (
                <Grid item key={list.id} sx={{ width: "10%" }}>
                  <Box
                    onClick={() => {
                      const imagePayload = {
                        image_id: list.id,
                        cover_image_id: list.id, 
                        image_path: `${import.meta.env.VITE_BASE_URL}/storage/${list.media_path}`,
                      };

                      if (props.isProduct || props.imageData) {
                        if (typeof props.setImageData === "function") {
                          props.setImageData(imagePayload);
                        }
                      } else {
                        if (typeof props.setImageDataCover === "function") {
                          props.setImageDataCover(imagePayload);
                        } else if (typeof props.setImageData === "function") {
                          props.setImageData(imagePayload);
                        }
                      }

                      handleDialogClose();
                    }}
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "10px", // Rounded corners for modern look
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.02)" }, // Hover effect
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/storage/${list.media_path}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt="media content"
                    />

                    {/* Delete Button (Top Right) */}
                    <ConfirmDeletePopup
                      showMediaDelBtn={true}
                      title={"Image"}
                      description={
                        "Are your sure you want to delete this image?"
                      }
                      handleDeleteImage={handleDeleteImage}
                      singleImageDelRec={{
                        id: list?.id,
                      }}
                    />

                    {/* Copy Button (Bottom Left) */}
                    <Tooltip describeChild title="Copy URL" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 4,
                          left: 4,
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          color: "#1976d2",
                          "&:hover": {
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                          padding: "2px",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = `${import.meta.env.VITE_BASE_URL}/storage/${list.media_path}`;
                          navigator.clipboard.writeText(url);
                          handleClick({
                            vertical: "top",
                            horizontal: "center",
                          })();
                        }}
                      >
                        <ContentCopyIcon sx={{ fontSize: "14px" }} />
                      </IconButton>
                    </Tooltip>

                    {/* Eye/View Button (Bottom Right) */}

                    <MediaImageView
                      src={`${import.meta.env.VITE_BASE_URL}/storage/${list.media_path}`}
                    />
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
          {media.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <PaginationSet
                count={pagination?.last_page || 1}
                page={page}
                per_page={per_page}
                from={pagination?.from}
                to={pagination?.to}
                total={pagination?.total}
                onPageChange={(value) => setPage(value)}
                onPerPageChange={(value) => {
                  setPerPage(value);
                  setPage(1); // reset page when per_page changes
                }}
                variant="outlined"
                color="secondary"
              />
            </Box>
          )}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar.openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        message="Image URL copied!"
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Image URL copied!
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default function MediaSelectModal({
  setImageData,
  imageData,
  isBrand,
  isCategory,
  setImageDataCover,
  imageDataCover,
  isCategoryCover,
  isProduct,
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {isBrand && (
        <Box
          sx={{
            border: "1px dotted black",

            borderRadius: "5px",
            position: "relative",
          }}
          className="image-upload-box-target"
        >
          <Box
            onClick={() => setOpen(true)}
            component="label"
            sx={{ cursor: "pointer" }}
          >
            <img
              src={
                imageData.image_id ? imageData.image_path : "/empty-image.jpg"
              }
            />
          </Box>
          {imageData.image_id == "" ? (
            <AddCircleIcon
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
                color: "#9c27b0",
                position: "absolute",
                right: "-5px",
                bottom: "-5px",
              }}
            />
          ) : (
            <RemoveCircleIcon
              onClick={() => setImageData({ image_id: "", image_path: "" })}
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
                color: "red",
                position: "absolute",
                right: "-5px",
                bottom: "-5px",
              }}
            />
          )}
        </Box>
      )}

      {isCategory && (
        <Box
          sx={{
            border: "1px dotted black",

            borderRadius: "5px",
            position: "relative",
          }}
          className="image-upload-box-target"
        >
          <Box
            onClick={() => setOpen(true)}
            component="label"
            sx={{ cursor: "pointer" }}
          >
            <img
              src={
                imageData.image_id ? imageData.image_path : "/empty-image.jpg"
              }
            />
          </Box>
          {imageData.image_id == "" ? (
            <AddCircleIcon
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
                color: "#9c27b0",
                position: "absolute",
                right: "-5px",
                bottom: "-5px",
              }}
            />
          ) : (
            <RemoveCircleIcon
              onClick={() => setImageData({ image_id: "", image_path: "" })}
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
                color: "red",
                position: "absolute",
                right: "-5px",
                bottom: "-5px",
              }}
            />
          )}
        </Box>
      )}

      {isCategoryCover && (
        <Box
          className="image-upload-box-target-cover-img"
          sx={{
            border: "1px dotted black",
            cursor: "pointer",
            borderRadius: "5px",
            position: "relative",
            ml: 1,
            width: "100% !important",
          }}
        >
          <Box
            onClick={() => setOpen(true)}
            component="label"
            sx={{ cursor: "pointer" }}
          >
            <img
              src={
                imageDataCover.cover_image_id
                  ? imageDataCover.image_path
                  : "/empty-image.jpg"
              }
            />
          </Box>
          {imageDataCover.cover_image_id == "" ? (
            <AddCircleIcon
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
                color: "#9c27b0",
                position: "absolute",
                right: "-5px",
                bottom: "-5px",
              }}
            />
          ) : (
            <RemoveCircleIcon
              onClick={() =>
                setImageDataCover({ cover_image_id: "", image_path: "" })
              }
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
                color: "red",
                position: "absolute",
                right: "-5px",
                bottom: "-5px",
              }}
            />
          )}
        </Box>
      )}

      {isProduct && (
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          component="span"
          sx={{ textTransform: "none", borderRadius: "8px" }}
        >
          Select Media
        </Button>
      )}

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        setImageData={setImageData}
        setImageDataCover={setImageDataCover}
        imageData={imageData}
        isProduct={isProduct}
      />
    </>
  );
}
