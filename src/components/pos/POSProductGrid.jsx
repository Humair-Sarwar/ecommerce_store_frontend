import React from "react";
import { Box, Card, CardContent, Typography, Chip, Button, IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityIcon from "@mui/icons-material/Visibility";

const POSProductGrid = ({ products, addToCart, viewMode = "grid" }) => {
  const scrollbarStyles = {
    overflowY: "auto",
    height: "100vh",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f5f9",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#cbd5e1",
      borderRadius: "4px",
      transition: "background 0.2s ease",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#94a3b8",
    },
  };

  if (viewMode === "list") {
    return (
      <Box sx={scrollbarStyles}>
        <Box sx={{ p: 1.5, bgcolor: "#f1f5f9", display: "flex", flexDirection: "column", gap: 1.25 }}>
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                width: "100%",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                bgcolor: "#ffffff",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
                  borderColor: "#cbd5e1",
                },
              }}
            >
              <CardContent sx={{ p: "12px 16px !important", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                {/* Left Side: Thumbnail & Details */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, minWidth: 0 }}>
                  <Box
                    component="img"
                    src={product.image || "https://via.placeholder.com/60"}
                    alt={product.name}
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: "1px solid #e2e8f0",
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: "#0f172a",
                        fontSize: "14.5px",
                        lineHeight: 1.2,
                        mb: 0.5,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "11.5px", color: "#64748b", fontWeight: 500 }}>
                      Condition: <Box component="span" sx={{ fontWeight: 600, color: "#334155" }}>{product.condition || "Brand New"}</Box> | Category: <Box component="span" sx={{ fontWeight: 600, color: "#334155" }}>{product.category}</Box> | Brand: <Box component="span" sx={{ fontWeight: 600, color: "#334155" }}>{product.brand}</Box>
                      {product.variants && product.variants.map((v, i) => ` | ${v}`).join("")}
                    </Typography>
                  </Box>
                </Box>

                {/* Right Side: Price, SKU, Stock Status & Action Buttons */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h6" color="error.main" sx={{ fontWeight: 800, fontSize: "17px", lineHeight: 1.1 }}>
                      £{product.price.toFixed(2)}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1, mt: 0.5 }}>
                      <Chip
                        label={product.sku}
                        size="small"
                        sx={{ fontSize: "11px", fontWeight: 600, height: "20px", bgcolor: "#f0f9ff", color: "#0284c7", borderRadius: "4px" }}
                      />
                      <Chip
                        label={product.stock > 0 ? `${product.stock} pcs` : "Out Of Stock"}
                        size="small"
                        color={product.stock > 0 ? "success" : "error"}
                        variant="outlined"
                        sx={{ fontSize: "10px", height: "20px", fontWeight: 700 }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => addToCart(product)}
                      sx={{
                        fontWeight: 700,
                        fontSize: "12px",
                        borderRadius: "16px",
                        py: 0.5,
                        px: 2.5,
                        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        boxShadow: "0 4px 10px rgba(239, 68, 68, 0.25)",
                        "&:hover": { background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" },
                      }}
                    >
                      Add
                    </Button>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton size="small" sx={{ color: "#059669", bgcolor: "#ecfdf5", p: 0.5, borderRadius: "6px", "&:hover": { bgcolor: "#d1fae5" } }}>
                        <PlaylistAddIcon sx={{ fontSize: "16px" }} />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#0284c7", bgcolor: "#e0f2fe", p: 0.5, borderRadius: "6px", "&:hover": { bgcolor: "#bae6fd" } }}>
                        <ArrowDropDownIcon sx={{ fontSize: "16px" }} />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#0284c7", bgcolor: "#e0f2fe", p: 0.5, borderRadius: "6px", "&:hover": { bgcolor: "#bae6fd" } }}>
                        <VisibilityIcon sx={{ fontSize: "16px" }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={scrollbarStyles}>
      <Box
        sx={{
          flex: 7,
          p: 1,
          bgcolor: "#f1f5f9",
          display: "block",
          columnCount: { xs: 1, sm: 2, md: 4 },
          columnGap: "9px",
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              breakInside: "avoid-column",
              marginBottom: "9px",
              width: "100%",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              position: "relative",
              bgcolor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              height: "fit-content",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
                borderColor: "#cbd5e1",
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardContent sx={{ p: "10px !important", display: "flex", flexDirection: "column" }}>
              <Box>
                {/* Top Row: Thumbnail + Product Details & SKU */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 0.5 }}>
                  {product.image && (
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      sx={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        border: "1px solid #e2e8f0",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: "#0f172a",
                        fontSize: "13.5px",
                        lineHeight: 1.25,
                        letterSpacing: "0.1px",
                        mb: 0.5,
                      }}
                    >
                      {product.name}
                    </Typography>

                    {/* Condition Info */}
                    <Typography variant="body2" sx={{ fontSize: "11.5px", fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
                      Condition: <Box component="span" sx={{ fontWeight: 500, color: "#334155" }}>{product.condition}</Box>
                    </Typography>

                    {/* Brand & Category */}
                    <Typography variant="caption" display="block" sx={{ fontSize: "11px", color: "#64748b", lineHeight: 1.4 }}>
                      Brand: <Box component="span" sx={{ fontWeight: 600, color: "#334155" }}>{product.brand}</Box>
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ fontSize: "11px", color: "#64748b", lineHeight: 1.4, mb: 1.25 }}>
                      Category: <Box component="span" sx={{ fontWeight: 600, color: "#334155" }}>{product.category}</Box>
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="caption" sx={{ fontSize: "11px", fontWeight: 600, color: "#64748b", flexShrink: 0 }}>
                    {product.sku}
                  </Typography>
                </Box>

                {/* Pricing & VAT */}
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 0.25 }}>
                  <Typography variant="h6" color="error.main" sx={{ fontWeight: 800, fontSize: "17px" }}>
                    £{product.price.toFixed(2)}
                  </Typography>
                  {product.oldPrice && (
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through", fontSize: "11.5px" }}>
                      £{product.oldPrice.toFixed(2)}
                    </Typography>
                  )}
                </Box>

                <Typography variant="caption" display="block" sx={{ fontSize: "10px", color: "#64748b", fontWeight: 500, mb: 1.25 }}>
                  {product.vatStatus || "VAT Exempt"}
                </Typography>

                {/* Stock Level & Action Icons Row */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.25, pb: 1.25, borderBottom: "1px solid #f1f5f9" }}>
                  <Chip
                    label={product.stock > 0 ? `Stock ${product.stock} pcs` : "0 Stock"}
                    size="small"
                    color={product.stock > 0 ? "success" : "default"}
                    variant="outlined"
                    sx={{ fontSize: "10px", height: "22px", fontWeight: 700 }}
                  />

                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <IconButton size="small" sx={{ color: "#059669", bgcolor: "#ecfdf5", p: 0.5, borderRadius: "6px", "&:hover": { bgcolor: "#d1fae5" } }}>
                      <PlaylistAddIcon sx={{ fontSize: "15px" }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#0284c7", bgcolor: "#e0f2fe", p: 0.5, borderRadius: "6px", "&:hover": { bgcolor: "#bae6fd" } }}>
                      <VisibilityIcon sx={{ fontSize: "15px" }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Optional Variant Selectors */}
                {product.variants && (
                  <Box sx={{ mb: 1.25 }}>
                    <Typography variant="caption" display="block" sx={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
                      Color: Natural Oak
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "9.5px", fontWeight: 600, color: "#334155", borderColor: "#cbd5e1", borderRadius: "14px", textTransform: "none", py: 0.2, px: 1 }}
                      >
                        BLACK & WHITE
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ fontSize: "9.5px", fontWeight: 600, bgcolor: "#ffffff", color: "#dc2626", border: "1.5px solid #dc2626", borderRadius: "14px", textTransform: "none", py: 0.2, px: 1, boxShadow: "none", "&:hover": { bgcolor: "#fff5f5" } }}
                      >
                        NATURAL OAK
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Condition Selector Pills */}
                <Box sx={{ mb: 1.25 }}>
                  <Typography variant="caption" display="block" sx={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
                    Condition: BRAND NEW
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      sx={{ fontSize: "9.5px", fontWeight: 600, bgcolor: "#ffffff", color: "#dc2626", border: "1.5px solid #dc2626", borderRadius: "14px", textTransform: "none", py: 0.2, px: 1, boxShadow: "none", "&:hover": { bgcolor: "#fff5f5" } }}
                    >
                      BRAND NEW
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "9.5px", fontWeight: 600, color: "#64748b", borderColor: "#cbd5e1", borderRadius: "14px", textTransform: "none", py: 0.2, px: 1 }}
                    >
                      LIKE NEW
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Full-width Rounded Red ADD Button */}
              <Box sx={{ mt: 1.5 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  size="medium"
                  onClick={() => addToCart(product)}
                  sx={{
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                    borderRadius: "20px",
                    py: 0.75,
                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #dc2626 100%, #b91c1c 100%)",
                      boxShadow: "0 6px 15px rgba(239, 68, 68, 0.4)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  ADD
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default POSProductGrid;