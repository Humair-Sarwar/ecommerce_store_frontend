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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

export default function CategoryModal() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [value, setValue] = React.useState(0);
  const [parentCategoryIdSelect, setParentCategoryIdSelect] = useState();
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
    initialValues: {
      is_active_for_buy: true,
      name: "",
      sort_order: 1,
      description: "",
      design_switch: false,
      design_view: 1,
      buy_meta_title: "",
      buy_meta_description: "",
      buy_page_description: "",
      categoryImage: null, // <-- file goes here
    },
    validationSchema: yup.object({
      name: yup.string().min(3).max(200).required("Name is required!"),
      sort_order: yup.number().required("Sort order is required!"),
    }),
    onSubmit: async (values, action) => {
      const slug = generateSlug(values.name);
      const formData = new FormData();

      formData.append("business_id", "123");
      formData.append("level", "0");
      formData.append("slug", slug);
      if (parentCategoryIdSelect) {
        formData.append("parent_category_id", parentCategoryIdSelect);
      }
      formData.append("is_active_for_buy", values.is_active_for_buy.toString());
      formData.append("name", values.name);
      formData.append("sort_order", values.sort_order.toString());
      formData.append("description", values.description);
      formData.append("design_switch", values.design_switch.toString());
      formData.append("design_view", values.design_view.toString());
      formData.append("buy_meta_title", values.buy_meta_title);
      formData.append("buy_meta_description", values.buy_meta_description);
      formData.append("buy_page_description", values.buy_page_description);

      if (values.categoryImage instanceof File) {
        formData.append(
          "categoryImage",
          values.categoryImage,
          values.categoryImage.name
        );
      }
      if (values.coverImage instanceof File) {
        formData.append(
          "coverImage",
          values.coverImage,
          values.coverImage.name
        );
      }
      try {
        const res = await createCategoryApi(formData); // must accept multipart/form-data
        if (res.status === 201) {
          handleSuccess("New Category Added Successfully!");
          action.resetForm();
          setOpen(false);
          setParentCategoryIdSelect();
          setImageCategory(null);
          setImageCover(null);
        } else {
          handleError("Internal Server Error!");
        }
      } catch (err) {
        handleError("Upload failed!");
        console.error(err);
      }
    },
  });

  const handleTargetParentCategoryId = (parent_category_id) => {
    setParentCategoryIdSelect(parent_category_id);
  };
  const nameInputRef = React.useRef(null);

  const getCategoryImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageCategory(reader.result);
    };

    setFieldValue("categoryImage", file);
  };
  const getCoverImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageCover(reader.result);
    };

    setFieldValue("coverImage", file);
  };

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
                  name="categoryImage"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={getCategoryImage}
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
              <Box
                component="label"
                sx={{
                  border: "1px dotted black",
                  cursor: "pointer",
                  borderRadius: "5px",
                  position: "relative",
                  ml: 1,
                }}
                className="image-upload-box-target-cover-img"
              >
                <img
                  src={imageCover == null ? "/empty-image.jpg" : imageCover}
                />
                <VisuallyHiddenInput
                  type="file"
                  name="coverImage"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={getCoverImage}
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
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.name && touched.name)}
                    inputRef={nameInputRef} // 👈 this enables auto-focus
                  />

                  {touched.name && errors.name && (
                    <Typography
                      sx={{ fontSize: "12px", color: "red", mt: 0.5 }}
                    >
                      {errors.name}
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
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CategoriesLoadModal
                    handleTargetParentCategoryId={handleTargetParentCategoryId}
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
                      name="design_switch"
                      color="secondary"
                      checked={values.design_switch}
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
                        name="design_view"
                        value={values.design_view}
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
                                name="buy_meta_title"
                                value={values.buy_meta_title}
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
                                name="buy_meta_description"
                                value={values.buy_meta_description}
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
                    disabled={values.is_active_for_buy == false}
                    className={`${values.is_active_for_buy ? "custom-secondary-btn-admin-side" : "custom-disable-btn-target"}`}
                  >
                    Create Category
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
      <Button
        onClick={toggleDrawer(true)}
        className="custom-secondary-btn-admin-side"
      >
        <AddIcon sx={{ mr: 1 }} /> Create Category
      </Button>
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
