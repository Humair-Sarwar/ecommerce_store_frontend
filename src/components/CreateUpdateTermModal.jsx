import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Grid,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import { useFormik } from "formik";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import { handleError, handleSuccess } from "../toast";
import MediaSelectModal from "./MediaSelectModal";
import TextEditor from "./TextEditor";
import {
  useCreateTerm,
  useUpdateTerm,
} from "../hook/vendor/useAttributesTerms";

export default function CreateUpdateTermModal({
  showEditBtn,
  title_heading,
  term,
  selectedId,
}) {
  const [open, setOpen] = React.useState(false);
  const [imageData, setImageData] = useState({ image_id: "", image_path: "" });
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    // setImageData({ image_id: "", image_path: "" })
  };
  React.useEffect(() => {
    if (showEditBtn && term) {
      setImageData({
        image_id: term?.image_id ?? term?.media?.id ?? "",
        image_path: term?.media?.media_path
          ? `${import.meta.env.VITE_BASE_URL}/storage/${term.media.media_path}`
          : "",
      });
    }
  }, [showEditBtn, term]);
  const createTerm = useCreateTerm();
  const updateTerm = useUpdateTerm();
  const isLoading = createTerm.isPending || updateTerm.isPending;
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: term?.title || "",
      sort_order: term?.sort_order ?? 1,
      //   image_id: term?.image_id ?? imageData?.image_id,
      description: term?.description || "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .min(3)
        .max(200)
        .required("Term name is required!")
        .trim(),
      sort_order: yup.number().required("Sort order is required!"),
    }),
    onSubmit: async (values, action) => {
      const payload = {
        attribute_id: selectedId,
        ...values,
        image_id: imageData?.image_id,
      };

      let res;
      if (term?.id) {
        updateTerm.mutate({...payload, id: term?.id}, {
          onSuccess: (res) => {
              setOpen(false);
            handleSuccess(res?.message || "Term updated successfully!");
            action.resetForm();
            setImageData({ image_id: "", image_path: "" });
          },
          onError: (error) => {
            const status = error?.response?.status;

            if (status === 404) {
              handleError("Term not found!");
            } else if (status === 422) {
              handleError("Term already exists!");
            } else {
              handleError(
                error?.response?.data?.message || "Failed to update term!",
              );
            }
          },
        });
      } else {
        createTerm.mutate(payload, {
          onSuccess: (res) => {
            handleSuccess(res?.message || "Term created successfully!");
            action.resetForm();
            setOpen(false);
            setImageData({ image_id: "", image_path: "" });
          },
          onError: (error) => {
            const status = error?.response?.status;

            if (status === 422) {
              handleError("Validation errors!!");
            } else {
              handleError(
                error?.response?.data?.message || "Failed to create term!",
              );
            }
          },
        });
      }
    },
  });

  const nameInputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100); // Small delay to ensure DOM is ready
    }
  }, [open]);

  const DrawerList = (
    <Box
      sx={{ width: 630, p: 2 }}
      role="presentation"
      className="inner-modal-search-view-set"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ mb: 1, fontWeight: "600" }}>
          {title_heading} Term
        </Typography>
        <Box sx={{ textAlign: "start" }} onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ cursor: "pointer" }} />
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                border: "1px solid rgb(197, 196, 196)",
                borderRadius: "10px",
                padding: "8px",
              }}
            >
              <Grid container spacing={1} sx={{ width: "100%" }}>
                <Grid size={{ xs: 8 }}>
                  <TextField
                    fullWidth
                    size="small"
                    color="secondary"
                    label="Title"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.title && touched.title)}
                    inputRef={nameInputRef} // 👈 this enables auto-focus
                  />

                  {touched.title && errors.title && (
                    <Typography
                      sx={{ fontSize: "12px", color: "red", mt: 0.5 }}
                    >
                      {errors.title}
                    </Typography>
                  )}
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    color="secondary"
                    label="Sort Order"
                    variant="outlined"
                    type="number"
                    name="sort_order"
                    value={values.sort_order}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.sort_order && touched.sort_order)}
                  />
                  {touched.sort_order && errors.sort_order && (
                    <Typography
                      sx={{ fontSize: "12px", color: "red", mt: 0.5 }}
                    >
                      {errors.sort_order}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid size={{ xs: 2, sm: 2, md: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgb(197, 196, 196)",
                borderRadius: "10px",
                padding: "8px 8px",
                height: "100%",
              }}
            >
              <MediaSelectModal
                setImageData={setImageData}
                imageData={imageData}
                isBrand={true}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 10 }}>
            <TextEditor
              value={values.description}
              onChange={(content) => {
                const baseContent = content === "<p><br></p>" ? "" : content;
                setFieldValue("description", baseContent);
              }}
            />
          </Grid>
          <Box sx={{ textAlign: "end", width: "100%" }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="custom-secondary-btn-admin-side"
              sx={{
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Saving..." : term?.id ? "Update" : "Create Term"}
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );

  return (
    <>
      {showEditBtn ? (
        <Tooltip title="Edit" arrow>
          <IconButton
            onClick={toggleDrawer(true)}
            size="small"
            sx={{
              color: "#1976d2",
              ml: 1,
              bgcolor: "#e3f2fd",
              "&:hover": { bgcolor: "#bbdefb" },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          disabled={!selectedId}
          onClick={toggleDrawer(true)}
          startIcon={<AddIcon />}
          sx={{
            textWrap: "nowrap",
            px: 4,
            py: 1.1,
            borderRadius: "14px",
            textTransform: "capitalize",
            fontWeight: 700,
            fontSize: "0.85rem",
            boxShadow: `0 8px 16px ${alpha("#673ab7", 0.25)}`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 12px 20px ${alpha("#673ab7", 0.35)}`,
            },
          }}
        >
          Create Term
        </Button>
      )}

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        className="search-modal-panel-style-set"
        sx={{ zIndex: "6000" }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
