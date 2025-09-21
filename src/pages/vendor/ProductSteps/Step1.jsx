import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TextEditor from "../../../components/TextEditor";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Step2 from "./Step2";
import Steppers from "../../../components/Steper";
import { getBrandsForProductsApi } from "../../../utils/apis/APIs";
import { useFormik } from "formik";
import * as yup from "yup";
import { generateSlug } from "../../../utils/apis/slugGenerate";
const Step1 = () => {
  const [brand, setBrand] = React.useState("");
  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  const [step2, setStep2] = useState(false);

  const handleBackStep = () => {
    setStep2(false);
  };
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandsList, setBrandsList] = useState([]);
  const getBrandsForProducts = async () => {
    const res = await getBrandsForProductsApi({
      business_id: "123",
      is_active: true,
    });
    if (res.status == 200) {
      setBrandsList(res.data.brands);
    }
  };

  useEffect(() => {
    getBrandsForProducts();
  }, []);

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
      is_active_for: 1,
      product_condition: 1,
      name: "",
      is_active_for_web: false,
      is_active_for_pos: true,
      is_hot_list: false,
      category_id: "1e24a625-1680-4891-975a-c4d5de6e2b22",
      brand_id: selectedBrand?.id || "", // Use the selected brand's ID
      product_description: "",
      product_no: 123456,
      is_draft: false,
      business_id: "123",
    },
    validationSchema: yup.object({
      name: yup.string().min(3).max(200).required("Title is required!"),
      category_id: yup.string().required("Select Category!!"),
      brand_id: yup.string().required("Select Brand!"),
    }),
    onSubmit: async (values, action) => {
      const slug = await generateSlug(values.name);

      console.log(values, "form values ", slug);
      setStep2(true);
    },
  });

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
          <AddIcon sx={{ mr: 1, fontSize: "17px" }} color="secondary" /> Add
          Product {step2 ? `(${"Apple iPhone 14 Pro Max"})` : ""}
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
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <InputLabel id="is-active-for-label" color="secondary">
                    Active For
                  </InputLabel>
                  <Select
                    labelId="is-active-for-label"
                    id="is_active_for"
                    name="is_active_for"
                    value={values.is_active_for}
                    onChange={handleChange}
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
                  <InputLabel id="demo-simple-select-label" color="secondary">
                    Condition
                  </InputLabel>
                  <Select
                    labelId="product_condition-select-label"
                    id="product_condition"
                    name="product_condition"
                    value={values.product_condition}
                    label="Brand"
                    onChange={handleChange}
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
              <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                <TextField
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.name && touched.name)}
                  label="Title"
                  fullWidth
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
                {touched.name && errors.name && (
                  <Typography sx={{ fontSize: "12px", color: "red", mt: 0.5 }}>
                    {errors.name}
                  </Typography>
                )}
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md:
                    values.is_active_for_web || values.is_active_for_pos
                      ? 4
                      : 12,
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
                        name="is_active_for_web"
                        checked={values.is_active_for_web}
                        onChange={handleChange}
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
                    control={
                      <Checkbox
                        size="small"
                        color="secondary"
                        name="is_active_for_pos"
                        checked={values.is_active_for_pos}
                        onChange={handleChange}
                      />
                    }
                    label="POS"
                  />
                  {values.is_active_for_pos && (
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
                          name="is_hot_list"
                          checked={values.is_hot_list}
                          onChange={handleChange}
                        />
                      }
                      label="Hot"
                    />
                  )}
                </Box>
              </Grid>
              {values.is_active_for_web || values.is_active_for_pos ? (
                <>
                  {" "}
                  <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                    <Button
                      // onClick={toggleDrawer(true)}
                      fullWidth
                      className="custom-primary-btn-admin-side"
                    >
                      Select Parent Category
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Autocomplete
                      disablePortal
                      options={brandsList}
                      getOptionLabel={(option) => option.brand_name || ""}
                      onChange={(event, newValue) => {
                        setSelectedBrand(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Brands" />
                      )}
                      size="small"
                      fullWidth
                      id="brand"
                      color="secondary"
                      name="brand_id"
                      value={selectedBrand?.brand_name || ""}
                      onBlur={handleBlur}
                      error={Boolean(errors.brand_id && touched.brand_id)}
                    />
                    {touched.brand_id && errors.brand_id && (
                      <Typography
                        sx={{ fontSize: "12px", color: "red", mt: 0.5 }}
                      >
                        {errors.brand_id}
                      </Typography>
                    )}
                  </Grid>
                </>
              ) : (
                ""
              )}
              {values.is_active_for_web && (
                <>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                      id="outlined-basic"
                      label="Days"
                      value={1}
                      fullWidth
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                      id="outlined-basic"
                      label="Hours"
                      value={1}
                      fullWidth
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                      id="outlined-basic"
                      label="Mints"
                      value={1}
                      fullWidth
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  </Grid>
                </>
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
                        name="is_active_for_buy"
                        checked={true}
                        // onChange={handleChange}
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
                    control={
                      <Checkbox
                        size="small"
                        color="secondary"
                        name="is_active_for_buy"
                        checked={true}
                        // onChange={handleChange}
                      />
                    }
                    label="Get Stock Alert"
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
                    label="Offer Allowed"
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#f6f9fc",
                    border: "1.5px dashed rgb(227, 233, 239)",
                    p: 4,
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    height: "200px",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ borderRadius: "35px", textTransform: "capitalize" }}
                  >
                    <InsertPhotoIcon sx={{ mr: 1 }} /> Select Image from Media
                  </Button>
                  <Box
                    component={"p"}
                    sx={{ fontSize: "12px", color: "#9f9f9fff", mt: 1 }}
                  >
                    Upload 280*280 jpeg/png image
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Box component={"h3"} sx={{ fontSize: "12px", mb: 1, mt: 2 }}>
                  Product Description:
                </Box>
                <TextEditor />
              </Grid>
              <Grid
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{ textAlign: "end", mt: 1 }}
              >
                <Button
                  className="custom-secondary-btn-admin-side"
                  onClick={handleSubmit}
                >
                  <ArrowForwardIcon sx={{ mr: 1 }} />
                  Next
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Step2 handleBackStep={handleBackStep} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Step1;
