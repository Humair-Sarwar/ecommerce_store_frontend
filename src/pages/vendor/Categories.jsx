import React, { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Collapse,
  Avatar,
  styled,
  alpha,
  Skeleton,
  Stack,
} from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import CategoryModal from "./CreatedCategoryModal";
import {
  fetchCategories,
  useDeleteCategory,
} from "../../hook/vendor/useCategories";
import { handleError, handleSuccess } from "../../toast";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";

const StyledTableContainer = styled(TableContainer)(() => ({
  borderRadius: "24px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
  border: "1px solid #f1f5f9",
  background: "#ffffff",
  overflow: "hidden",
}));

const StyledHeaderCell = styled(TableCell)(({ depth = 0 }) => ({
  fontWeight: 700,
  fontSize: depth > 0 ? "10.5px" : "11.5px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#64748b",
  padding: depth > 0 ? "10px 20px" : "14px 24px",
  backgroundColor: depth > 0 ? "#f8fafc" : "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
}));

const CategoryRow = ({ category, depth = 0 }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const deleteCategory = useDeleteCategory();

  const handleDeleteBrand = (data) => {
    deleteCategory.mutate(data.id, {
      onSuccess: () => {
        handleSuccess("Category deleted successfully!");
      },
      onError: (error) => {
        const status = error?.response?.status;
        if (status === 404) {
          handleError("Category not found!");
        } else if (status === 403) {
          handleError("You are not allowed to delete this category!");
        } else if (status === 422) {
          handleError("Invalid request!");
        } else if (status == 500) {
          handleError("Internal server error!");
        } else {
          handleError(
            error?.response?.data?.message || "Failed to delete category!",
          );
        }
      },
    });
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          transition: "background-color 0.15s ease",
          "&:hover": { bgcolor: "#f8fafc" },
          bgcolor: depth > 0 ? alpha("#f8fafc", depth * 0.25) : "inherit",
          "& td": { borderBottom: "1px solid #f1f5f9" },
        }}
      >
        <TableCell width="60" sx={{ pl: 2, py: 1.25 }}>
          {hasChildren && (
            <IconButton
              size="small"
              onClick={() => setOpen(!open)}
              sx={{
                width: 28,
                height: 28,
                borderRadius: "8px",
                bgcolor: open ? "#0f172a" : "#f1f5f9",
                color: open ? "#ffffff" : "#475569",
                "&:hover": {
                  bgcolor: "#0f172a",
                  color: "#ffffff",
                },
              }}
            >
              {open ? (
                <KeyboardArrowDownIcon fontSize="small" />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              )}
            </IconButton>
          )}
        </TableCell>
        <TableCell sx={{ py: 1.25 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {depth > 0 && (
              <SubdirectoryArrowRightIcon
                sx={{ color: "#94a3b8", fontSize: 18 }}
              />
            )}
            <Avatar
              variant="rounded"
              src={`${import.meta.env.VITE_BASE_URL}/storage/${category.media?.media_path}`}
              sx={{
                width: 40 - depth * 2,
                height: 40 - depth * 2,
                bgcolor: depth === 0 ? "#f1f5f9" : "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "11px",
                color: "#0f172a",
              }}
            >
              <CategoryOutlinedIcon fontSize="small" />
            </Avatar>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography
            variant="body2"
            sx={{
              fontWeight: depth === 0 ? 700 : 600,
              fontSize: "13.5px",
              color: "#0f172a",
            }}
          >
            {category.title}
          </Typography>
        </TableCell>
        <TableCell>
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
            {category.category_slug}
          </Box>
        </TableCell>
        <TableCell align="center">
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 28,
              height: 24,
              px: 1,
              borderRadius: "8px",
              bgcolor: depth === 0 ? "#0f172a" : "#f1f5f9",
              color: depth === 0 ? "#ffffff" : "#475569",
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            {category.sort_order}
          </Box>
        </TableCell>
        <TableCell align="right" sx={{ pr: 3 }}>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <CategoryModal isEdit={true} category={category} />
            <ConfirmDeletePopup
              title={"Category"}
              description={"Are your sure you want to delete this category?"}
              showDelBtn={true}
              handleDeleteBrand={handleDeleteBrand}
              singleBrandDelRec={{
                id: category?.id,
                business_id: category?.business_id,
              }}
            />
          </Stack>
        </TableCell>
      </TableRow>

      {hasChildren && (
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  borderLeft: "2px dashed #10b981",
                  ml: 4,
                  mb: 1.5,
                  mt: 1,
                  bgcolor: "#ffffff",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledHeaderCell depth={depth + 1} width="60" />
                      <StyledHeaderCell depth={depth + 1}>
                        Sub Image
                      </StyledHeaderCell>
                      <StyledHeaderCell depth={depth + 1}>
                        Sub Title
                      </StyledHeaderCell>
                      <StyledHeaderCell depth={depth + 1}>
                        Sub Slug
                      </StyledHeaderCell>
                      <StyledHeaderCell depth={depth + 1} align="center">
                        Order
                      </StyledHeaderCell>
                      <StyledHeaderCell depth={depth + 1} align="right">
                        Actions
                      </StyledHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {category.children.map((child) => (
                      <CategoryRow
                        key={child.id}
                        category={child}
                        depth={depth + 1}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

const Categories = () => {
  const { data, isLoading } = fetchCategories(1, 10, "");
  const categoriesData = data?.data || [];

  return (
    <Box
      sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 3 }}
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
              <CategoryOutlinedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                variant="h1"
                sx={{ fontWeight: 800, fontSize: "20px", color: "#0f172a", lineHeight: 1.2 }}
              >
                Categories
              </Typography>
              <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
                Organize store catalog hierarchy and sub-categories
              </Typography>
            </Box>
          </Stack>
          <CategoryModal />
        </Box>

        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledHeaderCell width="60" />
                <StyledHeaderCell>Image</StyledHeaderCell>
                <StyledHeaderCell>Title</StyledHeaderCell>
                <StyledHeaderCell>Slug</StyledHeaderCell>
                <StyledHeaderCell align="center">Order</StyledHeaderCell>
                <StyledHeaderCell align="right">Actions</StyledHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell width="60" sx={{ pl: 2 }}>
                      <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: "8px" }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton
                        variant="rounded"
                        width={40}
                        height={40}
                        sx={{ borderRadius: "11px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="75%" height={24} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="55%" height={20} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        variant="rounded"
                        width={28}
                        height={24}
                        sx={{ mx: "auto", borderRadius: "8px" }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 3 }}>
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                        <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "10px" }} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : categoriesData.length > 0 ? (
                categoriesData.map((cat) => (
                  <CategoryRow key={cat.id} category={cat} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ py: 5, textAlign: "center" }}>
                    <Box
                      sx={{
                        textAlign: "center",
                        color: "#64748b",
                        fontSize: "14px",
                        fontWeight: 600,
                        width: "100%",
                      }}
                    >
                      No categories available!
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Container>
    </Box>
  );
};

export default Categories;
