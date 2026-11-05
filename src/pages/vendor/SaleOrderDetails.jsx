import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const SaleOrderDetails = () => {
  const [activeFor, setActiveFor] = React.useState(10);
  const handleChange = (event) => {
    setActiveFor(event.target.value);
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: 3,
        overflowY: "auto",
      }}
      className="pages-admin-target-style"
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        {/* Page Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3,
          }}
        >
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
            <ReceiptLongOutlinedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.2,
              }}
            >
              Sale Order Details
            </Typography>
            <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
              Review ordered items, fulfillment status, and shipping summary
            </Typography>
          </Box>
        </Box>

        {/* Main Order Card */}
        <Box
          sx={{
            borderRadius: "24px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
            overflow: "hidden",
            bgcolor: "#ffffff",
          }}
        >
          {/* Top Metadata Strip */}
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#0f172a",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ whiteSpace: "nowrap", display: "flex", gap: 0.75, fontSize: "13px", alignItems: "center" }}>
              <Box component="span" sx={{ color: "#94a3b8", fontWeight: 600 }}>Order ID:</Box>
              <Box component="span" sx={{ fontWeight: 800, fontFamily: "monospace" }}>#123456</Box>
            </Typography>
            <Typography sx={{ whiteSpace: "nowrap", display: "flex", gap: 0.75, fontSize: "13px", alignItems: "center" }}>
              <Box component="span" sx={{ color: "#94a3b8", fontWeight: 600 }}>Status:</Box>
              <Box
                component="span"
                sx={{
                  px: 1.25,
                  py: 0.25,
                  borderRadius: "999px",
                  bgcolor: "rgba(249, 115, 22, 0.2)",
                  color: "#fb923c",
                  fontWeight: 700,
                  fontSize: "11.5px",
                }}
              >
                Pending
              </Box>
            </Typography>
            <Typography sx={{ whiteSpace: "nowrap", display: "flex", gap: 0.75, fontSize: "13px", alignItems: "center" }}>
              <Box component="span" sx={{ color: "#94a3b8", fontWeight: 600 }}>Placed on:</Box>
              <Box component="span" sx={{ fontWeight: 600 }}>23, Aug 2025 10:38 PM</Box>
            </Typography>
            <Typography sx={{ whiteSpace: "nowrap", display: "flex", gap: 0.75, fontSize: "13px", alignItems: "center" }}>
              <Box component="span" sx={{ color: "#94a3b8", fontWeight: 600 }}>Customer:</Box>
              <Box component="span" sx={{ fontWeight: 600, color: "#34d399" }}>humairsarwar.web@gmail.com</Box>
            </Typography>
          </Box>

          <Box sx={{ p: 3, backgroundColor: "white" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1.5,
                mb: 2.5,
              }}
            >
              <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                <InputLabel id="order-status-label">Order Status</InputLabel>
                <Select
                  labelId="order-status-label"
                  id="order-status-select"
                  value={activeFor}
                  label="Order Status"
                  onChange={handleChange}
                >
                  <MenuItem value={10} sx={{ fontSize: "13.5px" }}>
                    Accept
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "13.5px" }}>
                    Reject
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "13.5px" }}>
                    Cancel
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                className="custom-secondary-btn-admin-side"
                onClick={() => handleNextStep()}
                sx={{ whiteSpace: "nowrap" }}
              >
                Save Changes
              </Button>
            </Box>

            <Grid container spacing={2}>
              {[
                "/Smart-Watches-Products-Eclat-UK.png",
                "/empty-image.jpg",
                "/Smart-Watches-Products-Eclat-UK.png",
                "/Smart-Watches-Products-Eclat-UK.png",
              ].map((imgSrc, idx) => (
                <Grid key={idx} size={{ xs: 12, sm: 6, md: 6 }}>
                  <Box
                    sx={{
                      borderRadius: "16px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      p: 1.5,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#cbd5e1",
                        bgcolor: "#ffffff",
                        boxShadow: "0 6px 18px rgba(15, 23, 42, 0.05)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
                        <Box
                          className="card-order-detail-img-target"
                          sx={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            border: "1px solid #e2e8f0",
                            bgcolor: "#ffffff",
                          }}
                        >
                          <img src={imgSrc} alt="" />
                        </Box>
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", mb: 0.75 }}
                          >
                            New test product with open stock
                          </Typography>
                          <Box
                            component="span"
                            sx={{
                              display: "inline-block",
                              px: 1.25,
                              py: 0.35,
                              borderRadius: "999px",
                              bgcolor: "#ffffff",
                              border: "1px solid #cbd5e1",
                              fontSize: "12px",
                              fontWeight: 700,
                              color: "#475569",
                            }}
                          >
                            £12.00 × 1
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}
                        >
                          £12.00
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1.25,
                mt: 3,
              }}
            >
              <Button
                className="custom-primary-btn-admin-side"
                onClick={() => handleNextStep()}
                sx={{ whiteSpace: "nowrap" }}
              >
                <ChatOutlinedIcon sx={{ mr: 1, fontSize: 17 }} /> Contact Client
              </Button>
              <Button
                className="custom-secondary-btn-admin-side"
                onClick={() => handleNextStep()}
                sx={{ whiteSpace: "nowrap" }}
              >
                <AccessTimeRoundedIcon sx={{ mr: 1, fontSize: 17 }} /> Estimated Delivery: 26, Aug 2025 10:38 PM
              </Button>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Box
              sx={{
                borderRadius: "20px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
                backgroundColor: "white",
                p: 3,
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <LocalShippingOutlinedIcon sx={{ fontSize: 20, color: "#0f172a" }} />
                <Typography sx={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>
                  Shipping Method
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#475569" }}>
                test1
              </Typography>
              <Divider sx={{ my: 2, borderColor: "#f1f5f9" }} />
              <Typography sx={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", mb: 1 }}>
                Shipping Address
              </Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                Humair
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "#64748b", mt: 0.25 }}>
                07768378472
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "#64748b", mt: 0.25 }}>
                76 Grange Road, Romford, London, United Kingdom, RM37DX
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Box
              sx={{
                borderRadius: "20px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
                backgroundColor: "white",
                p: 3,
                height: "100%",
              }}
            >
              <Typography sx={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", mb: 2 }}>
                Total Summary
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.75 }}>
                <Typography sx={{ fontSize: "13.5px", color: "#64748b", fontWeight: 500 }}>Subtotal:</Typography>
                <Typography sx={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>£3,406.00</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.75 }}>
                <Typography sx={{ fontSize: "13.5px", color: "#64748b", fontWeight: 500 }}>Shipping Fee (test 1):</Typography>
                <Typography sx={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>£0.00</Typography>
              </Box>
              <Divider sx={{ my: 1.5, borderColor: "#f1f5f9" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.75 }}>
                <Typography sx={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>Total:</Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: 800, color: "#10b981" }}>£3,406.00</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1 }}>
                <Typography sx={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Payment Method:</Typography>
                <Box
                  component="span"
                  sx={{
                    px: 1.25,
                    py: 0.3,
                    borderRadius: "999px",
                    bgcolor: "#f1f5f9",
                    color: "#0f172a",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  Cash On Delivery
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SaleOrderDetails;
