import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  alpha,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Tooltip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { useFormik } from "formik";
import TextEditor from "./TextEditor";
import { fetchCategoriesPanel } from "../hook/vendor/useCategories";
import { useCreateAttribute, useUpdateAttribute } from "../hook/vendor/useAttributesTerms";
import { handleError, handleSuccess } from "../toast";

export default function CreateUpdateAttributeModal({
  title_heading,
  attribute,
  editAtt,
}) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);
  const createAttribute = useCreateAttribute();
  const updateAttribute = useUpdateAttribute();
  const isLoading =
    createAttribute.isPending || updateAttribute.isPending;
  const { data } = fetchCategoriesPanel("");
  const categoriesList = data?.data || [];

  // --- 1. Helper: Saari nested IDs nikaalne ke liye ---
  const getAllCategoryIds = (items) => {
    let ids = [];
    items.forEach((item) => {
      ids.push(item.id);
      if (item.children && item.children.length > 0) {
        ids = [...ids, ...getAllCategoryIds(item.children)];
      }
    });
    return ids;
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: attribute?.title || "",
      sub_title: attribute?.sub_title || "",
      category_ids: attribute?.categories 
    ? attribute.categories.map((cat) => cat.id) 
    : [],
      description: attribute?.description || "",
      design: attribute?.design || 1,
      is_active_for_buy: attribute
        ? Number(attribute.is_active_for_buy) === 1
        : true,
    },
    validationSchema: yup.object({
      title: yup.string().min(3).max(200).required("Title is required!").trim(),
    }),
    onSubmit: async (values, actions) => {
      if (!values.category_ids || values.category_ids.length === 0) {
        handleError("Please select category!");
        return;
      }

      if(attribute?.id){
        updateAttribute.mutate({...values, id: attribute?.id}, {
        onSuccess: (res) => {
            actions.resetForm();
            setOpen(false);
            handleSuccess(res?.message || "Attribute updated successfully!");
        },
        onError: (error) => {
            const status = error?.response?.status;

            if (status === 422) {
            handleError("Validation Error!");
            } else if (status === 404) {
            handleError("Attribute not found!");
            } else {
            handleError(
                error?.response?.data?.message || "Failed to update attribute!"
            );
            }
        },
        });
      }else{
        createAttribute.mutate(values, {
        onSuccess: (res) => {
          actions.resetForm();
          setOpen(false);
          handleSuccess("Attribute Created!");


        },
        onError: (error) => {
          handleError(error?.response?.data?.message || "Error occurred");
        },
      });
      }
    },
  });

  // --- 2. Select All Functionality ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = getAllCategoryIds(categoriesList);
      setFieldValue("category_ids", allIds);
    } else {
      setFieldValue("category_ids", []);
    }
  };

  // --- 3. Recursive Tree Structure ---
  const renderCategoryTree = (nodes, level = 0) => {
    return nodes.map((node) => (
      <Box key={node.id} sx={{ ml: level > 0 ? 3 : 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", py: 0.2 }}>
          {level > 0 && (
            <SubdirectoryArrowRightIcon
              sx={{ color: "#878787", fontSize: 16 }}
            />
          )}
          <FormControlLabel
            sx={{
              ml: level > 0 ? 0.5 : 1,
              "& .MuiFormControlLabel-label": {
                fontSize: level === 0 ? "14px" : "14px",
                fontWeight: level === 0 ? 500 : 500,
              },
            }}
            control={
              <Checkbox
                size="small"
                color="secondary"
                name="category_ids"
                value={node.id}
                checked={values.category_ids.includes(node.id)}
                onChange={handleChange}
                sx={{ p: 0.5 }}
              />
            }
            label={node.title}
          />
        </Box>
        {node.children && node.children.length > 0 && (
          <Box>{renderCategoryTree(node.children, level + 1)}</Box>
        )}
      </Box>
    ));
  };

  const nameInputRef = React.useRef(null);
  

  const Drawerattribute = (
    <Box sx={{ width: 630, p: 2 }} className="inner-modal-search-view-set">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: "600" }}>
          {title_heading} Attribute
        </Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={toggleDrawer(false)} />
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
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    color="secondary"
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.title && touched.title)}
                    inputRef={nameInputRef}
                  />
                  {touched.title && errors.title && (
                    <Typography
                      sx={{ fontSize: "12px", color: "red", mt: 0.5 }}
                    >
                      {errors.title}
                    </Typography>
                  )}
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    color="secondary"
                    label="Sub Title"
                    name="sub_title"
                    value={values.sub_title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box component={"h3"} sx={{ fontSize: "12px", mb: 1, mt: 1 }}>
                    Attribute Description:
                  </Box>
                  <TextEditor
                    value={values.description}
                    onChange={(content) => {
                      const baseContent =
                        content === "<p><br></p>" ? "" : content;
                      setFieldValue("description", baseContent);
                    }}
                  />
                </Grid>
                <Box sx={{ textAlign: "end", width: "100%" }}>
                  {values.is_active_for_buy && (
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
                      : attribute?.id
                        ? "Update Attribute"
                        : "Create Attribute"}
                    </Button>
                  )}
                </Box>
              </Grid>
            </Box>

            {/* Categories Section with Select All */}
            <Box>
              <Grid container spacing={1} sx={{ width: "100%", mt: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid #eee",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        px: 2,
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#d5d5d5",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                        Categories
                      </Typography>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            color="secondary"
                            onChange={handleSelectAll}
                            checked={
                              categoriesList.length > 0 &&
                              values.category_ids.length ===
                                getAllCategoryIds(categoriesList).length
                            }
                            sx={{
                              pr: 1,
                              color: "default",
                              "&.Mui-checked": {
                                color: "#38a43d",
                              },
                            }}
                          />
                        }
                        label="Select All"
                        sx={{
                          mr: 0,
                          "& .MuiFormControlLabel-label": {
                            fontSize: "14px",
                            fontWeight: 500,
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ p: 1, maxHeight: "450px", overflowY: "auto" }}>
                      {categoriesList.length > 0 ? (
                        renderCategoryTree(categoriesList)
                      ) : (
                        <Typography
                          sx={{ p: 2, textAlign: "center", fontSize: "12px" }}
                        >
                          No Categories Found
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid #eee",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        px: 2,
                        py: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#d5d5d5",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                        Design
                      </Typography>
                    </Box>

                    <FormControl sx={{ px: 2, py: 1 }}>
                      <RadioGroup
                        row
                        value={values.design}
                        name="design"
                        onChange={(event) => {
                          setFieldValue("design", Number(event.target.value));
                        }}
                        sx={{ gap: 3 }}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio size="small" color="secondary" />}
                          label="Button"
                          sx={{
                            mr: 0,
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              fontWeight: 500,
                            },
                          }}
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio size="small" color="secondary" />}
                          label="Tabs"
                          sx={{
                            mr: 0,
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              fontWeight: 500,
                            },
                          }}
                        />
                        <FormControlLabel
                          value={3}
                          control={<Radio size="small" color="secondary" />}
                          label="Radio"
                          sx={{
                            mr: 0,
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid #eee",
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        px: 2,
                        py: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#d5d5d5",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                        Purpose
                      </Typography>
                    </Box>

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
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );

  return (
    <>
      {editAtt ? (
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
          variant="contained"
          color="secondary"
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
          Create Attribute
        </Button>
      )}

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ zIndex: "6000" }}
      >
        {Drawerattribute}
      </Drawer>
    </>
  );
}
