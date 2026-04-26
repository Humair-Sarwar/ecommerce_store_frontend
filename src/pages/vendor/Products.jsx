import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteProduct,
  useFetchProducts,
  useUpdateProductPublish,
} from "../../hook/vendor/useProducts";
import PaginationSet from "../../components/PaginationSet";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import { handleError, handleSuccess } from "../../toast";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useFetchBrandsPanel } from "../../hook/vendor/useBrand";

const Products = () => {
  const [isExpandFilters, setIsExpandFilters] = useState(false);
  const [searchBy, setSearchBy] = useState(2); // 1 for SKU, 2 for Title
  const [searchTerm, setSearchTerm] = useState("");
  const [listingType, setListingType] = useState("");
  const [purposeType, setPurposeType] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [activeFor, setActiveFor] = useState("");
  const [searchByBrand, setSearchByBrand] = useState("");
  const navigation = useNavigate();
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(15);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useFetchProducts({
    page,
    per_page,
    search_product_purpose: purposeType,
    search_product_type: listingType,
    search_by_title: searchBy === 2 ? searchTerm : "",
    search_by_sku: searchBy === 1 ? searchTerm : "",
    search_product_stock_status: stockStatus,
    search_product_status: postStatus,
    search_active_for: activeFor,
    search_by_brand: searchByBrand,
  });
  const products = data?.data || [];
  const deleteProduct = useDeleteProduct();
  const pagination = data?.pagination;

  const updatePublish = useUpdateProductPublish();

  const handlePublishToggle = (productId, isPublished) => {
    const payload = {
      id: productId,
      is_published: isPublished ? 1 : 0,
    };

    updatePublish.mutate(payload, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Publish status updated!");
      },
      onError: (error) => {
        handleError(
          error?.response?.data?.message || "Failed to update status",
        );
      },
    });
  };

  const {
    data: forSearchBrand,
    isLoading: forSearchBrandLoading,
    isError: forSearchBrandErrors,
  } = useFetchBrandsPanel();
  const filterBrands = forSearchBrand?.data || [];

  const handleDeleteBrand = (id) => {
    deleteProduct.mutate(id?.id, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Product deleted successfully!");
      },
      onError: (error) => {
        const status = error?.response?.status;

        if (status === 404) {
          handleError("Product not found!");
        } else {
          handleError(
            error?.response?.data?.message || "Failed to delete product!",
          );
        }
      },
    });
  };
  console.log(products, "--------------PRODUCTS--------------");
  const handleExpandBtn = () => {
    setIsExpandFilters(!isExpandFilters);
  };
  return (
    <Box
      sx={{
        width: "100%",
        py: 3,
        overflowY: "auto",
        backgroundColor: "#f0f0f0",
        height: "calc(100vh - 60px)",
      }}
      // className="pages-admin-target-style"
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
          <LocalMallIcon
            sx={{ mr: 1, fontSize: "17px" }}
            color="secondary"
          />{" "}
          Products
        </Box>
        <Box sx={{ textAlign: "end", mb: 2 }}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size="small">
                <Select
                  labelId="search-by-select"
                  id="search-by-select"
                  value={searchBy}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setSearchBy(newValue);

                    setSearchTerm("");
                    setListingType("");
                    setPurposeType("");
                    setStockStatus("");
                    setPostStatus("");
                    setActiveFor("");
                    setSearchByBrand("");
                  }}
                  displayEmpty
                  renderValue={(selected) => {
                    let label = selected === 2 ? "Title" : "SKU";

                    return (
                      <span style={{ fontSize: "14px" }}>
                        <b style={{ color: "#666" }}>Search by: </b> {label}
                      </span>
                    );
                  }}
                  sx={{
                    borderRadius: "8px",
                    bgcolor: "white",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                >
                  <MenuItem value={1} sx={{ fontSize: "14px" }}>
                    SKU
                  </MenuItem>
                  <MenuItem value={2} sx={{ fontSize: "14px" }}>
                    Title
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                size="small"
                id="search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1)
                }}
                placeholder={
                  searchBy === 1 ? "Search SKU..." : "Search Title..."
                }
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ color: "gray", fontSize: "20px" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    "&:hover fieldset": {
                      borderColor: "#9c27b0", // Purple hover effect (optional)
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl disabled={searchBy == 1} fullWidth size="small">
                <Select
                  labelId="listing-type"
                  id="listing-type"
                  value={listingType || ""} // State variable connect karein
                  onChange={(e) => {setListingType(e.target.value)
                    setPage(1)
                  }}
                  displayEmpty
                  renderValue={(selected) => {
                    // Mapping values to labels
                    const labels = {
                      "": "All",
                      1: "Simple",
                      2: "Variable",
                    };

                    return (
                      <span style={{ fontSize: "14px" }}>
                        <b style={{ color: "#666" }}>Listing: </b>{" "}
                        {labels[selected] || "All"}
                      </span>
                    );
                  }}
                  sx={{
                    borderRadius: "8px",
                    bgcolor: "white",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      paddingY: "8.5px",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em style={{ fontSize: "14px", fontStyle: "normal" }}>
                      All
                    </em>
                  </MenuItem>
                  <MenuItem value={1} sx={{ fontSize: "14px" }}>
                    Simple
                  </MenuItem>
                  <MenuItem value={2} sx={{ fontSize: "14px" }}>
                    Variable
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Button
                onClick={handleExpandBtn}
                rel="noopener noreferrer"
                size="small"
                startIcon={
                  !isExpandFilters ? (
                    <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                  ) : (
                    <ExpandLessIcon sx={{ fontSize: "20px" }} />
                  )
                }
                fullWidth
                sx={{
                  mr: 1,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "5px", // Smooth rounded corners

                  // Modern Indigo Gradient
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  color: "#ffffff",
                  textWrap: "nowrap",
                  // Glass effect and shadow
                  boxShadow:
                    "0 4px 15px rgba(168, 85, 247, 0.25), inset 0 1px 1px rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",

                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", // Bouncy premium feel
                  cursor: "pointer",

                  "&:hover": {
                    // Glow effect on hover
                    boxShadow:
                      "0 8px 25px rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)",
                    transform: "scale(1.05) translateY(-2px)",
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
                  },

                  "&:active": {
                    transform: "scale(0.98)",
                  },

                  // Subtle icon animation
                  "& .MuiButton-startIcon": {
                    transition: "transform 0.4s ease",
                  },
                  "&:hover .MuiButton-startIcon": {
                    transform: "translateX(-2px) scale(1.1)",
                  },
                }}
              >
                More Filters
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Button
                onClick={() => {
                  setSearchBy(2);
                  setSearchTerm("");
                  setListingType("");
                  setPurposeType("");
                  setStockStatus("");
                  setPostStatus("");
                  setActiveFor("");
                  setSearchByBrand("");
                }}
                fullWidth
                rel="noopener noreferrer"
                size="small"
                startIcon={<RestartAltIcon sx={{ fontSize: "20px" }} />}
                sx={{
                  mr: 1,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "5px", // Smooth rounded corners

                  // Modern Indigo Gradient
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  color: "#ffffff",
                  textWrap: "nowrap",
                  // Glass effect and shadow
                  boxShadow:
                    "0 4px 15px rgba(168, 85, 247, 0.25), inset 0 1px 1px rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",

                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", // Bouncy premium feel
                  cursor: "pointer",

                  "&:hover": {
                    // Glow effect on hover
                    boxShadow:
                      "0 8px 25px rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)",
                    transform: "scale(1.05) translateY(-2px)",
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
                  },

                  "&:active": {
                    transform: "scale(0.98)",
                  },

                  // Subtle icon animation
                  "& .MuiButton-startIcon": {
                    transition: "transform 0.4s ease",
                  },
                  "&:hover .MuiButton-startIcon": {
                    transform: "translateX(-2px) scale(1.1)",
                  },
                }}
              >
                Reset Filters
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Button
                onClick={() => navigation("/vendor/products/create")}
                rel="noopener noreferrer"
                fullWidth
                size="small"
                startIcon={<AddIcon sx={{ fontSize: "20px" }} />}
                sx={{
                  mr: 1,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "5px", // Smooth rounded corners

                  // Modern Indigo Gradient
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  color: "#ffffff",
                  textWrap: "nowrap",
                  // Glass effect and shadow
                  boxShadow:
                    "0 4px 15px rgba(168, 85, 247, 0.25), inset 0 1px 1px rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",

                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", // Bouncy premium feel
                  cursor: "pointer",

                  "&:hover": {
                    // Glow effect on hover
                    boxShadow:
                      "0 8px 25px rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)",
                    transform: "scale(1.05) translateY(-2px)",
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
                  },

                  "&:active": {
                    transform: "scale(0.98)",
                  },

                  // Subtle icon animation
                  "& .MuiButton-startIcon": {
                    transition: "transform 0.4s ease",
                  },
                  "&:hover .MuiButton-startIcon": {
                    transform: "translateX(-2px) scale(1.1)",
                  },
                }}
              >
                Add New Product
              </Button>
            </Grid>
            {isExpandFilters && (
              <>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl
                    disabled={searchBy == 1 || true}
                    fullWidth
                    size="small"
                  >
                    <Select
                      labelId="purpose-select-label"
                      id="purpose-select"
                      value={purposeType || ""}
                      onChange={(e) => {setPurposeType(e.target.value)
                        setPage(1)
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        const labels = {
                          "": "All",
                          1: "Sale",
                          2: "Trade-in",
                          3: "Repair",
                        };

                        return (
                          <span style={{ fontSize: "14px" }}>
                            <b style={{ color: "#666" }}>Purpose: </b>
                            {labels[selected] || "All"}
                          </span>
                        );
                      }}
                      sx={{
                        borderRadius: "8px",
                        bgcolor: "white",
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          paddingY: "8.5px",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em style={{ fontSize: "14px", fontStyle: "normal" }}>
                          All
                        </em>
                      </MenuItem>
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
                  <FormControl disabled={searchBy == 1} fullWidth size="small">
                    <Select
                      labelId="stock-status-label"
                      id="stock-status"
                      // 1. Ensure value is connected to state
                      value={stockStatus === undefined ? "" : stockStatus}
                      onChange={(e) => {setStockStatus(e.target.value)
                        setPage(1)
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        // 2. Labels mapping (Key matching is crucial)
                        const labels = {
                          "": "All",
                          1: "In Stock",
                          2: "Out Of Stock",
                          3: "Unmanaged",
                        };

                        return (
                          <span style={{ fontSize: "14px" }}>
                            <b style={{ color: "#666" }}>Stock Status: </b>{" "}
                            {labels[selected] || "All"}
                          </span>
                        );
                      }}
                      sx={{
                        borderRadius: "8px",
                        bgcolor: "white",
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          paddingY: "8.5px",
                        },
                      }}
                    >
                      {/* 3. Use strings for values to avoid type mismatch */}
                      <MenuItem value="">
                        <em style={{ fontSize: "14px", fontStyle: "normal" }}>
                          All
                        </em>
                      </MenuItem>
                      <MenuItem value="1" sx={{ fontSize: "14px" }}>
                        In Stock
                      </MenuItem>
                      <MenuItem value="2" sx={{ fontSize: "14px" }}>
                        Out Of Stock
                      </MenuItem>
                      <MenuItem value="3" sx={{ fontSize: "14px" }}>
                        Unmanaged
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl disabled={searchBy == 1} fullWidth size="small">
                    <Select
                      labelId="post-status-label"
                      id="post-status"
                      // Un-comment this to make the component controlled
                      value={postStatus ?? ""}
                      onChange={(e) => {setPostStatus(e.target.value)
                        setPage(1)
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        const labels = {
                          "": "All",
                          0: "Draft",
                          1: "Published",
                        };

                        return (
                          <span style={{ fontSize: "14px" }}>
                            <b style={{ color: "#666" }}>Status: </b>{" "}
                            {/* Using (selected || selected === 0) handles the numeric 0 value correctly */}
                            {labels[selected] !== undefined
                              ? labels[selected]
                              : "All"}
                          </span>
                        );
                      }}
                      sx={{
                        borderRadius: "8px",
                        bgcolor: "white",
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          paddingY: "8.5px",
                        },
                        // Optional: Add a subtle border to match a premium aesthetic
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#bdbdbd",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <span style={{ fontSize: "14px" }}>All</span>
                      </MenuItem>
                      <MenuItem value={0} sx={{ fontSize: "14px" }}>
                        Draft
                      </MenuItem>
                      <MenuItem value={1} sx={{ fontSize: "14px" }}>
                        Published
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl
                    disabled={searchBy == 1 || true}
                    fullWidth
                    size="small"
                  >
                    <Select
                      labelId="active-for-label"
                      id="active-for"
                      value={activeFor ?? ""}
                      onChange={(e) => {setActiveFor(e.target.value)
                        setPage(1)
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        const labels = {
                          "": "All",
                          1: "Web",
                          2: "POS",
                        };

                        return (
                          <span style={{ fontSize: "14px" }}>
                            <b style={{ color: "#666" }}>Active For: </b>{" "}
                            {labels[selected] || "All"}
                          </span>
                        );
                      }}
                      sx={{
                        borderRadius: "8px",
                        bgcolor: "white",
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          paddingY: "8.5px",
                        },
                        // Keeps the border subtle for that Apple-style minimalism
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <span style={{ fontSize: "14px" }}>All</span>
                      </MenuItem>
                      <MenuItem value={1} sx={{ fontSize: "14px" }}>
                        Web
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontSize: "14px" }}>
                        POS
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    options={filterBrands}
                    value={
                      filterBrands.find(
                        (brand) => brand.id === searchByBrand,
                      ) || null
                    }
                    getOptionLabel={(option) => option.title || ""}
                    onChange={(event, newValue) => {
                      setSearchByBrand(newValue ? newValue.id : "");
                      setPage(1)
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    loading={forSearchBrandLoading}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        bgcolor: "white",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Brands"
                        placeholder="Select a brand"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                    color="secondary"
                    fullWidth
                    disabled
                  >
                    Category
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        <Box
          sx={{
            borderRadius: "15px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "white",
            pb: "1px",
            overflow: "hidden",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              overflowX: "auto",
              "& .sticky-left": {
                position: "sticky",
                left: 0,
                zIndex: 2,
                backgroundColor: "#f3f5f9",
              },
              "& .sticky-title": {
                position: "sticky",
                left: "80px",
                zIndex: 2,
                backgroundColor: "#f3f5f9",
                borderRight: "1px solid #e0e0e0",
              },
              "& .sticky-action": {
                position: "sticky",
                right: 0,
                zIndex: 2,
                backgroundColor: "#f3f5f9",
                borderLeft: "1px solid #e0e0e0",
              },
            }}
            className="table-scroll-design-set"
          >
            <Table sx={{ minWidth: 650 }} aria-label="responsive table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f3f5f9" }}>
                  <TableCell
                    className="sticky-left"
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      minWidth: "80px",
                    }}
                  >
                    SKU
                  </TableCell>
                  <TableCell
                    className="sticky-title"
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      minWidth: "200px",
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Listing
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Purpose
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Stock
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Min Stock Alert
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Stock Status
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Regular Price
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Sale Price
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Brand
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Total Sold
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Last Sale
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Draft|Published
                  </TableCell>
                  {/* <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Featured
                  </TableCell> */}
                  <TableCell
                    className="sticky-action"
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  Array.from(new Array(per_page || 5)).map((_, index) => (
                    <TableRow>
                      {/* SKU Skeleton */}
                      <TableCell sx={{ padding: "10px" }}>
                        <Skeleton
                          variant="rounded"
                          width={60}
                          height={22}
                          sx={{ borderRadius: "35px" }}
                        />
                      </TableCell>

                      {/* Title Skeleton */}
                      <TableCell sx={{ padding: "12px", minWidth: "200px" }}>
                        <Skeleton variant="text" width="90%" height={20} />
                      </TableCell>

                      {/* Type Skeleton */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={70}
                          height={22}
                          sx={{ borderRadius: "35px" }}
                        />
                      </TableCell>

                      {/* Sale/Status Skeleton */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={50}
                          height={22}
                          sx={{ borderRadius: "35px" }}
                        />
                      </TableCell>

                      {/* Stock Numbers (Static 0) */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={20} />
                      </TableCell>

                      {/* Alert Stock */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={30} />
                      </TableCell>

                      {/* In-Stock Status */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={80}
                          height={22}
                          sx={{ borderRadius: "35px" }}
                        />
                      </TableCell>

                      {/* Regular Price */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={50} />
                      </TableCell>

                      {/* Sale Price */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={50} />
                      </TableCell>

                      {/* Category */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={70}
                          height={22}
                          sx={{ borderRadius: "35px" }}
                        />
                      </TableCell>

                      {/* Brand */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={70}
                          height={22}
                          sx={{ borderRadius: "35px" }}
                        />
                      </TableCell>

                      {/* Unit 1 */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={20} />
                      </TableCell>

                      {/* Unit 2 */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={20} />
                      </TableCell>

                      {/* Switches (2 cells) */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="circular" width={30} height={20} />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="circular" width={30} height={20} />
                      </TableCell>

                      {/* Action Buttons */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Skeleton variant="circular" width={30} height={30} />
                          <Skeleton variant="circular" width={30} height={30} />
                          <Skeleton variant="circular" width={30} height={30} />
                          <Skeleton variant="circular" width={30} height={30} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : products?.length > 0 ? (
                  products?.map((product, key) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={key}
                    >
                      <TableCell
                        className="sticky-left"
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: "12px",
                          padding: "10px",
                          background: "white !important",
                        }}
                      >
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: "#f3f5f9",
                            borderRadius: "35px",
                            padding: "2px 10px",
                            fontWeight: "600",
                            color: "red",
                          }}
                        >
                          {product?.product_sku ?? "N/A"}
                        </Box>
                      </TableCell>
                      <TableCell
                        className="sticky-title"
                        sx={{
                          fontSize: "12px",
                          padding: "12px",
                          minWidth: "200px",
                          backgroundColor: "white !important",
                        }}
                      >
                        {product?.title ?? "N/A"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: "#dbf0fe",
                            borderRadius: "35px",
                            padding: "2px 10px",
                            fontWeight: "600",
                            color: "#4e97fd",
                          }}
                        >
                          {product?.product_type == 1 ? "Simple" : "Variable"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: "#e7f9ed",
                            color: "#33d08c",
                            borderRadius: "35px",
                            padding: "2px 10px",
                            fontWeight: "600",
                          }}
                        >
                          {product?.active_for == 1 && "Sale"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        0
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        {product?.min_stock_alert ?? "N/A"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: "#fff8e5",
                            color: "#ffcd4e",
                            borderRadius: "35px",
                            padding: "2px 10px",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product?.product_status_stock
                            ? "In-Stock"
                            : "Out of stock"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        ${product?.regular_price ?? "N/A"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        ${product?.sale_price ?? "N/A"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: "#f3f5f9",
                            borderRadius: "35px",
                            padding: "2px 10px",
                            fontWeight: "600",
                            color: "red",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product?.category?.title ?? "N/A"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: "#f3f5f9",
                            borderRadius: "35px",
                            padding: "2px 10px",
                            fontWeight: "600",
                            color: "red",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product?.brand?.title ?? "N/A"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        3
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        2
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title={product.is_published ? "Unpublish" : "Publish"}
                        >
                          <Switch
                            checked={Boolean(product.is_published)}
                            onChange={(e) =>
                              handlePublishToggle(product.id, e.target.checked)
                            }
                            color="secondary"
                            size="small"
                            disabled={updatePublish.isLoading} // Prevent double-clicks
                          />
                        </Tooltip>
                      </TableCell>
                      {/* <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Switch
                          name="is_active"
                          color="secondary"
                          size="small"
                        />
                      </TableCell> */}
                      <TableCell
                        className="sticky-action"
                        sx={{
                          fontSize: "12px",
                          padding: "12px",
                          backgroundColor: "white !important",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Tooltip title="Barcode" arrow>
                            <IconButton
                              // onClick={toggleDrawer(true)}
                              size="small"
                              sx={{
                                color: "black",

                                bgcolor: "#ededed",
                                "&:hover": { bgcolor: "#cfcfcf" },
                              }}
                            >
                              <QrCode2Icon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="View" arrow>
                            <IconButton
                              // onClick={handleClickOpen}
                              size="small"
                              sx={{
                                color: "#13a413",
                                bgcolor: "#e3fde4",
                                ml: 1,
                                "&:hover": { bgcolor: "#caf1c5" },
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit" arrow>
                            <IconButton
                              onClick={() =>
                                navigation(
                                  `/vendor/products/update/${product?.id}`,
                                )
                              }
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

                          <ConfirmDeletePopup
                            title={"Product"}
                            description={
                              "Are your sure you want to delete this product?"
                            }
                            showDelBtn={true}
                            handleDeleteBrand={handleDeleteBrand}
                            singleBrandDelRec={{
                              id: product?.id,
                            }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={15}>
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 4,
                          color: "#888",
                          fontSize: "14px",
                          width: "100%",
                        }}
                      >
                        No products available!
                      </Box>
                    </TableCell>
                  </TableRow>
                )}

                {/* <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontSize: "12px", padding: "10px" }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                    }}
                  >
                    123456
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", padding: "12px", minWidth: "200px" }}
                >
                  Dyson Supersonic Hair Dryer - Fast Drying & Multiple Styling
                  Attachments
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#dbf0fe",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "#4e97fd",
                    }}
                  >
                    Simple
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#e7f9ed",
                      color: "#33d08c",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                    }}
                  >
                    Sale
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  0
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  0
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#fff8e5",
                      color: "#ffcd4e",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Out of stock
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  $10.55
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  $5.66
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Apple Cate
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Apple
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  3
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  2
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Switch name="is_active" color="secondary" size="small" />
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Switch name="is_active" color="secondary" size="small" />
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Barcode" arrow>
                      <IconButton size="small" aria-label="edit" color="black">
                        <QrCode2Icon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View" arrow>
                      <IconButton
                        size="small"
                        aria-label="edit"
                        color="success"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        aria-label="edit"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton size="small" aria-label="edit" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
          {products.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                my: 2,
                mx: 2,
              }}
            >
              <PaginationSet
                count={pagination?.last_page || 1}
                page={page}
                per_page={per_page}
                from={pagination?.from}
                to={pagination?.to}
                total={pagination?.total}
                onPageChange={(value) => setPage(value)}
                onPerPageChange={(value) => {
                  setPerPage(value);
                  setPage(1); // reset page when per_page changes
                }}
                variant="outlined"
                color="secondary"
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Products;
