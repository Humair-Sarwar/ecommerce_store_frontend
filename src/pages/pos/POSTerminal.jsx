import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import POSHeader from "../../components/pos/POSHeader";
import POSCategories from "../../components/pos/POSCategories";
import POSProductGrid from "../../components/pos/POSProductGrid";
import POSCartSidebar from "../../components/pos/POSCartSidebar";
import POSBarcodeScanner from "../../components/pos/POSBarcodeScanner";
import { useFetchPOSCategories } from "../../hook/vendor/useCategories";
import { useFetchPOSProducts } from "../../hook/vendor/useProducts";

const POSTerminal = () => {
  const [searchParams] = useSearchParams();
  const [activeMode, setActiveMode] = useState("sale");
  const [selectedCategory, setSelectedCategory] = useState("Hot List");
  const [cart, setCart] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerValue, setScannerValue] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const hotListParam = searchParams.get("hot_list") || "";
  const categoryParam = searchParams.get("category") || "";
  const categoryIdParam = searchParams.get("category_id") || "";

  const { data: posCategoriesRes } = useFetchPOSCategories();

  const { data: posProductsRes } = useFetchPOSProducts({
    hot_list: hotListParam,
    category: categoryParam,
    category_id: categoryIdParam,
  });

  const categories = useMemo(() => {
    const dbCategories = posCategoriesRes?.data || [];
    return [
      { id: "hot_list", title: "Hot List", children: [] },
      { id: "all", title: "All", children: [] },
      ...dbCategories,
    ];
  }, [posCategoriesRes]);

  const products = useMemo(() => {
    const rawProducts = posProductsRes?.data || [];
    return rawProducts.map((item) => {
      const regularPrice = Number(item.regular_price ?? item.oldPrice ?? 0);
      const salePrice = Number(item.sale_price ?? item.price ?? 0);
      const effectivePrice =
        item.price !== undefined && item.price !== null
          ? Number(item.price)
          : salePrice > 0
            ? salePrice
            : regularPrice;
      const oldPrice =
        item.oldPrice !== undefined
          ? item.oldPrice !== null
            ? Number(item.oldPrice)
            : null
          : regularPrice > effectivePrice
            ? regularPrice
            : null;

      return {
        ...item,
        id: item.id,
        name: item.name || item.title || "Untitled Product",
        condition: item.condition || "Brand New",
        brand: item.brand || "N/A",
        category: item.category || "N/A",
        price: Number.isFinite(effectivePrice) ? effectivePrice : 0,
        oldPrice: Number.isFinite(oldPrice) && oldPrice > 0 ? oldPrice : null,
        stock: Number(item.stock ?? 0),
        sku: item.sku || item.product_sku || "N/A",
        variants: Array.isArray(item.variants) ? item.variants : [],
        image: item.image || null,
        vatStatus: item.vatStatus || "VAT Exempt",
      };
    });
  }, [posProductsRes]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        width: "100vw",
        bgcolor: "#f1f5f9",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDE CONTAINER: Header + Categories + Product Grid */}
      <Box
        sx={{
          flex: { xs: "none", md: 8 },
          display: "flex",
          flexDirection: "column",
          height: { xs: "auto", md: "100vh" },
          overflow: "hidden",
        }}
      >
        {/* 1. POS Header Component */}
        <POSHeader
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          showScanner={showScanner}
          setShowScanner={setShowScanner}
        />

        {/* 2. Categories Filter Bar Component */}
        <POSCategories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* 3. Product Grid Component */}
        <POSProductGrid
          products={products}
          addToCart={addToCart}
          viewMode={viewMode}
        />

        {/* 4. Barcode Scanner Input Container (Toggled via header SCAN button) */}
        {showScanner && (
          <Box sx={{ p: 1, background: "white", borderTop: "1px solid #ccc" }}>
            <POSBarcodeScanner
              value={scannerValue}
              onChange={(e) => setScannerValue(e.target.value)}
              onFocus={() => setShowScanner(false)}
            />
          </Box>
        )}
      </Box>

      {/* RIGHT SIDE CONTAINER: Full-Height Cart Sidebar */}
      <Box
        sx={{
          flex: { xs: 1, md: 4 },
          height: { xs: "50vh", md: "100vh" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <POSCartSidebar cart={cart} />
      </Box>
    </Box>
  );
};

export default POSTerminal;
