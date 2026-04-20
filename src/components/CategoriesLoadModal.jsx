import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Button,
  TextField,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  alpha,
  Skeleton,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Highlight indicator ke liye
import { fetchCategoriesPanel } from "../hook/vendor/useCategories";
import { handleError } from "../toast";

export default function CategoriesLoadModal({ handleTargetParentCategoryId, 
  initialParentId, 
  initialParentTitle }) {
  const [open, setOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [currentSelectedId, setCurrentSelectedId] = useState(null); // Highlight state
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const { data, isLoading, isError } = fetchCategoriesPanel(searchQuery);
  const categoriesList = data?.data || [];

  useEffect(() => {
    if (isError) {
      handleError("Error fetching categories!");
    }
  }, [isError]);
  useEffect(() => {
  if (initialParentId && !currentSelectedId) {
    setCurrentSelectedId(initialParentId);
    setSelectedCategoryName(initialParentTitle || "Selected Parent");
  }
}, [initialParentId, initialParentTitle]);

  const handleSelectCategory = (categoryId, categoryName, level) => {
  if (currentSelectedId === categoryId) {
    // Unselect logic
    setCurrentSelectedId(null);
    setSelectedCategoryName("");
    handleTargetParentCategoryId(null, null);
  } else {
    // Selection logic
    setCurrentSelectedId(categoryId);
    setSelectedCategoryName(categoryName);
    handleTargetParentCategoryId(categoryId, level);
  }
  setOpen(false);
};

  const renderCategoryAccordion = (category, level = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isSelected = currentSelectedId === category.id;

    return (
      <Accordion
        key={category.id}
        disableGutters
        sx={{
          backgroundColor: isSelected ? alpha("#673ab7", 0.08) : "transparent", // Highlight color
          boxShadow: "none",
          borderTop: level === 0 ? "1px solid rgba(0, 0, 0, 0.08)" : "none",
          "&:before": { display: "none" },
          ml: `${level * 12}px`,
          transition: "0.2s",
          borderRadius: isSelected ? "8px" : "0px",
        }}
      >
        <AccordionSummary
          expandIcon={
            hasChildren ? <ExpandMoreIcon sx={{ fontSize: "1.2rem" }} /> : null
          }
          sx={{
            px: 1,
            minHeight: "44px !important",
            "& .MuiAccordionSummary-content": {
              my: "8px !important",
              alignItems: "center",
            },
            "&:hover": {
              backgroundColor: isSelected
                ? alpha("#673ab7", 0.12)
                : "rgba(0,0,0,0.02)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              pr: 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleSelectCategory(category.id, category.title, category.level);
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: isSelected ? "700" : level === 0 ? "700" : "500",
                color: isSelected ? "secondary.main" : "text.primary",
                cursor: "pointer",
              }}
            >
              {category.title}
            </Typography>

            {isSelected && (
              <CheckCircleIcon
                sx={{ fontSize: "1rem", color: "secondary.main" }}
              />
            )}
          </Box>
        </AccordionSummary>

        {hasChildren && (
          <AccordionDetails sx={{ p: 0 }}>
            {category.children.map((child) =>
              renderCategoryAccordion(child, level + 1),
            )}
          </AccordionDetails>
        )}
      </Accordion>
    );
  };

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        fullWidth
        variant="outlined"
        className="custom-primary-btn-admin-side"
        sx={{
          justifyContent: "space-between",
          textTransform: "none",
          borderColor: selectedCategoryName
            ? "secondary.main"
            : "rgba(0,0,0,0.23)",
          borderWidth: selectedCategoryName ? "2px" : "1px",
          "&:hover": { borderWidth: selectedCategoryName ? "2px" : "1px" },
        }}
      >
        {selectedCategoryName
          ? `Parent: ${selectedCategoryName}`
          : "Select Parent Category"}
        <ExpandMoreIcon />
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ zIndex: "6001" }}
        PaperProps={{ sx: { width: 340, p: 2, borderRadius: "16px 0 0 16px" } }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 700,
            }}
          >
            <CategoryIcon color="secondary" /> Categories
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              p: 0.5,
              "&:hover": { bgcolor: "rgba(0,0,0,0.05)", borderRadius: "50%" },
            }}
            onClick={toggleDrawer(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Box>
        </Box>

        {/* Search */}
        <TextField
          size="small"
          fullWidth
          color="secondary"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": { borderRadius: "10px" },
          }}
        />

        {/* List Content */}
        <Box
          sx={{ overflowY: "auto", maxHeight: "calc(100vh - 150px)", pr: 0.5 }}
        >
          {isLoading ? (
            <Box sx={{ mt: 1 }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Box
                  key={item}
                  sx={{ display: "flex", alignItems: "center", p: 1.5, gap: 2 }}
                >
                  <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={25}
                    animation="wave"
                    sx={{ borderRadius: "4px" }}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            categoriesList.map((item) => renderCategoryAccordion(item))
          )}

          {!isLoading && categoriesList.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 4 }}
            >
              No categories found.
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
}
