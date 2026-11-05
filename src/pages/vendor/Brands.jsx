import {
  Box,
  Checkbox,
  Container,
  InputAdornment,
  Skeleton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BrandModal from "./BrandCreateModal";
import Paper from "@mui/material/Paper";
import { handleError, handleSuccess } from "../../toast";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import PreviewImage from "../../components/PreviewImage";
import ViewBrandDetails from "./ViewBrandDetails";
import {
  fetchBrands,
  useDeleteBrand,
  useDeleteSelectedBrands,
  useUpdateBrandStatus,
} from "../../hook/vendor/useBrand";
import PaginationSet from "../../components/PaginationSet";

const label = { inputProps: { "aria-label": "Select all brands" } };

const modernSwitchSx = {
  width: 40,
  height: 22,
  p: 0,
  "& .MuiSwitch-switchBase": {
    p: 0,
    m: "2px",
    transitionDuration: "250ms",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#10b981",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: "#cbd5e1",
    opacity: 1,
  },
};

const Brands = () => {
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [search, setSearch] = useState("");
  const deleteSelectedMutation = useDeleteSelectedBrands();
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(15);
  const { data, isLoading } = fetchBrands(page, per_page, search);
  const brands = data?.data || [];
  const pagination = data?.pagination;

  const handleSelectBrand = (e, list) => {
    const data = {
      id: list?.id,
      business_id: list?.business_id,
    };
    if (e.target.checked) {
      setSelectedBrandIds((prev) => [...prev, data]);
    } else {
      setSelectedBrandIds((prev) => prev.filter((sid) => sid.id !== data.id));
    }
  };

  const allBrandObjects = brands?.map((b) => ({
    id: b.id,
    business_id: b.business_id,
  }));

  const selectedIdsSet = new Set(selectedBrandIds?.map((b) => b.id));
  const allIds = allBrandObjects?.map((b) => b.id);
  const allSelected =
    allIds?.length > 0 && allIds.every((id) => selectedIdsSet.has(id));
  const someSelected = selectedBrandIds?.length > 0 && !allSelected;

  const handleAllSltBrand = (e) => {
    if (e.target.checked) {
      setSelectedBrandIds(() => allBrandObjects);
    } else {
      setSelectedBrandIds([]);
    }
  };

  const handleDeleteAllSltBrands = () => {
    const selectedIds = selectedBrandIds.map((item) => item.id);

    deleteSelectedMutation.mutate(selectedIds, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Brands deleted successfully");
        setSelectedBrandIds([]);
      },
      onError: () => {
        handleError("Failed to delete brands");
      },
    });
  };
  const deleteBrandMutation = useDeleteBrand();
  const updateStatusMutation = useUpdateBrandStatus();

  const handleDeleteBrand = async (data) => {
    deleteBrandMutation.mutate(data.id, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Brand deleted successfully");
        setPage(1);
        setSelectedBrandIds([]);
      },
      onError: () => {
        handleError("Failed to delete brand");
      },
    });
  };

  const handleStatusChange = (e, list) => {
    const newStatus = e.target.checked;

    updateStatusMutation.mutate(
      {
        id: list.id,
        status: newStatus,
      },
      {
        onSuccess: (res) => {
          handleSuccess(res?.message || "Status updated");
        },
        onError: () => {
          handleError("Failed to update status");
        },
      },
    );
  };

  const handleSearchBrand = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        py: 3,
      }}
      className="pages-admin-target-style"
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        {/* Page Header */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                bgcolor: "#0f172a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(15, 23, 42, 0.16)",
              }}
            >
              <LocalOfferOutlinedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.2,
                  }}
                >
                  Brands
                </Typography>
                {pagination?.total !== undefined && (
                  <Box
                    sx={{
                      px: 1.1,
                      py: 0.25,
                      borderRadius: "999px",
                      bgcolor: "#ecfdf5",
                      border: "1px solid #a7f3d0",
                      color: "#059669",
                      fontSize: "11.5px",
                      fontWeight: 800,
                    }}
                  >
                    {pagination.total}
                  </Box>
                )}
              </Box>
              <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
                Manage product brands, logos, and visibility
              </Typography>
            </Box>
          </Box>

          <BrandModal showCrtBrandBtn={true} title_heading={"Create"} />
        </Box>

        {/* Search & Bulk Actions Bar */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2.5,
            p: 2,
            bgcolor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, flex: 1 }}>
            <TextField
              id="outlined-basic"
              placeholder="Search brand by name..."
              variant="outlined"
              size="small"
              onChange={handleSearchBrand}
              value={search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: { xs: "100%", sm: 300 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "#f8fafc",
                },
              }}
            />

            {selectedBrandIds?.length > 0 && (
              <ConfirmDeletePopup
                title={"Brands"}
                showSltDelBtn={true}
                selectedBrandIds={selectedBrandIds}
                handleDeleteAllSltBrands={handleDeleteAllSltBrands}
                description={
                  "Are your sure you want to delete these selected brands?"
                }
              />
            )}
          </Box>
        </Box>

        {/* Table Card */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "24px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
            overflow: "hidden",
            bgcolor: "#ffffff",
          }}
        >
          <Table size="small" sx={{ minWidth: 500 }} aria-label="brands table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f8fafc",
                  "& th": {
                    fontWeight: 700,
                    fontSize: "11.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#64748b",
                    py: 1.5,
                    borderBottom: "1px solid #e2e8f0",
                  },
                }}
              >
                <TableCell width={52}>
                  <Checkbox
                    indeterminate={someSelected}
                    checked={allSelected}
                    onChange={handleAllSltBrand}
                    size="small"
                    {...label}
                    sx={{
                      color: "#cbd5e1",
                      "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                        color: "#0f172a",
                      },
                    }}
                  />
                </TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Brand Name</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Active</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                Array.from(new Array(per_page || 5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ py: 1.5 }}>
                      <Skeleton variant="rounded" width={20} height={20} />
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: "10px" }} />
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Skeleton variant="text" width="70%" />
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Skeleton variant="text" width="50%" />
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Skeleton variant="rounded" width={40} height={22} sx={{ borderRadius: 11 }} />
                    </TableCell>
                    <TableCell align="center" sx={{ py: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                        <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                        <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : brands?.length > 0 ? (
                brands?.map((list) => (
                  <TableRow
                    key={list?.id}
                    sx={{
                      transition: "background-color 0.15s ease",
                      "&:hover": { bgcolor: "#f8fafc" },
                      "& td": { borderBottom: "1px solid #f1f5f9", py: 1.25 },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        size="small"
                        onChange={(e) => handleSelectBrand(e, list)}
                        checked={selectedBrandIds.some((b) => b.id === list?.id)}
                        sx={{
                          color: "#cbd5e1",
                          "&.Mui-checked": { color: "#0f172a" },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <PreviewImage list={list} />
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                        fontSize: "13.5px",
                        color: "#0f172a",
                      }}
                    >
                      {list?.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 180,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          px: 1.25,
                          py: 0.4,
                          borderRadius: "8px",
                          bgcolor: "#f1f5f9",
                          color: "#475569",
                          fontFamily: "monospace",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {list?.slug}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Switch
                        size="small"
                        onChange={(e) => handleStatusChange(e, list)}
                        checked={Boolean(list?.status)}
                        sx={modernSwitchSx}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                        <ViewBrandDetails list={list} />
                        <BrandModal
                          showEditBtn={true}
                          title_heading={"Edit"}
                          list={list}
                        />
                        <ConfirmDeletePopup
                          title={"Brand"}
                          description={"Are your sure you want to delete this brand?"}
                          showDelBtn={true}
                          handleDeleteBrand={handleDeleteBrand}
                          singleBrandDelRec={{
                            id: list?.id,
                            business_id: list?.business_id,
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 5,
                        color: "#64748b",
                        fontSize: "14px",
                        fontWeight: 600,
                        width: "100%",
                      }}
                    >
                      No brands available!
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {brands.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTop: "1px solid #f1f5f9",
                px: 2.5,
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
                  setPage(1);
                }}
                variant="outlined"
                color="secondary"
              />
            </Box>
          )}
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Brands;
