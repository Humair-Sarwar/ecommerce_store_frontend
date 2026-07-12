import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Pagination,
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
import SearchIcon from "@mui/icons-material/Search";
import { fetchWarrantyPolicy, useDeleteWarranty } from "../../../hook/vendor/usePolicies";
import PaginationSet from "../../../components/PaginationSet";
import WarrantyModal from "./CreateUpdateWarrantyPolicy";
import ConfirmDeletePopup from "../../../components/ConfirmDeletePopup";

const WarrantyPolicy = () => {
  const navigation = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(15);
  const { data, isLoading } = fetchWarrantyPolicy(page, per_page, search);
  const warrantyPolicy = data?.data || [];
  const pagination = data?.pagination;
  const handleSearchBrand = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const deleteWarrantyMutation = useDeleteWarranty();

  const handleDeleteBrand = async (data) => {
      deleteWarrantyMutation.mutate(data.id, {
        onSuccess: (res) => {
          handleSuccess(res?.message || "Warranty deleted successfully");
          setPage(1);
        },
        onError: () => {
          handleError("Failed to delete warranty");
        },
      });
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
          Warranty Policies
        </Box>
        <Box
          sx={{
            display: "flex",
            mb: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            id="search"
            onChange={handleSearchBrand}
            value={search}
            variant="outlined"
            placeholder="Search Warranty Policy..."
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
          <WarrantyModal title_heading={"Create"} showCrtWarrantyBtn={true} />
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "15px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            overflowX: "auto",
          }}
          className="table-scroll-design-set"
        >
          <Table sx={{ minWidth: 650 }} aria-label="responsive table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f5f9" }}>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
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
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
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
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>

                    <TableCell>
                      <Skeleton variant="text" />
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
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : warrantyPolicy?.length > 0 ? (
                warrantyPolicy?.map((warranty, key) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "12px",
                        padding: "12px",
                        minWidth: "200px",
                      }}
                    >
                      {warranty?.title}
                    </TableCell>

                    <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                      <Box
                        sx={{
                          display: "inline-block",
                          backgroundColor: warranty?.approved
                            ? "#e7f9ed"
                            : "#f9e7e7",
                          color: warranty?.approved ? "#33d08c" : "#d03333",
                          borderRadius: "35px",
                          padding: "2px 10px",
                          fontWeight: "600",
                        }}
                      >
                        {warranty?.approved ? "Approved" : "Unapproved"}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WarrantyModal
                          title_heading={"Edit"}
                          showEditBtn={true}
                          list={warranty}
                        />
                        <ConfirmDeletePopup
                          title={"Warranty Policy"}
                          description={
                            "Are your sure you want to delete this policy?"
                          }
                          showDelBtn={true}
                          handleDeleteBrand={handleDeleteBrand}
                          singleBrandDelRec={{
                            id: warranty?.id,
                          }}
                        />
                      </Box>
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
                    No warranty policy available!
                  </Box>
                </TableCell>
              )}
            </TableBody>
          </Table>
          {warrantyPolicy.length > 0 && (
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

export default WarrantyPolicy;
