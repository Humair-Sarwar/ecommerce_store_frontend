import {
  Alert,
  Box,
  Button,
  Container,
  Pagination,
  Skeleton,
  Tooltip,
  useScrollTrigger,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddIcon from "@mui/icons-material/Add";
import { getMediaApi } from "../../utils/apis/APIs";
import { fetchMedia, useDeleteMedia } from "../../hook/vendor/useMedia";
import { Snackbar } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
  const { vertical, horizontal, open } = snackbar;

  const handleClick = (newState) => () => {
    setSnackbar({ ...newState, open: true });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteImage = async (data) => {
     deleteMutation.mutate(data.id, {
      onSuccess: () => {
        handleSuccess('Media Deleted Successfully!');
        setPage(1);
      },
    });
    };

  console.log(media);
  return (
    <Box
      sx={{
        width: "100%",
        py: 3,
        overflowY: "auto",
      }}
      className="pages-admin-target-style"
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        <Box
          component={"h2"}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "17px",
            mb: 3,
          }}
        >
          <PermMediaIcon sx={{ mr: 1 }} color="secondary" /> Media
        </Box>
        <Box sx={{ textAlign: "end", mb: 2 }}>
          <UploadMediaModal />
        </Box>
        <Box
          sx={{
            borderRadius: "15px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            overflowX: "auto",
            p: 2,
            backgroundColor: "white",
          }}
        >
          <Grid container spacing={1}>
            {isLoading
              ? Array.from(new Array(22)).map((_, index) => (
                  <Grid item key={index} sx={{ width: "8.33%" }}>
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
              : (media.length === 0 ? <Grid item xs={12} sx={{width: '100%'}}>
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          color: "#888",
          fontSize: "14px",
          width: '100%'
        }}
      >
        No media available!
      </Box>
    </Grid> : media.map((list) => (
                  <Grid item key={list.id} sx={{ width: "8.33%" }}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1 / 1",
                        borderRadius: "10px", // Rounded corners for modern look
                        overflow: "hidden",
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
                      <ConfirmDeletePopup showMediaDelBtn={true} title={"Image"} description={
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
                          onClick={() => {
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
                      
                        <MediaImageView src={`${import.meta.env.VITE_BASE_URL}/storage/${list.media_path}`}/>
                    </Box>
                  </Grid>
                ))) }
          </Grid>
                {media.length > 0 && <Box
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
          </Box>}
          
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
          sx={{ width: "100%" }}
        >
          Image URL copied!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Media;
