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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import { useFormik } from "formik";
import { generateSlug } from "../../utils/apis/slugGenerate";
import {
  addImageApi,
  createBrandApi,
  createCategoryApi,
  updateBrandApi,
} from "../../utils/apis/APIs";
import { handleError, handleSuccess } from "../../toast";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import { useCreateBrand, useUpdateBrand } from "../../hook/vendor/useBrand";
import MediaSelectModal from "../../components/MediaSelectModal";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function BrandModal({
  handleSetReloadFunc,
  showEditBtn,
  showCrtBrandBtn,
  title_heading,
  list,
}) {
  const [open, setOpen] = React.useState(false);
  const [imageData, setImageData] = useState({ image_id: "", image_path: "" });
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    // setImageData({ image_id: "", image_path: "" })
  };
  React.useEffect(() => {
    if (showEditBtn && list) {
      setImageData({
        image_id: list?.image_id ?? list?.media?.id ?? "",
        image_path: list?.media?.media_path
          ? `${import.meta.env.VITE_BASE_URL}/storage/${list.media.media_path}`
          : "",
      });
    }
  }, [showEditBtn, list]);
  const createBrandMutation = useCreateBrand();
  const updateBrandMutation = useUpdateBrand();
  const isLoading =
    createBrandMutation.isPending || updateBrandMutation.isPending;
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
      status: list ? list?.status === 1 || list?.status === true : true,
      title: list?.title || "",
      sort_order: list?.sort_order ?? 1,
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .min(3)
        .max(200)
        .required("Brand name is required!")
        .trim(),
      sort_order: yup.number().required("Sort order is required!"),
    }),
    onSubmit: async (values, action) => {
      const formData = new FormData();

      if (values.brandImage instanceof File) {
        formData.append(
          "brandImage",
          values.brandImage,
          values.brandImage.name,
        );
      }

      formData.append("status", values.status);
      formData.append("title", values.title);
      formData.append("sort_order", values.sort_order);
      formData.append("image_id", imageData.image_id);

      // If editing (assuming list has an id), call update; else create
      let res;
      if (list?.id) {
        updateBrandMutation.mutate(
          {
            id: list.id,
            formData,
          },
          {
            onSuccess: (res) => {
              handleSuccess(res?.message || "Brand updated successfully");
              setOpen(false); // drawer close
            },

            onError: (error) => {
              const status = error?.response?.status;

              if (status === 422) {
                handleError("Brand already exist!");
              } else if (status === 404) {
                handleError("Brand not found");
              } else {
                handleError("Failed to update brand");
              }
            },
          },
        );
      } else {
        createBrandMutation.mutate(formData, {
          onSuccess: () => {
            handleSuccess("Brand created successfully");
            setOpen(false); // modal close
            action.resetForm();
            setImageData({ image_id: "", image_path: "" });
          },
          onError: (error) => {
            const status = error?.response?.status;

            if (status === 422) {
              handleError("Brand already exist!");
            } else {
              handleError("Failed to create brand");
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
          {title_heading} Brand
        </Typography>
        <Box sx={{ textAlign: "start" }} onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ cursor: "pointer" }} />
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgb(197, 196, 196)",
                borderRadius: "10px",
                padding: "2px 15px",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "13px",
                  textWrap: "nowrap",
                  mr: 1,
                }}
              >
                Is Active :
              </Typography>

              <Switch
                name="status"
                color="secondary"
                checked={values.status}
                onChange={handleChange}
              />
            </Box>
          </Grid>

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
                    label="Name"
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
                    {isLoading
                      ? "Saving..."
                      : list?.id
                        ? "Update"
                        : "Create Brand"}
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );

  return (
    <>
      {showCrtBrandBtn && (
        <Button
          onClick={toggleDrawer(true)}
          className="custom-secondary-btn-admin-side"
        >
          <AddIcon sx={{ mr: 1 }} /> Create Brand
        </Button>
      )}
      {showEditBtn && (
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
