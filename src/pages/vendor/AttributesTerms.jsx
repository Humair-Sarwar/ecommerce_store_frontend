import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
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
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SettingsInputComponentTwoToneIcon from "@mui/icons-material/SettingsInputComponentTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
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

const AttributesTerms = () => {
  const [attributeSearch, setAttributeSearch] = useState("");
  const [termSearch, setTermSearch] = useState("");
  const [termsData, setTermsData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState("");

  const [pageAttribute, setPageAttribute] = useState(1);
  const [pageTerm, setPageTerm] = useState(1);
  const per_page = 15;
  const { data, isLoading, isError } = useFetchAttributes(
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
    setPageTerm(1)
  };
  useEffect(() => {
    if (terms) {
      setTermsData(terms.data);
    }
  }, [terms, termSearch, selectedId, selectedAttribute]);
  const handleSearchTerm = (e) => {
    setTermSearch(e.target.value);
    setPageTerm(1)
  };

  const handleDeleteImage = (id) => {
    deleteTerm.mutate(id, {
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
  };

  return (
    <Box sx={{ bgcolor: "#f0f0f0", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ borderRadius: "16px", color: "secondary.main" }}>
              <SettingsInputComponentTwoToneIcon />
            </Box>
            <Box>
              <Typography
                variant="h1"
                sx={{ fontWeight: 700, fontSize: "20px" }}
              >
                Attributes & Terms
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            p: 3,
            borderRadius: "15px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography
                component={"h3"}
                sx={{ fontSize: "18px", fontWeight: 700, mb: 1 }}
              >
                Attributes
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  p: 1.5,
                  background: alpha("#fff", 0.6),
                  backdropFilter: "blur(12px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)",
                }}
              >
                <TextField
                  color="secondary"
                  placeholder="Search attribute..."
                  size="small"
                  fullWidth
                  value={attributeSearch}
                  onChange={handleAttributeSearch}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <SearchIcon
                        sx={{
                          color: "secondary.main", // Icon ko prominent kiya
                          mr: 1.5,
                          fontSize: "1.3rem",
                          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
                        }}
                      />
                    ),
                  }}
                  sx={{
                    mr: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      backgroundColor: "#ffffff", // Pure white for search field to make it pop
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)", // Soft shadow for depth
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "& fieldset": {
                        borderColor: "rgba(0,0,0,0.05)",
                      },
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        transform: "translateY(-1px)",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
                        "& fieldset": { borderColor: alpha("#673ab7", 0.3) },
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#ffffff",
                        boxShadow: `0 8px 25px ${alpha("#673ab7", 0.15)}`, // Glow effect on focus
                        "& fieldset": {
                          borderColor: "secondary.main",
                          borderWidth: "2px",
                        },
                      },
                    },
                  }}
                />

                <CreateUpdateAttributeModal title_heading={"Create"} />
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
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Sub Title
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Slug</TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      [...Array(5)].map((_, index) => (
                        <TableRow key={index}>
                          {/* Name Column */}
                          <TableCell sx={{ py: 2 }}>
                            <Skeleton
                              variant="rectangular"
                              width="70%"
                              height={20}
                              sx={{
                                borderRadius: "6px",
                                backgroundColor: "rgba(0,0,0,0.04)",
                              }}
                              animation="wave"
                            />
                          </TableCell>

                          {/* Sub Title Column */}
                          <TableCell sx={{ py: 2 }}>
                            <Skeleton
                              variant="rectangular"
                              width="50%"
                              height={20}
                              sx={{
                                borderRadius: "6px",
                                backgroundColor: "rgba(0,0,0,0.04)",
                              }}
                              animation="wave"
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Skeleton
                              variant="rectangular"
                              width="50%"
                              height={20}
                              sx={{
                                borderRadius: "6px",
                                backgroundColor: "rgba(0,0,0,0.04)",
                              }}
                              animation="wave"
                            />
                          </TableCell>

                          {/* Actions Column */}
                          <TableCell sx={{ py: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {/* Edit Icon Skeleton */}
                              <Skeleton
                                variant="circular"
                                width={34}
                                height={34}
                                sx={{
                                  ml: 1,
                                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                                }}
                                animation="wave"
                              />
                              {/* Add Icon Skeleton */}
                              <Skeleton
                                variant="circular"
                                width={34}
                                height={34}
                                sx={{
                                  ml: 1,
                                  backgroundColor: "rgba(30, 154, 11, 0.08)",
                                }}
                                animation="wave"
                              />
                              {/* Delete Icon Skeleton */}
                              <Skeleton
                                variant="circular"
                                width={34}
                                height={34}
                                sx={{
                                  ml: 1,
                                  backgroundColor: "rgba(210, 25, 37, 0.08)",
                                }}
                                animation="wave"
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : attributes?.length > 0 ? (
                      attributes?.map((attribute, key) => (
                        <TableRow key={key}>
                          <TableCell>{attribute?.title}</TableCell>
                          <TableCell>
                            {attribute?.sub_title ? (
                              <Tooltip
                                title={
                                  attribute.sub_title.length > 8
                                    ? attribute.sub_title
                                    : ""
                                }
                                arrow
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 500,
                                    cursor:
                                      attribute.sub_title.length > 8
                                        ? "help"
                                        : "default",
                                    fontSize: "14px",
                                    color: "text.primary",
                                  }}
                                >
                                  {attribute.sub_title.length > 8
                                    ? `${attribute.sub_title.substring(0, 8)}...`
                                    : attribute.sub_title}
                                </Typography>
                              </Tooltip>
                            ) : (
                              /* Aapka existing N/A Badge */
                              <Box
                                sx={{
                                  display: "inline-block",
                                  backgroundColor: "#dbf0fe",
                                  borderRadius: "35px",
                                  padding: "2px 10px",
                                  fontWeight: "600",
                                  color: "#4e97fd",
                                  fontSize: "12px",
                                }}
                              >
                                N/A
                              </Box>
                            )}
                          </TableCell>
                          <TableCell>{attribute?.attribute_slug}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Box>
                              <CreateUpdateAttributeModal
                                attribute={attribute}
                                editAtt={true}
                                title_heading={"Edit"}
                              />

                              <Tooltip title="Show Terms" arrow>
                                <IconButton
                                  onClick={() =>
                                    handleShowTerms(
                                      attribute?.id,
                                      attribute?.title,
                                    )
                                  }
                                  size="small"
                                  sx={{
                                    color: "#1e9a0b",
                                    ml: 1,
                                    bgcolor: "#e3fde3",
                                    "&:hover": { bgcolor: "#befbbb" },
                                  }}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              <ConfirmDeletePopup
                                title={"Attribute"}
                                description={
                                  "Are your sure you want to delete this attribute?"
                                }
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          <Box
                            sx={{
                              textAlign: "center",
                              py: 4,
                              color: "#888",
                              fontSize: "14px",
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
                    justifyContent: "space-between !important",
                    width: "100%",
                    mt: 2,
                  }}
                >
                  <Box sx={{ mb: 0, fontSize: "14px" }}>
                    Showing {data?.pagination?.from}-{data?.pagination?.to} of{" "}
                    {data?.pagination?.total}
                  </Box>
                  <Pagination
                    size="small"
                    count={data?.pagination?.last_page || 1}
                    page={pageAttribute}
                    onChange={(e, value) => setPageAttribute(value)}
                    variant={"outlined"}
                    color={"secondary"}
                  />
                </Box>
              )}
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                {selectedAttribute && (
                  <>
                    <Typography
                      component={"h3"}
                      sx={{ fontSize: "18px", fontWeight: 700, mb: 1 }}
                    >
                      Attribute
                    </Typography>
                    <Typography
                      component={"h3"}
                      sx={{ fontSize: "18px", fontWeight: 700, mb: 1 }}
                      color="secondary"
                    >
                      ({selectedAttribute})
                    </Typography>
                  </>
                )}

                <Typography
                  component={"h3"}
                  sx={{ fontSize: "18px", fontWeight: 700, mb: 1 }}
                >
                  Terms
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  p: 1.5,
                  background: alpha("#fff", 0.6),
                  backdropFilter: "blur(12px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)",
                }}
              >
                <TextField
                  color="secondary"
                  placeholder="Search term..."
                  size="small"
                  fullWidth
                  disabled={!selectedId}
                  variant="outlined"
                  onChange={handleSearchTerm}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon
                        sx={{
                          color: "secondary.main", // Icon ko prominent kiya
                          mr: 1.5,
                          fontSize: "1.3rem",
                          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
                        }}
                      />
                    ),
                  }}
                  sx={{
                    mr: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      backgroundColor: selectedId ? "white" : "#e0e0e0", // Pure white for search field to make it pop
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)", // Soft shadow for depth
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "& fieldset": {
                        borderColor: "rgba(0,0,0,0.05)",
                      },
                      "&:hover": {
                        backgroundColor: selectedId ? "white" : "#e0e0e0",
                        transform: "translateY(-1px)",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
                        "& fieldset": { borderColor: alpha("#673ab7", 0.3) },
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#ffffff",
                        boxShadow: `0 8px 25px ${alpha("#673ab7", 0.15)}`, // Glow effect on focus
                        "& fieldset": {
                          borderColor: "secondary.main",
                          borderWidth: "2px",
                        },
                      },
                    },
                  }}
                />

                <CreateUpdateTermModal
                  selectedId={selectedId}
                  title_heading={"Create"}
                />
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
                      <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Slug</TableCell>
                      <TableCell sx={{ fontWeight: "bold", textWrap: 'nowrap' }}>
                        Sort Order
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoadingTerms ? (
                      [...Array(3)].map((_, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ py: 1 }}>
                            <Skeleton
                              variant="circular"
                              width={38}
                              height={38}
                              sx={{
                                ml: 1,
                                backgroundColor: "rgba(30, 154, 11, 0.08)",
                              }}
                              animation="wave"
                            />
                          </TableCell>
                          {/* Name Column */}
                          <TableCell sx={{ py: 1 }}>
                            <Skeleton
                              variant="rectangular"
                              width="70%"
                              height={20}
                              sx={{
                                borderRadius: "6px",
                                backgroundColor: "rgba(0,0,0,0.04)",
                              }}
                              animation="wave"
                            />
                          </TableCell>

                          {/* Slug Column */}
                          <TableCell sx={{ py: 1 }}>
                            <Skeleton
                              variant="rectangular"
                              width="50%"
                              height={20}
                              sx={{
                                borderRadius: "6px",
                                backgroundColor: "rgba(0,0,0,0.04)",
                              }}
                              animation="wave"
                            />
                          </TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <Skeleton
                              variant="rectangular"
                              width="50%"
                              height={20}
                              sx={{
                                borderRadius: "6px",
                                backgroundColor: "rgba(0,0,0,0.04)",
                              }}
                              animation="wave"
                            />
                          </TableCell>

                          {/* Actions Column */}
                          <TableCell sx={{ py: 1, textAlign: "center" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {/* Edit Icon Skeleton */}
                              <Skeleton
                                variant="circular"
                                width={34}
                                height={34}
                                sx={{
                                  ml: 1,
                                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                                }}
                                animation="wave"
                              />

                              {/* Delete Icon Skeleton */}
                              <Skeleton
                                variant="circular"
                                width={34}
                                height={34}
                                sx={{
                                  ml: 1,
                                  backgroundColor: "rgba(210, 25, 37, 0.08)",
                                }}
                                animation="wave"
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : termsData?.length > 0 ? (
                      termsData?.map((term, k) => (
                        <TableRow key={k}>
                          <TableCell>
                            <Avatar
                              variant="rounded"
                              src={`${import.meta.env.VITE_BASE_URL}/storage/${term.media?.media_path}`}
                              sx={{
                                width: 38,
                                height: 38,
                                bgcolor: alpha("#673ab7", 0.1),
                                borderRadius: "10px",
                                color: "text.secondary",
                              }}
                            >
                              <SettingsInputComponentTwoToneIcon fontSize="small" />
                            </Avatar>
                          </TableCell>
                          <TableCell>{term.title}</TableCell>
                          <TableCell>{term.term_slug}</TableCell>
                          <TableCell>{term.sort_order}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Box sx={{textWrap: 'nowrap'}}>
                              <CreateUpdateTermModal
                                showEditBtn={true}
                                selectedId={selectedId}
                                term={term}
                                title_heading={"Edit"}
                              />

                              <ConfirmDeletePopup
                                title={"Term"}
                                description={
                                  "Are your sure you want to delete this term?"
                                }
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
                              color: "#888",
                              fontSize: "14px",
                              width: "100%",
                            }}
                          >
                            No terms available!
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
                    justifyContent: "space-between !important",
                    width: "100%",
                    mt: 2,
                  }}
                >
                  <Box sx={{ mb: 0, fontSize: "14px" }}>
                    Showing {terms?.pagination?.from}-{terms?.pagination?.to} of{" "}
                    {terms?.pagination?.total}
                  </Box>
                  <Pagination
                    size="small"
                    count={terms?.pagination?.last_page || 1}
                    page={pageTerm}
                    onChange={(e, value) => setPageTerm(value)}
                    variant={"outlined"}
                    color={"secondary"}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AttributesTerms;
