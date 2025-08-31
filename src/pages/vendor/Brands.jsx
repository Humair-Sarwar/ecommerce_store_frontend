import {
  Box,
  Button,
  Checkbox,
  Container,
  debounce,
  IconButton,
  Pagination,
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
  deleteBrandApi,
  deleteSelectedBrandsApi,
  getBrandsApi,
  updateBrandActiveApi,
} from "../../utils/apis/APIs";
import { handleSuccess } from "../../toast";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import LoaderSpinner from "../../components/LoaderSpinner";
import PreviewImage from "../../components/PreviewImage";
import ViewBrandDetails from "./ViewBrandDetails";

const label = { inputProps: { "aria-label": "Color switch demo" } };

const Brands = () => {
  const [reload, setReload] = useState(false);
  const [getBrandsDataResult, setBrandsDataResult] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [loading, isLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const getBrandsData = async () => {
    let res = await getBrandsApi({ business_id: "123", page, pageSize });
    if (res.status == 200) {
      setBrandsDataResult(res.data);
      isLoading(false);
      setTotalPages(res.data.totalPages || 1);
    }
  };
  const handleSetReloadFunc = () => {
    setReload(!reload);
    setSearchVal("");
  };
  useEffect(() => {
    getBrandsData();
  }, [reload, setReload, page]);

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
  const allBrandObjects = getBrandsDataResult?.brands?.map((b) => ({
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

  const handleDeleteAllSltBrands = async () => {
    isLoading(true);
    let res = await deleteSelectedBrandsApi(selectedBrandIds);
    if (res.status == 200) {
      setReload(!reload);
      setSelectedBrandIds([]);
      handleSuccess("Selected Brands Deleted Successfully!");
      isLoading(false);
      setSearchVal("");
      setPage(1);
    }
  };

  const handleDeleteBrand = async (data) => {
    let res = await deleteBrandApi(data);
    if (res.status == 200) {
      setReload(!reload);
      handleSuccess("Brand Deleted Successfully!");

      setSelectedBrandIds((prev) => prev.filter((sid) => sid.id !== data.id));
      setSearchVal("");
      setPage(1);
    }
  };

  const handleStatusChange = async (e, list) => {
    const newActive = e.target.checked; // the updated value from the switch

    // Optional: early return if required fields are missing
    if (!list?.id || !list?.business_id) {
      console.warn("Missing id or business_id on list", list);
      return;
    }

    // Build payload with the new status
    const payload = {
      id: list.id,
      business_id: list.business_id,
      is_active: newActive,
    };

    try {
      // You could do an optimistic UI update here if desired

      const res = await updateBrandActiveApi(payload);
      if (res?.status === 200) {
        // Refresh or reconcile state
        setReload((prev) => !prev);
        setSearchVal("");
      } else {
        console.error("Failed to update status", res);
        // Optionally show error toast / rollback if you did optimistic update
      }
    } catch (err) {
      console.error("Error updating status", err);
      // show user feedback if needed
    }
  };

  const debounce = (fn, delay) => {
    let timer;
    return function (...argus) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...argus), delay);
    };
  };

  const searchInput = useCallback(
    debounce(async (searchText) => {
      setPage(1); // Always reset to first page on search
      isLoading(true);

      if (searchText.trim() === "") {
        // No search - go back to paginated result
        getBrandsData();
        return;
      }

      try {
        const res = await getBrandsApi({
          business_id: "123",
          search: searchText.trim(),
          page: 1,
          pageSize: 9999, // Get all matching results
        });

        if (res.status === 200) {
          setBrandsDataResult(res.data);
          setTotalPages(1); // Only 1 page during search
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        isLoading(false);
      }
    }, 2000),
    []
  );

  const handleSearchBrand = (e) => {
    searchInput(e.target.value);
    setSearchVal(e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          height: "100%",
          width: "100%",
          py: 3,
          overflowY: "auto",
        }}
      >
        <Container sx={{ maxWidth: "100% !important" }}>
          <Box component={"h2"} sx={{ display: "flex", alignItems: "center", fontSize: '17px' }}>
            {" "}
            <LocalOfferIcon sx={{ mr: 1, fontSize: '17px' }} color="secondary" /> Brands
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
                onPaste={(e) => {
                  // slight delay to allow pasted text to update in DOM
                  setTimeout(() => handleSearchBrand(e), 0);
                }}
                value={searchVal}
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
            <BrandModal
              handleSetReloadFunc={handleSetReloadFunc}
              showCrtBrandBtn={true}
              title={"Create"}
            />
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: "15px", boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
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
                {loading ? (
                  <Box sx={{ my: 2 }}>
                    <LoaderSpinner />
                  </Box>
                ) : getBrandsDataResult?.brands?.length > 0 ? (
                  getBrandsDataResult?.brands?.map((list) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Checkbox
                          size="small"
                          onChange={(e) => handleSelectBrand(e, list)}
                          checked={selectedBrandIds.some(
                            (b) => b.id === list?.id
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
                        {list?.brand_name}
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
                          checked={Boolean(list?.is_active)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <ViewBrandDetails list={list} />

                        <BrandModal
                          handleSetReloadFunc={handleSetReloadFunc}
                          showEditBtn={true}
                          title={"Edit"}
                          list={list}
                        />
                        <ConfirmDeletePopup
                          title={"Brand"}
                          description={
                            "Are your sure you want to deletehis brand?"
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
                  <Box sx={{ textAlign: "center" }}>
                    <Typography>No data available!</Typography>
                  </Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 4,
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              variant="outlined"
              color="secondary"
              sx={{ mt: 2 }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Brands;
