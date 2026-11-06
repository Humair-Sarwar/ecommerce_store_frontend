import React, { useState, useRef, useEffect } from "react";
import { Box, FormControl, Select, MenuItem, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TuneIcon from "@mui/icons-material/Tune";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import POSAdvanceFilterDrawer from "./POSAdvanceFilterDrawer";

// Helper to recursively find the full ancestor path [level0Cat, level1Cat, ...] for a given category_id
const findCategoryPathById = (items = [], targetId, currentPath = []) => {
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const nextPath = [...currentPath, item];
    if (String(item.id) === String(targetId)) {
      return nextPath;
    }
    if (Array.isArray(item.children) && item.children.length > 0) {
      const foundInChildren = findCategoryPathById(
        item.children,
        targetId,
        nextPath,
      );
      if (foundInChildren) return foundInChildren;
    }
  }
  return null;
};

// Reusable scrollable category row preserving the exact original POS UI
const ScrollableCategoryRow = ({
  items = [],
  selectedItem,
  onSelectItem,
  showFilterBtn = false,
  onOpenFilterDrawer,
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollRef = useRef(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 250);
    }
  };

  const getItemTitle = (cat) => (typeof cat === "object" ? cat?.title : cat);
  const getItemId = (cat, index) =>
    typeof cat === "object" ? cat?.id ?? index : cat;

  const isCatSelected = (cat) => {
    if (!selectedItem) return false;
    if (typeof cat === "object" && typeof selectedItem === "object") {
      return String(cat.id) === String(selectedItem.id);
    }
    const catTitle = getItemTitle(cat);
    const selTitle = getItemTitle(selectedItem);
    return catTitle === selTitle;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #f1f5f9",
        px: 1,
        bgcolor: "#ffffff",
      }}
    >
      {showLeftArrow && (
        <IconButton
          size="small"
          onClick={() => handleScroll("left")}
          sx={{
            color: "#64748b",
            borderRadius: "8px",
            mr: 0.5,
            "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        onScroll={checkScroll}
        sx={{
          display: "flex",
          gap: 2.5,
          overflowX: "auto",
          flex: 1,
          py: 1.25,
          px: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {items.map((cat, index) => {
          const isSelected = isCatSelected(cat);
          const title = getItemTitle(cat);
          return (
            <Box
              key={getItemId(cat, index)}
              onClick={() => onSelectItem(cat)}
              sx={{
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontSize: "12px",
                fontWeight: isSelected ? 600 : 500,
                letterSpacing: "0.2px",
                color: isSelected ? "#dc2626" : "#475569",
                position: "relative",
                py: 0.5,
                px: 1,
                borderRadius: "6px",
                bgcolor: isSelected ? "rgba(239, 68, 68, 0.08)" : "transparent",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "#dc2626",
                  bgcolor: "rgba(239, 68, 68, 0.04)",
                },
                ...(isSelected && {
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-10px",
                    left: 0,
                    right: 0,
                    height: "3px",
                    bgcolor: "#dc2626",
                    borderRadius: "2px 2px 0 0",
                  },
                }),
              }}
            >
              {title}
            </Box>
          );
        })}
      </Box>

      {(showRightArrow || showFilterBtn) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1.5,
            borderLeft: "1px solid #e2e8f0",
            gap: 0.5,
          }}
        >
          {showRightArrow && (
            <IconButton
              size="small"
              onClick={() => handleScroll("right")}
              sx={{
                color: "#64748b",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          )}
          {showFilterBtn && (
            <IconButton
              size="small"
              onClick={onOpenFilterDrawer}
              sx={{
                bgcolor: "#0f172a",
                color: "#ffffff",
                borderRadius: "8px",
                p: 0.8,
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: "#334155", transform: "scale(1.05)" },
              }}
            >
              <TuneIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};

const POSCategories = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Track selected category at each hierarchy depth: [level0Cat, level1Cat, level2Cat, ...]
  const [selectedPath, setSelectedPath] = useState([
    { id: "hot_list", title: "Hot List", children: [] },
  ]);

  // Ensure URL defaults to /vendor/point-of-sale/?active=buy&hot_list=true if opened without params
  useEffect(() => {
    if (!location.search) {
      navigate("/vendor/point-of-sale/?active=buy&hot_list=true", {
        replace: true,
      });
    }
  }, [location.search, navigate]);

  // Sync selectedPath when URL query params or loaded categories change
  useEffect(() => {
    const hotListParam = searchParams.get("hot_list");
    const categoryParam = searchParams.get("category");
    const categoryIdParam = searchParams.get("category_id");

    if (hotListParam === "true") {
      const hotCat = { id: "hot_list", title: "Hot List", children: [] };
      setSelectedPath([hotCat]);
      setSelectedCategory(hotCat);
      return;
    }

    if (categoryParam === "All" && categoryIdParam === "1") {
      const allCat = { id: "all", title: "All", children: [] };
      setSelectedPath([allCat]);
      setSelectedCategory(allCat);
      return;
    }

    if (categoryIdParam && categories.length > 2) {
      const matchedPath = findCategoryPathById(categories, categoryIdParam);
      if (matchedPath && matchedPath.length > 0) {
        setSelectedPath(matchedPath);
        setSelectedCategory(matchedPath[matchedPath.length - 1]);
      }
    }
  }, [searchParams, categories]);

  const updatePOSUrlForCategory = (cat) => {
    const isHotList =
      cat?.id === "hot_list" ||
      cat?.title === "Hot List" ||
      cat === "Hot List";
    const isAll =
      cat?.id === "all" ||
      cat?.id === 1 ||
      cat?.title === "All" ||
      cat === "All";

    if (isHotList) {
      navigate("/vendor/point-of-sale/?active=buy&hot_list=true");
    } else if (isAll) {
      navigate("/vendor/point-of-sale/?active=buy&category=All&category_id=1");
    } else {
      const categorySlugOrTitle = encodeURIComponent(
        cat?.category_slug || cat?.title || "",
      );
      const categoryId = encodeURIComponent(cat?.id || "");
      navigate(
        `/vendor/point-of-sale/?active=buy&category=${categorySlugOrTitle}&category_id=${categoryId}`,
      );
    }
  };

  const handleSelectAtLevel = (levelIndex, cat) => {
    const normalizedCat =
      typeof cat === "object"
        ? cat
        : { id: cat, title: cat, children: [] };

    setSelectedPath((prev) => [...prev.slice(0, levelIndex), normalizedCat]);
    setSelectedCategory(normalizedCat);
    updatePOSUrlForCategory(normalizedCat);
  };

  // Build dynamic rows: Row 0 is top-level categories; each subsequent row comes from selectedPath[level].children
  const categoryRows = [categories];
  selectedPath.forEach((selectedCat) => {
    if (
      selectedCat &&
      Array.isArray(selectedCat.children) &&
      selectedCat.children.length > 0
    ) {
      categoryRows.push(selectedCat.children);
    }
  });

  // Active row count for "Showing X categories"
  const activeLevelItems =
    categoryRows[categoryRows.length - 1] || categories;

  return (
    <>
      <Box
        sx={{
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        {/* MULTI-LEVEL CATEGORY ROWS (Row 1 = Level 0, Row 2 = Level 1, Row 3 = Level 2, etc.) */}
        {categoryRows.map((rowItems, rowIndex) => (
          <ScrollableCategoryRow
            key={rowIndex}
            items={rowItems}
            selectedItem={selectedPath[rowIndex]}
            onSelectItem={(cat) => handleSelectAtLevel(rowIndex, cat)}
            showFilterBtn={rowIndex === 0}
            onOpenFilterDrawer={() => setFilterDrawerOpen(true)}
          />
        ))}

        {/* BOTTOM ROW: Filters dropdown, Showing count, Grid/List Toggles */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
            py: 0.8,
            bgcolor: "#f8fafc",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#64748b",
                letterSpacing: "0.4px",
              }}
            >
              FILTERS:
            </span>
            <FormControl size="small">
              <Select
                defaultValue="all"
                sx={{
                  height: "30px",
                  fontSize: "11px",
                  fontWeight: 500,
                  bgcolor: "#f0f9ff",
                  color: "#0284c7",
                  borderRadius: "6px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#bae6fd",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7dd3fc",
                  },
                }}
              >
                <MenuItem value="all">Stock: All</MenuItem>
                <MenuItem value="in_stock">In Stock</MenuItem>
                <MenuItem value="low_stock">Low Stock</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              fontSize: "11px",
              color: "#64748b",
              fontWeight: 400,
              letterSpacing: "0.2px",
            }}
          >
            Showing{" "}
            <Box component="span" sx={{ color: "#0f172a", fontWeight: 600 }}>
              {activeLevelItems.length}
            </Box>{" "}
            categories
          </Box>

          <Box
            sx={{
              display: "flex",
              bgcolor: "#e2e8f0",
              borderRadius: "6px",
              p: "2px",
              gap: "2px",
            }}
          >
            <IconButton
              size="small"
              onClick={() => setViewMode("grid")}
              sx={{
                bgcolor: viewMode === "grid" ? "#ffffff" : "transparent",
                color: viewMode === "grid" ? "#0284c7" : "#64748b",
                borderRadius: "4px",
                p: 0.5,
                boxShadow:
                  viewMode === "grid" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor:
                    viewMode === "grid" ? "#ffffff" : "rgba(255,255,255,0.5)",
                },
              }}
            >
              <ViewModuleIcon sx={{ fontSize: "16px" }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setViewMode("list")}
              sx={{
                bgcolor: viewMode === "list" ? "#ffffff" : "transparent",
                color: viewMode === "list" ? "#0284c7" : "#64748b",
                borderRadius: "4px",
                p: 0.5,
                boxShadow:
                  viewMode === "list" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor:
                    viewMode === "list" ? "#ffffff" : "rgba(255,255,255,0.5)",
                },
              }}
            >
              <ViewListIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Render Advanced Filter Drawer */}
      <POSAdvanceFilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        categories={categories.map((c) =>
          typeof c === "object" ? c.title : c,
        )}
      />
    </>
  );
};

export default POSCategories;
