import {
  Box,
  Button,
  Checkbox,
  Container,
  debounce,
  IconButton,
  Pagination,
  Skeleton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import CategoryIcon from "@mui/icons-material/Category";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BrandModal from "./BrandCreateModal";

import Paper from "@mui/material/Paper";
import {
  deleteSelectedBrandsApi,
  updateBrandActiveApi,
} from "../../utils/apis/APIs";
import { handleSuccess } from "../../toast";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import LoaderSpinner from "../../components/LoaderSpinner";
import PreviewImage from "../../components/PreviewImage";
import ViewBrandDetails from "./ViewBrandDetails";
import {
  fetchBrands,
  useDeleteBrand,
  useDeleteSelectedBrands,
  useUpdateBrandStatus,
} from "../../hook/vendor/useBrand";
import PaginationSet from "../../components/PaginationSet";

const label = { inputProps: { "aria-label": "Color switch demo" } };

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

  // derive all full objects once (you need business_id for each)
  const allBrandObjects = brands?.map((b) => ({
    id: b.id,
    business_id: b.business_id,
  }));

  // convenience: set of selected ids for fast membership
  const selectedIdsSet = new Set(selectedBrandIds?.map((b) => b.id));

  const allIds = allBrandObjects?.map((b) => b.id);
  const allSelected =
    allIds?.length > 0 && allIds.every((id) => selectedIdsSet.has(id));
  const someSelected = selectedBrandIds?.length > 0 && !allSelected;

  const handleAllSltBrand = (e) => {
    if (e.target.checked) {
      // select all full objects (avoid duplicates if you ever reuse this)
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
        setSelectedBrandIds([]); // important reset
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
    <>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          py: 6,
        }}
      >
        <Container sx={{ maxWidth: "100% !important" }}>
          <Box
            component={"h2"}
            sx={{ display: "flex", alignItems: "center", fontSize: "17px" }}
          >
            {" "}
            <LocalOfferIcon
              sx={{ mr: 1, fontSize: "17px" }}
              color="secondary"
            />{" "}
            Brands
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
              mt: 3,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Search brand by name"
                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                variant="outlined"
                size="small"
                color="secondary"
                onChange={handleSearchBrand}
                value={search}
              />

              {selectedBrandIds?.length > 0 ? (
                <ConfirmDeletePopup
                  title={"Brands"}
                  showSltDelBtn={true}
                  selectedBrandIds={selectedBrandIds}
                  handleDeleteAllSltBrands={handleDeleteAllSltBrands}
                  description={
                    "Are your sure you want to delete these selected brands?"
                  }
                />
              ) : (
                ""
              )}
            </Box>
            <BrandModal showCrtBrandBtn={true} title_heading={"Create"} />
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "15px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Table
              size="small"
              sx={{ minWidth: 250 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f3f5f9" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <Checkbox
                      indeterminate={someSelected}
                      checked={allSelected}
                      onChange={handleAllSltBrand}
                      size="small"
                      {...label}
                      color="secondary"
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Brand Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Slug</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Active</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  Array.from(new Array(per_page || 5)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          width={20}
                          height={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width={40} height={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="60%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          width={34}
                          height={20}
                          sx={{ borderRadius: 10 }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <Skeleton variant="circular" width={30} height={30} />
                          <Skeleton variant="circular" width={30} height={30} />
                          <Skeleton variant="circular" width={30} height={30} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : brands?.length > 0 ? (
                  brands?.map((list) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Checkbox
                          size="small"
                          onChange={(e) => handleSelectBrand(e, list)}
                          checked={selectedBrandIds.some(
                            (b) => b.id === list?.id,
                          )}
                          color="secondary"
                        />
                      </TableCell>
                      <TableCell>
                        <PreviewImage list={list} />
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 150,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {list?.title}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 150,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {list?.slug}
                      </TableCell>
                      <TableCell>
                        <Switch
                          size="small"
                          color="secondary"
                          onChange={(e) => handleStatusChange(e, list)}
                          checked={Boolean(list?.status)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <ViewBrandDetails list={list} />

                        <BrandModal
                          showEditBtn={true}
                          title_heading={"Edit"}
                          list={list}
                        />
                        <ConfirmDeletePopup
                          title={"Brand"}
                          description={
                            "Are your sure you want to delete this brand?"
                          }
                          showDelBtn={true}
                          handleDeleteBrand={handleDeleteBrand}
                          singleBrandDelRec={{
                            id: list?.id,
                            business_id: list?.business_id,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell align="center" colSpan={7}>
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 4,
                        color: "#888",
                        fontSize: "14px",
                        width: "100%",
                      }}
                    >
                      No brands available!
                    </Box>
                  </TableCell>
                )}
              </TableBody>
            </Table>
            {brands.length > 0 && (
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
          </TableContainer>
        </Container>
      </Box>
    </>
  );
};

export default Brands;
