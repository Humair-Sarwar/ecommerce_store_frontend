import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Grid,
  IconButton,
  Switch,
  TextField,
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
  title,
  list,
}) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [imageCategory, setImageCategory] = useState(null);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true, // <-- key for updating when `list` changes
    initialValues: {
      is_active: list?.is_active ?? true,
      brand_name: list?.brand_name || "",
      sort_order: list?.sort_order ?? 1,
      brandImage: null,
    },
    validationSchema: yup.object({
      brand_name: yup
        .string()
        .min(3)
        .max(200)
        .required("Brand name is required!"),
      sort_order: yup.number().required("Sort order is required!"),
    }),
    onSubmit: async (values, action) => {
 
  const formData = new FormData();

  if (values.brandImage instanceof File) {
    formData.append("brandImage", values.brandImage, values.brandImage.name);
  }

  const slug = generateSlug(values.brand_name);
  formData.append("is_active", values.is_active);
  formData.append("slug", slug);
  formData.append("brand_name", values.brand_name);
  formData.append("sort_order", values.sort_order);
   formData.append("business_id", "123");


  // If editing (assuming list has an id), call update; else create
  let res;
  if (list?.id) {
    // Optionally only include fields that changed, depending on backend
    formData.append("id", list?.id);
    res = await updateBrandApi(formData);
  } else {
    res = await createBrandApi(formData);
  }

  if (res.status === 200 || res.status === 201) {
     handleSetReloadFunc();
    setImageCategory(null);
    handleSuccess(list?.id ? "Brand Updated Successfully!" : "New Brand Added Successfully!");
    action.resetForm();
    setOpen(false);
    setParentCategoryIdSelect?.(); // guard if undefined
  } else {
    handleError("Internal Server Error!");
  }
}

  });

  const handleBrandImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageCategory(reader.result); // this is just for preview
    };

    setFieldValue("brandImage", file);
  };

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
      <Box sx={{ textAlign: "start" }} onClick={toggleDrawer(false)}>
        <CloseIcon sx={{ cursor: "pointer" }} />
      </Box>
      <Typography sx={{ mb: 1, fontWeight: "600" }}>{title} Brand</Typography>
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
              <Box
                component="label"
                sx={{
                  border: "1px dotted black",
                  cursor: "pointer",
                  borderRadius: "5px",
                  position: "relative",
                }}
                className="image-upload-box-target"
              >
                <img
                  src={
                    imageCategory == null ? "/empty-image.jpg" : imageCategory
                  }
                />
                <VisuallyHiddenInput
                  type="file"
                  name="brandImage"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={handleBrandImage}
                />

                <AddCircleIcon
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
                {/* <RemoveCircleIcon sx={{backgroundColor: 'white', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', color: 'red', position: 'absolute', right: '-5px', bottom: '-5px'}}/> */}
              </Box>
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
                name="is_active"
                color="secondary"
                checked={values.is_active}
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
                    name="brand_name"
                    value={values.brand_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.brand_name && touched.brand_name)}
                    inputRef={nameInputRef} // 👈 this enables auto-focus
                  />

                  {touched.brand_name && errors.brand_name && (
                    <Typography
                      sx={{ fontSize: "12px", color: "red", mt: 0.5 }}
                    >
                      {errors.brand_name}
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
                    className="custom-secondary-btn-admin-side"
                  >
                    {list?.id ? 'Update' : 'Create Brand'}
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
        <IconButton
          onClick={toggleDrawer(true)}
          size="small"
          aria-label="edit"
          color="primary"
        >
          <EditIcon />
        </IconButton>
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
