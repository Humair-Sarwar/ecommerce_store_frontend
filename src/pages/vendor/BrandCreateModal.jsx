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
import { useFormik } from "formik";
import { handleError, handleSuccess } from "../../toast";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
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

const modernSwitchSx = {
  width: 42,
  height: 24,
  p: 0,
  "& .MuiSwitch-switchBase": {
    p: 0,
    m: "2px",
    transitionDuration: "250ms",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#10b981",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    backgroundColor: "#cbd5e1",
    opacity: 1,
  },
};

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
        .min(2)
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

      if (list?.id) {
        updateBrandMutation.mutate(
          {
            id: list.id,
            formData,
          },
          {
            onSuccess: (res) => {
              handleSuccess(res?.message || "Brand updated successfully");
              setOpen(false);
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
            setOpen(false);
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
      }, 100);
    }
  }, [open]);

  const DrawerList = (
    <Box
      sx={{
        width: { xs: "100vw", sm: 540 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
      }}
      role="presentation"
      className="inner-modal-search-view-set"
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2.5,
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: "#0f172a",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            }}
          >
            <LocalOfferOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "17px", color: "#0f172a", lineHeight: 1.2 }}>
              {title_heading} Brand
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
              Configure brand logo, display name, and status
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={toggleDrawer(false)}
          size="small"
          sx={{
            width: 34,
            height: 34,
            borderRadius: "10px",
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
            color: "#64748b",
            "&:hover": { bgcolor: "#0f172a", color: "#ffffff", borderColor: "#0f172a" },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Form Body */}
      <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <MediaSelectModal
                    setImageData={setImageData}
                    imageData={imageData}
                    isBrand={true}
                  />
                  <Box>
                    <Typography sx={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>
                      Brand Logo
                    </Typography>
                    <Typography sx={{ fontSize: "11.5px", color: "#64748b" }}>
                      Click the box to select or change logo
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    px: 2,
                    py: 1,
                    borderRadius: "12px",
                    bgcolor: "#ffffff",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "12.5px",
                      color: "#0f172a",
                    }}
                  >
                    Active Status
                  </Typography>
                  <Switch
                    name="status"
                    checked={values.status}
                    onChange={handleChange}
                    sx={modernSwitchSx}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  bgcolor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
                }}
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Brand Name"
                      variant="outlined"
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.title && touched.title)}
                      inputRef={nameInputRef}
                    />
                    {touched.title && errors.title && (
                      <Typography sx={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, mt: 0.5 }}>
                        {errors.title}
                      </Typography>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Sort Order"
                      variant="outlined"
                      type="number"
                      name="sort_order"
                      value={values.sort_order}
                      onChange={(e) => {
                        const val = e.target.value;
                        const parsedVal = parseInt(val, 10);
                        setFieldValue(
                          "sort_order",
                          val === "" ? "" : Math.max(1, parsedVal),
                        );
                      }}
                      onBlur={handleBlur}
                      error={Boolean(errors.sort_order && touched.sort_order)}
                      inputProps={{ min: 1 }}
                      sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                          display: "none",
                          margin: 0,
                        },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                      }}
                    />
                    {touched.sort_order && errors.sort_order && (
                      <Typography sx={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, mt: 0.5 }}>
                        {errors.sort_order}
                      </Typography>
                    )}
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.25, mt: 1 }}>
                      <Button
                        type="button"
                        onClick={toggleDrawer(false)}
                        className="custom-primary-btn-admin-side"
                      >
                        Cancel
                      </Button>
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
                            ? "Update Brand"
                            : "Create Brand"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );

  return (
    <>
      {showCrtBrandBtn && (
        <Button
          onClick={toggleDrawer(true)}
          className="custom-secondary-btn-admin-side"
        >
          <AddIcon sx={{ mr: 0.75, fontSize: 18 }} /> Create Brand
        </Button>
      )}
      {showEditBtn && (
        <Tooltip title="Edit" arrow>
          <IconButton
            onClick={toggleDrawer(true)}
            size="small"
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              color: "#0f172a",
              ml: 0.75,
              bgcolor: "#f8fafc",
              border: "1px solid #e2e8f0",
              "&:hover": { bgcolor: "#0f172a", color: "#ffffff", borderColor: "#0f172a" },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 16 }} />
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
