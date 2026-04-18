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
  Tooltip,
  styled,
  alpha,
  Skeleton,
  Stack,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import CategoryModal from "./CreatedCategoryModal";
import { fetchCategories, useDeleteCategory } from "../../hook/vendor/useCategories";
import { handleSuccess } from "../../toast";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";

// --- Styled Components ---
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: "20px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
  border: "1px solid",
  borderColor: alpha(theme.palette.divider, 0.08),
  background: "#fff",
}));

const StyledHeaderCell = styled(TableCell)(({ theme, depth = 0 }) => ({
  fontWeight: 700,
  fontSize: depth > 0 ? "0.65rem" : "0.75rem",
  textTransform: "uppercase",
  color: depth > 0 ? "black" : theme.palette.text.secondary,
  padding: depth > 0 ? "10px 24px" : "12px 24px",
  backgroundColor: depth > 0 ? alpha(theme.palette.divider, 0.02) : "#f3f5f9",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

// --- Recursive Row Component ---
const CategoryRow = ({ category, depth = 0 }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const deleteCategory = useDeleteCategory();

const handleDeleteBrand = (data) => {
  deleteCategory.mutate(data.id, {
  onSuccess: (res) => {
    handleSuccess(res?.message || "Category deleted successfully!");
  },

  onError: (error) => {
    const status = error?.response?.status;

    if (status === 404) {
      handleError("Category not found!");
    } else if (status === 403) {
      handleError("You are not allowed to delete this category!");
    } else if (status === 422) {
      handleError("Invalid request!");
    } else {
      handleError(
        error?.response?.data?.message || "Failed to delete category!"
      );
    }
  },
});
};



  return (
    <React.Fragment>
      <TableRow
        sx={{
          "&:hover": { bgcolor: alpha("#673ab7", 0.02) },
          bgcolor: depth > 0 ? alpha("#f8fafc", depth * 0.2) : "inherit",
        }}
      >
        <TableCell width="60" sx={{ pl: depth * 4 + 2, py: 1 }}>
          {hasChildren && (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? (
                <KeyboardArrowDownIcon fontSize="small" />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              )}
            </IconButton>
          )}
        </TableCell>
        <TableCell sx={{ py: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {depth > 0 && (
              <SubdirectoryArrowRightIcon
                sx={{ color: "divider", fontSize: 18 }}
              />
            )}
            <Avatar
              variant="rounded"
              
              src={`${import.meta.env.VITE_BASE_URL}/storage/${category.media?.media_path}`}
              sx={{
                width: 38 - depth * 2,
                height: 38 - depth * 2,
                bgcolor:
                  depth === 0 ? alpha("#673ab7", 0.1) : alpha("#9e9e9e", 0.1),
                borderRadius: "10px",
                color: depth === 0 ? "secondary.main" : "text.secondary",
              }}
            >
              <CategoryIcon fontSize="small" />
            </Avatar>
            
          </Stack>
        </TableCell>
        <TableCell>
          <Typography
            variant="body2"
            sx={{ fontWeight: depth === 0 ? 500 : 500, color: "#1e293b" }}
          >
            {category.title}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            variant="caption"
            sx={{ color: "black", fontFamily: "Monospace" }}
          >
            {category.category_slug}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Box
            sx={{
              fontWeight: 700,
              color: depth === 0 ? "primary.main" : "text.secondary",
              fontSize: "0.8rem",
            }}
          >
            {category.sort_order}
          </Box>
        </TableCell>
        <TableCell align="right" sx={{ pr: 3 }}>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Tooltip title="Edit" arrow>
          <IconButton
            // onClick={toggleDrawer(true)}
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
            {/* <IconButton size="small" sx={{ color: "error.main" }}>
              <DeleteTwoToneIcon fontSize="inherit" />
            </IconButton> */}
            <ConfirmDeletePopup
                                      title={"Category"}
                                      description={
                                        "Are your sure you want to delete this category?"
                                      }
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

      {/* Recursive Call for Children with Headings */}
      {hasChildren && (
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  borderLeft: "2px solid #673ab7",
                  ml: depth * 4 + 4,
                  mb: 2,
                  mt: 1,
                }}
              >
                <Table size="small">
                  <TableHead sx={{ backgroundColor: "#f3f5f9" }}>
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
  const { data, isLoading, isError } = fetchCategories(1, 10, "");
  const categoriesData = data?.data || [];
  

  return (
    <Box sx={{ bgcolor: "#f0f0f0", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ borderRadius: "16px", color: "secondary.main" }}>
              <CategoryIcon />
            </Box>
            <Box>
              <Typography
                variant="h1"
                sx={{ fontWeight: 700, fontSize: "20px" }}
              >
                Categories
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
              {isLoading
                ? [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      {/* 1. Expand Icon Skeleton */}
                      <TableCell width="60" sx={{ pl: 2 }}>
                        <Skeleton variant="circular" width={28} height={28} />
                      </TableCell>

                      {/* 2. Visual (Avatar) Skeleton */}
                      <TableCell>
                        <Skeleton
                          variant="rounded"
                          width={40}
                          height={40}
                          sx={{ borderRadius: "10px" }}
                        />
                      </TableCell>

                      {/* 3. Title Skeleton */}
                      <TableCell>
                        <Skeleton variant="text" width="80%" height={25} />
                      </TableCell>

                      {/* 4. Slug Skeleton */}
                      <TableCell>
                        <Skeleton
                          variant="text"
                          width="60%"
                          height={20}
                          sx={{ opacity: 0.6 }}
                        />
                      </TableCell>

                      {/* 5. Sort Order Skeleton */}
                      <TableCell align="center">
                        <Skeleton
                          variant="text"
                          width={30}
                          height={25}
                          sx={{ mx: "auto" }}
                        />
                      </TableCell>

                      {/* 6. Actions (Edit/Delete) Skeleton */}
                      <TableCell align="right" sx={{ pr: 3 }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Skeleton variant="circular" width={32} height={32} />
                          <Skeleton variant="circular" width={32} height={32} />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                : categoriesData.map((cat) => (
                    <CategoryRow key={cat.id} category={cat}/>
                  ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Container>
    </Box>
  );
};

export default Categories;
