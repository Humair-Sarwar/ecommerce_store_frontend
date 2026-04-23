import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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
  useFetchProductSimpleStep2,
} from "../../../hook/vendor/useProducts";
import { useNavigate } from "react-router";
import { handleError, handleSuccess } from "../../../toast";
import LoaderSpinner from "../../../components/LoaderSpinner";

const Step2 = ({
  handleBackStep,
  secondStepDataTI,
  setSecondStepDataTI,
  handleUpdateType,
  productId,
  setProductTitle,
  productTitle,
}) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const validateFields = () => {
  let tempErrors = {};
  const { product_sku, regular_price, sale_price } = simpleProductStep2Data;

  // 1. SKU Validation
  if (!product_sku?.trim()) {
    tempErrors.product_sku = "SKU is required";
  }

  // 2. Regular Price Validation
  if (regular_price === "" || regular_price === null || regular_price === undefined) {
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
    tempErrors.sale_price = "Sale price must be less or equal to regular price";
  }

  setErrors(tempErrors);
  return Object.keys(tempErrors).length === 0;
};
  const { data, isLoading, isError } = useFetchProductSimpleStep2(productId, {
    enabled: !!productId && secondStepDataTI?.product_type === 1,
  });
  const product = data?.data;
  const createStep2 = useCreateProductStep2();

  useEffect(() => {
    if (product && secondStepDataTI?.product_type === 1) {
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
  }, [product, secondStepDataTI]);
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

    setSimpleProductStep2Data((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmitStep2 = (publish) => {
    if (secondStepDataTI?.product_type == 1) {
      if (!validateFields()) {
        handleError("Please fix the errors in the form.");
        return;
      }
      const payload = {
        id: productId, // 👈 required
        ...simpleProductStep2Data,
        product_type: secondStepDataTI?.product_type,
        is_published: publish,
      };

      createStep2.mutate(payload, {
        onSuccess: (res) => {
          if(publish == 1){
            handleSuccess("Product Published successfully!");
          }else{
            handleSuccess("Product Draft successfully!");
          }
          
          setTimeout(() => {
            navigate("/vendor/products", { replace: true });
          }, 100);
        },
        onError: (error) => {
          const apiErrors = error?.response?.data?.error;
          const message = error?.response?.data?.message;

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
  return (
    <>
      <Grid container spacing={1.3}>
        <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ mb: 2 }}>
          <FormControl fullWidth size="small" color="secondary">
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

        {secondStepDataTI?.product_type == 1 ? isLoading ? <LoaderSpinner/> : (
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
                value={simpleProductStep2Data.regular_price || ""}
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
                value={simpleProductStep2Data.sale_price || ""}
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
        ) : (
          <>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Autocomplete
                disablePortal
                options={["first"]}
                renderInput={(params) => (
                  <TextField {...params} label="Select Attribute" />
                )}
                size="small"
                fullWidth
                color="secondary"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 8 }}>
              <MultipleSelectChip />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 1 }}>
              <Button
                // onClick={toggleDrawer(true)}

                className="custom-primary-btn-admin-side"
                sx={{ mr: 1 }}
              >
                Save
              </Button>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <Button
                // onClick={toggleDrawer(true)}

                className="custom-secondary-btn-admin-side"
                sx={{ mr: 1 }}
              >
                Get All Variations of Product
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <Divider sx={{ my: 4 }} />
            </Grid>

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
                <Box
                  sx={{
                    border: "1px dotted #acacacff",
                    borderRadius: "5px",
                    padding: "2px 5px",
                    mr: 2,
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                >
                  Ice Blue
                </Box>
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
                      // onChange={handleChange}
                    />
                  }
                  label="Raw Material"
                />
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
                      // onChange={handleChange}
                    />
                  }
                  label="Is on sale"
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <TextField
                id="outlined-basic"
                label="Variation Title"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>image</Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="SKU"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label" color="secondary">
                  Product Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={productType}
                  label="Age"
                  onChange={handleChange}
                  color="secondary"
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
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="Min Stock Alert"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="Regular Price"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="Sale Price"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="Wholesale Price"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label" color="secondary">
                  IMEI/Serial No
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={productType}
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
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="outlined-basic"
                label="IMEI/Serial No"
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
              />
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
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ mb: 2 }}>
              <Box component={"h3"} sx={{ fontSize: "12px", mb: 1, mt: 2 }}>
                Variation Description:
              </Box>
              <TextEditor />
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
                <Button
                  className="custom-primary-btn-admin-side"
                  sx={{ mr: 1 }}
                >
                  <SaveIcon sx={{ mr: 1 }} />
                  Save
                </Button>
              </Box>
            </Grid>
          </>
        )}
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
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
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon /> Back
            </Button>
            <Box>
              <Button
                onClick={() => {
                  handleSubmitStep2(0);
                }}
                className="custom-primary-btn-admin-side"
                disabled={
                  !simpleProductStep2Data?.regular_price ||
                  !simpleProductStep2Data?.sale_price
                }
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#e0e0e0 !important",
                    color: "#9e9e9e !important",
                  },
                  mr: 1,
                }}
              >
                <DraftsIcon sx={{ mr: 1 }} /> Draft
              </Button>
              <Button
                onClick={() => {
                  handleSubmitStep2(1);
                }}
                className="custom-primary-btn-admin-side"
                disabled={
                  !simpleProductStep2Data?.regular_price ||
                  !simpleProductStep2Data?.sale_price
                }
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#e0e0e0 !important",
                    color: "#9e9e9e !important",
                  },
                  mr: 1,
                }}
              >
                <PublishIcon sx={{ mr: 1 }} /> Publish
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
