import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

const Pages = () => {
  const navigation = useNavigate();
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
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
              <AutoStoriesOutlinedIcon sx={{ fontSize: 22 }} />
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
                Pages
              </Typography>
              <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
                Manage custom storefront pages and layout keys
              </Typography>
            </Box>
          </Box>

          <Button
            className="custom-secondary-btn-admin-side"
            onClick={() => navigation("/vendor/products/create")}
          >
            <AddIcon sx={{ mr: 0.75, fontSize: 18 }} /> Add New Page
          </Button>
        </Box>

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
          <Table sx={{ minWidth: 650 }} aria-label="pages table">
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
                    padding: "14px 20px",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid #e2e8f0",
                  },
                }}
              >
                <TableCell>Purpose</TableCell>
                <TableCell>Page Name</TableCell>
                <TableCell>Page Key</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  transition: "background-color 0.15s ease",
                  "&:hover": { bgcolor: "#f8fafc" },
                  "& td": { borderBottom: "1px solid #f1f5f9", py: 1.5, px: 2.5 },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell sx={{ fontSize: "13px", fontWeight: 600, color: "#475569", minWidth: "180px" }}>
                  Home
                </TableCell>
                <TableCell sx={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a", minWidth: "200px" }}>
                  Home Page
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      px: 1.25,
                      py: 0.4,
                      borderRadius: "8px",
                      bgcolor: "#f1f5f9",
                      color: "#475569",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    home-page
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        aria-label="edit"
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
                        <SettingsOutlinedIcon sx={{ fontSize: 18 }} />
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

export default Pages;
