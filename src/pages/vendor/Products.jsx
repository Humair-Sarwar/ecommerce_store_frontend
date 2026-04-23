import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
} from "../../hook/vendor/useProducts";
import PaginationSet from "../../components/PaginationSet";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import { handleError, handleSuccess } from "../../toast";

const Products = () => {
  const navigation = useNavigate();
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(15);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useFetchProducts(page, per_page, search);
  const products = data?.data || [];
  const deleteProduct = useDeleteProduct();
  const pagination = data?.pagination;

  const handleDeleteBrand = (id) => {
    console.log(id, '7777777')
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
          <LocalMallIcon
            sx={{ mr: 1, fontSize: "17px" }}
            color="secondary"
          />{" "}
          Products
        </Box>
        <Box sx={{ textAlign: "end", mb: 2 }}>
          <Button
            className="custom-secondary-btn-admin-side"
            onClick={() => navigation("/vendor/products/create")}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add
          </Button>
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
              // Premium Look ke liye shadow reset
              "& .sticky-left": {
                position: "sticky",
                left: 0,
                zIndex: 100,
                backgroundColor: "#f3f5f9",
              },
              "& .sticky-title": {
                position: "sticky",
                left: "80px", // SKU ki width ke baad shuru hoga
                zIndex: 100,
                backgroundColor: "#f3f5f9",
                borderRight: "1px solid #e0e0e0",
              },
              "& .sticky-action": {
                position: "sticky",
                right: 0,
                zIndex: 100,
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
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Featured
                  </TableCell>
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
                          {product?.product_type ? "Simple" : "Variable"}
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
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Switch
                          name="is_active"
                          color="secondary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                        <Switch
                          name="is_active"
                          color="secondary"
                          size="small"
                        />
                      </TableCell>
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
                                                      id: product?.id
                                                    }}
                                                  />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={16}>
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
