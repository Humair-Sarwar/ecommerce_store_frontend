import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getCategoriesApi } from "../utils/apis/APIs";
import { handleError } from "../toast";

export default function CategoriesLoadModal({ handleTargetParentCategoryId }) {
  const [open, setOpen] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const getCategoriesList = async () => {
    try {
      const res = await getCategoriesApi({ business_id: "123" });
      if (res.status === 200) {
        setCategoriesList(res.data?.result || []);
      } else {
        handleError("Internal Server Error!");
      }
    } catch (error) {
      handleError("Error fetching categories!");
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  const handleSelectCategory = (categoryId, categoryName) => {
    setSelectedCategoryName(categoryName);
    handleTargetParentCategoryId(categoryId);
    setOpen(false)
  };

  // 🔁 Recursive rendering function for categories
  const renderCategoryAccordion = (node, level = 0) => {
    const current = node.category;
    const children = node.child || [];

    return (
      <Accordion
        key={current.id}
        className="accordion-expand-left-filter-target"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          borderTop: "1px solid rgb(26 26 26 / 12%)",
          borderRadius: "0 !important",
          ml: `${level * 10}px`,
        }}
      >
        <AccordionSummary
          expandIcon={children.length > 0 && <ExpandMoreIcon />}
          aria-controls={`panel-content-${current.id}`}
          id={`panel-header-${current.id}`}
          sx={{ px: 0, py: 1 }}
        >
          <Typography
            sx={{ fontWeight: "600", color: "black", cursor: "pointer" }}
            onClick={() => handleSelectCategory(current.id, current.name)}
          >
            {current.name}
          </Typography>
        </AccordionSummary>

        {children.length > 0 && (
          <AccordionDetails sx={{ p: 0, pb: 2 }}>
            {children.map((childNode) =>
              renderCategoryAccordion(childNode, level + 1)
            )}
          </AccordionDetails>
        )}
      </Accordion>
    );
  };

  const DrawerList = (
    <Box sx={{ width: 270 }} role="presentation">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 3,
          pt: 1,
        }}
      >
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <CategoryIcon />
          <Box sx={{ ml: 1 }}>Categories</Box>
        </Typography>
        <Box sx={{ cursor: "pointer" }} onClick={toggleDrawer(false)}>
          <svg
            role="presentation"
            strokeWidth="2"
            focusable="false"
            width="19"
            height="19"
            className="icon icon-close"
            viewBox="0 0 24 24"
          >
            <path
              d="M17.658 6.343 6.344 17.657M17.658 17.657 6.344 6.343"
              stroke="currentColor"
            ></path>
          </svg>
        </Box>
      </Box>

      <Box className="left-slt-filters-target">
        {Array.isArray(categoriesList) &&
          categoriesList.map((item) => renderCategoryAccordion(item))}
      </Box>
    </Box>
  );

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        fullWidth
        className="custom-primary-btn-admin-side"
      >
        {selectedCategoryName
          ? `Parent Category: ${selectedCategoryName}`
          : "Select Parent Category"}
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        className="categories-load-modal-target"
        sx={{ zIndex: "6001" }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
