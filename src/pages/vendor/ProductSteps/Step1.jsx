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
        days: step1DataSet.days || 1,
        hours: step1DataSet.hours || 1,
        minutes: step1DataSet.minutes || 1,
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
        <Box
          component={"h2"}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "17px",
            mb: 3,
          }}
        >
          {" "}
          {id ? (
            <EditIcon sx={{ mr: 1, fontSize: "17px" }} color="secondary" />
          ) : (
            <AddIcon sx={{ mr: 1, fontSize: "17px" }} color="secondary" />
          )}
          {id ? "Edit" : "Add"} Product{" "}
          {step2 && productTitle ? `(${productTitle})` : ""}
        </Box>
        <Steppers step2={step2} />

        <Box
          sx={{
            backgroundColor: "white",
            p: 3,
            borderRadius: "10px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            mt: 2,
          }}
        >
          {step2 == false ? (
            isStep1Loading ? (
              <LoaderSpinner />
            ) : (
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl
                    sx={{ minWidth: 120 }}
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
                  <FormControl fullWidth size="small">
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
                    onChange={handleInputChange}
                    error={Boolean(firstStepErrors.sort_order)}
                    helperText={firstStepErrors.sort_order}
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
                      border: "1px solid rgb(197, 196, 196)",
                      borderRadius: "10px",
                      padding: "2px 15px",
                      height: "100%",
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        mr: 5,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "14px",
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
                        />
                      }
                      label="Web"
                    />
                    <FormControlLabel
                      sx={{
                        mr: 5,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "14px",
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
                        />
                      }
                      label="POS"
                    />
                    {firstStepData.is_pos ? (
                      <FormControlLabel
                        sx={{
                          mr: 5,
                          "& .MuiFormControlLabel-label": {
                            fontSize: "14px",
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
                            color: "#d32f2f", // MUI error red color
                            fontSize: "12px",
                            mt: 1,
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
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <TextField
                        id="days"
                        name="days"
                        label="Days"
                        value={firstStepData.days}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                        color="secondary"
                        variant="outlined"
                        type="number"
                        error={Boolean(firstStepErrors.days)}
                        helperText={firstStepErrors.days}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <TextField
                        id="hours"
                        name="hours"
                        label="Hours"
                        value={firstStepData.hours}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                        color="secondary"
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 0, max: 23 }}
                        error={Boolean(firstStepErrors.hours)}
                        helperText={firstStepErrors.hours}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <TextField
                        id="minutes"
                        name="minutes"
                        label="Minutes"
                        value={firstStepData.minutes}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                        color="secondary"
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 0, max: 59 }}
                        error={Boolean(firstStepErrors.minutes)}
                        helperText={firstStepErrors.minutes}
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
                      border: "1px solid rgb(197, 196, 196)",
                      borderRadius: "10px",
                      padding: "2px 15px",
                      height: "100%",
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        mr: 5,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "14px",
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
                        />
                      }
                      label="Apply Stock Strictly"
                    />
                    <FormControlLabel
                      sx={{
                        mr: 5,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "14px",
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
                        />
                      }
                      label="Get Stock Alert"
                    />
                    {/* <FormControlLabel
                    sx={{
                      mr: 5,
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                      },
                    }}
                    control={
                      <Checkbox
                        size="small"
                        color="secondary"
                        name="is_active_for_buy"
                        checked={true}
                        // onChange={handleChange}
                      />
                    }
                    label="Offer Allowed"
                  /> */}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                  <Box
                    component="label"
                    sx={{
                      border: "2px dashed #e0e4f0",
                      borderRadius: "12px",
                      backgroundColor: "#f8faff",
                      textAlign: "center",
                      py: 4,
                      // cursor: "pointer",
                      display: "block",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#f0f4ff",
                        borderColor: "#cbd2e1",
                      },
                    }}
                  >
                    <Typography sx={{ color: "#5f6368", fontWeight: 600 }}>
                      Select Product Images Here!
                    </Typography>

                    {/* Validation Info Text */}
                    <Typography
                      sx={{ fontSize: "11px", color: "#888", mt: 0.5, mb: 2 }}
                    >
                      JPG, JPEG, PNG, WEBP (Max: 2MB per file)
                    </Typography>

                    <MediaSelectModal
                      setImageData={setImageData}
                      imageData={imageData}
                      isProduct={true}
                    />
                  </Box>
                  <Box sx={{ mt: selectedImagesList?.length > 0 ? 3 : 0 }}>
                    <Grid container spacing={1.5}>
                      {selectedImagesList.map((item, index) => (
                        <Grid item key={item.image_id || index}>
                          <Box
                            sx={{
                              position: "relative",
                              width: "80px",
                              height: "80px",
                              border: "1px solid #eee",
                              borderRadius: "8px",
                              backgroundColor: "#f8faff",
                            }}
                          >
                            <img
                              src={item.image_path}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveImage(item.image_id)}
                              sx={{
                                position: "absolute",
                                top: -6,
                                right: -6,
                                bgcolor: "#d32f2f",
                                color: "white",
                                width: 18,
                                height: 18,
                                "&:hover": { bgcolor: "#b71c1c" },
                              }}
                            >
                              <CloseIcon sx={{ fontSize: "12px" }} />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                  <Box component={"h3"} sx={{ fontSize: "12px", mb: 1, mt: 2 }}>
                    Product Description:
                  </Box>
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
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 12, md: 12 }}
                  sx={{ textAlign: "end", mt: 1 }}
                >
                  <Button
                    className="custom-secondary-btn-admin-side"
                    onClick={handleSubmitFirstStep}
                    disabled={
                      isSubmitting ||
                      (!firstStepData.is_web && !firstStepData.is_pos)
                    }
                    sx={{
                      "&.Mui-disabled": {
                        backgroundColor: "#e0e0e0 !important",
                        color: "#9e9e9e !important",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress
                          size={20}
                          color="inherit"
                          sx={{ mr: 1 }}
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowForwardIcon sx={{ mr: 1 }} />
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
