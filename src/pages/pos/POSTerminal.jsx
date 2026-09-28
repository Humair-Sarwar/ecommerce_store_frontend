import React, { useState } from "react";
import { Box } from "@mui/material";
import POSHeader from "../../components/pos/POSHeader";
import POSCategories from "../../components/pos/POSCategories";
import POSProductGrid from "../../components/pos/POSProductGrid";
import POSCartSidebar from "../../components/pos/POSCartSidebar";
import POSBarcodeScanner from "../../components/pos/POSBarcodeScanner";

const POSTerminal = () => {
  const [activeMode, setActiveMode] = useState("sale");
  const [selectedCategory, setSelectedCategory] = useState("Hot List");
  const [cart, setCart] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerValue, setScannerValue] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    "Hot List",
    "All",
    "iPhone Box",
    "Printer Design",
    "iPhone Model 11",
    "Test level 1",
    "Design",
    "Mobile & Computing 1",
    "Mobile & Computing 2",
    "Mobile & Computing 3",
    "Mobile & Computing 4",
  ];

  const products = [
    {
      id: 1,
      name: "iphone with image",
      condition: "Brand New",
      brand: "N/A",
      category: "SMART WATCH",
      price: 3.0,
      stock: 7,
      sku: "328899",
      image: 'https://donesol-development.s3.eu-west-2.amazonaws.com/f4dc7cbd-89e0-4813-95ae-8428f326982d/store_manager/cover_image_1788428175454.38'
    },
    {
      id: 2,
      name: "IPHONE USB DIAMOND CABLE",
      condition: "Brand New",
      brand: "HOCO",
      category: "CABLE",
      price: 7.0,
      oldPrice: 8.0,
      discount: "£1.00 off",
      stock: 187,
      variants: ["1 TB", "128 GB"],
      sku: "532424",
      image: "https://tradeandrecycle.co.uk/_next/image?url=https%3A%2F%2Fdonesol-development.s3.eu-west-2.amazonaws.com%2Ff4dc7cbd-89e0-4813-95ae-8428f326982d%2Fmedia%2F712c7_1789728569315_md.webp&w=1600&q=75"
    },
    {
      id: 3,
      name: "IPHONE USB DIAMOND CABLE",
      condition: "Brand New",
      brand: "HOCO",
      category: "CABLE",
      price: 7.0,
      oldPrice: 8.0,
      discount: "£1.00 off",
      stock: 187,
      variants: ["1 TB", "128 GB"],
      sku: "532424",
    },
    {
      id: 4,
      name: "IPHONE USB DIAMOND CABLE",
      condition: "Brand New",
      brand: "HOCO",
      category: "CABLE",
      price: 7.0,
      oldPrice: 8.0,
      discount: "£1.00 off",
      stock: 187,
      variants: ["1 TB", "128 GB"],
      sku: "532424",
    },
    {
      id: 5,
      name: "iphone with fdaffdsaf image",
      condition: "Brand New",
      brand: "N/A",
      category: "SMART WATCH",
      price: 3.0,
      stock: 7,
      sku: "625435",
      image: 'https://donesol-development.s3.eu-west-2.amazonaws.com/f4dc7cbd-89e0-4813-95ae-8428f326982d/store_manager/cover_image_1788428175454.38'
    },
    {
      id: 6,
      name: "IPHONE USB DIAMOND CABLE",
      condition: "Brand New",
      brand: "HOCO",
      category: "CABLE",
      price: 7.0,
      oldPrice: 8.0,
      discount: "£1.00 off",
      stock: 187,
      variants: ["1 TB", "128 GB"],
      sku: "6425432",
    },
    {
      id: 7,
      name: "IPHONE USB DIAMOND CABLE",
      condition: "Brand New",
      brand: "HOCO",
      category: "CABLE",
      price: 7.0,
      oldPrice: 8.0,
      discount: "£1.00 off",
      stock: 187,
      variants: ["1 TB", "128 GB"],
      sku: "532424",
    },
    {
      id: 8,
      name: "IPHONE USB DIAMOND CABLE",
      condition: "Brand New",
      brand: "HOCO",
      category: "CABLE",
      price: 7.0,
      oldPrice: 8.0,
      discount: "£1.00 off",
      stock: 187,
      variants: ["1 TB", "128 GB"],
      sku: "532424",
    },
    {
      id: 9,
      name: "IPHONE USB DIAMOND CABLE",
      condition: "Brand New",
      brand: "HOCO",
      category: "CABLE",
      price: 7.0,
      oldPrice: 8.0,
      discount: "£1.00 off",
      stock: 187,
      sku: "534324",
    },
  ];

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item)));
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
        <POSProductGrid products={products} addToCart={addToCart} viewMode={viewMode} />

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