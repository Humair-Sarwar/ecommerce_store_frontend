import {
  Autocomplete,
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
  useUpdateAttributeSortOrder,
  useUpdateVariation,
} from "../../../hook/vendor/useProducts";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router";
import { handleError, handleSuccess } from "../../../toast";
import LoaderSpinner from "../../../components/LoaderSpinner";
import DeleteIcon from "@mui/icons-material/Delete";

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

  return (
    <>
      <Grid id="variations-top" container spacing={1.3}>
        <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ mb: 2 }}>
          <FormControl
            fullWidth
            size="small"
            color="secondary"
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
              <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ mb: 1 }}>
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
                        name="is_active_for_buy"
                        checked={true}
                        disabled
                        // onChange={handleChange}
                      />
                    }
                    label="Raw Material"
                  />
                  <FormControlLabel
                    sx={{
                      mr: 5,
                      "& .MuiFormControlLabel-label": { fontSize: "14px" },
                    }}
                    control={
                      <Checkbox
                        size="small"
                        color="secondary"
                        name="is_on_sale"
                        type="checkbox"
                        checked={Boolean(simpleProductStep2Data.is_on_sale)}
                        onChange={handleInputChange}
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
                  error={!simpleProductStep2Data.product_sku} // Highlights red if empty
                  helperText={
                    !simpleProductStep2Data.product_sku ? "SKU is required" : ""
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth size="small">
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
                  value={simpleProductStep2Data.min_stock_alert || ""}
                  onChange={handleInputChange}
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
                  value={simpleProductStep2Data.regular_price || 0}
                  onChange={handleInputChange}
                  required
                  error={!!errors.regular_price}
                  helperText={errors.regular_price}
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
                  value={simpleProductStep2Data.sale_price || 0}
                  onChange={handleInputChange}
                  required
                  error={!!errors.sale_price}
                  helperText={errors.sale_price}
                />
              </Grid>
              {/* <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label" color="secondary">
                  IMEI/Serial No
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={secondStepDataTI?.product_type}
                  label="Age"
                  onChange={handleChange}
                  color="secondary"
                >
                  <MenuItem value={11} sx={{ fontSize: "14px" }}>
                    IMEI No
                  </MenuItem>
                  <MenuItem value={22} sx={{ fontSize: "14px" }}>
                    Serial No
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
              {/* <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="IMEI/Serial No"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid> */}
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth size="small">
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
                <FormControl fullWidth size="small">
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
                <FormControl fullWidth size="small">
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
                <FormControl fullWidth size="small">
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
                  options={["first"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Attach Warranty Policy" />
                  )}
                  size="small"
                  fullWidth
                  color="secondary"
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Autocomplete
                  disablePortal
                  options={["first"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Attach Return Policy" />
                  )}
                  size="small"
                  fullWidth
                  color="secondary"
                  disabled
                />
              </Grid>

              {/* <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="Weight(kg)"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="Length(cm)"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="Width(cm)"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="Height(cm)"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid> */}

              <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ mt: 1 }}>
                <Button
                  className="custom-secondary-btn-admin-side"
                  disabled={true}
                  sx={{
                    "&.Mui-disabled": {
                      backgroundColor: "#e0e0e0 !important",
                      color: "#9e9e9e !important",
                    },
                    mr: 1,
                  }}
                >
                  <HelpIcon sx={{ mr: 1 }} />
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
                    sx={{
                      "&.Mui-disabled": {
                        backgroundColor: "#e0e0e0 !important",
                        color: "#9e9e9e !important",
                      },
                      mr: 1,
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
              <Grid item size={{ xs: 12, sm: 12, md: 12 }} sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: "16px 24px",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    border: "1px solid #e5e5e7",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    transition: "all 0.3s ease",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    gap: 3,
                    "&:hover": {
                      borderColor: "#0071e3",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
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
                            flexDirection: { xs: "column", md: "row" }, // Mobile pe stack, Desktop pe row
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          {/* 1. Category Label Section */}
                          <Box sx={{ minWidth: "120px" }}>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#86868b",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
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
                              gap: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#1d1d1f",
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
                                border: "1px dashed black",
                                p: "5px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              {attributes?.terms?.map((term, k) => (
                                <Box
                                  key={k}
                                  sx={{
                                    px: 1,
                                    py: 0.6,
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    bgcolor: "#f5f5f7",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: "#1d1d1f",
                                    border: "1px solid #d2d2d7",
                                    "&:hover": { bgcolor: "#e8e8ed" },
                                  }}
                                >
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
                                        color:
                                          (removeTermWithVariations?.isPending ||
                                            removeTermWithVariations?.isLoading ||
                                            selectedTermsAttDataLoading) &&
                                          "#ccc !important",
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
                                          "#ccc !important",
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
                              gap: 1.5,
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
                              sx={{ width: "110px" }}
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
                                startIcon={<SaveIcon sx={{ fontSize: 18 }} />}
                                sx={{
                                  bgcolor: "#1d1d1f",
                                  borderRadius: "12px",
                                  textTransform: "none",
                                  fontWeight: 600,
                                  height: "38px",
                                  px: 3,
                                  "&:hover": { bgcolor: "#000" },
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
                                    bgcolor: "rgba(255, 59, 48, 0.1)",
                                    color: "#ff3b30",
                                    borderRadius: "12px",
                                    height: "38px",
                                    width: "38px",
                                    "&:hover": {
                                      bgcolor: "rgba(255, 59, 48, 0.2)",
                                    },
                                  }}
                                >
                                  <DeleteIcon />
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
                  variationsDataProducts?.length > 0
                }
                className="custom-secondary-btn-admin-side"
                onClick={
                  handleGenerateVariations || generateVariations?.isPending
                }
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#e0e0e0 !important",
                    color: "#9e9e9e !important",
                  },
                }}
              >
                Get All Variations of Product
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <Divider sx={{ my: 4 }} />
            </Grid>
            {/* Map through the variations data */}
            {variations?.map((variation, index) => (
              <React.Fragment key={variation.id || index}>
                {/* Header Section for each Variation */}
                <Grid
                  size={{ xs: 12, sm: 6, md: 12 }}
                  sx={{ mt: index !== 0 ? 4 : 0 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid rgb(197, 196, 196)",
                      borderRadius: "10px",
                      padding: "2px 15px",
                      height: "100%",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {/* Render individual variation terms (e.g., Ice Blue, 128GB) */}
                    <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
                      {variation.variation_terms?.map((term) => (
                        <Box
                          key={term.term_id}
                          sx={{
                            border: "1px dotted #acacacff",
                            borderRadius: "5px",
                            padding: "2px 8px",
                            fontWeight: "600",
                            fontSize: "13px",
                            backgroundColor: "#fff",
                          }}
                        >
                          {term.term_title}
                        </Box>
                      ))}
                    </Box>

                    <FormControlLabel
                      disabled
                      sx={{
                        mr: 5,
                        "& .MuiFormControlLabel-label": { fontSize: "14px" },
                      }}
                      control={
                        <Checkbox
                          size="small"
                          color="secondary"
                          checked={true}
                        />
                      }
                      label="Raw Material"
                    />
                    <FormControlLabel
                      sx={{
                        mr: 5,
                        "& .MuiFormControlLabel-label": { fontSize: "14px" },
                      }}
                      control={
                        <Checkbox
                          size="small"
                          color="secondary"
                          // Convert integer (1/0) from state to boolean (true/false)
                          checked={variation.is_on_sale === 1}
                          onChange={(e) => {
                            // Convert boolean back to integer for your Laravel backend
                            const newValue = e.target.checked ? 1 : 0;
                            handleVariationChange(
                              index,
                              "is_on_sale",
                              newValue,
                            );
                          }}
                        />
                      }
                      label="Is on sale"
                    />
                  </Box>
                </Grid>

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
                      handleVariationChange(index, "title", e.target.value)
                    }
                  />
                </Grid>

                {/* SKU and Stock Info */}
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>image</Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
                    label="SKU"
                    fullWidth
                    size="small"
                    color="secondary"
                    variant="outlined"
                    // Use the error state we created earlier
                    error={!!errorsVar[`${index}-product_sku`]}
                    helperText={errorsVar[`${index}-product_sku`]}
                    // Change defaultValue to value for controlled state
                    value={variation.product_sku || ""}
                    // Update state on every change
                    onChange={(e) =>
                      handleVariationChange(
                        index,
                        "product_sku",
                        e.target.value,
                      )
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel color="secondary">Product Status</InputLabel>
                    <Select
                      // value use karein taake state se sync rahe
                      value={variation.product_status_stock === 1 ? 11 : 22}
                      label="Product Status"
                      color="secondary"
                      onChange={(e) => {
                        // Agar value 11 hai (In Stock) toh state mein 1 save karein, warna 0
                        const updatedStatus = e.target.value === 11 ? 1 : 0;
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
                    type="number" // Numeric input ke liye
                    // Value ko state se link karein
                    value={variation.min_stock_alert || 0}
                    // Change handler attach karein
                    onChange={(e) =>
                      handleVariationChange(
                        index,
                        "min_stock_alert",
                        e.target.value,
                      )
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
                    label="Regular Price"
                    fullWidth
                    size="small"
                    type="number"
                    value={variation.regular_price || 0}
                    // Show error state if price is 0
                    error={variation.regular_price <= 0}
                    helperText={
                      variation.regular_price <= 0 ? "Price cannot be zero" : ""
                    }
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? 0 : parseFloat(e.target.value);
                      handleVariationChange(index, "regular_price", val);
                      handleVariationChange(index, "sale_price", val);
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
  label="Sale Price"
  fullWidth
  size="small"
  type="number"
  value={variation.sale_price || 0}
  // Highlight red if 0 or if higher than regular price
  error={variation.sale_price <= 0 || variation.sale_price > variation.regular_price}
  helperText={
    variation.sale_price <= 0 
      ? "Sale price required" 
      : variation.sale_price > variation.regular_price 
      ? "Cannot exceed regular price" 
      : ""
  }
  onChange={(e) => {
    const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
    handleVariationChange(index, "sale_price", val);
  }}
/>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel
                      id={`release-year-label-${index}`}
                      color="secondary"
                    >
                      Release Year
                    </InputLabel>
                    <Select
                      labelId={`release-year-label-${index}`}
                      id={`release_year_${index}`}
                      // Variations array se value uthayein
                      value={variation.release_year || 0}
                      label="Release Year"
                      color="secondary"
                      // Handle change for specific variation index
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
                  <FormControl fullWidth size="small">
                    <InputLabel id={`network-label-${index}`} color="secondary">
                      Network
                    </InputLabel>
                    <Select
                      labelId={`network-label-${index}`}
                      id={`network_${index}`}
                      name="network"
                      // Local state se value lein
                      value={variation.network ?? 0}
                      label="Network"
                      color="secondary"
                      // handleVariationChange use karein index ke saath
                      onChange={(e) =>
                        handleVariationChange(index, "network", e.target.value)
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
                  <FormControl fullWidth size="small">
                    <InputLabel id={`sim-label-${index}`} color="secondary">
                      SIM
                    </InputLabel>
                    <Select
                      labelId={`sim-label-${index}`}
                      id={`sim-${index}`}
                      value={variation.SIM ?? 0}
                      label="SIM"
                      color="secondary"
                      onChange={(e) =>
                        handleVariationChange(index, "SIM", e.target.value)
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
                  <FormControl fullWidth size="small">
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
                      <TextField {...params} label="Attach Warranty Policy" />
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
                      <TextField {...params} label="Attach Return Policy" />
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
                      handleVariationChange(index, "meta_title", e.target.value)
                    }
                    label="Meta Title"
                    fullWidth
                    size="small"
                    color="secondary"
                    variant="outlined"
                    placeholder="Write meta title..."
                    helperText={`${(variation.meta_title || "").length}/60 characters`}
                    error={(variation.meta_title || "").length > 60}
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
                    // SEO best practice: 160 characters limit
                    helperText={`${(variation.meta_description || "").length}/160 characters`}
                    error={(variation.meta_description || "").length > 160}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                  <TextField
                    id={`keywords_${index}`}
                    name="keywords"
                    value={variation.keywords || ""}
                    onChange={(e) =>
                      handleVariationChange(index, "keywords", e.target.value)
                    }
                    label="Keywords"
                    fullWidth
                    size="small"
                    color="secondary"
                    variant="outlined"
                    placeholder="e.g. iPhone 17, 128GB, Unlocked, Space Gray"
                    helperText="Separate keywords with commas"
                  />
                </Grid>

                {/* Description Editor for each variation */}
                <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ mb: 2 }}>
                  <Box component={"h3"} sx={{ fontSize: "12px", mb: 1, mt: 2 }}>
                    Variation Description:
                  </Box>
                  <TextEditor
                    label="Description"
                    // Ensure the editor displays the current state value
                    value={variation.description || ""}
                    // Capture content changes and update the variations state
                    onChange={(content) => {
                      handleVariationChange(
                        index,
                        "description",
                        content, // Typically the HTML string from the editor
                      );
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      className="custom-secondary-btn-admin-side"
                      disabled={true}
                      sx={{
                        "&.Mui-disabled": {
                          backgroundColor: "#e0e0e0 !important",
                          color: "#9e9e9e !important",
                        },
                        mr: 1,
                      }}
                    >
                      <HelpIcon sx={{ mr: 1 }} />
                      Add Question/Options Or Description
                    </Button>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <FormControlLabel
                        sx={{
                          mr: 5,
                          "& .MuiFormControlLabel-label": { fontSize: "14px" },
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
                          />
                        }
                        label="Default"
                      />
                      <Button
                        className="custom-secondary-btn-admin-side"
                        onClick={() => handleUpdate(variation)}
                        disabled={updateVariation.isPending}
                        sx={{
                          "&.Mui-disabled": {
                            backgroundColor: "#e0e0e0 !important",
                            color: "#9e9e9e !important",
                          },
                        }}
                      >
                        {updateVariation.isPending ? (
                          <>
                            <CircularProgress
                              size={20}
                              color="inherit"
                              sx={{ mr: 1 }}
                            />
                            Saving...
                          </>
                        ) : (
                          <>
                            <SaveIcon sx={{ mr: 1 }} />
                            Save
                          </>
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                  <Divider sx={{ my: 2, borderColor: "#e0e0e0" }} />
                </Grid>
              </React.Fragment>
            ))}
          </>
        )}
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          {variationsDataProducts?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between !important",
                width: "100%",
                mt: 1,
              }}
            >
              <Box sx={{ mb: 0, fontSize: "14px" }}>
                Showing {pagination?.from} - {pagination?.to} of{" "}
                {pagination?.total}
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
              />
            </Box>
          )}
          <Divider sx={{ my: 4 }} />
        </Grid>
        <Button
          className="custom-secondary-btn-admin-side"
          disabled={true}
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "#e0e0e0 !important",
              color: "#9e9e9e !important",
            },
            mr: 1,
          }}
        >
          <CheckBoxIcon sx={{ mr: 1 }} />
          Included In the Box
        </Button>
        <Button
          className="custom-secondary-btn-admin-side"
          disabled={true}
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "#e0e0e0 !important",
              color: "#9e9e9e !important",
            },
            mr: 1,
          }}
        >
          <LocalMallIcon sx={{ mr: 1 }} />
          Buy It With
        </Button>
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <Divider sx={{ my: 4 }} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ textAlign: "end" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => handleBackStep()}
              className="custom-primary-btn-admin-side"
              disabled={loadingBtn}
              sx={{
                "&.Mui-disabled": {
                  backgroundColor: "#e0e0e0 !important",
                  color: "#9e9e9e !important",
                },
                mr: 1,
              }}
            >
              <ArrowBackIcon /> Back
            </Button>
            <Box>
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
                  "&.Mui-disabled": {
                    backgroundColor: "#e0e0e0 !important",
                    color: "#9e9e9e !important",
                  },
                  mr: 1,
                }}
              >
                {loadingBtn && isPublishing === 0 ? (
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                ) : (
                  <DraftsIcon sx={{ mr: 1 }} />
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
                  "&.Mui-disabled": {
                    backgroundColor: "#e0e0e0 !important",
                    color: "#9e9e9e !important",
                  },
                  mr: 1,
                }}
              >
                {loadingBtn && isPublishing === 1 ? (
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                ) : (
                  <PublishIcon sx={{ mr: 1 }} />
                )}
                Publish
              </Button>
              <Button
                // onClick={toggleDrawer(true)}
                disabled={true}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#e0e0e0 !important",
                    color: "#9e9e9e !important",
                  },
                  mr: 1,
                }}
                className="custom-secondary-btn-admin-side"
              >
                <DraftsIcon sx={{ mr: 1 }} /> Draft And Stock
              </Button>
              <Button
                // onClick={toggleDrawer(true)}

                className="custom-secondary-btn-admin-side"
                disabled={true}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#e0e0e0 !important",
                    color: "#9e9e9e !important",
                  },
                }}
              >
                <PublishIcon sx={{ mr: 1 }} /> Publish And Stock
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Step2;
