import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const navigate = useNavigate();

  // Primary KPI cards (Right of Welcome Banner)
  const primaryStats = [
    {
      title: "Today’s Sale",
      value: "$0.00",
      trend: "+12.4%",
      subtitle: "Updated just now",
      icon: <AttachMoneyIcon sx={{ fontSize: "22px" }} />,
      iconBg: "rgba(249, 115, 22, 0.12)",
      iconColor: "#f97316",
      badgeBg: "rgba(16, 185, 129, 0.12)",
      badgeColor: "#059669",
      accentColor: "#f97316",
    },
    {
      title: "Current month sales",
      value: "$0.00",
      trend: "+8.2%",
      subtitle: "Compared to last month",
      icon: <TrendingUpIcon sx={{ fontSize: "22px" }} />,
      iconBg: "rgba(37, 99, 235, 0.12)",
      iconColor: "#2563eb",
      badgeBg: "rgba(16, 185, 129, 0.12)",
      badgeColor: "#059669",
      accentColor: "#2563eb",
    },
    {
      title: "Orders",
      value: "0",
      trend: "Active",
      subtitle: "Total orders received",
      icon: <ShoppingCartIcon sx={{ fontSize: "22px" }} />,
      iconBg: "rgba(239, 68, 68, 0.12)",
      iconColor: "#ef4444",
      badgeBg: "rgba(249, 115, 22, 0.12)",
      badgeColor: "#ea580c",
      accentColor: "#ef4444",
    },
    {
      title: "Sold Items",
      value: "0",
      trend: "+5.1%",
      subtitle: "Units dispatched",
      icon: <DevicesOtherIcon sx={{ fontSize: "22px" }} />,
      iconBg: "rgba(16, 185, 129, 0.12)",
      iconColor: "#10b981",
      badgeBg: "rgba(16, 185, 129, 0.12)",
      badgeColor: "#059669",
      accentColor: "#10b981",
    },
  ];

  // Secondary KPI cards (Full Row)
  const secondaryStats = [
    {
      title: "Net Sale",
      value: "$0.00",
      subtitle: "Revenue after discounts",
      icon: <CrisisAlertIcon sx={{ fontSize: "22px" }} />,
      iconBg: "rgba(234, 179, 8, 0.14)",
      iconColor: "#ca8a04",
      dotColor: "#eab308",
    },
    {
      title: "Shipping Charges",
      value: "$0.00",
      subtitle: "Total delivery fees",
      icon: <LocalShippingIcon sx={{ fontSize: "22px" }} />,
      iconBg: "rgba(139, 92, 246, 0.12)",
      iconColor: "#7c3aed",
      dotColor: "#8b5cf6",
    },
    {
      title: "VAT",
      value: "$0.00",
      subtitle: "Estimated tax collected",
      icon: <PaymentsIcon sx={{ fontSize: "22px" }} />,
      iconBg: "rgba(244, 63, 94, 0.12)",
      iconColor: "#e11d48",
      dotColor: "#f43f5e",
    },
    {
      title: "Total Signup Customers",
      value: "0",
      subtitle: "Registered store accounts",
      icon: <PeopleIcon sx={{ fontSize: "22px" }} />,
      iconBg: "rgba(16, 185, 129, 0.12)",
      iconColor: "#059669",
      dotColor: "#10b981",
    },
  ];

  // Recent Sale Orders Table Data
  const recentOrders = [
    {
      id: "02933935",
      status: "Complete",
      amount: "£1,414.09",
    },
  ];

  // Out of Stock Products Table Data
  const outOfStockProducts = [
    {
      name: "iPhone 16 Pro Max",
      sku: "123456",
      active: "Sale",
      stock: 12,
      minAlert: 0,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        py: 3,
        px: { xs: 1, sm: 2 },
        overflowY: "auto",
        backgroundColor: "#f4f6f9",
        minHeight: "calc(100vh - 68px)",
        fontFamily: "'Poppins', sans-serif",
      }}
      className="pages-admin-target-style"
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        {/* =================================================================
            PAGE HEADER BAR
            ================================================================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                bgcolor: "#0f172a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.18)",
              }}
            >
              <DashboardIcon sx={{ fontSize: "20px" }} />
            </Box>
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0f172a",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Dashboard Overview
              </Typography>
              <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500 }}>
                Monitor your store sales, inventory alerts, and real-time performance
              </Typography>
            </Box>
          </Box>

          {/* Quick Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Button
              onClick={() => navigate("/vendor/products/add")}
              size="small"
              startIcon={<AddIcon sx={{ fontSize: "18px !important" }} />}
              sx={{
                bgcolor: "#0f172a",
                color: "#ffffff",
                borderRadius: "9999px",
                px: 2.2,
                py: 0.8,
                fontSize: "12.5px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.16)",
                "&:hover": {
                  bgcolor: "#1e293b",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Add Product
            </Button>
          </Box>
        </Box>

        {/* =================================================================
            ROW 1: HERO WELCOME BANNER + 4 PRIMARY KPI CARDS
            ================================================================= */}
        <Grid container spacing={2.5}>
          {/* Left: Modern Carbon-Slate Welcome Hero Banner */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
                borderRadius: "24px",
                p: { xs: 3, sm: 3.5 },
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 12px 32px rgba(15, 23, 42, 0.22)",
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Decorative Ambient Glow Circles */}
              <Box
                sx={{
                  position: "absolute",
                  top: -60,
                  right: -40,
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -70,
                  left: "30%",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(249, 115, 22, 0.18) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <Grid container spacing={2} sx={{ alignItems: "center", position: "relative", zIndex: 1 }}>
                <Grid size={{ xs: 12, sm: 7 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Box>
                      {/* Store Status Pill */}
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.8,
                          px: 1.4,
                          py: 0.4,
                          borderRadius: "9999px",
                          bgcolor: "rgba(16, 185, 129, 0.15)",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                          color: "#34d399",
                          fontSize: "11px",
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: "#10b981",
                          }}
                        />
                        Self Mart Store • Live
                      </Box>

                      <Typography
                        component="h2"
                        sx={{
                          color: "#ffffff",
                          fontSize: { xs: "22px", sm: "26px" },
                          fontWeight: 700,
                          mb: 1.5,
                          lineHeight: 1.25,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        Welcome to the Store!
                      </Typography>

                      <Typography
                        component="p"
                        sx={{
                          color: "#94a3b8",
                          fontSize: "13.5px",
                          fontWeight: 400,
                          lineHeight: 1.6,
                          mb: 3,
                        }}
                      >
                        Explore the latest trends, shop our curated collections, and enjoy exclusive discounts and offers.
                      </Typography>
                    </Box>

                    <Box>
                      <Button
                        component="a"
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: "16px !important" }} />}
                        sx={{
                          bgcolor: "#10b981",
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: "13px",
                          textTransform: "none",
                          borderRadius: "9999px",
                          px: 2.8,
                          py: 1,
                          boxShadow: "0 6px 20px rgba(16, 185, 129, 0.35)",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            bgcolor: "#059669",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.45)",
                          },
                        }}
                      >
                        Browse Web
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 5 }}>
                  <Box
                    className="dashboard-img-target"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "& img": {
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "200px",
                        objectFit: "contain",
                        filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.35))",
                        transition: "transform 0.3s ease",
                      },
                      "&:hover img": {
                        transform: "scale(1.04) translateY(-4px)",
                      },
                    }}
                  >
                    <img src="/dashboard.png" alt="Store Dashboard" />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right: 2x2 Primary KPI Cards */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Grid container spacing={2.5} sx={{ height: "100%" }}>
              {primaryStats.map((stat, idx) => (
                <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                  <Box
                    sx={{
                      backgroundColor: "#ffffff",
                      p: 2.5,
                      borderRadius: "22px",
                      border: "1px solid #eef2f6",
                      boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 28px rgba(15, 23, 42, 0.07)",
                        borderColor: "#e2e8f0",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: "12px",
                            bgcolor: stat.iconBg,
                            color: stat.iconColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "13.5px",
                            fontWeight: 600,
                            color: "#475569",
                          }}
                        >
                          {stat.title}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          px: 1,
                          py: 0.3,
                          borderRadius: "9999px",
                          bgcolor: stat.badgeBg,
                          color: stat.badgeColor,
                          fontSize: "11px",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.2,
                        }}
                      >
                        {stat.trend}
                        <NorthEastIcon sx={{ fontSize: "12px" }} />
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "28px",
                          fontWeight: 800,
                          color: "#0f172a",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "11.5px",
                          color: "#94a3b8",
                          fontWeight: 500,
                          mt: 0.6,
                        }}
                      >
                        {stat.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* =================================================================
            ROW 2: 4 SECONDARY FINANCIAL & CUSTOMER KPI CARDS
            ================================================================= */}
        <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
          {secondaryStats.map((item, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  p: 2.5,
                  borderRadius: "22px",
                  border: "1px solid #eef2f6",
                  boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.07)",
                    borderColor: "#e2e8f0",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: "12px",
                      bgcolor: item.iconBg,
                      color: item.iconColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: item.dotColor,
                      boxShadow: `0 0 0 4px ${item.iconBg}`,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "#475569",
                    mb: 0.5,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#0f172a",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "11.5px",
                    color: "#94a3b8",
                    fontWeight: 500,
                    mt: 0.6,
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* =================================================================
            ROW 3: RECENT SALE ORDERS & OUT OF STOCK PRODUCTS TABLES
            ================================================================= */}
        <Grid container spacing={2.5} sx={{ mt: 1 }}>
          {/* Table 1: Recent Sale Orders */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "24px",
                border: "1px solid #eef2f6",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                overflow: "hidden",
                height: "100%",
              }}
            >
              {/* Card Header */}
              <Box
                sx={{
                  p: 2.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      bgcolor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0f172a",
                    }}
                  >
                    <ReceiptLongOutlinedIcon sx={{ fontSize: "19px" }} />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "15.5px",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      Recent Sale Orders
                    </Typography>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.2,
                        borderRadius: "9999px",
                        bgcolor: "#0f172a",
                        color: "#ffffff",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      3
                    </Box>
                  </Box>
                </Box>

                <Button
                  size="small"
                  onClick={() => navigate("/vendor/orders/buy")}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "14px !important" }} />}
                  sx={{
                    textTransform: "none",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    fontSize: "12px",
                    px: 2,
                    py: 0.6,
                    color: "#0f172a",
                    bgcolor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    "&:hover": {
                      bgcolor: "#0f172a",
                      color: "#ffffff",
                      borderColor: "#0f172a",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  All Sales
                </Button>
              </Box>

              <Table size="medium" sx={{ minWidth: 300 }} aria-label="recent sale orders table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "11.5px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid #f1f5f9",
                        py: 1.5,
                      }}
                    >
                      Order ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "11.5px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid #f1f5f9",
                        py: 1.5,
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "11.5px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid #f1f5f9",
                        py: 1.5,
                      }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "11.5px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid #f1f5f9",
                        textAlign: "center",
                        py: 1.5,
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { bgcolor: "#f8fafc" },
                        transition: "background-color 0.15s ease",
                      }}
                    >
                      <TableCell sx={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                        #{order.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        <Box
                          sx={{
                            borderRadius: "9999px",
                            backgroundColor: "rgba(16, 185, 129, 0.12)",
                            color: "#059669",
                            border: "1px solid rgba(16, 185, 129, 0.25)",
                            fontWeight: 600,
                            fontSize: "11.5px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.6,
                            padding: "3px 12px",
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: "#10b981",
                            }}
                          />
                          {order.status}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>
                        {order.amount}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Tooltip title="View Order">
                          <IconButton
                            size="small"
                            onClick={() => navigate("/vendor/orders/buy")}
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "8px",
                              bgcolor: "rgba(16, 185, 129, 0.1)",
                              color: "#059669",
                              "&:hover": {
                                bgcolor: "#10b981",
                                color: "#ffffff",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            <VisibilityOutlinedIcon sx={{ fontSize: "17px" }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Table 2: Out of Stock Products */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "24px",
                border: "1px solid #eef2f6",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                overflow: "hidden",
                height: "100%",
              }}
            >
              {/* Card Header */}
              <Box
                sx={{
                  p: 2.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      bgcolor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0f172a",
                    }}
                  >
                    <Inventory2OutlinedIcon sx={{ fontSize: "19px" }} />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "15.5px",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      Out of Stock Products
                    </Typography>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.2,
                        borderRadius: "9999px",
                        bgcolor: "#f97316",
                        color: "#ffffff",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      228
                    </Box>
                  </Box>
                </Box>

                <Button
                  size="small"
                  onClick={() => navigate("/vendor/products")}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "14px !important" }} />}
                  sx={{
                    textTransform: "none",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    fontSize: "12px",
                    px: 2,
                    py: 0.6,
                    color: "#0f172a",
                    bgcolor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    "&:hover": {
                      bgcolor: "#0f172a",
                      color: "#ffffff",
                      borderColor: "#0f172a",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  All Products
                </Button>
              </Box>

              <Table size="medium" sx={{ minWidth: 350 }} aria-label="out of stock products table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "11.5px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid #f1f5f9",
                        py: 1.5,
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "11.5px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid #f1f5f9",
                        py: 1.5,
                      }}
                    >
                      SKU
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "11.5px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid #f1f5f9",
                        py: 1.5,
                      }}
                    >
                      Active
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "11.5px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid #f1f5f9",
                        py: 1.5,
                      }}
                    >
                      Stock
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "11.5px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid #f1f5f9",
                        py: 1.5,
                      }}
                    >
                      Min Stock Alert
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {outOfStockProducts.map((product, pIdx) => (
                    <TableRow
                      key={pIdx}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { bgcolor: "#f8fafc" },
                        transition: "background-color 0.15s ease",
                      }}
                    >
                      <TableCell sx={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                        {product.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        <Box
                          component="span"
                          sx={{
                            px: 1,
                            py: 0.3,
                            borderRadius: "6px",
                            bgcolor: "#f1f5f9",
                            color: "#475569",
                            fontFamily: "monospace",
                            fontWeight: 600,
                            fontSize: "11.5px",
                          }}
                        >
                          {product.sku}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        <Box
                          component="span"
                          sx={{
                            px: 1.2,
                            py: 0.3,
                            borderRadius: "9999px",
                            bgcolor: "rgba(37, 99, 235, 0.1)",
                            color: "#2563eb",
                            fontWeight: 600,
                            fontSize: "11.5px",
                          }}
                        >
                          {product.active}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>
                        {product.stock}
                      </TableCell>
                      <TableCell>
                        <Box
                          component="span"
                          sx={{
                            px: 1.2,
                            py: 0.3,
                            borderRadius: "9999px",
                            bgcolor: "rgba(239, 68, 68, 0.12)",
                            color: "#dc2626",
                            fontWeight: 700,
                            fontSize: "11.5px",
                          }}
                        >
                          {product.minAlert}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
