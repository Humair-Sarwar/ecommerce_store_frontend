import {
  Box,
  Container,
  InputAdornment,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import { useNavigate } from "react-router";
import {
  fetchReturnPolicy,
  useDeleteReturn,
} from "../../../hook/vendor/usePolicies";
import { handleError, handleSuccess } from "../../../toast";
import PaginationSet from "../../../components/PaginationSet";
import ConfirmDeletePopup from "../../../components/ConfirmDeletePopup";
import ReturnModal from "./CreateUpdateReturnPolicy";

const ReturnPolicy = () => {
  const navigation = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(15);
  const { data, isLoading } = fetchReturnPolicy(page, per_page, search);
  const returnPolicy = data?.data || [];
  const pagination = data?.pagination;
  const handleSearchBrand = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const deleteReturnMutation = useDeleteReturn();

  const handleDeleteBrand = async (data) => {
    deleteReturnMutation.mutate(data.id, {
      onSuccess: (res) => {
        handleSuccess(res?.message || "Return deleted successfully");
        setPage(1);
      },
      onError: () => {
        handleError("Failed to delete return");
      },
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: 3,
        overflowY: "auto",
      }}
      className="pages-admin-target-style"
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        {/* Header */}
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
              <AssignmentReturnOutlinedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.2,
                }}
              >
                Return Policies
              </Typography>
              <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
                Manage product return rules, refund policies, and approval status
              </Typography>
            </Box>
          </Box>
          <ReturnModal title_heading={"Create"} showCrtReturnBtn={true} />
        </Box>

        {/* Search Bar Card */}
        <Box
          sx={{
            display: "flex",
            mb: 2.5,
            p: 2,
            bgcolor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
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
            placeholder="Search Return Policy..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: { xs: "100%", sm: 320 },
            }}
          />
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "24px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
            overflowX: "auto",
            bgcolor: "#ffffff",
          }}
          className="table-scroll-design-set"
        >
          <Table sx={{ minWidth: 650 }} aria-label="return policies table">
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
                    padding: "14px 20px",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid #e2e8f0",
                  },
                }}
              >
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                Array.from(new Array(per_page || 5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ py: 1.5, px: 2.5 }}>
                      <Skeleton variant="text" width="60%" />
                    </TableCell>
                    <TableCell sx={{ py: 1.5, px: 2.5 }}>
                      <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: "999px" }} />
                    </TableCell>
                    <TableCell align="center" sx={{ py: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                        <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : returnPolicy?.length > 0 ? (
                returnPolicy?.map((returnP, key) => (
                  <TableRow
                    key={key}
                    sx={{
                      transition: "background-color 0.15s ease",
                      "&:hover": { bgcolor: "#f8fafc" },
                      "& td": { borderBottom: "1px solid #f1f5f9", py: 1.5, px: 2.5 },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "13.5px",
                        fontWeight: 700,
                        color: "#0f172a",
                        minWidth: "200px",
                      }}
                    >
                      {returnP?.title}
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-block",
                          backgroundColor: returnP?.approved ? "#ecfdf5" : "#fef2f2",
                          border: `1px solid ${returnP?.approved ? "#a7f3d0" : "#fecaca"}`,
                          color: returnP?.approved ? "#059669" : "#dc2626",
                          borderRadius: "999px",
                          padding: "3px 12px",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {returnP?.approved ? "Approved" : "Unapproved"}
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                        <ReturnModal
                          title_heading={"Edit"}
                          showEditBtn={true}
                          list={returnP}
                        />
                        <ConfirmDeletePopup
                          title={"Return Policy"}
                          description={
                            "Are your sure you want to delete this return?"
                          }
                          showDelBtn={true}
                          handleDeleteBrand={handleDeleteBrand}
                          singleBrandDelRec={{
                            id: returnP?.id,
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={3}>
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
                      No return policy available!
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {returnPolicy.length > 0 && (
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

export default ReturnPolicy;
