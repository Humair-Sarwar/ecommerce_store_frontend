import {
  Alert,
  Box,
  Container,
  Skeleton,
  Tooltip,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { fetchMedia, useDeleteMedia } from "../../hook/vendor/useMedia";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PaginationSet from "../../components/PaginationSet";
import UploadMediaModal from "../../components/UploadMediaModal";
import MediaImageView from "../../components/MediaImageView";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import { handleSuccess } from "../../toast";

const Media = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(15);
  const { data, isLoading } = fetchMedia(page, per_page);
  const media = data?.data || [];
  const pagination = data?.pagination;
  const deleteMutation = useDeleteMedia();

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = snackbar;

  const handleClick = (newState) => () => {
    setSnackbar({ ...newState, open: true });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteImage = async (data) => {
    deleteMutation.mutate(data.id, {
      onSuccess: () => {
        handleSuccess("Media Deleted Successfully!");
        setPage(1);
      },
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: 3,
        overflowY: "auto",
      }}
      className="pages-admin-target-style"
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                bgcolor: "#0f172a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(15, 23, 42, 0.16)",
              }}
            >
              <CollectionsOutlinedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.2,
                  }}
                >
                  Media Library
                </Typography>
                {pagination?.total !== undefined && (
                  <Box
                    sx={{
                      px: 1.1,
                      py: 0.25,
                      borderRadius: "999px",
                      bgcolor: "#ecfdf5",
                      border: "1px solid #a7f3d0",
                      color: "#059669",
                      fontSize: "11.5px",
                      fontWeight: 800,
                    }}
                  >
                    {pagination.total}
                  </Box>
                )}
              </Box>
              <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
                Manage uploaded product photos, brand logos, and category banners
              </Typography>
            </Box>
          </Box>

          <UploadMediaModal />
        </Box>

        <Box
          sx={{
            borderRadius: "24px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
            overflowX: "auto",
            p: 3,
            backgroundColor: "white",
          }}
        >
          <Grid container spacing={1.5}>
            {isLoading ? (
              Array.from(new Array(24)).map((_, index) => (
                <Grid item key={index} sx={{ width: { xs: "50%", sm: "25%", md: "12.5%", lg: "8.33%" } }}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                      width: "100%",
                      height: 0,
                      pt: "100%",
                      borderRadius: "14px",
                      backgroundColor: "rgba(15, 23, 42, 0.05)",
                    }}
                  />
                </Grid>
              ))
            ) : media.length === 0 ? (
              <Grid item xs={12} sx={{ width: "100%" }}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    color: "#64748b",
                    fontSize: "14px",
                    fontWeight: 600,
                    width: "100%",
                  }}
                >
                  No media available!
                </Box>
              </Grid>
            ) : (
              media.map((list) => (
                <Grid item key={list.id} sx={{ width: { xs: "50%", sm: "25%", md: "12.5%", lg: "8.33%" } }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "14px",
                      overflow: "hidden",
                      backgroundColor: "#f8fafc",
                      border: "1.5px solid #e2e8f0",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        borderColor: "#0f172a",
                        boxShadow: "0 10px 20px rgba(15, 23, 42, 0.1)",
                      },
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

                    <ConfirmDeletePopup
                      showMediaDelBtn={true}
                      title={"Image"}
                      description={"Are your sure you want to delete this image?"}
                      handleDeleteImage={handleDeleteImage}
                      singleImageDelRec={{
                        id: list?.id,
                      }}
                    />

                    <Tooltip describeChild title="Copy URL" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 6,
                          left: 6,
                          width: 26,
                          height: 26,
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 255, 255, 0.92)",
                          backdropFilter: "blur(6px)",
                          color: "#0f172a",
                          boxShadow: "0 2px 8px rgba(15,23,42,0.12)",
                          "&:hover": {
                            backgroundColor: "#0f172a",
                            color: "#fff",
                          },
                          padding: "2px",
                        }}
                        onClick={() => {
                          const url = `${import.meta.env.VITE_BASE_URL}/storage/${list.media_path}`;
                          navigator.clipboard.writeText(url);
                          handleClick({
                            vertical: "top",
                            horizontal: "center",
                          })();
                        }}
                      >
                        <ContentCopyIcon sx={{ fontSize: "13px" }} />
                      </IconButton>
                    </Tooltip>

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
                mt: 3,
                pt: 1,
                borderTop: "1px solid #f1f5f9",
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
                  setPage(1);
                }}
                variant="outlined"
                color="secondary"
              />
            </Box>
          )}
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Image URL copied!"
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", borderRadius: "12px", bgcolor: "#10b981" }}
        >
          Image URL copied!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Media;
