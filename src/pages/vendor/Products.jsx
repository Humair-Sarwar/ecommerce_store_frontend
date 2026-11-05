import {
  Autocomplete,
  Box,
  Button,
  Collapse,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
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
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import EditIcon from "@mui/icons-material/Edit";
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
import TuneIcon from "@mui/icons-material/Tune";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useFetchBrandsPanel } from "../../hook/vendor/useBrand";

// Shared modern select/input styling
const modernSelectSx = {
  borderRadius: "12px",
  bgcolor: "#f8fafc",
  fontSize: "13px",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    paddingY: "8.5px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e2e8f0",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#cbd5e1",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0f172a",
    borderWidth: "1.5px",
  },
};

const Products = () => {
  const [isExpandFilters, setIsExpandFilters] = useState(false);
  const [searchBy, setSearchBy] = useState(2); // 1 for SKU, 2 for Title
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
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

  useEffect(() => {
    if (!searchTerm.trim()) {
      setDebouncedSearchTerm("");
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isError } = useFetchProducts({
    page,
    per_page,
    search_product_purpose: purposeType,
    search_product_type: listingType,
    search_by_title: searchBy === 2 ? debouncedSearchTerm : "",
    search_by_sku: searchBy === 1 ? debouncedSearchTerm : "",
    search_product_stock_status: stockStatus,
    search_product_status: postStatus,
    search_active_for: activeFor,
    search_by_brand: searchByBrand,
  });
  const products = data?.data || [];
  const deleteProduct = useDeleteProduct();
  const pagination = data?.pagination;

  const updatePublish = useUpdateProductPublish();

  const handlePublishToggle = useCallback(
    (productId, isPublished) => {
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
    },
    [updatePublish],
  );

  const {
    data: forSearchBrand,
    isLoading: forSearchBrandLoading,
    isError: forSearchBrandErrors,
  } = useFetchBrandsPanel({
    enabled: isExpandFilters || Boolean(searchByBrand),
  });
  const filterBrands = forSearchBrand?.data || [];

  const handleDeleteBrand = useCallback(
    (id) => {
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
    },
    [deleteProduct],
  );

  const handleExpandBtn = () => {
    setIsExpandFilters((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: 3,
        px: { xs: 1, sm: 2 },
        overflowY: "auto",
        backgroundColor: "#f4f6f9",
        height: "calc(100vh - 68px)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        {/* =================================================================
            1. MODERN PAGE HEADER
            ================================================================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                bgcolor: "#0f172a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.18)",
              }}
            >
              <LocalMallIcon sx={{ fontSize: "20px" }} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#0f172a",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Products Catalog
                </Typography>
                {pagination?.total !== undefined && (
                  <Box
                    sx={{
                      px: 1.1,
                      py: 0.2,
                      borderRadius: "9999px",
                      bgcolor: "#f97316",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {pagination.total}
                  </Box>
                )}
              </Box>
              <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500 }}>
                Manage inventory, pricing, stock alerts, and product publishing
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={() => navigation("/vendor/products/create")}
            rel="noopener noreferrer"
            size="medium"
            startIcon={<AddIcon sx={{ fontSize: "19px !important" }} />}
            sx={{
              px: 2.6,
              py: 1,
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              borderRadius: "9999px",
              bgcolor: "#0f172a",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(15, 23, 42, 0.22)",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                bgcolor: "#1e293b",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.3)",
                transform: "translateY(-1px)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            Add New Product
          </Button>
        </Box>

        {/* =================================================================
            2. MODERN FILTER CARD BAR
            ================================================================= */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #eef2f6",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
            p: 2.2,
            mb: 2.5,
          }}
        >
          <Grid container spacing={1.5} alignItems="center">
            {/* Search By Select */}
            <Grid size={{ xs: 12, sm: 6, md: 2.2 }}>
              <FormControl fullWidth size="small">
                <Select
                  labelId="search-by-select"
                  id="search-by-select"
                  value={searchBy}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setSearchBy(newValue);

                    setSearchTerm("");
                    setDebouncedSearchTerm("");
                    setListingType("");
                    setPurposeType("");
                    setStockStatus("");
                    setPostStatus("");
                    setActiveFor("");
                    setSearchByBrand("");
                    setPage(1);
                  }}
                  displayEmpty
                  renderValue={(selected) => {
                    let label = selected === 2 ? "Title" : "SKU";

                    return (
                      <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
                        <span style={{ color: "#64748b", fontWeight: 500 }}>Search by: </span>
                        {label}
                      </span>
                    );
                  }}
                  sx={modernSelectSx}
                >
                  <MenuItem value={1} sx={{ fontSize: "13px" }}>
                    SKU
                  </MenuItem>
                  <MenuItem value={2} sx={{ fontSize: "13px" }}>
                    Title
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Search Input */}
            <Grid size={{ xs: 12, sm: 6, md: 3.3 }}>
              <TextField
                size="small"
                id="search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder={
                  searchBy === 1 ? "Search by SKU..." : "Search by product title..."
                }
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#94a3b8", fontSize: "19px" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#f8fafc",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#cbd5e1",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#ffffff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0f172a",
                      borderWidth: "1.5px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#0f172a",
                    paddingY: "8.5px",
                  },
                }}
              />
            </Grid>

            {/* Listing Type Select */}
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
              <FormControl disabled={searchBy == 1} fullWidth size="small">
                <Select
                  labelId="listing-type"
                  id="listing-type"
                  value={listingType || ""}
                  onChange={(e) => {
                    setListingType(e.target.value);
                    setPage(1);
                  }}
                  displayEmpty
                  renderValue={(selected) => {
                    const labels = {
                      "": "All",
                      1: "Simple",
                      2: "Variable",
                    };

                    return (
                      <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
                        <span style={{ color: "#64748b", fontWeight: 500 }}>Listing: </span>
                        {labels[selected] || "All"}
                      </span>
                    );
                  }}
                  sx={modernSelectSx}
                >
                  <MenuItem value="">
                    <em style={{ fontSize: "13px", fontStyle: "normal" }}>
                      All
                    </em>
                  </MenuItem>
                  <MenuItem value={1} sx={{ fontSize: "13px" }}>
                    Simple
                  </MenuItem>
                  <MenuItem value={2} sx={{ fontSize: "13px" }}>
                    Variable
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* More Filters Toggle Button */}
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <Button
                onClick={handleExpandBtn}
                rel="noopener noreferrer"
                size="small"
                startIcon={<TuneIcon sx={{ fontSize: "17px !important" }} />}
                endIcon={
                  !isExpandFilters ? (
                    <ExpandMoreIcon sx={{ fontSize: "18px !important" }} />
                  ) : (
                    <ExpandLessIcon sx={{ fontSize: "18px !important" }} />
                  )
                }
                fullWidth
                sx={{
                  py: 1,
                  px: 2,
                  textTransform: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  bgcolor: isExpandFilters ? "#0f172a" : "#f8fafc",
                  color: isExpandFilters ? "#ffffff" : "#334155",
                  border: "1px solid",
                  borderColor: isExpandFilters ? "#0f172a" : "#e2e8f0",
                  textWrap: "nowrap",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: isExpandFilters ? "#1e293b" : "#f1f5f9",
                    borderColor: isExpandFilters ? "#1e293b" : "#cbd5e1",
                  },
                }}
              >
                More Filters
              </Button>
            </Grid>

            {/* Reset Filters Button */}
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <Button
                onClick={() => {
                  setSearchBy(2);
                  setSearchTerm("");
                  setDebouncedSearchTerm("");
                  setListingType("");
                  setPurposeType("");
                  setStockStatus("");
                  setPostStatus("");
                  setActiveFor("");
                  setSearchByBrand("");
                  setPage(1);
                }}
                fullWidth
                rel="noopener noreferrer"
                size="small"
                startIcon={<RestartAltIcon sx={{ fontSize: "18px !important" }} />}
                sx={{
                  py: 1,
                  px: 2,
                  textTransform: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  bgcolor: "rgba(249, 115, 22, 0.08)",
                  color: "#ea580c",
                  border: "1px solid rgba(249, 115, 22, 0.2)",
                  textWrap: "nowrap",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#f97316",
                    color: "#ffffff",
                    borderColor: "#f97316",
                  },
                }}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>

          {/* Collapsible Advanced Filters Row */}
          <Collapse in={isExpandFilters} timeout="auto" unmountOnExit>
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px dashed #e2e8f0",
              }}
            >
              <Grid container spacing={1.5}>
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
                      onChange={(e) => {
                        setPurposeType(e.target.value);
                        setPage(1);
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
                          <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
                            <span style={{ color: "#64748b", fontWeight: 500 }}>Purpose: </span>
                            {labels[selected] || "All"}
                          </span>
                        );
                      }}
                      sx={modernSelectSx}
                    >
                      <MenuItem value="">
                        <em style={{ fontSize: "13px", fontStyle: "normal" }}>
                          All
                        </em>
                      </MenuItem>
                      <MenuItem value={1} sx={{ fontSize: "13px" }}>
                        Sale
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontSize: "13px" }}>
                        Trade-in
                      </MenuItem>
                      <MenuItem value={3} sx={{ fontSize: "13px" }}>
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
                      value={stockStatus === undefined ? "" : stockStatus}
                      onChange={(e) => {
                        setStockStatus(e.target.value);
                        setPage(1);
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        const labels = {
                          "": "All",
                          1: "In Stock",
                          2: "Out Of Stock",
                          3: "Unmanaged",
                        };

                        return (
                          <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
                            <span style={{ color: "#64748b", fontWeight: 500 }}>Stock: </span>
                            {labels[selected] || "All"}
                          </span>
                        );
                      }}
                      sx={modernSelectSx}
                    >
                      <MenuItem value="">
                        <em style={{ fontSize: "13px", fontStyle: "normal" }}>
                          All
                        </em>
                      </MenuItem>
                      <MenuItem value="1" sx={{ fontSize: "13px" }}>
                        In Stock
                      </MenuItem>
                      <MenuItem value="2" sx={{ fontSize: "13px" }}>
                        Out Of Stock
                      </MenuItem>
                      <MenuItem value="3" sx={{ fontSize: "13px" }}>
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
                      value={postStatus ?? ""}
                      onChange={(e) => {
                        setPostStatus(e.target.value);
                        setPage(1);
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        const labels = {
                          "": "All",
                          0: "Draft",
                          1: "Published",
                        };

                        return (
                          <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
                            <span style={{ color: "#64748b", fontWeight: 500 }}>Status: </span>
                            {labels[selected] !== undefined
                              ? labels[selected]
                              : "All"}
                          </span>
                        );
                      }}
                      sx={modernSelectSx}
                    >
                      <MenuItem value="">
                        <span style={{ fontSize: "13px" }}>All</span>
                      </MenuItem>
                      <MenuItem value={0} sx={{ fontSize: "13px" }}>
                        Draft
                      </MenuItem>
                      <MenuItem value={1} sx={{ fontSize: "13px" }}>
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
                      onChange={(e) => {
                        setActiveFor(e.target.value);
                        setPage(1);
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        const labels = {
                          "": "All",
                          1: "Web",
                          2: "POS",
                        };

                        return (
                          <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
                            <span style={{ color: "#64748b", fontWeight: 500 }}>Active For: </span>
                            {labels[selected] || "All"}
                          </span>
                        );
                      }}
                      sx={modernSelectSx}
                    >
                      <MenuItem value="">
                        <span style={{ fontSize: "13px" }}>All</span>
                      </MenuItem>
                      <MenuItem value={1} sx={{ fontSize: "13px" }}>
                        Web
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontSize: "13px" }}>
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
                      setPage(1);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    loading={forSearchBrandLoading}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "#f8fafc",
                        fontSize: "13px",
                        "& fieldset": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#cbd5e1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0f172a",
                        },
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
                    sx={{
                      textTransform: "none",
                      borderRadius: "12px",
                      height: "40px",
                      borderColor: "#e2e8f0",
                      color: "#94a3b8",
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                    fullWidth
                    disabled
                  >
                    Category
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Box>

        {/* =================================================================
            3. MODERN DATA TABLE CARD
            ================================================================= */}
        <Box
          sx={{
            borderRadius: "24px",
            border: "1px solid #eef2f6",
            boxShadow: "0 4px 24px rgba(15, 23, 42, 0.035)",
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              overflowX: "auto",
              "& .sticky-left": {
                position: "sticky",
                left: 0,
                zIndex: 2,
                backgroundColor: "#f8fafc",
              },
              "& .sticky-title": {
                position: "sticky",
                left: "90px",
                zIndex: 2,
                backgroundColor: "#f8fafc",
                borderRight: "1px solid #f1f5f9",
              },
              "& .sticky-action": {
                position: "sticky",
                right: 0,
                zIndex: 2,
                backgroundColor: "#f8fafc",
                borderLeft: "1px solid #f1f5f9",
              },
            }}
            className="table-scroll-design-set"
          >
            <Table sx={{ minWidth: 650 }} aria-label="products table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                  <TableCell
                    className="sticky-left"
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      minWidth: "90px",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    SKU
                  </TableCell>
                  <TableCell
                    className="sticky-title"
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      minWidth: "220px",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Listing
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Purpose
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Stock
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Min Stock Alert
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Stock Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Regular Price
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Sale Price
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Brand
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Total Sold
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Last Sale
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Draft|Published
                  </TableCell>
                  <TableCell
                    className="sticky-action"
                    sx={{
                      fontWeight: 700,
                      fontSize: "11.5px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "14px 12px",
                      textAlign: "center",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  Array.from(new Array(per_page || 5)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={64}
                          height={24}
                          sx={{ borderRadius: "8px" }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "12px", minWidth: "220px" }}>
                        <Skeleton variant="text" width="90%" height={22} />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={70}
                          height={24}
                          sx={{ borderRadius: "9999px" }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={55}
                          height={24}
                          sx={{ borderRadius: "9999px" }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={24} />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={30} />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={84}
                          height={24}
                          sx={{ borderRadius: "9999px" }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={54} />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={54} />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={75}
                          height={24}
                          sx={{ borderRadius: "9999px" }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton
                          variant="rounded"
                          width={75}
                          height={24}
                          sx={{ borderRadius: "9999px" }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={24} />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="text" width={24} />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Skeleton variant="rounded" width={38} height={22} sx={{ borderRadius: "12px" }} />
                      </TableCell>
                      <TableCell sx={{ padding: "12px" }}>
                        <Box sx={{ display: "flex", gap: 0.8, justifyContent: "center" }}>
                          <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "8px" }} />
                          <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "8px" }} />
                          <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "8px" }} />
                          <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "8px" }} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : products?.length > 0 ? (
                  products?.map((product, key) => (
                    <TableRow
                      key={key}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "& td, & th": { borderBottom: "1px solid #f1f5f9" },
                        "&:hover": {
                          backgroundColor: "#f8fafc",
                        },
                        "&:hover .sticky-left, &:hover .sticky-title, &:hover .sticky-action": {
                          backgroundColor: "#f8fafc !important",
                        },
                        transition: "background-color 0.15s ease",
                      }}
                    >
                      {/* SKU */}
                      <TableCell
                        className="sticky-left"
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: "12px",
                          padding: "12px",
                          background: "#ffffff !important",
                        }}
                      >
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: "#f1f5f9",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            padding: "3px 9px",
                            fontWeight: 700,
                            fontSize: "11.5px",
                            fontFamily: "monospace",
                            color: "#0f172a",
                          }}
                        >
                          {product?.product_sku ?? "N/A"}
                        </Box>
                      </TableCell>

                      {/* Title */}
                      <TableCell
                        className="sticky-title"
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#0f172a",
                          padding: "12px",
                          minWidth: "220px",
                          backgroundColor: "#ffffff !important",
                        }}
                      >
                        {product?.title ?? "N/A"}
                      </TableCell>

                      {/* Listing Type */}
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            backgroundColor:
                              product?.product_type == 1
                                ? "rgba(37, 99, 235, 0.1)"
                                : "rgba(124, 58, 237, 0.1)",
                            color:
                              product?.product_type == 1 ? "#2563eb" : "#7c3aed",
                            borderRadius: "9999px",
                            padding: "3px 11px",
                            fontWeight: 600,
                            fontSize: "11.5px",
                          }}
                        >
                          {product?.product_type == 1 ? "Simple" : "Variable"}
                        </Box>
                      </TableCell>

                      {/* Purpose */}
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        {product?.active_for == 1 && (
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              backgroundColor: "rgba(16, 185, 129, 0.12)",
                              color: "#059669",
                              borderRadius: "9999px",
                              padding: "3px 11px",
                              fontWeight: 600,
                              fontSize: "11.5px",
                            }}
                          >
                            Sale
                          </Box>
                        )}
                      </TableCell>

                      {/* Stock */}
                      <TableCell
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#334155",
                          padding: "12px",
                        }}
                      >
                        0
                      </TableCell>

                      {/* Min Stock Alert */}
                      <TableCell
                        sx={{
                          fontSize: "12.5px",
                          fontWeight: 600,
                          color: "#64748b",
                          padding: "12px",
                        }}
                      >
                        {product?.min_stock_alert ?? "N/A"}
                      </TableCell>

                      {/* Stock Status */}
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.6,
                            backgroundColor: product?.product_status_stock
                              ? "rgba(16, 185, 129, 0.12)"
                              : "rgba(249, 115, 22, 0.12)",
                            color: product?.product_status_stock
                              ? "#059669"
                              : "#ea580c",
                            borderRadius: "9999px",
                            padding: "3px 11px",
                            fontWeight: 600,
                            fontSize: "11.5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: product?.product_status_stock
                                ? "#10b981"
                                : "#f97316",
                            }}
                          />
                          {product?.product_status_stock
                            ? "In-Stock"
                            : "Out of stock"}
                        </Box>
                      </TableCell>

                      {/* Regular Price */}
                      <TableCell
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          padding: "12px",
                        }}
                      >
                        ${product?.regular_price ?? "N/A"}
                      </TableCell>

                      {/* Sale Price */}
                      <TableCell
                        sx={{
                          fontSize: "13.5px",
                          fontWeight: 700,
                          color: "#0f172a",
                          padding: "12px",
                        }}
                      >
                        ${product?.sale_price ?? "N/A"}
                      </TableCell>

                      {/* Category */}
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "9999px",
                            padding: "3px 11px",
                            fontWeight: 600,
                            fontSize: "11.5px",
                            color: "#334155",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product?.category?.title ?? "N/A"}
                        </Box>
                      </TableCell>

                      {/* Brand */}
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "9999px",
                            padding: "3px 11px",
                            fontWeight: 600,
                            fontSize: "11.5px",
                            color: "#334155",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product?.brand?.title ?? "N/A"}
                        </Box>
                      </TableCell>

                      {/* Total Sold */}
                      <TableCell
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#334155",
                          padding: "12px",
                        }}
                      >
                        3
                      </TableCell>

                      {/* Last Sale */}
                      <TableCell
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#334155",
                          padding: "12px",
                        }}
                      >
                        2
                      </TableCell>

                      {/* Publish Switch */}
                      <TableCell sx={{ padding: "12px" }}>
                        <Tooltip
                          title={product.is_published ? "Unpublish" : "Publish"}
                        >
                          <Switch
                            checked={Boolean(product.is_published)}
                            onChange={(e) =>
                              handlePublishToggle(product.id, e.target.checked)
                            }
                            size="small"
                            disabled={
                              updatePublish.isPending &&
                              updatePublish.variables?.id === product.id
                            }
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#10b981",
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                backgroundColor: "#10b981",
                              },
                            }}
                          />
                        </Tooltip>
                      </TableCell>

                      {/* Actions */}
                      <TableCell
                        className="sticky-action"
                        sx={{
                          fontSize: "12px",
                          padding: "12px",
                          backgroundColor: "#ffffff !important",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.8 }}>
                          <Tooltip title="Barcode" arrow>
                            <IconButton
                              size="small"
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                color: "#0f172a",
                                bgcolor: "#f1f5f9",
                                "&:hover": {
                                  bgcolor: "#0f172a",
                                  color: "#ffffff",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <QrCode2Icon sx={{ fontSize: "17px" }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="View" arrow>
                            <IconButton
                              size="small"
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                color: "#059669",
                                bgcolor: "rgba(16, 185, 129, 0.1)",
                                "&:hover": {
                                  bgcolor: "#10b981",
                                  color: "#ffffff",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <VisibilityIcon sx={{ fontSize: "17px" }} />
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
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                color: "#2563eb",
                                bgcolor: "rgba(37, 99, 235, 0.1)",
                                "&:hover": {
                                  bgcolor: "#2563eb",
                                  color: "#ffffff",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <EditIcon sx={{ fontSize: "17px" }} />
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
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          py: 6,
                          color: "#64748b",
                        }}
                      >
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: "16px",
                            bgcolor: "#f1f5f9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1.5,
                            color: "#94a3b8",
                          }}
                        >
                          <Inventory2OutlinedIcon sx={{ fontSize: "26px" }} />
                        </Box>
                        <Typography sx={{ fontSize: "14.5px", fontWeight: 600, color: "#0f172a" }}>
                          No products available!
                        </Typography>
                        <Typography sx={{ fontSize: "12.5px", color: "#94a3b8", mt: 0.4 }}>
                          Try adjusting your filters or add a new product to get started.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Footer */}
          {products.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2.5,
                borderTop: "1px solid #f1f5f9",
                bgcolor: "#fcfdfe",
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
