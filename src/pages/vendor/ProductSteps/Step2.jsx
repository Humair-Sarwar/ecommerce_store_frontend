import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SyncIcon from "@mui/icons-material/Sync";
import PhotoIcon from "@mui/icons-material/Photo";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DraftsIcon from "@mui/icons-material/Drafts";
import PublishIcon from "@mui/icons-material/Publish";
import TextEditor from "../../../components/TextEditor";
import SaveIcon from "@mui/icons-material/Save";
import MultipleSelectChip from "../../../components/MultiSelectChip";
import {
  fetchWarrantiesPanel,
  useClearTermImage,
  useCreateProductStep2,
  useDeleteProductAttribute,
  useDeleteProductTerm,
  useFetchProductAttributesById,
  useFetchProductSimpleStep2,
  useFetchProductTerms,
  useFetchProductTypeById,
  useFetchProductVariations,
  useFetchSelectedProductAttributes,
  useGenerateVariations,
  useRemoveTermAndVariations,
  useSaveProductAttributeTerms,
  useSaveTermImage,
  useSyncTermImageToVariations,
  useUpdateAttributeSortOrder,
  useUpdateVariation,
} from "../../../hook/vendor/useProducts";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router";
import { handleError, handleSuccess } from "../../../toast";
import LoaderSpinner from "../../../components/LoaderSpinner";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import MediaSelectModal from "../../../components/MediaSelectModal";

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

const Step2 = ({
  handleBackStep,
  secondStepDataTI,
  setSecondStepDataTI,
  handleUpdateType,
  productId,
  setProductTitle,
  productTitle,
}) => {
  const [page, setPage] = useState(1);
  const [sortOrders, setSortOrders] = useState({});
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isPublishing, setIsPublishing] = useState(null);
  const [selectedTerms, setSelectedTerms] = React.useState([]);
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);

  const {
    data: panelWarranties,
    isLoading: panelIsLoading,
    isError: panelIsError,
  } = fetchWarrantiesPanel();
  const warrantiesPolicy = panelWarranties?.data || [];

  const validateFields = () => {
    let tempErrors = {};
    const { product_sku, regular_price, sale_price } = simpleProductStep2Data;

    // 1. SKU Validation
    if (!product_sku?.trim()) {
      tempErrors.product_sku = "SKU is required";
    }

    // 2. Regular Price Validation
    if (
      regular_price === "" ||
      regular_price === null ||
      regular_price === undefined
    ) {
      tempErrors.regular_price = "Regular price is required";
    } else if (Number(regular_price) <= 0) {
      tempErrors.regular_price = "Must be greater than 0";
    }

    // 3. Sale Price Validation
    if (sale_price === "" || sale_price === null || sale_price === undefined) {
      tempErrors.sale_price = "Sale price is required";
    } else if (Number(sale_price) <= 0) {
      tempErrors.sale_price = "Must be greater than 0";
    }
    // 4. Sale Price <= Regular Price Logic
    else if (Number(sale_price) > Number(regular_price)) {
      tempErrors.sale_price =
        "Sale price must be less or equal to regular price";
    }

    setErrors(tempErrors);
    return Object?.keys(tempErrors)?.length === 0;
  };
  const { data, isLoading, isError } = useFetchProductSimpleStep2(productId, {
    enabled: !!productId && secondStepDataTI?.product_type === 1,
  });
  const product = data?.data;
  const createStep2 = useCreateProductStep2();
  const loadingBtn = createStep2.isPending;

  const {
    data: productTypeFetch,
    isLoading: productTypeLoading,
    isError: productTypeError,
  } = useFetchProductTypeById(productId);
  const productTypeF = productTypeFetch?.data;

  const { data: selectedTermsAttData, isLoading: selectedTermsAttDataLoading } =
    useFetchSelectedProductAttributes(productId, {
      enabled: !!productId && productTypeF?.product_type === 2,
    });

  const selectedAttributesDataFetchShow = selectedTermsAttData?.data;
  useEffect(() => {
    if (productTypeF?.product_type) {
      setSecondStepDataTI((prev) => ({
        ...prev,
        product_type: productTypeF.product_type,
      }));
    }
    if (product && productTypeF?.product_type === 1) {
      setSimpleProductStep2Data({
        product_sku: product.product_sku || "",
        product_status_stock: product.product_status_stock || 1,
        min_stock_alert: product.min_stock_alert || 1,
        regular_price: product.regular_price || 0,
        sale_price: product.sale_price || 0,
        is_on_sale: product.is_on_sale || 0,
        release_year: product.release_year || 0,
        network: product.network || 0,
        SIM: product.SIM || 0,
        carrier_option: product.carrier_option || 0,
      });
      setProductTitle(product.title);
    }
  }, [product, productTypeF]);
  const [simpleProductStep2Data, setSimpleProductStep2Data] = useState({
    product_sku: "",
    product_status_stock: 1,
    min_stock_alert: 1,
    regular_price: 0,
    sale_price: 0,
    is_on_sale: 0,
    release_year: 0,
    network: 0,
    SIM: 0,
    carrier_option: 0,
  });
  const handleChange = (event) => {
    setSecondStepDataTI((prev) => ({
      ...prev,
      product_type: event.target.value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? (checked ? 1 : 0) : value;

    setSimpleProductStep2Data((prev) => {
      const newState = {
        ...prev,
        [name]: val,
      };

      if (name === "regular_price") {
        newState.sale_price = val;
      }

      return newState;
    });
  };

  const handleSubmitStep2 = (publish, type) => {
    if (type == 1) {
      if (!validateFields()) {
        handleError("Please fix the errors in the form.");
        return;
      }
      setIsPublishing(publish);
      const payload = {
        id: productId, // 👈 required
        ...simpleProductStep2Data,
        product_type: secondStepDataTI?.product_type,
        is_published: publish,
      };

      createStep2.mutate(payload, {
        onSuccess: (res) => {
          if (publish == 1) {
            handleSuccess("Product Published successfully!");
          } else {
            handleSuccess("Product Draft successfully!");
          }

          setTimeout(() => {
            navigate("/vendor/products", { replace: true });
          }, 100);
        },
        onError: (error) => {
          const apiErrors = error?.response?.data?.error;
          const message = error?.response?.data?.message;
          setIsPublishing(null);
          if (apiErrors) {
            if (apiErrors.product_sku) {
              handleError(apiErrors.product_sku[0]);

              setErrors((prev) => ({
                ...prev,
                product_sku: apiErrors.product_sku[0],
              }));
            } else {
              handleError(message || "Validation Error!");
            }
          } else {
            handleError("Something went wrong on the server.");
          }
        },
      });
    }
    if (type == 2) {
      setIsPublishing(publish);
      const payload = {
        id: productId,
        product_type: secondStepDataTI?.product_type,
        is_published: publish,
      };

      createStep2.mutate(payload, {
        onSuccess: (res) => {
          if (publish == 1) {
            handleSuccess("Product Published successfully!");
          } else {
            handleSuccess("Product Draft successfully!");
          }

          setTimeout(() => {
            navigate("/vendor/products", { replace: true });
          }, 100);
        },
        onError: (error) => {
          const apiErrors = error?.response?.data?.error;
          const message = error?.response?.data?.message;
          setIsPublishing(null);
          if (apiErrors) {
            if (apiErrors.product_sku) {
              handleError(apiErrors.product_sku[0]);

              setErrors((prev) => ({
                ...prev,
                product_sku: apiErrors.product_sku[0],
              }));
            } else {
              handleError(message || "Validation Error!");
            }
          } else {
            handleError("Something went wrong on the server.");
          }
        },
      });
    }
  };

  const {
    data: fetchProductAttributes,
    isLoading: loadingProductAttributes,
    isError: errorProductAttributes,
  } = useFetchProductAttributesById(secondStepDataTI?.product_id, {
    enabled:
      !!secondStepDataTI?.product_id &&
      Number(productTypeF?.product_type) === 2,
  });

  const attributesList = fetchProductAttributes?.data || [];

  const { data: fetchProductTerms, isLoading: loadingProductTerms } =
    useFetchProductTerms(selectedAttributeId, {
      enabled: !!selectedAttributeId,
    });

  const termsList = fetchProductTerms?.data;

  const handleAttributeChange = (event, newValue, reason) => {
    if (reason === "clear" || !newValue) {
      setSelectedAttributeId(null);
      setSelectedTerms([]);
    } else {
      setSelectedAttributeId(newValue.id);
      setSelectedTerms([]);
    }
  };

  const saveTerms = useSaveProductAttributeTerms();

  const handleSaveAttTerms = () => {
    const payload = {
      product_id: productId,
      attribute_id: selectedAttributeId,
      term_ids: selectedTerms, // 👈 build this from UI
    };

    saveTerms.mutate(payload, {
      onSuccess: () => {
        handleSuccess("Attributes & Terms saved successfully!");
        setSelectedTerms([]);
        setSelectedAttributeId(null);
      },
      onError: (err) => {
        handleError(err?.response?.data?.message || "Failed to save terms");
      },
    });
  };

  const deleteAttrBefGA = useDeleteProductAttribute();
  const handleDeleteAttrBefGA = (attrId) => {
    const payload = {
      product_id: productId,
      attribute_id: attrId,
    };

    deleteAttrBefGA.mutate(payload, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Attribute deleted successfully!");
      },
      onError: (err) => {
        handleError(
          err?.response?.data?.message || "Failed to delete attribute!",
        );
      },
    });
  };

  const deleteTerm = useDeleteProductTerm();

  const handleDeleteTermBGV = (termId) => {
    const payload = {
      product_id: productId,
      term_id: termId,
    };

    deleteTerm.mutate(payload, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Term deleted successfully!");
      },
      onError: (err) => {
        handleError(err?.response?.data?.message || "Failed to delete term!");
      },
    });
  };

  const updateSort = useUpdateAttributeSortOrder();

  const handleSortUpdate = (attributeId, sortVal) => {
    const payload = {
      product_id: productId,
      attribute_id: attributeId,
      sort_order: sortVal,
    };

    updateSort.mutate(payload, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Sort order updated!");
      },
      onError: (err) => {
        handleError(
          err?.response?.data?.message || "Failed to update sort order",
        );
      },
    });
  };

  const generateVariations = useGenerateVariations();

  const handleGenerateVariations = () => {
    const payload = {
      product_id: productId,
    };

    generateVariations.mutate(payload, {
      onSuccess: (data) => {
        console.log("Response Data:", data);

        if (data.status) {
          handleSuccess(data.message || "Variations generated!");
        }
      },
      onError: (err) => {
        console.error("Actual Error Object:", err);
        handleError(
          err?.response?.data?.message || "Failed to generate variations",
        );
      },
    });
  };

  const {
    data: variationGetAllData,
    isLoading: variationGetAllDataLoading,
    isError: variationGetAllDataError,
  } = useFetchProductVariations(productId, page, {
    enabled: !!productId && secondStepDataTI?.product_type === 2,
  });

  // Extract the products array from the paginated response
  const variationsDataProducts = variationGetAllData?.data || [];
  const pagination = variationGetAllData?.pagination;
  const [variations, setVariations] = useState([]);
  const [errorsVar, setErrorsVar] = useState({});
  const validateVariations = () => {
    let tempErrors = {};
    let isValid = true;

    variations.forEach((variation, index) => {
      // Title Validation
      if (!variation.title?.trim()) {
        tempErrors[`${index}-title`] = "Variation title is required";
        isValid = false;
      }
      // SKU Validation
      if (!variation.product_sku?.trim()) {
        tempErrors[`${index}-product_sku`] = "SKU is required";
        isValid = false;
      }
      // Regular Price Validation (checking if it's empty or 0)
      if (!variation.regular_price || variation.regular_price <= 0) {
        tempErrors[`${index}-regular_price`] =
          "Regular price must be greater than 0";
        isValid = false;
      }
      // Sale Price Validation
      if (!variation.sale_price || variation.sale_price <= 0) {
        tempErrors[`${index}-sale_price`] = "Sale price is required";
        isValid = false;
      }
    });

    setErrorsVar(tempErrors);
    return isValid;
  };
  // Sync state with API data when it loads
  useEffect(() => {
    const remoteData = variationsDataProducts;

    if (remoteData) {
      setVariations(remoteData);
    }
  }, [variationGetAllData]);

  const handleVariationChange = (index, field, value) => {
    // 1. Update the variations data state
    setVariations((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    // 2. Live Validation Logic
    let errorMessage = "";

    // Validation Rules
    if (field === "title" && !value.trim()) {
      errorMessage = "Title is required";
    } else if (field === "product_sku" && !value.trim()) {
      errorMessage = "SKU is required";
    } else if (
      (field === "regular_price" || field === "sale_price") &&
      (!value || value <= 0)
    ) {
      errorMessage = "Price must be greater than 0";
    }

    // 3. Update the errors state
    setErrorsVar((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (errorMessage) {
        newErrors[`${index}-${field}`] = errorMessage;
      } else {
        // Remove the error if the user fixed it
        delete newErrors[`${index}-${field}`];
      }
      return newErrors;
    });
  };

  const removeTermWithVariations = useRemoveTermAndVariations();

  const handleRemoveVariationGen = (termId) => {
    const payload = {
      product_id: productId,
      term_id: termId,
    };

    removeTermWithVariations.mutate(payload, {
      onSuccess: (res) => {
        handleSuccess(
          res?.message || "Term & variations removed successfully!",
          setPage(1),
        );
      },
      onError: (err) => {
        handleError(
          err?.response?.data?.message || "Failed to remove term & variations!",
        );
      },
    });
  };

  const updateVariation = useUpdateVariation();

  const handleUpdate = (variation) => {
    if (!variation.regular_price || variation.regular_price <= 0) {
      handleError("Regular price must be greater than 0");
      return; // Stop the function execution
    }

    // 2. Check if Sale Price is valid (optional but recommended)
    if (variation.sale_price < 0) {
      handleError("Sale price cannot be negative");
      return;
    }
    updateVariation.mutate(
      {
        id: variation.id,
        payload: {
          is_on_sale: variation?.is_on_sale,
          title: variation?.title,
          product_sku: variation?.product_sku,
          product_status_stock: variation?.product_status_stock,
          min_stock_alert: variation?.min_stock_alert,
          regular_price: variation?.regular_price,
          sale_price: variation?.sale_price,
          release_year: variation?.release_year,
          network: variation?.network,
          SIM: variation?.SIM,
          carrier_option: variation?.carrier_option,
          meta_title: variation?.meta_title,
          meta_description: variation?.meta_description,
          keywords: variation?.keywords,
          description: variation?.description,
          is_default: variation?.is_default,
          image_id: variation.image_id,
        },
      },
      {
        onSuccess: (res) => {
          handleSuccess(res?.message || "Variation updated!");
        },
        onError: (err) => {
          handleError(
            err?.response?.data?.message || "Failed to update variation",
          );
        },
      },
    );
  };

  const isVariationsValid =
    variationsDataProducts?.length > 0 &&
    variationsDataProducts.every(
      (variation) =>
        variation.title?.trim() !== "" &&
        variation.regular_price > 0 &&
        variation.product_sku?.trim() !== "",
    );

  const saveTermImage = useSaveTermImage();

  const handleSaveTermImage = (termId, imageId) => {
    const payload = {
      product_id: productId,
      term_id: termId,
      image_id: imageId,
    };

    saveTermImage.mutate(payload, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Variation image updated!");
      },
      onError: (err) => {
        handleError(
          err?.response?.data?.message || "Failed to update image",
        );
      },
    });
  };

  const clearTermImage = useClearTermImage();

  const handleClearTermImage = (termId) => {
    clearTermImage.mutate(
      {
        product_id: productId,
        term_id: termId,
      },
      {
        onSuccess: (res) => {
          handleSuccess(res?.message || "Image removed successfully!");
        },
        onError: (err) => {
          handleError(
            err?.response?.data?.message || "Failed to remove image!",
          );
        },
      },
    );
  };

  const syncTermImage = useSyncTermImageToVariations();

  const handleSyncVariationImage = (termId) => {
    syncTermImage.mutate(
      {
        product_id: productId,
        term_id: termId,
      },
      {
        onSuccess: (res) => {
          handleSuccess(res?.message || "Image synced to all variations!");
        },
        onError: (err) => {
          handleError(
            err?.response?.data?.message || "Failed to sync image!",
          );
        },
      },
    );
  };

  return (
    <>
      <Grid id="variations-top" container spacing={2}>
        {/* Product Type Selector Header */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1.5,
              pb: 1.5,
              mb: 0.5,
              borderBottom: "1px solid #f1f5f9",
            }}
          >
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
                Product Type & Inventory Configuration
              </Typography>
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 0.4,
                borderRadius: "999px",
                backgroundColor:
                  secondStepDataTI?.product_type == 1 ? "#ecfdf5" : "#eef2ff",
                color:
                  secondStepDataTI?.product_type == 1 ? "#059669" : "#4f46e5",
                fontSize: "11.5px",
                fontWeight: 700,
              }}
            >
              {secondStepDataTI?.product_type == 1
                ? "Simple Product Mode"
                : "Variable Product Mode"}
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ mb: 1 }}>
          <FormControl
            fullWidth
            size="small"
            color="secondary"
            sx={modernInputSx}
            disabled={
              productTypeLoading || selectedAttributesDataFetchShow?.length > 0
            }
          >
            <InputLabel id="product-type-label">Product Type</InputLabel>
            <Select
              labelId="product-type-label"
              id="product-type-select"
              value={secondStepDataTI.product_type || ""}
              label="Product Type"
              onChange={(e) => {
                const newValue = e.target.value;

                setSecondStepDataTI((prev) => ({
                  ...prev,
                  product_type: newValue,
                }));

                handleUpdateType({
                  product_id: secondStepDataTI.product_id,
                  type: newValue,
                });
              }}
            >
              <MenuItem value={1} sx={{ fontSize: "14px" }}>
                Simple Product
              </MenuItem>
              <MenuItem value={2} sx={{ fontSize: "14px" }}>
                Variable Product
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {secondStepDataTI?.product_type == 1 ? (
          isLoading || productTypeLoading ? (
            <LoaderSpinner />
          ) : (
            <>
              <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ mb: 0.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    padding: "4px 18px",
                    height: "100%",
                  }}
                >
                  <FormControlLabel
                    sx={{
                      mr: 5,
                      "& .MuiFormControlLabel-label": {
                        fontSize: "13.5px",
                        fontWeight: 600,
                        color: "#64748b",
                      },
                    }}
                    control={
                      <Checkbox
                        size="small"
                        color="secondary"
                        name="is_active_for_buy"
                        checked={true}
                        disabled
                        sx={modernCheckboxSx}
                        // onChange={handleChange}
                      />
                    }
                    label="Raw Material"
                  />
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
                        name="is_on_sale"
                        type="checkbox"
                        checked={Boolean(simpleProductStep2Data.is_on_sale)}
                        onChange={handleInputChange}
                        sx={{
                          color: "#cbd5e1",
                          "&.Mui-checked": { color: "#f97316" },
                        }}
                      />
                    }
                    label="Is on sale"
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <TextField
                  name="product_sku"
                  label="SKU"
                  fullWidth
                  size="small"
                  color="secondary"
                  value={simpleProductStep2Data.product_sku || ""}
                  onChange={handleInputChange}
                  required
                  error={!simpleProductStep2Data.product_sku}
                  helperText={
                    !simpleProductStep2Data.product_sku ? "SKU is required" : ""
                  }
                  sx={modernInputSx}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth size="small" sx={modernInputSx}>
                  <InputLabel id="product-status-label" color="secondary">
                    Product Status
                  </InputLabel>
                  <Select
                    labelId="product-status-label"
                    id="product_status_stock"
                    name="product_status_stock"
                    value={simpleProductStep2Data.product_status_stock}
                    label="Product Status"
                    onChange={handleInputChange}
                    color="secondary"
                  >
                    <MenuItem value={1} sx={{ fontSize: "14px" }}>
                      In Stock
                    </MenuItem>
                    <MenuItem value={0} sx={{ fontSize: "14px" }}>
                      Out of Stock
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <TextField
                  id="min_stock_alert"
                  name="min_stock_alert"
                  label="Min Stock Alert"
                  type="number"
                  fullWidth
                  size="small"
                  color="secondary"
                  variant="outlined"
                  value={simpleProductStep2Data.min_stock_alert ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    const numericVal = parseInt(val, 10);

                    const finalValue =
                      val === "" ? "" : Math.max(0, numericVal || 0);

                    handleInputChange({
                      target: {
                        name: "min_stock_alert",
                        value: finalValue,
                      },
                    });
                  }}
                  inputProps={{ min: 0 }}
                  sx={modernNumberInputSx}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <TextField
                  name="regular_price"
                  label="Regular Price"
                  type="number"
                  fullWidth
                  size="small"
                  color="secondary"
                  value={simpleProductStep2Data.regular_price ?? 0}
                  onChange={(e) => {
                    const val = e.target.value;
                    const numericVal =
                      val === "" ? "" : Math.max(0, parseFloat(val) || 0);

                    // 1. Update Regular Price
                    handleInputChange({
                      target: { name: "regular_price", value: numericVal },
                    });

                    // 2. Sync Sale Price (Always set sale price equal to regular price initially)
                    handleInputChange({
                      target: { name: "sale_price", value: numericVal },
                    });
                  }}
                  required
                  error={
                    !!errors.regular_price ||
                    simpleProductStep2Data.regular_price <= 0
                  }
                  helperText={
                    simpleProductStep2Data.regular_price <= 0
                      ? "Price must be greater than 0"
                      : errors.regular_price
                  }
                  inputProps={{ min: 0.01, step: "0.01" }}
                  sx={modernNumberInputSx}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <TextField
                  name="sale_price"
                  label="Sale Price"
                  type="number"
                  fullWidth
                  size="small"
                  color="secondary"
                  value={simpleProductStep2Data.sale_price ?? 0}
                  onChange={(e) => {
                    const val = e.target.value;
                    const numericVal = parseFloat(val);
                    const regularPrice =
                      parseFloat(simpleProductStep2Data.regular_price) || 0;

                    let finalValue;
                    if (val === "") {
                      finalValue = "";
                    } else {
                      finalValue = Math.min(
                        regularPrice,
                        Math.max(0, numericVal || 0),
                      );
                    }

                    handleInputChange({
                      target: {
                        name: "sale_price",
                        value: finalValue,
                      },
                    });
                  }}
                  required
                  error={
                    !!errors.sale_price ||
                    simpleProductStep2Data.sale_price <= 0
                  }
                  helperText={
                    simpleProductStep2Data.sale_price <= 0
                      ? "Sale price required"
                      : errors.sale_price
                  }
                  inputProps={{ min: 0, step: "0.01" }}
                  sx={modernNumberInputSx}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth size="small" sx={modernInputSx}>
                  <InputLabel id="product-status-label" color="secondary">
                    Release Year
                  </InputLabel>
                  <Select
                    labelId="product-status-label"
                    id="release_year"
                    name="release_year"
                    value={simpleProductStep2Data.release_year}
                    label="Release Year"
                    onChange={handleInputChange}
                    color="secondary"
                  >
                    <MenuItem value={0} sx={{ fontSize: "14px" }}>
                      N/A
                    </MenuItem>
                    <MenuItem value={15} sx={{ fontSize: "14px" }}>
                      2026
                    </MenuItem>
                    <MenuItem value={14} sx={{ fontSize: "14px" }}>
                      2025
                    </MenuItem>
                    <MenuItem value={13} sx={{ fontSize: "14px" }}>
                      2024
                    </MenuItem>
                    <MenuItem value={12} sx={{ fontSize: "14px" }}>
                      2023
                    </MenuItem>
                    <MenuItem value={11} sx={{ fontSize: "14px" }}>
                      2022
                    </MenuItem>
                    <MenuItem value={10} sx={{ fontSize: "14px" }}>
                      2021
                    </MenuItem>
                    <MenuItem value={9} sx={{ fontSize: "14px" }}>
                      2020
                    </MenuItem>
                    <MenuItem value={8} sx={{ fontSize: "14px" }}>
                      2019
                    </MenuItem>
                    <MenuItem value={7} sx={{ fontSize: "14px" }}>
                      2018
                    </MenuItem>
                    <MenuItem value={6} sx={{ fontSize: "14px" }}>
                      2017
                    </MenuItem>
                    <MenuItem value={5} sx={{ fontSize: "14px" }}>
                      2016
                    </MenuItem>
                    <MenuItem value={4} sx={{ fontSize: "14px" }}>
                      2015
                    </MenuItem>
                    <MenuItem value={3} sx={{ fontSize: "14px" }}>
                      2014
                    </MenuItem>
                    <MenuItem value={2} sx={{ fontSize: "14px" }}>
                      2013
                    </MenuItem>
                    <MenuItem value={1} sx={{ fontSize: "14px" }}>
                      2012
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth size="small" sx={modernInputSx}>
                  <InputLabel id="product-status-label" color="secondary">
                    Network
                  </InputLabel>
                  <Select
                    labelId="product-status-label"
                    id="network"
                    name="network"
                    value={simpleProductStep2Data.network}
                    label="Network"
                    onChange={handleInputChange}
                    color="secondary"
                  >
                    <MenuItem value={0} sx={{ fontSize: "14px" }}>
                      N/A
                    </MenuItem>
                    <MenuItem value={1} sx={{ fontSize: "14px" }}>
                      2G
                    </MenuItem>
                    <MenuItem value={2} sx={{ fontSize: "14px" }}>
                      3G
                    </MenuItem>
                    <MenuItem value={3} sx={{ fontSize: "14px" }}>
                      4G
                    </MenuItem>
                    <MenuItem value={4} sx={{ fontSize: "14px" }}>
                      5G
                    </MenuItem>
                    <MenuItem value={5} sx={{ fontSize: "14px" }}>
                      GPS
                    </MenuItem>
                    <MenuItem value={6} sx={{ fontSize: "14px" }}>
                      Cellular
                    </MenuItem>
                    <MenuItem value={7} sx={{ fontSize: "14px" }}>
                      Unlocked
                    </MenuItem>
                    <MenuItem value={8} sx={{ fontSize: "14px" }}>
                      Wi-Fi
                    </MenuItem>
                    <MenuItem value={9} sx={{ fontSize: "14px" }}>
                      Wi-Fi + Cellular
                    </MenuItem>
                    <MenuItem value={10} sx={{ fontSize: "14px" }}>
                      EE
                    </MenuItem>
                    <MenuItem value={11} sx={{ fontSize: "14px" }}>
                      Giffgaff
                    </MenuItem>
                    <MenuItem value={12} sx={{ fontSize: "14px" }}>
                      O2
                    </MenuItem>
                    <MenuItem value={13} sx={{ fontSize: "14px" }}>
                      Tesco
                    </MenuItem>
                    <MenuItem value={14} sx={{ fontSize: "14px" }}>
                      Three
                    </MenuItem>
                    <MenuItem value={15} sx={{ fontSize: "14px" }}>
                      Virgin
                    </MenuItem>
                    <MenuItem value={16} sx={{ fontSize: "14px" }}>
                      Vodafone
                    </MenuItem>
                    <MenuItem value={17} sx={{ fontSize: "14px" }}>
                      Other
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth size="small" sx={modernInputSx}>
                  <InputLabel id="sim-label" color="secondary">
                    SIM
                  </InputLabel>
                  <Select
                    labelId="product-status-label"
                    id="SIM"
                    name="SIM"
                    value={simpleProductStep2Data?.SIM}
                    label="SIM"
                    onChange={handleInputChange}
                    color="secondary"
                  >
                    <MenuItem value={0} sx={{ fontSize: "14px" }}>
                      N/A
                    </MenuItem>
                    <MenuItem value={1} sx={{ fontSize: "14px" }}>
                      Single SIM
                    </MenuItem>
                    <MenuItem value={2} sx={{ fontSize: "14px" }}>
                      Dual SIM
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth size="small" sx={modernInputSx}>
                  <InputLabel id="product-status-label" color="secondary">
                    Carrier Option
                  </InputLabel>
                  <Select
                    labelId="product-status-label"
                    id="carrier_option"
                    name="carrier_option"
                    value={simpleProductStep2Data.carrier_option}
                    label="Carrier Option"
                    onChange={handleInputChange}
                    color="secondary"
                  >
                    <MenuItem value={0} sx={{ fontSize: "14px" }}>
                      N/A
                    </MenuItem>
                    <MenuItem value={1} sx={{ fontSize: "14px" }}>
                      Locked
                    </MenuItem>
                    <MenuItem value={2} sx={{ fontSize: "14px" }}>
                      Unlocked
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Autocomplete
                  disablePortal
                  options={warrantiesPolicy}
                  getOptionLabel={(option) => option.title || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Attach Warranty Policy"
                      sx={modernInputSx}
                    />
                  )}
                  size="small"
                  fullWidth
                  color="secondary"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Autocomplete
                  disablePortal
                  options={["first"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Attach Return Policy"
                      sx={modernInputSx}
                    />
                  )}
                  size="small"
                  fullWidth
                  color="secondary"
                  disabled
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ mt: 0.5 }}>
                <Button
                  className="custom-secondary-btn-admin-side"
                  disabled={true}
                  sx={{
                    borderRadius: "12px !important",
                    px: "18px !important",
                    py: "8px !important",
                    fontSize: "13px !important",
                    fontWeight: "600 !important",
                    textTransform: "none !important",
                    "&.Mui-disabled": {
                      backgroundColor: "#f1f5f9 !important",
                      color: "#94a3b8 !important",
                      border: "1px solid #e2e8f0 !important",
                    },
                    mr: 1,
                  }}
                >
                  <HelpIcon sx={{ mr: 1, fontSize: 18 }} />
                  Add Question/Options Or Description
                </Button>
              </Grid>
            </>
          )
        ) : (
          <>
            {variationsDataProducts?.length == 0 && (
              <>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Autocomplete
                    disablePortal
                    options={
                      productTypeF?.product_type === 2 ? attributesList : []
                    }
                    value={
                      attributesList.find(
                        (option) => option.id === selectedAttributeId,
                      ) || null
                    }
                    getOptionLabel={(option) => option.title || ""}
                    onChange={handleAttributeChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Attribute"
                        sx={modernInputSx}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loadingProductAttributes ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    size="small"
                    fullWidth
                    color="secondary"
                    disabled={productTypeF?.product_type !== 2}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                  <MultipleSelectChip
                    data={termsList || []}
                    loading={loadingProductTerms}
                    value={selectedTerms}
                    onChange={setSelectedTerms}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 1 }}>
                  <Button
                    onClick={handleSaveAttTerms}
                    className="custom-primary-btn-admin-side"
                    fullWidth
                    sx={{
                      backgroundColor: "#0f172a !important",
                      backgroundImage: "none !important",
                      color: "#ffffff !important",
                      borderRadius: "12px !important",
                      height: "40px !important",
                      fontSize: "13px !important",
                      fontWeight: "600 !important",
                      textTransform: "none !important",
                      "&:hover": {
                        backgroundColor: "#1e293b !important",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#e2e8f0 !important",
                        color: "#94a3b8 !important",
                      },
                    }}
                    disabled={
                      saveTerms?.isPending ||
                      !selectedAttributeId ||
                      selectedTerms?.length === 0
                    }
                  >
                    {saveTerms?.isPending ? "Saving..." : "Save"}
                  </Button>
                </Grid>
              </>
            )}

            {selectedTermsAttDataLoading ? (
              ""
            ) : selectedAttributesDataFetchShow?.length > 0 ? (
              <Grid item size={{ xs: 12, sm: 12, md: 12 }} sx={{ my: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2, md: 3 },
                    backgroundColor: "#f8fafc",
                    borderRadius: "20px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 20px -4px rgba(15, 23, 42, 0.04)",
                    transition: "all 0.25s ease",
                    gap: 2.5,
                    "&:hover": {
                      borderColor: "#cbd5e1",
                      boxShadow: "0 8px 24px -4px rgba(15, 23, 42, 0.07)",
                    },
                  }}
                >
                  {selectedAttributesDataFetchShow?.map(
                    (attributes, keyAtt) => {
                      const currentSortOrder =
                        sortOrders[attributes.attribute_id] ??
                        attributes?.sort_order ??
                        0;
                      return (
                        <Box
                          key={keyAtt}
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: "center",
                            gap: 2,
                            p: 1.75,
                            backgroundColor: "#ffffff",
                            borderRadius: "16px",
                            border: "1px solid #eef2f6",
                          }}
                        >
                          {/* 1. Category Label Section */}
                          <Box sx={{ minWidth: "130px" }}>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#0f172a",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                px: 1.5,
                                py: 0.6,
                                borderRadius: "8px",
                                backgroundColor: "#f1f5f9",
                                display: "inline-block",
                              }}
                            >
                              {attributes?.attribute_name}
                            </Typography>
                          </Box>

                          {/* 2. Terms/Chips Section */}
                          <Box
                            sx={{
                              flexGrow: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              width: "100%",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#64748b",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Terms:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                border: "1px dashed #cbd5e1",
                                backgroundColor: "#f8fafc",
                                p: "8px 10px",
                                borderRadius: "12px",
                                width: "100%",
                              }}
                            >
                              {attributes?.terms?.map((term, k) => (
                                <Box
                                  key={k}
                                  sx={{
                                    px: 1.25,
                                    py: 0.6,
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    bgcolor: "#ffffff",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#0f172a",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 1px 3px rgba(15,23,42,0.03)",
                                    "&:hover": {
                                      bgcolor: "#f1f5f9",
                                      borderColor: "#cbd5e1",
                                    },
                                  }}
                                >
                                  {variationsDataProducts?.length > 0 ? (
                                    <MediaSelectModal
                                      termImageP={term}
                                      handleClearTermImage={
                                        handleClearTermImage
                                      }
                                      handleSaveTermImg={handleSaveTermImage}
                                      isSelectedTermsS={true}
                                      handleSyncVariationImage={
                                        handleSyncVariationImage
                                      }
                                      syncTermImage={syncTermImage}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {term?.name}{" "}
                                  {variationsDataProducts?.length > 0 ? (
                                    <CancelIcon
                                      onClick={() =>
                                        handleRemoveVariationGen(term?.id)
                                      }
                                      disabled={
                                        removeTermWithVariations?.isPending ||
                                        removeTermWithVariations?.isLoading ||
                                        selectedTermsAttDataLoading
                                      }
                                      color="secondary"
                                      sx={{
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        color: "#ef4444",
                                        ...(removeTermWithVariations?.isPending ||
                                        removeTermWithVariations?.isLoading ||
                                        selectedTermsAttDataLoading
                                          ? { color: "#cbd5e1 !important" }
                                          : {}),
                                      }}
                                    />
                                  ) : (
                                    <CancelIcon
                                      onClick={() =>
                                        handleDeleteTermBGV(term?.id)
                                      }
                                      disabled={
                                        deleteTerm?.isPending ||
                                        deleteTerm?.isLoading ||
                                        selectedTermsAttDataLoading
                                      }
                                      color="error"
                                      sx={{
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        color:
                                          (deleteTerm?.isPending ||
                                            deleteTerm?.isLoading ||
                                            selectedTermsAttDataLoading) &&
                                          "#cbd5e1 !important",
                                      }}
                                    />
                                  )}
                                </Box>
                              ))}
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.25,
                              ml: { md: "auto" },
                              width: { xs: "100%", md: "auto" },
                              justifyContent: {
                                xs: "space-between",
                                md: "flex-end",
                              },
                            }}
                          >
                            <TextField
                              size="small"
                              label="Sort Order"
                              type="number"
                              variant="outlined"
                              value={currentSortOrder}
                              required
                              slotProps={{
                                htmlInput: { min: 0 },
                              }}
                              onChange={(e) => {
                                const newVal = e.target.value;

                                if (newVal !== "" && parseInt(newVal) < 0) {
                                  return;
                                }

                                setSortOrders((prev) => ({
                                  ...prev,
                                  [attributes.attribute_id]: newVal,
                                }));
                              }}
                              error={currentSortOrder === ""}
                              helperText={
                                currentSortOrder === "" ? "Required" : ""
                              }
                              sx={{
                                width: "110px",
                                ...modernNumberInputSx,
                              }}
                            />

                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button
                                onClick={() =>
                                  handleSortUpdate(
                                    attributes.attribute_id,
                                    sortOrders[attributes.attribute_id] ??
                                      attributes.sort_order ??
                                      0,
                                  )
                                }
                                variant="contained"
                                disabled={
                                  !sortOrders[attributes.attribute_id] ||
                                  updateSort?.isPending ||
                                  updateSort?.isLoading ||
                                  selectedTermsAttDataLoading
                                }
                                disableElevation
                                startIcon={<SaveIcon sx={{ fontSize: 17 }} />}
                                sx={{
                                  bgcolor: "#0f172a",
                                  borderRadius: "12px",
                                  textTransform: "none",
                                  fontWeight: 600,
                                  fontSize: "13px",
                                  height: "40px",
                                  px: 2.5,
                                  "&:hover": { bgcolor: "#1e293b" },
                                }}
                              >
                                {updateSort?.isPending || updateSort?.isLoading
                                  ? "Saving..."
                                  : "Save"}
                              </Button>
                              {variationsDataProducts?.length == 0 ? (
                                <IconButton
                                  onClick={() =>
                                    handleDeleteAttrBefGA(
                                      attributes?.attribute_id,
                                    )
                                  }
                                  disabled={
                                    deleteAttrBefGA?.isPending ||
                                    deleteAttrBefGA?.isLoading ||
                                    selectedTermsAttDataLoading
                                  }
                                  sx={{
                                    bgcolor: "#fef2f2",
                                    color: "#ef4444",
                                    border: "1px solid #fee2e2",
                                    borderRadius: "12px",
                                    height: "40px",
                                    width: "40px",
                                    "&:hover": {
                                      bgcolor: "#fee2e2",
                                    },
                                  }}
                                >
                                  <DeleteIcon sx={{ fontSize: 19 }} />
                                </IconButton>
                              ) : (
                                ""
                              )}
                            </Box>
                          </Box>
                        </Box>
                      );
                    },
                  )}
                </Box>
              </Grid>
            ) : (
              ""
            )}

            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <Button
                disabled={
                  selectedAttributesDataFetchShow?.length == 0 ||
                  variationsDataProducts?.length > 0 ||
                  generateVariations?.isLoading ||
                  generateVariations?.isPending
                }
                className="custom-secondary-btn-admin-side"
                onClick={
                  handleGenerateVariations || generateVariations?.isPending
                }
                sx={{
                  backgroundColor: "#0f172a !important",
                  backgroundImage: "none !important",
                  color: "#ffffff !important",
                  borderRadius: "999px !important",
                  px: "24px !important",
                  py: "9px !important",
                  fontSize: "13px !important",
                  fontWeight: "600 !important",
                  textTransform: "none !important",
                  "&:hover": {
                    backgroundColor: "#1e293b !important",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#e2e8f0 !important",
                    color: "#94a3b8 !important",
                  },
                }}
              >
                Get All Variations of Product
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <Divider sx={{ my: 2, borderColor: "#eef2f6" }} />
            </Grid>

            {/* Map through the variations data inside modern cards */}
            {variations?.map((variation, index) => (
              <Grid
                key={variation.id || index}
                size={{ xs: 12 }}
                sx={{ mt: index !== 0 ? 2 : 0 }}
              >
                <Box
                  sx={{
                    borderRadius: "20px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 6px 24px -6px rgba(15, 23, 42, 0.05)",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#cbd5e1",
                    },
                  }}
                >
                  {/* Top Header Bar of Variation Card */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1.5,
                      px: 2.5,
                      py: 1.5,
                      backgroundColor: "#f8fafc",
                      borderBottom: "1px solid #eef2f6",
                    }}
                  >
                    {/* Render individual variation terms (e.g., Ice Blue, 128GB) */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          px: 1.1,
                          py: 0.35,
                          borderRadius: "8px",
                          backgroundColor: "#0f172a",
                          color: "#ffffff",
                          fontSize: "11.5px",
                          fontWeight: 700,
                        }}
                      >
                        #{index + 1}
                      </Box>
                      {variation.variation_terms?.map((term) => (
                        <Box
                          key={term.term_id}
                          sx={{
                            border: "1px solid #a7f3d0",
                            borderRadius: "8px",
                            padding: "3px 10px",
                            fontWeight: 600,
                            fontSize: "12.5px",
                            color: "#059669",
                            backgroundColor: "#ecfdf5",
                          }}
                        >
                          {term.term_title}
                        </Box>
                      ))}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <FormControlLabel
                        disabled
                        sx={{
                          mr: 1,
                          "& .MuiFormControlLabel-label": {
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                          },
                        }}
                        control={
                          <Checkbox
                            size="small"
                            color="secondary"
                            checked={true}
                            sx={modernCheckboxSx}
                          />
                        }
                        label="Raw Material"
                      />
                      <FormControlLabel
                        sx={{
                          mr: 0,
                          "& .MuiFormControlLabel-label": {
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#0f172a",
                          },
                        }}
                        control={
                          <Checkbox
                            size="small"
                            color="secondary"
                            checked={variation.is_on_sale === 1}
                            onChange={(e) => {
                              const newValue = e.target.checked ? 1 : 0;
                              handleVariationChange(
                                index,
                                "is_on_sale",
                                newValue,
                              );
                            }}
                            sx={{
                              color: "#cbd5e1",
                              "&.Mui-checked": { color: "#f97316" },
                            }}
                          />
                        }
                        label="Is on sale"
                      />
                    </Box>
                  </Box>

                  {/* Variation Card Body */}
                  <Box sx={{ p: { xs: 2, md: 2.75 } }}>
                    <Grid container spacing={2}>
                      {/* Variation Title Input */}
                      <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                        <TextField
                          label="Variation Title"
                          fullWidth
                          size="small"
                          color="secondary"
                          variant="outlined"
                          key={variation.id}
                          error={!!errorsVar[`${index}-title`]}
                          helperText={errorsVar[`${index}-title`]}
                          value={variation.title || ""}
                          onChange={(e) =>
                            handleVariationChange(
                              index,
                              "title",
                              e.target.value,
                            )
                          }
                          sx={modernInputSx}
                        />
                      </Grid>

                      {/* SKU and Stock Info */}
                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <MediaSelectModal
                          isVariationSelectImg={true}
                          variationImage={
                            variation.image_path ||
                            variation?.variation_image?.media_path
                          }
                          setImageData={(imagePayload) => {
                            handleVariationChange(
                              index,
                              "image_id",
                              imagePayload.image_id,
                            );
                            handleVariationChange(
                              index,
                              "image_path",
                              imagePayload.image_path,
                            );
                          }}
                          onClear={() => {
                            handleVariationChange(index, "image_id", null);
                            handleVariationChange(index, "image_path", null);
                            handleVariationChange(
                              index,
                              "variation_image",
                              null,
                            );
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <TextField
                          label="SKU"
                          fullWidth
                          size="small"
                          color="secondary"
                          variant="outlined"
                          error={!!errorsVar[`${index}-product_sku`]}
                          helperText={errorsVar[`${index}-product_sku`]}
                          value={variation.product_sku || ""}
                          onChange={(e) =>
                            handleVariationChange(
                              index,
                              "product_sku",
                              e.target.value,
                            )
                          }
                          sx={modernInputSx}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <FormControl fullWidth size="small" sx={modernInputSx}>
                          <InputLabel color="secondary">
                            Product Status
                          </InputLabel>
                          <Select
                            value={
                              variation.product_status_stock === 1 ? 11 : 22
                            }
                            label="Product Status"
                            color="secondary"
                            onChange={(e) => {
                              const updatedStatus =
                                e.target.value === 11 ? 1 : 0;
                              handleVariationChange(
                                index,
                                "product_status_stock",
                                updatedStatus,
                              );
                            }}
                          >
                            <MenuItem value={11} sx={{ fontSize: "14px" }}>
                              In Stock
                            </MenuItem>
                            <MenuItem value={22} sx={{ fontSize: "14px" }}>
                              Out of Stock
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Prices Section */}
                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <TextField
                          label="Min Stock Alert"
                          fullWidth
                          size="small"
                          color="secondary"
                          variant="outlined"
                          type="number"
                          value={variation.min_stock_alert || 0}
                          onChange={(e) => {
                            const val = e.target.value;
                            const finalValue =
                              val === ""
                                ? ""
                                : Math.max(0, parseInt(val, 10) || 0);

                            handleVariationChange(
                              index,
                              "min_stock_alert",
                              finalValue,
                            );
                          }}
                          inputProps={{ min: 0 }}
                          sx={modernNumberInputSx}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <TextField
                          label="Regular Price"
                          fullWidth
                          size="small"
                          type="number"
                          value={variation.regular_price || 0}
                          error={variation.regular_price <= 0}
                          helperText={
                            variation.regular_price <= 0
                              ? "Price cannot be zero"
                              : ""
                          }
                          onChange={(e) => {
                            const rawVal = e.target.value;
                            const val =
                              rawVal === ""
                                ? 0
                                : Math.max(0, parseFloat(rawVal) || 0);

                            handleVariationChange(index, "regular_price", val);
                            handleVariationChange(index, "sale_price", val);
                          }}
                          inputProps={{ min: 0, step: "0.01" }}
                          sx={modernNumberInputSx}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <TextField
                          label="Sale Price"
                          fullWidth
                          size="small"
                          type="number"
                          value={variation.sale_price || 0}
                          error={
                            variation.sale_price <= 0 ||
                            variation.sale_price > variation.regular_price
                          }
                          helperText={
                            variation.sale_price <= 0
                              ? "Sale price required"
                              : variation.sale_price > variation.regular_price
                                ? "Cannot exceed regular price"
                                : ""
                          }
                          onChange={(e) => {
                            const rawVal = e.target.value;
                            const numericVal = parseFloat(rawVal) || 0;
                            const regPrice =
                              parseFloat(variation.regular_price) || 0;

                            const finalVal =
                              rawVal === ""
                                ? 0
                                : Math.min(regPrice, Math.max(0, numericVal));

                            handleVariationChange(
                              index,
                              "sale_price",
                              finalVal,
                            );
                          }}
                          inputProps={{ min: 0, step: "0.01" }}
                          sx={modernNumberInputSx}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <FormControl fullWidth size="small" sx={modernInputSx}>
                          <InputLabel
                            id={`release-year-label-${index}`}
                            color="secondary"
                          >
                            Release Year
                          </InputLabel>
                          <Select
                            labelId={`release-year-label-${index}`}
                            id={`release_year_${index}`}
                            value={variation.release_year || 0}
                            label="Release Year"
                            color="secondary"
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "release_year",
                                e.target.value,
                              )
                            }
                          >
                            <MenuItem value={0} sx={{ fontSize: "14px" }}>
                              N/A
                            </MenuItem>
                            <MenuItem value={15} sx={{ fontSize: "14px" }}>
                              2026
                            </MenuItem>
                            <MenuItem value={14} sx={{ fontSize: "14px" }}>
                              2025
                            </MenuItem>
                            <MenuItem value={13} sx={{ fontSize: "14px" }}>
                              2024
                            </MenuItem>
                            <MenuItem value={12} sx={{ fontSize: "14px" }}>
                              2023
                            </MenuItem>
                            <MenuItem value={11} sx={{ fontSize: "14px" }}>
                              2022
                            </MenuItem>
                            <MenuItem value={10} sx={{ fontSize: "14px" }}>
                              2021
                            </MenuItem>
                            <MenuItem value={9} sx={{ fontSize: "14px" }}>
                              2020
                            </MenuItem>
                            <MenuItem value={8} sx={{ fontSize: "14px" }}>
                              2019
                            </MenuItem>
                            <MenuItem value={7} sx={{ fontSize: "14px" }}>
                              2018
                            </MenuItem>
                            <MenuItem value={6} sx={{ fontSize: "14px" }}>
                              2017
                            </MenuItem>
                            <MenuItem value={5} sx={{ fontSize: "14px" }}>
                              2016
                            </MenuItem>
                            <MenuItem value={4} sx={{ fontSize: "14px" }}>
                              2015
                            </MenuItem>
                            <MenuItem value={3} sx={{ fontSize: "14px" }}>
                              2014
                            </MenuItem>
                            <MenuItem value={2} sx={{ fontSize: "14px" }}>
                              2013
                            </MenuItem>
                            <MenuItem value={1} sx={{ fontSize: "14px" }}>
                              2012
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <FormControl fullWidth size="small" sx={modernInputSx}>
                          <InputLabel
                            id={`network-label-${index}`}
                            color="secondary"
                          >
                            Network
                          </InputLabel>
                          <Select
                            labelId={`network-label-${index}`}
                            id={`network_${index}`}
                            name="network"
                            value={variation.network ?? 0}
                            label="Network"
                            color="secondary"
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "network",
                                e.target.value,
                              )
                            }
                          >
                            <MenuItem value={0} sx={{ fontSize: "14px" }}>
                              N/A
                            </MenuItem>
                            <MenuItem value={1} sx={{ fontSize: "14px" }}>
                              2G
                            </MenuItem>
                            <MenuItem value={2} sx={{ fontSize: "14px" }}>
                              3G
                            </MenuItem>
                            <MenuItem value={3} sx={{ fontSize: "14px" }}>
                              4G
                            </MenuItem>
                            <MenuItem value={4} sx={{ fontSize: "14px" }}>
                              5G
                            </MenuItem>
                            <MenuItem value={5} sx={{ fontSize: "14px" }}>
                              GPS
                            </MenuItem>
                            <MenuItem value={6} sx={{ fontSize: "14px" }}>
                              Cellular
                            </MenuItem>
                            <MenuItem value={7} sx={{ fontSize: "14px" }}>
                              Unlocked
                            </MenuItem>
                            <MenuItem value={8} sx={{ fontSize: "14px" }}>
                              Wi-Fi
                            </MenuItem>
                            <MenuItem value={9} sx={{ fontSize: "14px" }}>
                              Wi-Fi + Cellular
                            </MenuItem>
                            <MenuItem value={10} sx={{ fontSize: "14px" }}>
                              EE
                            </MenuItem>
                            <MenuItem value={11} sx={{ fontSize: "14px" }}>
                              Giffgaff
                            </MenuItem>
                            <MenuItem value={12} sx={{ fontSize: "14px" }}>
                              O2
                            </MenuItem>
                            <MenuItem value={13} sx={{ fontSize: "14px" }}>
                              Tesco
                            </MenuItem>
                            <MenuItem value={14} sx={{ fontSize: "14px" }}>
                              Three
                            </MenuItem>
                            <MenuItem value={15} sx={{ fontSize: "14px" }}>
                              Virgin
                            </MenuItem>
                            <MenuItem value={16} sx={{ fontSize: "14px" }}>
                              Vodafone
                            </MenuItem>
                            <MenuItem value={17} sx={{ fontSize: "14px" }}>
                              Other
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <FormControl fullWidth size="small" sx={modernInputSx}>
                          <InputLabel
                            id={`sim-label-${index}`}
                            color="secondary"
                          >
                            SIM
                          </InputLabel>
                          <Select
                            labelId={`sim-label-${index}`}
                            id={`sim-${index}`}
                            value={variation.SIM ?? 0}
                            label="SIM"
                            color="secondary"
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "SIM",
                                e.target.value,
                              )
                            }
                          >
                            <MenuItem value={0} sx={{ fontSize: "14px" }}>
                              N/A
                            </MenuItem>
                            <MenuItem value={1} sx={{ fontSize: "14px" }}>
                              Single SIM
                            </MenuItem>
                            <MenuItem value={2} sx={{ fontSize: "14px" }}>
                              Dual SIM
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <FormControl fullWidth size="small" sx={modernInputSx}>
                          <InputLabel
                            id={`carrier-option-label-${index}`}
                            color="secondary"
                          >
                            Carrier Option
                          </InputLabel>
                          <Select
                            labelId={`carrier-option-label-${index}`}
                            id={`carrier_option_${index}`}
                            value={variation.carrier_option ?? 0}
                            label="Carrier Option"
                            color="secondary"
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "carrier_option",
                                e.target.value,
                              )
                            }
                          >
                            <MenuItem value={0} sx={{ fontSize: "14px" }}>
                              N/A
                            </MenuItem>
                            <MenuItem value={1} sx={{ fontSize: "14px" }}>
                              Locked
                            </MenuItem>
                            <MenuItem value={2} sx={{ fontSize: "14px" }}>
                              Unlocked
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Autocomplete
                          disablePortal
                          options={["first"]}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Attach Warranty Policy"
                              sx={modernInputSx}
                            />
                          )}
                          size="small"
                          fullWidth
                          color="secondary"
                          disabled
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Autocomplete
                          disablePortal
                          options={["first"]}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Attach Return Policy"
                              sx={modernInputSx}
                            />
                          )}
                          size="small"
                          fullWidth
                          color="secondary"
                          disabled
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                        <TextField
                          id={`meta_title_${index}`}
                          name="meta_title"
                          value={variation.meta_title || ""}
                          onChange={(e) =>
                            handleVariationChange(
                              index,
                              "meta_title",
                              e.target.value,
                            )
                          }
                          label="Meta Title"
                          fullWidth
                          size="small"
                          color="secondary"
                          variant="outlined"
                          placeholder="Write meta title..."
                          helperText={`${(variation.meta_title || "").length}/60 characters`}
                          error={(variation.meta_title || "").length > 60}
                          sx={modernInputSx}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                        <TextField
                          id={`meta_description_${index}`}
                          name="meta_description"
                          value={variation.meta_description || ""}
                          onChange={(e) =>
                            handleVariationChange(
                              index,
                              "meta_description",
                              e.target.value,
                            )
                          }
                          label="Meta Description"
                          fullWidth
                          size="small"
                          color="secondary"
                          variant="outlined"
                          placeholder="Write meta description..."
                          helperText={`${(variation.meta_description || "").length}/160 characters`}
                          error={
                            (variation.meta_description || "").length > 160
                          }
                          sx={modernInputSx}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                        <TextField
                          id={`keywords_${index}`}
                          name="keywords"
                          value={variation.keywords || ""}
                          onChange={(e) =>
                            handleVariationChange(
                              index,
                              "keywords",
                              e.target.value,
                            )
                          }
                          label="Keywords"
                          fullWidth
                          size="small"
                          color="secondary"
                          variant="outlined"
                          placeholder="e.g. iPhone 17, 128GB, Unlocked, Space Gray"
                          helperText="Separate keywords with commas"
                          sx={modernInputSx}
                        />
                      </Grid>

                      {/* Description Editor for each variation */}
                      <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                        <Box
                          component={"h3"}
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#0f172a",
                            mb: 1,
                            mt: 0.5,
                          }}
                        >
                          Variation Description:
                        </Box>
                        <Box
                          sx={{
                            borderRadius: "14px",
                            overflow: "hidden",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <TextEditor
                            label="Description"
                            value={variation.description || ""}
                            onChange={(content) => {
                              handleVariationChange(
                                index,
                                "description",
                                content,
                              );
                            }}
                          />
                        </Box>
                      </Grid>

                      {/* Variation Footer Bar */}
                      <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 1.5,
                            pt: 1.5,
                            mt: 0.5,
                            borderTop: "1px solid #f1f5f9",
                          }}
                        >
                          <Button
                            className="custom-secondary-btn-admin-side"
                            disabled={true}
                            sx={{
                              borderRadius: "12px !important",
                              px: "16px !important",
                              py: "7px !important",
                              fontSize: "12.5px !important",
                              fontWeight: "600 !important",
                              textTransform: "none !important",
                              "&.Mui-disabled": {
                                backgroundColor: "#f1f5f9 !important",
                                color: "#94a3b8 !important",
                                border: "1px solid #e2e8f0 !important",
                              },
                            }}
                          >
                            <HelpIcon sx={{ mr: 1, fontSize: 17 }} />
                            Add Question/Options Or Description
                          </Button>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <FormControlLabel
                              sx={{
                                mr: 3,
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
                                  checked={variation.is_default === 1}
                                  onChange={(e) => {
                                    const newValue = e.target.checked ? 1 : 0;
                                    handleVariationChange(
                                      index,
                                      "is_default",
                                      newValue,
                                    );
                                  }}
                                  sx={modernCheckboxSx}
                                />
                              }
                              label="Default"
                            />
                            <Button
                              className="custom-secondary-btn-admin-side"
                              onClick={() => handleUpdate(variation)}
                              disabled={updateVariation.isPending}
                              sx={{
                                backgroundColor: "#0f172a !important",
                                backgroundImage: "none !important",
                                color: "#ffffff !important",
                                borderRadius: "999px !important",
                                px: "22px !important",
                                py: "8px !important",
                                fontSize: "13px !important",
                                fontWeight: "600 !important",
                                textTransform: "none !important",
                                "&:hover": {
                                  backgroundColor: "#1e293b !important",
                                },
                                "&.Mui-disabled": {
                                  backgroundColor: "#e2e8f0 !important",
                                  color: "#94a3b8 !important",
                                },
                              }}
                            >
                              {updateVariation.isPending ? (
                                <>
                                  <CircularProgress
                                    size={18}
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                  />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <SaveIcon sx={{ mr: 1, fontSize: 17 }} />
                                  Save
                                </>
                              )}
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            ))}
          </>
        )}
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          {variationsDataProducts?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between !important",
                gap: 2,
                width: "100%",
                mt: 1,
                p: 2,
                borderRadius: "14px",
                backgroundColor: "#f8fafc",
                border: "1px solid #eef2f6",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#64748b",
                }}
              >
                <span>Showing</span>
                <Box
                  component="span"
                  sx={{
                    px: 1.1,
                    py: 0.3,
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
                    fontWeight: 700,
                    fontSize: "12.5px",
                  }}
                >
                  {pagination?.from ?? 0}–{pagination?.to ?? 0}
                </Box>
                <span>of</span>
                <Box
                  component="span"
                  sx={{
                    px: 1.1,
                    py: 0.3,
                    borderRadius: "8px",
                    backgroundColor: "#fff7ed",
                    border: "1px solid #ffedd5",
                    color: "#f97316",
                    fontWeight: 700,
                    fontSize: "12.5px",
                  }}
                >
                  {pagination?.total ?? 0}
                </Box>
              </Box>
              <Pagination
                size="small"
                count={pagination?.last_page || 1}
                page={page}
                per_page={4}
                from={pagination?.from}
                to={pagination?.to}
                total={pagination?.total}
                onChange={(event, value) => {
                  setPage(value);
                  document.getElementById("variations-top")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                variant={"outlined"}
                color={"secondary"}
                sx={{
                  "& .MuiPagination-ul": { gap: "6px" },
                  "& .MuiPaginationItem-root": {
                    minWidth: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#475569",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    margin: 0,
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                      borderColor: "#cbd5e1",
                      color: "#0f172a",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#0f172a !important",
                      color: "#ffffff !important",
                      borderColor: "#0f172a !important",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.2)",
                    },
                  },
                }}
              />
            </Box>
          )}
          <Divider sx={{ my: 2.5, borderColor: "#eef2f6" }} />
        </Grid>

        {/* Add-on Buttons Row */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
            <Button
              className="custom-secondary-btn-admin-side"
              disabled={true}
              sx={{
                borderRadius: "12px !important",
                px: "18px !important",
                py: "8px !important",
                fontSize: "13px !important",
                fontWeight: "600 !important",
                textTransform: "none !important",
                "&.Mui-disabled": {
                  backgroundColor: "#f1f5f9 !important",
                  color: "#94a3b8 !important",
                  border: "1px solid #e2e8f0 !important",
                },
              }}
            >
              <CheckBoxIcon sx={{ mr: 1, fontSize: 18 }} />
              Included In the Box
            </Button>
            <Button
              className="custom-secondary-btn-admin-side"
              disabled={true}
              sx={{
                borderRadius: "12px !important",
                px: "18px !important",
                py: "8px !important",
                fontSize: "13px !important",
                fontWeight: "600 !important",
                textTransform: "none !important",
                "&.Mui-disabled": {
                  backgroundColor: "#f1f5f9 !important",
                  color: "#94a3b8 !important",
                  border: "1px solid #e2e8f0 !important",
                },
              }}
            >
              <LocalMallIcon sx={{ mr: 1, fontSize: 18 }} />
              Buy It With
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <Divider sx={{ my: 2, borderColor: "#eef2f6" }} />
        </Grid>

        {/* Bottom Navigation & Publish Bar */}
        <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ textAlign: "end" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              onClick={() => handleBackStep()}
              className="custom-primary-btn-admin-side"
              disabled={loadingBtn}
              sx={{
                backgroundColor: "#ffffff !important",
                backgroundImage: "none !important",
                color: "#0f172a !important",
                border: "1px solid #e2e8f0 !important",
                borderRadius: "999px !important",
                px: "22px !important",
                py: "9px !important",
                fontSize: "13.5px !important",
                fontWeight: "600 !important",
                textTransform: "none !important",
                boxShadow: "none !important",
                "&:hover": {
                  backgroundColor: "#f8fafc !important",
                  borderColor: "#cbd5e1 !important",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#f1f5f9 !important",
                  color: "#94a3b8 !important",
                },
              }}
            >
              <ArrowBackIcon sx={{ mr: 0.75, fontSize: 18 }} /> Back
            </Button>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
              <Button
                onClick={() =>
                  handleSubmitStep2(0, secondStepDataTI?.product_type)
                }
                className="custom-primary-btn-admin-side"
                disabled={
                  loadingBtn ||
                  (!simpleProductStep2Data?.regular_price &&
                    secondStepDataTI?.product_type == 1) ||
                  (!simpleProductStep2Data?.sale_price &&
                    secondStepDataTI?.product_type == 1) ||
                  (variationsDataProducts?.length == 0 &&
                    secondStepDataTI?.product_type == 2) ||
                  (!isVariationsValid && secondStepDataTI?.product_type == 2)
                }
                sx={{
                  backgroundColor: "#0f172a !important",
                  backgroundImage: "none !important",
                  color: "#ffffff !important",
                  borderRadius: "999px !important",
                  px: "22px !important",
                  py: "9px !important",
                  fontSize: "13.5px !important",
                  fontWeight: "600 !important",
                  textTransform: "none !important",
                  "&:hover": {
                    backgroundColor: "#1e293b !important",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#e2e8f0 !important",
                    color: "#94a3b8 !important",
                  },
                }}
              >
                {loadingBtn && isPublishing === 0 ? (
                  <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                ) : (
                  <DraftsIcon sx={{ mr: 1, fontSize: 18 }} />
                )}
                Draft
              </Button>
              <Button
                onClick={() =>
                  handleSubmitStep2(1, secondStepDataTI?.product_type)
                }
                className="custom-primary-btn-admin-side"
                disabled={
                  loadingBtn ||
                  (!simpleProductStep2Data?.regular_price &&
                    secondStepDataTI?.product_type == 1) ||
                  (!simpleProductStep2Data?.sale_price &&
                    secondStepDataTI?.product_type == 1) ||
                  (variationsDataProducts?.length == 0 &&
                    secondStepDataTI?.product_type == 2) ||
                  (!isVariationsValid && secondStepDataTI?.product_type == 2)
                }
                sx={{
                  backgroundColor: "#10b981 !important",
                  backgroundImage: "none !important",
                  color: "#ffffff !important",
                  borderRadius: "999px !important",
                  px: "24px !important",
                  py: "9px !important",
                  fontSize: "13.5px !important",
                  fontWeight: "600 !important",
                  textTransform: "none !important",
                  boxShadow:
                    "0 6px 16px -3px rgba(16, 185, 129, 0.35) !important",
                  "&:hover": {
                    backgroundColor: "#059669 !important",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#e2e8f0 !important",
                    color: "#94a3b8 !important",
                    boxShadow: "none !important",
                  },
                }}
              >
                {loadingBtn && isPublishing === 1 ? (
                  <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                ) : (
                  <PublishIcon sx={{ mr: 1, fontSize: 18 }} />
                )}
                Publish
              </Button>
              <Button
                // onClick={toggleDrawer(true)}
                disabled={true}
                sx={{
                  borderRadius: "999px !important",
                  px: "20px !important",
                  py: "9px !important",
                  fontSize: "13px !important",
                  fontWeight: "600 !important",
                  textTransform: "none !important",
                  "&.Mui-disabled": {
                    backgroundColor: "#f1f5f9 !important",
                    color: "#94a3b8 !important",
                    border: "1px solid #e2e8f0 !important",
                  },
                }}
                className="custom-secondary-btn-admin-side"
              >
                <DraftsIcon sx={{ mr: 1, fontSize: 17 }} /> Draft And Stock
              </Button>
              <Button
                // onClick={toggleDrawer(true)}
                className="custom-secondary-btn-admin-side"
                disabled={true}
                sx={{
                  borderRadius: "999px !important",
                  px: "20px !important",
                  py: "9px !important",
                  fontSize: "13px !important",
                  fontWeight: "600 !important",
                  textTransform: "none !important",
                  "&.Mui-disabled": {
                    backgroundColor: "#f1f5f9 !important",
                    color: "#94a3b8 !important",
                    border: "1px solid #e2e8f0 !important",
                  },
                }}
              >
                <PublishIcon sx={{ mr: 1, fontSize: 17 }} /> Publish And Stock
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Step2;
