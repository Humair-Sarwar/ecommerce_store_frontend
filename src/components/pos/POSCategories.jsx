import React, { useState, useRef, useEffect } from "react";
import { Box, FormControl, Select, MenuItem, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TuneIcon from "@mui/icons-material/Tune";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";

const POSCategories = ({ categories = [], selectedCategory, setSelectedCategory, viewMode, setViewMode }) => {
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
  }, [categories]);

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

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
      }}
    >
      {/* TOP ROW: Scrollable Category Tabs & Dynamic Scroll/Filter Icons */}
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
          {categories.map((cat, index) => {
            const isSelected = selectedCategory === cat;
            return (
              <Box
                key={index}
                onClick={() => setSelectedCategory(cat)}
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
                {cat}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", pl: 1.5, borderLeft: "1px solid #e2e8f0", gap: 0.5 }}>
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
          <IconButton
            size="small"
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
        </Box>
      </Box>

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
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b", letterSpacing: "0.4px" }}>
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
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#bae6fd" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#7dd3fc" },
              }}
            >
              <MenuItem value="all">Stock: All</MenuItem>
              <MenuItem value="in_stock">In Stock</MenuItem>
              <MenuItem value="low_stock">Low Stock</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ fontSize: "11px", color: "#64748b", fontWeight: 400, letterSpacing: "0.2px" }}>
          Showing <Box component="span" sx={{ color: "#0f172a", fontWeight: 600 }}>{categories.length}</Box> categories
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
              boxShadow: viewMode === "grid" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s ease",
              "&:hover": { bgcolor: viewMode === "grid" ? "#ffffff" : "rgba(255,255,255,0.5)" },
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
              boxShadow: viewMode === "list" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s ease",
              "&:hover": { bgcolor: viewMode === "list" ? "#ffffff" : "rgba(255,255,255,0.5)" },
            }}
          >
            <ViewListIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default POSCategories;