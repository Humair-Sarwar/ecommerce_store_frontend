import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Skeleton,
  Stack,
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
import React, { useEffect, useState } from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AddIcon from "@mui/icons-material/Add";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  useDeleteAttribute,
  useDeleteTerm,
  useFetchAttributes,
  useFetchTerms,
} from "../../hook/vendor/useAttributesTerms";
import CreateUpdateAttributeModal from "../../components/CreateUpdateAttributeModal";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import { handleError, handleSuccess } from "../../toast";
import CreateUpdateTermModal from "../../components/CreateUpdateTermModal";

const modernPaginationSx = {
  "& .MuiPaginationItem-root": {
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "12.5px",
    color: "#475569",
    borderColor: "#e2e8f0",
    "&:hover": {
      bgcolor: "#f1f5f9",
      color: "#0f172a",
    },
    "&.Mui-selected": {
      bgcolor: "#0f172a !important",
      color: "#ffffff !important",
      borderColor: "#0f172a !important",
    },
  },
};

const AttributesTerms = () => {
  const [attributeSearch, setAttributeSearch] = useState("");
  const [termSearch, setTermSearch] = useState("");
  const [termsData, setTermsData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState("");

  const [pageAttribute, setPageAttribute] = useState(1);
  const [pageTerm, setPageTerm] = useState(1);
  const per_page = 15;
  const { data, isLoading } = useFetchAttributes(
    pageAttribute,
    per_page,
    attributeSearch,
  );
  const { data: terms, isLoading: isLoadingTerms } = useFetchTerms(
    selectedId,
    pageTerm,
    per_page,
    termSearch,
    {
      enabled: !!selectedId,
    },
  );
  const deleteAttribute = useDeleteAttribute();
  const deleteTerm = useDeleteTerm();
  const attributes = data?.data || [];

  const handleAttributeSearch = (e) => {
    setAttributeSearch(e.target.value);
    setPageAttribute(1);
  };
  const handleDeleteBrand = async (data, type) => {
    if (type == "term") {
      deleteTerm.mutate(data.id, {
        onSuccess: (res) => {
          handleSuccess(res?.message || "Term deleted successfully!");
        },
        onError: (error) => {
          const status = error?.response?.status;
          if (status === 404) {
            handleError("Term not found!");
          } else {
            handleError(
              error?.response?.data?.message || "Failed to delete term!",
            );
          }
        },
      });
    } else {
      deleteAttribute.mutate(data?.id, {
        onSuccess: (res) => {
          handleSuccess(res?.message || "Attribute deleted successfully!");
          setSelectedId("");
          setSelectedAttribute("");
          if (typeof setTermsData === "function") {
            setTermsData([]);
          }
        },
        onError: (error) => {
          const status = error?.response?.status;
          if (status === 404) {
            handleError("Attribute not found!");
          } else {
            handleError(
              error?.response?.data?.message || "Failed to delete attribute!",
            );
          }
        },
      });
    }
  };
  const handleShowTerms = (id, title) => {
    setSelectedId(id);
    setSelectedAttribute(title);
    setPageTerm(1);
  };
  useEffect(() => {
    if (terms) {
      setTermsData(terms.data);
    }
  }, [terms, termSearch, selectedId, selectedAttribute]);
  const handleSearchTerm = (e) => {
    setTermSearch(e.target.value);
    setPageTerm(1);
  };

  return (
    <Box
      sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 3 }}
      className="pages-admin-target-style"
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
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
              <TuneRoundedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                variant="h1"
                sx={{ fontWeight: 800, fontSize: "20px", color: "#0f172a", lineHeight: 1.2 }}
              >
                Attributes & Terms
              </Typography>
              <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
                Manage product variant attributes and their selectable term values
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Grid container spacing={2.5}>
          {/* Left Column: Attributes */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                p: 2.5,
                borderRadius: "24px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography
                  component={"h3"}
                  sx={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}
                >
                  Attributes
                </Typography>
                {data?.pagination?.total !== undefined && (
                  <Box
                    sx={{
                      px: 1.1,
                      py: 0.25,
                      borderRadius: "999px",
                      bgcolor: "#f1f5f9",
                      color: "#0f172a",
                      fontSize: "11.5px",
                      fontWeight: 800,
                    }}
                  >
                    {data.pagination.total} Total
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2.5,
                  p: 1.5,
                  bgcolor: "#f8fafc",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <TextField
                  placeholder="Search attribute..."
                  size="small"
                  fullWidth
                  value={attributeSearch}
                  onChange={handleAttributeSearch}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon sx={{ color: "#94a3b8", fontSize: 19 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CreateUpdateAttributeModal title_heading={"Create"} />
              </Box>

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                }}
              >
                <Table size="small" sx={{ minWidth: 250 }} aria-label="attributes table">
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "#f8fafc",
                        "& th": {
                          fontWeight: 700,
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "#64748b",
                          py: 1.25,
                          borderBottom: "1px solid #e2e8f0",
                        },
                      }}
                    >
                      <TableCell>Name</TableCell>
                      <TableCell>Sub Title</TableCell>
                      <TableCell>Slug</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      [...Array(5)].map((_, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ py: 1.5 }}>
                            <Skeleton variant="text" width="70%" height={20} />
                          </TableCell>
                          <TableCell sx={{ py: 1.5 }}>
                            <Skeleton variant="text" width="50%" height={20} />
                          </TableCell>
                          <TableCell sx={{ py: 1.5 }}>
                            <Skeleton variant="text" width="60%" height={20} />
                          </TableCell>
                          <TableCell sx={{ py: 1.5 }}>
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75 }}>
                              <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                              <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                              <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : attributes?.length > 0 ? (
                      attributes?.map((attribute, key) => {
                        const isSelectedRow = selectedId === attribute?.id;
                        return (
                          <TableRow
                            key={key}
                            sx={{
                              bgcolor: isSelectedRow ? "#f0fdf4" : "inherit",
                              "&:hover": { bgcolor: isSelectedRow ? "#ecfdf5" : "#f8fafc" },
                              "& td": { borderBottom: "1px solid #f1f5f9", py: 1.25 },
                              "&:last-child td": { borderBottom: 0 },
                            }}
                          >
                            <TableCell sx={{ fontWeight: 700, fontSize: "13.5px", color: "#0f172a" }}>
                              {attribute?.title}
                            </TableCell>
                            <TableCell>
                              {attribute?.sub_title ? (
                                <Tooltip
                                  title={attribute.sub_title.length > 12 ? attribute.sub_title : ""}
                                  arrow
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 500,
                                      fontSize: "13px",
                                      color: "#475569",
                                    }}
                                  >
                                    {attribute.sub_title.length > 12
                                      ? `${attribute.sub_title.substring(0, 12)}...`
                                      : attribute.sub_title}
                                  </Typography>
                                </Tooltip>
                              ) : (
                                <Box
                                  sx={{
                                    display: "inline-block",
                                    backgroundColor: "#f1f5f9",
                                    borderRadius: "999px",
                                    padding: "2px 10px",
                                    fontWeight: 700,
                                    color: "#64748b",
                                    fontSize: "11px",
                                  }}
                                >
                                  N/A
                                </Box>
                              )}
                            </TableCell>
                            <TableCell>
                              <Box
                                component="span"
                                sx={{
                                  px: 1,
                                  py: 0.3,
                                  borderRadius: "6px",
                                  bgcolor: "#f1f5f9",
                                  color: "#475569",
                                  fontFamily: "monospace",
                                  fontSize: "11.5px",
                                  fontWeight: 600,
                                }}
                              >
                                {attribute?.attribute_slug}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center", whiteSpace: "nowrap" }}>
                              <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                                <CreateUpdateAttributeModal
                                  attribute={attribute}
                                  editAtt={true}
                                  title_heading={"Edit"}
                                />

                                <Tooltip title="Show Terms" arrow>
                                  <IconButton
                                    onClick={() =>
                                      handleShowTerms(attribute?.id, attribute?.title)
                                    }
                                    size="small"
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: "10px",
                                      color: isSelectedRow ? "#ffffff" : "#059669",
                                      ml: 0.75,
                                      bgcolor: isSelectedRow ? "#10b981" : "#ecfdf5",
                                      border: "1px solid #a7f3d0",
                                      "&:hover": {
                                        bgcolor: "#10b981",
                                        color: "#ffffff",
                                      },
                                    }}
                                  >
                                    <AddIcon sx={{ fontSize: 17 }} />
                                  </IconButton>
                                </Tooltip>

                                <ConfirmDeletePopup
                                  title={"Attribute"}
                                  description={"Are your sure you want to delete this attribute?"}
                                  showDelBtn={true}
                                  handleDeleteBrand={handleDeleteBrand}
                                  singleBrandDelRec={{
                                    id: attribute?.id,
                                    business_id: attribute?.business_id,
                                  }}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          <Box
                            sx={{
                              textAlign: "center",
                              py: 4,
                              color: "#64748b",
                              fontSize: "13.5px",
                              fontWeight: 600,
                              width: "100%",
                            }}
                          >
                            No attributes available!
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {attributes?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    mt: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#64748b" }}>
                    Showing {data?.pagination?.from}-{data?.pagination?.to} of{" "}
                    {data?.pagination?.total}
                  </Typography>
                  <Pagination
                    size="small"
                    count={data?.pagination?.last_page || 1}
                    page={pageAttribute}
                    onChange={(e, value) => setPageAttribute(value)}
                    variant="outlined"
                    sx={modernPaginationSx}
                  />
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right Column: Terms */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                p: 2.5,
                borderRadius: "24px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    component={"h3"}
                    sx={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}
                  >
                    Terms
                  </Typography>
                  {selectedAttribute && (
                    <Box
                      sx={{
                        px: 1.25,
                        py: 0.3,
                        borderRadius: "999px",
                        bgcolor: "#ecfdf5",
                        border: "1px solid #a7f3d0",
                        color: "#059669",
                        fontSize: "12px",
                        fontWeight: 800,
                      }}
                    >
                      {selectedAttribute}
                    </Box>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2.5,
                  p: 1.5,
                  bgcolor: "#f8fafc",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <TextField
                  placeholder="Search term..."
                  size="small"
                  fullWidth
                  disabled={!selectedId}
                  variant="outlined"
                  onChange={handleSearchTerm}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon sx={{ color: "#94a3b8", fontSize: 19 }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <CreateUpdateTermModal
                  selectedId={selectedId}
                  title_heading={"Create"}
                />
              </Box>

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                }}
              >
                <Table size="small" sx={{ minWidth: 250 }} aria-label="terms table">
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "#f8fafc",
                        "& th": {
                          fontWeight: 700,
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "#64748b",
                          py: 1.25,
                          borderBottom: "1px solid #e2e8f0",
                        },
                      }}
                    >
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Slug</TableCell>
                      <TableCell sx={{ textWrap: "nowrap" }}>Sort Order</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoadingTerms ? (
                      [...Array(3)].map((_, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ py: 1.25 }}>
                            <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: "10px" }} />
                          </TableCell>
                          <TableCell sx={{ py: 1.25 }}>
                            <Skeleton variant="text" width="70%" height={20} />
                          </TableCell>
                          <TableCell sx={{ py: 1.25 }}>
                            <Skeleton variant="text" width="50%" height={20} />
                          </TableCell>
                          <TableCell sx={{ py: 1.25 }}>
                            <Skeleton variant="text" width="40%" height={20} />
                          </TableCell>
                          <TableCell sx={{ py: 1.25, textAlign: "center" }}>
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75 }}>
                              <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                              <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : termsData?.length > 0 ? (
                      termsData?.map((term, k) => (
                        <TableRow
                          key={k}
                          sx={{
                            "&:hover": { bgcolor: "#f8fafc" },
                            "& td": { borderBottom: "1px solid #f1f5f9", py: 1.25 },
                            "&:last-child td": { borderBottom: 0 },
                          }}
                        >
                          <TableCell>
                            <Avatar
                              variant="rounded"
                              src={`${import.meta.env.VITE_BASE_URL}/storage/${term.media?.media_path}`}
                              sx={{
                                width: 36,
                                height: 36,
                                bgcolor: "#f1f5f9",
                                border: "1px solid #e2e8f0",
                                borderRadius: "10px",
                                color: "#64748b",
                              }}
                            >
                              <TuneRoundedIcon fontSize="small" />
                            </Avatar>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, fontSize: "13.5px", color: "#0f172a" }}>
                            {term.title}
                          </TableCell>
                          <TableCell>
                            <Box
                              component="span"
                              sx={{
                                px: 1,
                                py: 0.3,
                                borderRadius: "6px",
                                bgcolor: "#f1f5f9",
                                color: "#475569",
                                fontFamily: "monospace",
                                fontSize: "11.5px",
                                fontWeight: 600,
                              }}
                            >
                              {term.term_slug}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              component="span"
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minWidth: 26,
                                height: 22,
                                px: 0.75,
                                borderRadius: "6px",
                                bgcolor: "#f1f5f9",
                                color: "#0f172a",
                                fontWeight: 700,
                                fontSize: "12px",
                              }}
                            >
                              {term.sort_order}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Box sx={{ display: "inline-flex", alignItems: "center", textWrap: "nowrap" }}>
                              <CreateUpdateTermModal
                                showEditBtn={true}
                                selectedId={selectedId}
                                term={term}
                                title_heading={"Edit"}
                              />

                              <ConfirmDeletePopup
                                title={"Term"}
                                description={"Are your sure you want to delete this term?"}
                                showDelBtn={true}
                                handleDeleteBrand={() =>
                                  handleDeleteBrand(term, "term")
                                }
                                singleBrandDelRec={{
                                  id: term?.id,
                                  business_id: term?.business_id,
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={5}>
                          <Box
                            sx={{
                              textAlign: "center",
                              py: 4,
                              color: "#64748b",
                              fontSize: "13.5px",
                              fontWeight: 600,
                              width: "100%",
                            }}
                          >
                            {selectedId
                              ? "No terms available for this attribute!"
                              : "Select an attribute on the left (+) to view or add terms"}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {termsData?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    mt: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#64748b" }}>
                    Showing {terms?.pagination?.from}-{terms?.pagination?.to} of{" "}
                    {terms?.pagination?.total}
                  </Typography>
                  <Pagination
                    size="small"
                    count={terms?.pagination?.last_page || 1}
                    page={pageTerm}
                    onChange={(e, value) => setPageTerm(value)}
                    variant="outlined"
                    sx={modernPaginationSx}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AttributesTerms;
