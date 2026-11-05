import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TextEditor from "../../../components/TextEditor";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Step2 from "./Step2";
import Steppers from "../../../components/Steper";
import { getBrandsForProductsApi } from "../../../utils/apis/APIs";
import { useFormik } from "formik";
import * as yup from "yup";
import { generateSlug } from "../../../utils/apis/slugGenerate";
import CategoriesLoadModal from "../../../components/CategoriesLoadModal";
import MediaSelectModal from "../../../components/MediaSelectModal";
import { useFetchBrandsPanel } from "../../../hook/vendor/useBrand";
import {
  useCreateProductStep1,
  useFetchProductStep1,
  useUpdateProductStep1,
  useUpdateProductType,
} from "../../../hook/vendor/useProducts";
import { handleError, handleSuccess } from "../../../toast";
import { useNavigate, useParams } from "react-router";
import LoaderSpinner from "../../../components/LoaderSpinner";

const modernInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    fontSize: "13.5px",
    fontWeight: 500,
    color: "#0f172a",
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "#e2e8f0",
    },
    "&:hover": {
      backgroundColor: "#ffffff",
      "& fieldset": {
        borderColor: "#cbd5e1",
      },
    },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(15, 23, 42, 0.06)",
      "& fieldset": {
        borderColor: "#0f172a",
        borderWidth: "1.5px",
      },
    },
    "&.Mui-disabled": {
      backgroundColor: "#f1f5f9",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "13px",
    fontWeight: 500,
    color: "#64748b",
    "&.Mui-focused": {
      color: "#0f172a",
      fontWeight: 600,
    },
  },
};

const modernNumberInputSx = {
  ...modernInputSx,
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
    margin: 0,
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
};

const modernCheckboxSx = {
  color: "#cbd5e1",
  "&.Mui-checked": {
    color: "#0f172a",
  },
  "&.Mui-disabled": {
    color: "#cbd5e1",
  },
};

const sectionTitleBoxSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: 2,
  pb: 1.25,
  borderBottom: "1px solid #f1f5f9",
};

const Step1 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productTitle, setProductTitle] = useState("");
  const [step2, setStep2] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [selectedImagesList, setSelectedImagesList] = useState([]);
  const [categoryIdSelect, setCategoryIdSelect] = useState({
    category_id: null,
  });
  const {
    data: step1Data,
    isLoading: isStep1Loading,
    isError: isStep1Error,
  } = useFetchProductStep1(id);
  const step1DataSet = step1Data?.data;
  const [firstStepData, setFirstStepData] = useState({
    active_for: 1,
    condition: 1,
    title: "",
    sort_order: 1,
    is_web: 1,
    is_pos: 0,
    is_hot: 0,
    category_id: categoryIdSelect?.category_id,
    brand_id: "",
    days: 1,
    hours: 1,
    minutes: 1,
    meta_title: "",
    meta_description: "",
    keywords: "",
    apply_stock_strictly: true,
    get_stock_alert: true,
    description: "",
  });
  const [firstStepErrors, setFirstStepErrors] = useState({
    active_for: "",
    condition: "",
    title: "",
    category_id: "",
    brand_id: "",
    sort_order: "",
  });

  const [secondStepDataTI, setSecondStepDataTI] = useState({
    product_type: 1,
    product_id: "" || id,
  });

  const { data, isLoading, isError } = useFetchBrandsPanel();
  const brands = data?.data || [];

  const createProductStep1 = useCreateProductStep1();
  const updateProductType = useUpdateProductType();
  const updateStep1 = useUpdateProductStep1();

  const isSubmitting = createProductStep1.isPending || updateStep1.isPending;

  const handleUpdateType = (values) => {
    updateProductType.mutate(values, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Product type updated successfully");
      },
      onError: (err) => {
        const status = err?.response?.status;

        if (status === 422) {
          handleError("Validation error");
        } else if (status === 404) {
          handleError("Product not found");
        } else {
          handleError("Something went wrong");
        }
      },
    });
  };

  const validateSteps = () => {
    let newErrors = {};

    if (!firstStepData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (firstStepData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (!firstStepData.category_id) {
      newErrors.category_id = "Please select a category";
    }

    if (!firstStepData.brand_id) {
      newErrors.brand_id = "Please select a brand";
    }

    if (!firstStepData.sort_order) {
      newErrors.sort_order = "Sort order is required!";
    }

    setFirstStepErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleBackStep = () => {
    setStep2(false);
    navigate(`/vendor/products/update/${secondStepDataTI?.product_id}`);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFirstStepData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (firstStepErrors[name]) {
      setFirstStepErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmitFirstStep = () => {
    const isValid = validateSteps();

    if (!isValid) {
      handleError("Please fill all required fields correctly.");
      return;
    }

    const payload = {
      ...firstStepData,
    };

    if (id) {
      updateStep1.mutate(
        { ...payload, id },
        {
          onSuccess: (res) => {
            handleSuccess(res?.message || "Step 1 updated successfully!");
            setStep2(true);
            setFirstStepData({
              active_for: 1,
              condition: 1,
              title: "",
              sort_order: 1,
              is_web: 1,
              is_pos: 0,
              is_hot: 0,
              category_id: categoryIdSelect?.category_id,
              brand_id: "",
              days: 1,
              hours: 1,
              minutes: 1,
              meta_title: "",
              meta_description: "",
              keywords: "",
              apply_stock_strictly: true,
              get_stock_alert: true,
              product_image_ids: [],
              description: "",
            });
          },
          onError: (error) => {
            const status = error?.response?.status;

            if (status === 422) {
              handleError("Validation error!");
            } else if (status === 404) {
              handleError("Product not found!");
            } else {
              handleError(
                error?.response?.data?.message || "Failed to update step 1!",
              );
            }
          },
        },
      );
    } else {
      // API Call
      createProductStep1.mutate(payload, {
        onSuccess: (res) => {
          handleSuccess(res?.message || "Product Step 1 created!");
          handleUpdateType({ product_id: res?.data?.id, type: 1 });
          const idFromBackend = res?.data?.id;

          if (idFromBackend) {
            setSecondStepDataTI((prev) => ({
              ...prev,
              product_id: idFromBackend,
            }));

            handleUpdateType({ product_id: idFromBackend, type: 1 });
          }
          setStep2(true);
          setFirstStepData({
            active_for: 1,
            condition: 1,
            title: "",
            sort_order: 1,
            is_web: 1,
            is_pos: 0,
            is_hot: 0,
            category_id: categoryIdSelect?.category_id,
            brand_id: "",
            days: 1,
            hours: 1,
            minutes: 1,
            meta_title: "",
            meta_description: "",
            keywords: "",
            apply_stock_strictly: true,
            get_stock_alert: true,
            product_image_ids: [],
            description: "",
          });
        },
        onError: (error) => {
          const status = error?.response?.status;
          if (status === 422) {
            const backendErrors = error?.response?.data?.errors;
            if (backendErrors) {
              setFirstStepErrors(backendErrors);
            }
            handleError("Validation error!");
          } else {
            handleError(
              error?.response?.data?.message || "Failed to create product!",
            );
          }
        },
      });
    }
  };
  useEffect(() => {
    if (step1DataSet) {
      setFirstStepData({
        active_for: step1DataSet.active_for || 1,
        condition: step1DataSet.condition || 1,
        title: step1DataSet.title || "",
        sort_order: step1DataSet.sort_order || 1,
        is_web: step1DataSet.is_web ?? 1,
        is_pos: step1DataSet.is_pos ?? 0,
        is_hot: step1DataSet.is_hot ?? 0,
        category_id: step1DataSet.category_id || null,
        brand_id: step1DataSet.brand_id || "",
        days: step1DataSet.days || 0,
        hours: step1DataSet.hours || 0,
        minutes: step1DataSet.minutes || 0,
        meta_title: step1DataSet.meta_title || "",
        meta_description: step1DataSet.meta_description || "",
        keywords: step1DataSet.keywords || "",
        apply_stock_strictly: !!step1DataSet.apply_stock_strictly,
        get_stock_alert: !!step1DataSet.get_stock_alert,
        description: step1DataSet.description || "",
        product_image_ids: step1DataSet.media?.map((img) => img.id) || [],
      });
      if (step1DataSet.media) {
        const formattedImages = step1DataSet.media.map((img) => ({
          image_id: img.id,
          image_path: `${import.meta.env.VITE_BASE_URL}/storage/${img.media_path}`, // Adjust based on your API response
        }));
        setSelectedImagesList(formattedImages);
      }

      setProductTitle(step1DataSet.title);
    }
  }, [step1DataSet]);
  const handleTargetParentCategoryId = (category_id) => {
    setCategoryIdSelect({
      category_id: category_id,
    });

    setFirstStepData((prev) => ({
      ...prev,
      category_id: category_id,
    }));

    if (category_id) {
      setFirstStepErrors((prev) => ({
        ...prev,
        category_id: "",
      }));
    }
  };

  useEffect(() => {
    if (imageData && imageData.image_id) {
      const exists = selectedImagesList.find(
        (img) => img.image_id === imageData.image_id,
      );

      if (!exists) {
        setSelectedImagesList((prev) => [...prev, imageData]);

        setFirstStepData((prev) => ({
          ...prev,
          product_image_ids: [
            ...(prev.product_image_ids || []),
            imageData.image_id,
          ],
        }));
      }
      setImageData(null);
    }
  }, [imageData, selectedImagesList]);

  const handleRemoveImage = (id) => {
    setSelectedImagesList((prev) => prev.filter((img) => img.image_id !== id));

    setFirstStepData((prev) => ({
      ...prev,
      product_image_ids: prev.product_image_ids.filter((imgId) => imgId !== id),
    }));
  };

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
        {/* Modern Page Header */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(15, 23, 42, 0.16)",
              }}
            >
              {id ? (
                <EditIcon sx={{ fontSize: 21 }} />
              ) : (
                <AddIcon sx={{ fontSize: 22 }} />
              )}
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: "18px", md: "22px" },
                    fontWeight: 700,
                    color: "#0f172a",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {id ? "Edit Product" : "Add New Product"}
                </Typography>
                {step2 && productTitle ? (
                  <Box
                    sx={{
                      px: 1.25,
                      py: 0.35,
                      borderRadius: "999px",
                      backgroundColor: "#fff7ed",
                      border: "1px solid #ffedd5",
                      color: "#f97316",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {productTitle}
                  </Box>
                ) : null}
              </Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#64748b",
                  mt: 0.25,
                }}
              >
                {step2
                  ? "Configure product type, pricing, variations, and publishing options"
                  : "Fill in core product information, category, SEO metadata, and media gallery"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stepper Progress Card */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            px: { xs: 2, md: 4 },
            py: 2.25,
            borderRadius: "20px",
            border: "1px solid #eef2f6",
            boxShadow: "0 4px 20px -4px rgba(15, 23, 42, 0.04)",
            mb: 2.5,
          }}
        >
          <Steppers step2={step2} />
        </Box>

        {/* Main Form Surface */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            p: { xs: 2.25, md: 3.5 },
            borderRadius: "24px",
            border: "1px solid #eef2f6",
            boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)",
          }}
        >
          {step2 == false ? (
            isStep1Loading ? (
              <LoaderSpinner />
            ) : (
              <Grid container spacing={2.25}>
                {/* Section 1 Header */}
                <Grid size={{ xs: 12 }}>
                  <Box sx={sectionTitleBoxSx}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#10b981",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0f172a",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Basic Information & Classification
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "12px", color: "#94a3b8" }}>
                      Step 1 of 2
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl
                    sx={{ minWidth: 120, ...modernInputSx }}
                    disabled
                    size="small"
                    fullWidth
                  >
                    <InputLabel id="is-active-for-label" color="secondary">
                      Active For
                    </InputLabel>
                    <Select
                      labelId="is-active-for-label"
                      id="is_active_for"
                      name="active_for"
                      value={firstStepData.active_for}
                      onChange={handleInputChange}
                      label="Active For"
                      color="secondary"
                    >
                      <MenuItem value={1} sx={{ fontSize: "14px" }}>
                        Sale
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontSize: "14px" }}>
                        Trade-in
                      </MenuItem>
                      <MenuItem value={3} sx={{ fontSize: "14px" }}>
                        Repair
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl fullWidth size="small" sx={modernInputSx}>
                    <InputLabel id="product-condition-label" color="secondary">
                      Condition
                    </InputLabel>
                    <Select
                      labelId="product-condition-label"
                      id="product_condition"
                      name="condition"
                      value={firstStepData.condition}
                      onChange={handleInputChange}
                      label="Condition"
                      color="secondary"
                    >
                      <MenuItem value={1} sx={{ fontSize: "14px" }}>
                        Brand New (Completely new, unopened, and unused.)
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontSize: "14px" }}>
                        Refurbished (Professionally restored and tested.)
                      </MenuItem>
                      <MenuItem value={3} sx={{ fontSize: "14px" }}>
                        Like New (Used but looks and works like new.)
                      </MenuItem>
                      <MenuItem value={4} sx={{ fontSize: "14px" }}>
                        Excellent (Minor signs of use but fully functional.)
                      </MenuItem>
                      <MenuItem value={5} sx={{ fontSize: "14px" }}>
                        Good (Noticeable wear but works perfectly.)
                      </MenuItem>
                      <MenuItem value={6} sx={{ fontSize: "14px" }}>
                        Fair (Moderate wear and minor functional issues.)
                      </MenuItem>
                      <MenuItem value={7} sx={{ fontSize: "14px" }}>
                        For Parts / Not Working (Broken or non-functional, sold
                        for parts.)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <TextField
                    id="title"
                    name="title"
                    value={firstStepData.title}
                    onChange={handleInputChange}
                    label="Title"
                    fullWidth
                    size="small"
                    color="secondary"
                    variant="outlined"
                    placeholder="Enter product title"
                    error={Boolean(firstStepErrors.title)}
                    helperText={firstStepErrors.title}
                    sx={modernInputSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    color="secondary"
                    label="Sort Order"
                    variant="outlined"
                    type="number"
                    name="sort_order"
                    value={firstStepData.sort_order}
                    placeholder="Enter product sort order"
                    // Inline fix: Prevent values below 1 and handle empty state
                    onChange={(e) => {
                      const val = e.target.value;
                      const numericVal = parseInt(val, 10);

                      // If user clears the field, allow it; otherwise, force minimum 1
                      const finalValue =
                        val === "" ? "" : Math.max(1, numericVal || 1);

                      // Call your existing handler with the corrected value
                      handleInputChange({
                        target: {
                          name: "sort_order",
                          value: finalValue,
                        },
                      });
                    }}
                    error={Boolean(firstStepErrors.sort_order)}
                    helperText={firstStepErrors.sort_order}
                    // Browser hint to prevent decrementing below 1
                    inputProps={{ min: 1 }}
                    sx={modernNumberInputSx}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                    md: firstStepData.is_web || firstStepData.is_pos ? 4 : 12,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#f8fafc",
                      borderRadius: "12px",
                      padding: "2px 16px",
                      minHeight: "40px",
                      height: "100%",
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        mr: 4,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: "#0f172a",
                        },
                      }}
                      control={
                        <Checkbox
                          size="small"
                          color="secondary"
                          name="is_web"
                          checked={firstStepData.is_web}
                          onChange={handleInputChange}
                          type="checkbox"
                          sx={modernCheckboxSx}
                        />
                      }
                      label="Web"
                    />
                    <FormControlLabel
                      sx={{
                        mr: 4,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: "#64748b",
                        },
                      }}
                      disabled
                      control={
                        <Checkbox
                          size="small"
                          color="secondary"
                          name="is_pos"
                          checked={Boolean(firstStepData.is_pos)}
                          onChange={handleInputChange}
                          type="checkbox"
                          sx={modernCheckboxSx}
                        />
                      }
                      label="POS"
                    />
                    {firstStepData.is_pos ? (
                      <FormControlLabel
                        sx={{
                          mr: 4,
                          "& .MuiFormControlLabel-label": {
                            fontSize: "13.5px",
                            fontWeight: 600,
                            color: "#f97316",
                          },
                        }}
                        control={
                          <Checkbox
                            size="small"
                            color="secondary"
                            name="is_hot"
                            checked={Boolean(firstStepData.is_hot)}
                            onChange={handleInputChange}
                            type="checkbox"
                            sx={{
                              color: "#cbd5e1",
                              "&.Mui-checked": { color: "#f97316" },
                            }}
                          />
                        }
                        label="Hot"
                      />
                    ) : (
                      ""
                    )}
                  </Box>
                </Grid>
                {firstStepData.is_web || firstStepData.is_pos ? (
                  <>
                    <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                      <CategoriesLoadModal
                        handleTargetParentCategoryId={
                          handleTargetParentCategoryId
                        }
                        initialParentId={step1DataSet?.category_id}
                        initialParentTitle={step1DataSet?.category?.title}
                        categoryPMdl={true}
                      />
                      {firstStepErrors.category_id && (
                        <Typography
                          sx={{
                            color: "#ef4444",
                            fontSize: "12px",
                            fontWeight: 500,
                            mt: 0.75,
                            ml: 1.5,
                          }}
                        >
                          {firstStepErrors.category_id}
                        </Typography>
                      )}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Autocomplete
                        disablePortal
                        size="small"
                        fullWidth
                        id="brand"
                        options={brands}
                        getOptionLabel={(option) => option.title || ""}
                        value={
                          brands.find((b) => b.id === firstStepData.brand_id) ||
                          null
                        }
                        onChange={(event, newValue) => {
                          setFirstStepData((prev) => ({
                            ...prev,
                            brand_id: newValue ? newValue.id : "",
                          }));

                          if (newValue && firstStepErrors.brand_id) {
                            setFirstStepErrors((prev) => ({
                              ...prev,
                              brand_id: "",
                            }));
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Brands"
                            color="secondary"
                            error={Boolean(firstStepErrors.brand_id)}
                            helperText={firstStepErrors.brand_id}
                            sx={modernInputSx}
                          />
                        )}
                        loading={isLoading}
                      />
                    </Grid>
                  </>
                ) : (
                  ""
                )}
                {firstStepData.is_web ? (
                  <>
                    <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
                      <Box sx={sectionTitleBoxSx}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: "#f97316",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#0f172a",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            Fulfillment Time & SEO Metadata
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <TextField
                        id="days"
                        name="days"
                        label="Days"
                        fullWidth
                        size="small"
                        color="secondary"
                        variant="outlined"
                        type="number"
                        value={firstStepData.days}
                        // Inline fix: Allow 0 but prevent less than 0
                        onChange={(e) => {
                          const val = e.target.value;
                          // Allow empty string for clearing, otherwise force minimum 0
                          const finalValue =
                            val === ""
                              ? ""
                              : Math.max(0, parseInt(val, 10) || 0);

                          handleInputChange({
                            target: {
                              name: "days",
                              value: finalValue,
                            },
                          });
                        }}
                        error={Boolean(firstStepErrors.days)}
                        helperText={firstStepErrors.days}
                        // Browser-level hint to set minimum to 0
                        inputProps={{ min: 0 }}
                        sx={modernNumberInputSx}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <TextField
                        id="hours"
                        name="hours"
                        label="Hours"
                        fullWidth
                        size="small"
                        color="secondary"
                        variant="outlined"
                        type="number"
                        value={firstStepData.hours}
                        // Inline logic: Clamp values between 0 and 23
                        onChange={(e) => {
                          const val = e.target.value;
                          let numericVal = parseInt(val, 10);

                          let finalValue;
                          if (val === "") {
                            finalValue = ""; // Allow clearing the field
                          } else {
                            // Logic: If < 0, set to 0. If > 23, set to 23.
                            finalValue = Math.min(
                              23,
                              Math.max(0, numericVal || 0),
                            );
                          }

                          handleInputChange({
                            target: {
                              name: "hours",
                              value: finalValue,
                            },
                          });
                        }}
                        error={Boolean(firstStepErrors.hours)}
                        helperText={firstStepErrors.hours}
                        inputProps={{ min: 0, max: 23 }}
                        sx={modernNumberInputSx}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <TextField
                        id="minutes"
                        name="minutes"
                        label="Minutes"
                        fullWidth
                        size="small"
                        color="secondary"
                        variant="outlined"
                        type="number"
                        value={firstStepData.minutes}
                        // Inline logic: Clamp values between 0 and 59
                        onChange={(e) => {
                          const val = e.target.value;
                          let numericVal = parseInt(val, 10);

                          let finalValue;
                          if (val === "") {
                            finalValue = ""; // Allow clearing the field so user can re-type
                          } else {
                            // Logic: Ensure value is never less than 0 and never more than 59
                            finalValue = Math.min(
                              59,
                              Math.max(0, numericVal || 0),
                            );
                          }

                          handleInputChange({
                            target: {
                              name: "minutes",
                              value: finalValue,
                            },
                          });
                        }}
                        error={Boolean(firstStepErrors.minutes)}
                        helperText={firstStepErrors.minutes}
                        inputProps={{ min: 0, max: 59 }}
                        sx={modernNumberInputSx}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                      <TextField
                        id="meta_title"
                        name="meta_title"
                        value={firstStepData.meta_title}
                        onChange={handleInputChange}
                        label="Meta Title"
                        fullWidth
                        size="small"
                        color="secondary"
                        variant="outlined"
                        placeholder="Write meta title..."
                        sx={modernInputSx}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                      <TextField
                        id="meta_description"
                        name="meta_description"
                        value={firstStepData.meta_description}
                        onChange={handleInputChange}
                        label="Meta Description"
                        fullWidth
                        size="small"
                        color="secondary"
                        variant="outlined"
                        placeholder="Write meta description..."
                        sx={modernInputSx}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                      <TextField
                        id="keywords"
                        name="keywords"
                        value={firstStepData.keywords}
                        onChange={handleInputChange}
                        label="Keywords"
                        fullWidth
                        size="small"
                        color="secondary"
                        variant="outlined"
                        placeholder="Write keywords..."
                        sx={modernInputSx}
                      />
                    </Grid>
                  </>
                ) : (
                  ""
                )}
                <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#f8fafc",
                      borderRadius: "12px",
                      padding: "6px 18px",
                      height: "100%",
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        mr: 5,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: "#0f172a",
                        },
                      }}
                      control={
                        <Checkbox
                          size="small"
                          color="secondary"
                          name="apply_stock_strictly"
                          checked={firstStepData.apply_stock_strictly}
                          onChange={handleInputChange}
                          type="checkbox"
                          sx={modernCheckboxSx}
                        />
                      }
                      label="Apply Stock Strictly"
                    />
                    <FormControlLabel
                      sx={{
                        mr: 5,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: "#64748b",
                        },
                      }}
                      disabled
                      control={
                        <Checkbox
                          size="small"
                          color="secondary"
                          name="get_stock_alert"
                          checked={firstStepData.get_stock_alert}
                          onChange={handleInputChange}
                          type="checkbox"
                          sx={modernCheckboxSx}
                        />
                      }
                      label="Get Stock Alert"
                    />
                  </Box>
                </Grid>

                {/* Product Media Section */}
                <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1 }}>
                  <Box sx={sectionTitleBoxSx}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#0f172a",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0f172a",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Product Media Gallery
                      </Typography>
                    </Box>
                    {selectedImagesList?.length > 0 && (
                      <Box
                        sx={{
                          px: 1.25,
                          py: 0.25,
                          borderRadius: "999px",
                          backgroundColor: "#ecfdf5",
                          color: "#059669",
                          fontSize: "11.5px",
                          fontWeight: 700,
                        }}
                      >
                        {selectedImagesList.length} Selected
                      </Box>
                    )}
                  </Box>
                  <Box
                    component="label"
                    sx={{
                      border: "2px dashed #cbd5e1",
                      borderRadius: "18px",
                      backgroundColor: "#f8fafc",
                      textAlign: "center",
                      py: 4.5,
                      px: 2,
                      display: "block",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        backgroundColor: "#f1f5f9",
                        borderColor: "#0f172a",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "14px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0f172a",
                        mb: 1.25,
                        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
                      }}
                    >
                      <InsertPhotoIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Typography
                      sx={{
                        color: "#0f172a",
                        fontWeight: 700,
                        fontSize: "14.5px",
                      }}
                    >
                      Select Product Images Here!
                    </Typography>

                    {/* Validation Info Text */}
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#64748b",
                        mt: 0.5,
                        mb: 2.25,
                      }}
                    >
                      JPG, JPEG, PNG, WEBP (Max: 2MB per file)
                    </Typography>

                    <MediaSelectModal
                      setImageData={setImageData}
                      imageData={imageData}
                      isProduct={true}
                    />
                  </Box>
                  <Box sx={{ mt: selectedImagesList?.length > 0 ? 2.5 : 0 }}>
                    <Grid container spacing={1.75}>
                      {selectedImagesList.map((item, index) => (
                        <Grid item key={item.image_id || index}>
                          <Box
                            sx={{
                              position: "relative",
                              width: "88px",
                              height: "88px",
                              border: "1px solid #e2e8f0",
                              borderRadius: "14px",
                              backgroundColor: "#f8fafc",
                              p: 0.5,
                              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                            }}
                          >
                            <img
                              src={item.image_path}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "10px",
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveImage(item.image_id)}
                              sx={{
                                position: "absolute",
                                top: -7,
                                right: -7,
                                bgcolor: "#ef4444",
                                color: "white",
                                width: 22,
                                height: 22,
                                boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
                                "&:hover": { bgcolor: "#dc2626" },
                              }}
                            >
                              <CloseIcon sx={{ fontSize: "13px" }} />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>

                {/* Product Description Section */}
                <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1 }}>
                  <Box
                    component={"h3"}
                    sx={{
                      fontSize: "13.5px",
                      fontWeight: 700,
                      color: "#0f172a",
                      mb: 1.25,
                      mt: 1,
                    }}
                  >
                    Product Description:
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <TextEditor
                      value={firstStepData.description}
                      onChange={(content) => {
                        const baseContent =
                          content === "<p><br></p>" ? "" : content;

                        setFirstStepData((prev) => ({
                          ...prev,
                          description: baseContent,
                        }));

                        if (firstStepErrors.description) {
                          setFirstStepErrors((prev) => ({
                            ...prev,
                            description: "",
                          }));
                        }
                      }}
                    />
                  </Box>
                </Grid>

                {/* Step 1 Submit Footer */}
                <Grid
                  size={{ xs: 12, sm: 12, md: 12 }}
                  sx={{
                    textAlign: "end",
                    mt: 2,
                    pt: 2.5,
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  <Button
                    className="custom-secondary-btn-admin-side"
                    onClick={handleSubmitFirstStep}
                    disabled={
                      isSubmitting ||
                      (!firstStepData.is_web && !firstStepData.is_pos)
                    }
                    sx={{
                      backgroundColor: "#0f172a !important",
                      backgroundImage: "none !important",
                      color: "#ffffff !important",
                      borderRadius: "999px !important",
                      px: "28px !important",
                      py: "10px !important",
                      fontSize: "13.5px !important",
                      fontWeight: "600 !important",
                      textTransform: "none !important",
                      boxShadow:
                        "0 6px 16px -3px rgba(15, 23, 42, 0.25) !important",
                      transition: "all 0.2s ease !important",
                      "&:hover": {
                        backgroundColor: "#1e293b !important",
                        transform: "translateY(-1px)",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#e2e8f0 !important",
                        color: "#94a3b8 !important",
                        boxShadow: "none !important",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress
                          size={18}
                          color="inherit"
                          sx={{ mr: 1 }}
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowForwardIcon sx={{ mr: 1, fontSize: 18 }} />
                        Next
                      </>
                    )}
                  </Button>
                </Grid>
              </Grid>
            )
          ) : (
            <Step2
              handleBackStep={handleBackStep}
              secondStepDataTI={secondStepDataTI}
              handleUpdateType={handleUpdateType}
              setSecondStepDataTI={setSecondStepDataTI}
              productId={secondStepDataTI?.product_id}
              productTitle={productTitle}
              setProductTitle={setProductTitle}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Step1;
