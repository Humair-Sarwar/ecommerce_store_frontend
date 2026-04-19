import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

import { useFormik } from "formik";
import { generateSlug } from "../../utils/apis/slugGenerate";
import { addImageApi, createCategoryApi } from "../../utils/apis/APIs";
import { handleError, handleSuccess } from "../../toast";
import CategoriesLoadModal from "../../components/CategoriesLoadModal";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MediaSelectModal from "../../components/MediaSelectModal";
import {
  useCreateCategory,
  useUpdateCategory,
} from "../../hook/vendor/useCategories";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

export default function CategoryModal({ list, isEdit, category }) {
  const [open, setOpen] = React.useState(false);
  const [imageData, setImageData] = useState({ image_id: "", image_path: "" });
  const [imageDataCover, setImageDataCover] = useState({
    cover_image_id: "",
    image_path: "",
  });
  console.log(category, list, "00000");
  React.useEffect(() => {
    if (isEdit && category) {
      setImageData({
        image_id: category?.image_id ?? category?.media?.id ?? "",
        image_path: category?.media?.media_path
          ? `${import.meta.env.VITE_BASE_URL}/storage/${category.media.media_path}`
          : "",
      });
      setImageDataCover({
        cover_image_id:
          category?.cover_image_id ?? category?.cover_media?.id ?? "",
        image_path: category?.cover_media?.media_path
          ? `${import.meta.env.VITE_BASE_URL}/storage/${category.cover_media.media_path}`
          : "",
      });

      setParentCategoryIdSelect({
        parent_category_id: category?.parent_category_id || null,
        level: category?.level || null,
      });
    }
  }, [isEdit, category]);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const isLoading = createCategory.isPending || updateCategory.isPending;
  const [value, setValue] = React.useState(0);
  const [parentCategoryIdSelect, setParentCategoryIdSelect] = useState({
    parent_category_id: null,
    level: null,
  });
  const imageInputRef = React.useRef(null);
  const [imageCategory, setImageCategory] = useState(null);
  const [imageCover, setImageCover] = useState(null);
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
      is_active_for_buy: category
        ? Number(category.is_active_for_buy) === 1
          ? true
          : false
        : true,
      title: category?.title || "",
      sort_order: category?.sort_order || 1,
      page_description: category?.page_description || "",
      is_listing_switch_in_buy: category
        ? Number(category.is_listing_switch_in_buy) === 1
          ? true
          : false
        : false,
      listing_design: category?.listing_design || 1,
      meta_title: category?.meta_title || "",
      meta_description: category?.meta_description || "",
    },
    validationSchema: yup.object({
      title: yup.string().min(3).max(200).required("Name is required!").trim(),
      sort_order: yup.number().required("Sort order is required!"),
    }),
    onSubmit: async (values, action) => {
      const category_slug = generateSlug(values.name);
      const payload = {
        ...values,
        category_slug: generateSlug(values.title),
        image_id: imageData.image_id,
        cover_image_id: imageDataCover.cover_image_id,
        ...parentCategoryIdSelect,
      };
      // if (parentCategoryIdSelect) {
      //   formData.append("parent_category_id", parentCategoryIdSelect);
      // }

      if (category?.id) {
        updateCategory.mutate(
          { ...payload, id: category?.id },
          {
            onSuccess: (res) => {
              handleSuccess(res?.message || "Category updated successfully!");
              setOpen(false);
              action.resetForm();
              setImageData({ image_id: "", image_path: "" });
              setImageDataCover({ cover_image_id: "", image_path: "" });
              setParentCategoryIdSelect({
                parent_category_id: null,
                level: null,
              });
            },
            onError: (error) => {
              const status = error?.response?.status;

              if (status === 422) {
                handleError("Slug already exists!");
              } else if (status === 404) {
                handleError("Category not found!");
              } else {
                handleError(
                  error?.response?.data?.message ||
                    "Failed to update category!",
                );
              }
            },
          },
        );
      } else {
        createCategory.mutate(payload, {
          onSuccess: () => {
            handleSuccess("Category created successfully");
            setOpen(false);
            action.resetForm();
            setImageData({ image_id: "", image_path: "" });
            setImageDataCover({ cover_image_id: "", image_path: "" });
            setParentCategoryIdSelect({
              parent_category_id: null,
              level: null,
            });
          },
          onError: (err) => {
            const status = err?.response?.status;

            if (status === 422) {
              handleError("Slug already exist!");
            } else if (status === 404) {
              handleError("Category not found");
            } else {
              handleError("Failed to create category");
            }
          },
        });
      }
    },
  });

  const handleTargetParentCategoryId = (parent_category_id, level) => {
    setParentCategoryIdSelect({
      parent_category_id: parent_category_id,
      level: level,
    });
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
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
                isCategory={true}
              />
              <MediaSelectModal
                setImageDataCover={setImageDataCover}
                imageDataCover={imageDataCover}
                isCategoryCover={true}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
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
              <Typography sx={{ fontWeight: "600", fontSize: "13px" }}>
                Purpose:
              </Typography>

              <FormControlLabel
                sx={{
                  ml: 1,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="is_active_for_buy"
                    checked={values.is_active_for_buy}
                    onChange={handleChange}
                  />
                }
                label="Sale"
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
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    color="secondary"
                    label="Description"
                    variant="outlined"
                    name="page_description"
                    value={values.page_description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CategoriesLoadModal
                    handleTargetParentCategoryId={handleTargetParentCategoryId}
                    initialParentId={category?.parent_category_id}
                    initialParentTitle={category?.title}
                  />
                </Grid>

                <Grid size={{ xs: 5 }}>
                  <Box
                    sx={{
                      border: "1px solid rgb(197, 196, 196)",
                      borderRadius: "10px",
                      padding: "2px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Switch
                      name="is_listing_switch_in_buy"
                      color="secondary"
                      checked={values.is_listing_switch_in_buy}
                      onChange={handleChange}
                    />
                    <Typography sx={{ fontSize: "14px" }}>
                      Show listing switch in buy
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 7 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid rgb(197, 196, 196)",
                      borderRadius: "10px",
                      padding: "2px 15px",
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
                      Listing Design :
                    </Typography>

                    <FormControl>
                      <RadioGroup
                        row
                        name="listing_design"
                        value={values.listing_design}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio size="small" color="secondary" />}
                          label="Grid View"
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "12px",
                            },
                          }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio size="small" color="secondary" />}
                          label="List View"
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "12px",
                            },
                          }}
                        />
                      </RadioGroup>

                      {/* Optional error display */}
                      {touched.design_view && errors.design_view && (
                        <Typography sx={{ fontSize: "12px", color: "red" }}>
                          {errors.design_view}
                        </Typography>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                {values.is_active_for_buy && (
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid rgb(197, 196, 196)",
                        borderRadius: "10px",
                        padding: "2px",
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            textColor="secondary"
                            indicatorColor="secondary"
                          >
                            <Tab label="Sale" {...a11yProps(0)} />
                            {/* <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} /> */}
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                          <Box sx={{ textAlign: "center", mb: 1 }}>
                            <Typography>SEO</Typography>
                          </Box>
                          <Grid container spacing={1} sx={{ width: "100%" }}>
                            <Grid size={{ xs: 12 }}>
                              <TextField
                                fullWidth
                                color="secondary"
                                size="small"
                                label="Sale Meta Title"
                                variant="outlined"
                                name="meta_title"
                                value={values.meta_title}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                              <TextField
                                fullWidth
                                label="Sale Meta Description"
                                multiline
                                color="secondary"
                                rows={1}
                                name="meta_description"
                                value={values.meta_description}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                        </CustomTabPanel>
                        {/* <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
                      </Box>
                    </Box>
                  </Grid>
                )}

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
                      : category?.id
                        ? "Update Category"
                        : "Create Category"}
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
      {isEdit ? (
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
          onClick={toggleDrawer(true)}
          className="custom-secondary-btn-admin-side"
        >
          <AddIcon sx={{ mr: 1 }} /> Create Category
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
