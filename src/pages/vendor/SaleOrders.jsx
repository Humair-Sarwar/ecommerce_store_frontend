import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Paper from "@mui/material/Paper";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router";

const SaleOrders = () => {
  const navigate = useNavigate();
  const [searchBy, setSearchBy] = React.useState("");
  const handleChange = (event) => {
    setSearchBy(event.target.value);
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
            <ShoppingBagOutlinedIcon sx={{ fontSize: 22 }} />
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
              Sales Orders
            </Typography>
            <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
              Track customer orders, payment status, and delivery schedules
            </Typography>
          </Box>
        </Box>

        {/* Filter Bar Card */}
        <Box
          sx={{
            mb: 3,
            p: 2.5,
            bgcolor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                <InputLabel id="search-by-label">Search By</InputLabel>
                <Select
                  labelId="search-by-label"
                  id="search-by-select"
                  value={searchBy}
                  label="Search By"
                  onChange={handleChange}
                >
                  <MenuItem value={10} sx={{ fontSize: "13.5px" }}>
                    ID
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "13.5px" }}>
                    Customer
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                id="outlined-basic"
                label="Search..."
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                <InputLabel id="payment-type-label">Payment Type</InputLabel>
                <Select
                  labelId="payment-type-label"
                  id="payment-type-select"
                  value={searchBy}
                  label="Payment Type"
                  onChange={handleChange}
                >
                  <MenuItem value={10} sx={{ fontSize: "13.5px" }}>
                    All
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "13.5px" }}>
                    Cash
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "13.5px" }}>
                    Card
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={searchBy}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value={10} sx={{ fontSize: "13.5px" }}>
                    All
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "13.5px" }}>
                    Cash
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "13.5px" }}>
                    Card
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Orders Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "24px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
            overflowX: "auto",
            bgcolor: "#ffffff",
          }}
          className="table-scroll-design-set"
        >
          <Table sx={{ minWidth: 750 }} aria-label="sales orders table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f8fafc",
                  "& th": {
                    fontWeight: 700,
                    fontSize: "11.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#64748b",
                    padding: "14px 16px",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid #e2e8f0",
                  },
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Shipping Address</TableCell>
                <TableCell>Shipping Method</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Estimated Delivery</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  transition: "background-color 0.15s ease",
                  "&:hover": { bgcolor: "#f8fafc" },
                  "& td, & th": { borderBottom: "1px solid #f1f5f9", py: 1.5 },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      fontWeight: 700,
                      fontSize: "12px",
                      fontFamily: "monospace",
                      color: "#0f172a",
                    }}
                  >
                    #15968932
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "13px", color: "#475569", fontWeight: 500, minWidth: "180px" }}>
                  23, Aug 2025 10:45 PM
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#eff6ff",
                      border: "1px solid #bfdbfe",
                      borderRadius: "999px",
                      padding: "3px 12px",
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#2563eb",
                    }}
                  >
                    humair@gmail.com
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f1f5f9",
                      color: "#64748b",
                      borderRadius: "999px",
                      padding: "3px 10px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    N/A
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
                  test 1
                </TableCell>
                <TableCell sx={{ fontSize: "13.5px", fontWeight: 800, color: "#0f172a" }}>
                  £81.00 / Cash
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#ecfdf5",
                      border: "1px solid #a7f3d0",
                      color: "#059669",
                      borderRadius: "999px",
                      padding: "3px 12px",
                      fontSize: "12px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Accept
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
                  26, Aug 2025 10:45 PM
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                    <Tooltip
                      title="View Order Details"
                      arrow
                      onClick={() => navigate(`/vendor/orders/buy/1`)}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: "10px",
                          bgcolor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          color: "#0f172a",
                          "&:hover": {
                            bgcolor: "#0f172a",
                            color: "#ffffff",
                            borderColor: "#0f172a",
                          },
                        }}
                      >
                        <VisibilityOutlinedIcon sx={{ fontSize: 17 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 3,
          }}
        >
          <Pagination
            count={3}
            page={1}
            variant="outlined"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "10px",
                fontWeight: 700,
                color: "#475569",
                borderColor: "#e2e8f0",
                "&.Mui-selected": {
                  bgcolor: "#0f172a !important",
                  color: "#ffffff !important",
                  borderColor: "#0f172a !important",
                },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default SaleOrders;
