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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

import { useFormik } from "formik";
import { generateSlug } from "../../utils/apis/slugGenerate";
import { handleError, handleSuccess } from "../../toast";
import CategoriesLoadModal from "../../components/CategoriesLoadModal";
import MediaSelectModal from "../../components/MediaSelectModal";
import {
  useCreateCategory,
  useUpdateCategory,
} from "../../hook/vendor/useCategories";

const modernSwitchSx = {
  width: 42,
  height: 24,
  p: 0,
  mr: 1,
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
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
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

export default function CategoryModal({ list, isEdit, category }) {
  const [open, setOpen] = React.useState(false);
  const [imageData, setImageData] = useState({ image_id: "", image_path: "" });
  const [imageDataCover, setImageDataCover] = useState({
    cover_image_id: "",
    image_path: "",
  });

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
      category_slug:
        category?.category_slug ||
        (category?.title ? generateSlug(category.title) : ""),
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
      category_slug: yup.string().trim().required("Slug is required!"),
    }),
    onSubmit: async (values, action) => {
      const payload = {
        ...values,
        image_id: imageData.image_id,
        cover_image_id: imageDataCover.cover_image_id,
        ...parentCategoryIdSelect,
      };

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
            } else if (status == 500) {
              handleError("Internal server error!");
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
      }, 100);
    }
  }, [open]);

  const DrawerList = (
    <Box
      sx={{
        width: { xs: "100vw", sm: 640 },
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
            <CategoryOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "17px", color: "#0f172a", lineHeight: 1.2 }}>
              {isEdit ? "Update Category" : "Create Category"}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
              Configure hierarchy, media assets, and SEO metadata
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

      {/* Body */}
      <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 7 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e2e8f0",
                  bgcolor: "#f8fafc",
                  borderRadius: "16px",
                  p: 1.5,
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
            <Grid size={{ xs: 12, sm: 5 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #e2e8f0",
                  bgcolor: "#f8fafc",
                  borderRadius: "16px",
                  px: 2,
                  py: 1.5,
                  height: "100%",
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#0f172a" }}>
                  Purpose:
                </Typography>

                <FormControlLabel
                  sx={{
                    mr: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "13.5px",
                      fontWeight: 600,
                      color: "#0f172a",
                    },
                  }}
                  control={
                    <Checkbox
                      size="small"
                      name="is_active_for_buy"
                      checked={values.is_active_for_buy}
                      onChange={handleChange}
                      sx={{
                        color: "#cbd5e1",
                        "&.Mui-checked": { color: "#10b981" },
                      }}
                    />
                  }
                  label="Sale"
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px",
                  p: 2.5,
                  bgcolor: "#ffffff",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
                }}
              >
                <Grid container spacing={2} sx={{ width: "100%" }}>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Category Name"
                      variant="outlined"
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setFieldValue("title", newTitle);
                        setFieldValue("category_slug", generateSlug(newTitle));
                      }}
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
                        const finalVal =
                          val === "" ? "" : Math.max(1, parseInt(val, 10) || 1);
                        setFieldValue("sort_order", finalVal);
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
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Description"
                      variant="outlined"
                      name="page_description"
                      value={values.page_description}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Slug"
                      variant="outlined"
                      name="category_slug"
                      value={values.category_slug}
                      onChange={handleChange}
                    />
                    {touched.category_slug && errors.category_slug && (
                      <Typography sx={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, mt: 0.5 }}>
                        {errors.category_slug}
                      </Typography>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <CategoriesLoadModal
                      handleTargetParentCategoryId={handleTargetParentCategoryId}
                      initialParentId={category?.parent_category_id}
                      initialParentTitle={category?.parent?.title}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 5 }}>
                    <Box
                      sx={{
                        border: "1px solid #e2e8f0",
                        bgcolor: "#f8fafc",
                        borderRadius: "12px",
                        px: 1.5,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Switch
                        name="is_listing_switch_in_buy"
                        checked={values.is_listing_switch_in_buy}
                        onChange={handleChange}
                        sx={modernSwitchSx}
                      />
                      <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}>
                        Show listing switch in buy
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 7 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e2e8f0",
                        bgcolor: "#f8fafc",
                        borderRadius: "12px",
                        px: 2,
                        py: 0.75,
                        height: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "12.5px",
                          color: "#0f172a",
                          textWrap: "nowrap",
                          mr: 1.5,
                        }}
                      >
                        Listing Design:
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
                            control={
                              <Radio
                                size="small"
                                sx={{
                                  color: "#cbd5e1",
                                  "&.Mui-checked": { color: "#0f172a" },
                                }}
                              />
                            }
                            label="Grid View"
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "12.5px",
                                fontWeight: 600,
                              },
                            }}
                          />
                          <FormControlLabel
                            value="2"
                            control={
                              <Radio
                                size="small"
                                sx={{
                                  color: "#cbd5e1",
                                  "&.Mui-checked": { color: "#0f172a" },
                                }}
                              />
                            }
                            label="List View"
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "12.5px",
                                fontWeight: 600,
                              },
                            }}
                          />
                        </RadioGroup>
                        {touched.design_view && errors.design_view && (
                          <Typography sx={{ fontSize: "12px", color: "#ef4444" }}>
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
                          border: "1px solid #e2e8f0",
                          bgcolor: "#f8fafc",
                          borderRadius: "14px",
                          p: 2,
                        }}
                      >
                        <Box sx={{ borderBottom: "1px solid #e2e8f0" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="seo tabs"
                            sx={{
                              minHeight: 38,
                              "& .MuiTab-root": {
                                minHeight: 38,
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: "13px",
                                color: "#64748b",
                                "&.Mui-selected": { color: "#0f172a" },
                              },
                              "& .MuiTabs-indicator": {
                                backgroundColor: "#0f172a",
                                height: 2.5,
                              },
                            }}
                          >
                            <Tab label="Sale SEO Settings" {...a11yProps(0)} />
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                          <Grid container spacing={1.5} sx={{ width: "100%" }}>
                            <Grid size={{ xs: 12 }}>
                              <TextField
                                fullWidth
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
                                rows={3}
                                name="meta_description"
                                value={values.meta_description}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                        </CustomTabPanel>
                      </Box>
                    </Grid>
                  )}

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
                          : category?.id
                            ? "Update Category"
                            : "Create Category"}
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
      {isEdit ? (
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
      ) : (
        <Button
          onClick={toggleDrawer(true)}
          className="custom-secondary-btn-admin-side"
        >
          <AddIcon sx={{ mr: 0.75, fontSize: 18 }} /> Create Category
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
