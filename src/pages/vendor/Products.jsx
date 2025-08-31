import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Products = () => {
  const navigation = useNavigate()
  return (
    <Box
      sx={{
        
        
        width: "100%",
        py: 3,
        overflowY: "auto",
      }}
      className='pages-admin-target-style'
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        <Box
          component={"h2"}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "17px",
            mb: 3,
          }}
        >
          {" "}
          <LocalMallIcon
            sx={{ mr: 1, fontSize: "17px" }}
            color="secondary"
          />{" "}
          Products
        </Box>
          <Box sx={{textAlign: 'end', mb: 2}}>
            <Button
          className="custom-secondary-btn-admin-side"
          onClick={()=>navigation('/vendor/products/create')}
        >
          <AddIcon sx={{ mr: 1 }} />Add
        </Button>
          </Box>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "15px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            overflowX: "auto",
          }}
          className="table-scroll-design-set"
        >
          <Table sx={{ minWidth: 650 }} aria-label="responsive table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f5f9" }}>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  SKU
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Listing
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Purpose
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Stock
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Min Stock Alert
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Stock Status
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Regular Price
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Sale Price
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Brand
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Total Sold
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Last Sale
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Draft|Published
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Featured
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                    textAlign: 'center'
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontSize: "12px", padding: "10px" }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                    }}
                  >
                    123456
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", padding: "12px", minWidth: "200px" }}
                >
                  Dyson Supersonic Hair Dryer - 
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#dbf0fe",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "#4e97fd",
                    }}
                  >
                    Variable
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: '#e7f9ed', color: '#33d08c',
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                    }}
                  >
                    Sale
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  0
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  0
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: '#fff8e5', color: '#ffcd4e',
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Out of stock
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  $10.55
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  $5.66
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Apple Cate
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Apple
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                 3
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                 2
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Switch
                                  name="is_active"
                                  color="secondary"
                                  size="small"
                                />
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                   <Switch
                                  name="is_active"
                                  color="secondary"
                                  size="small"
                                />
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                   <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Tooltip title="Barcode" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="black"
                          >
                            <QrCode2Icon />
                          </IconButton>
                        </Tooltip>
                    <Tooltip title="View" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="success"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        </Box>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontSize: "12px", padding: "10px" }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                    }}
                  >
                    123456
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", padding: "12px", minWidth: "200px" }}
                >
                  Dyson Supersonic Hair Dryer - Fast Drying & Multiple Styling
                  Attachments
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#dbf0fe",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "#4e97fd",
                    }}
                  >
                    Simple
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: '#e7f9ed', color: '#33d08c',
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                    }}
                  >
                    Sale
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  0
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  0
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: '#fff8e5', color: '#ffcd4e',
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Out of stock
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  $10.55
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  $5.66
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Apple Cate
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f3f5f9",
                      borderRadius: "35px",
                      padding: "2px 10px",
                      fontWeight: "600",
                      color: "red",
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Apple
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                 3
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                 2
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Switch
                                  name="is_active"
                                  color="secondary"
                                  size="small"
                                />
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                   <Switch
                                  name="is_active"
                                  color="secondary"
                                  size="small"
                                />
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Tooltip title="Barcode" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="black"
                          >
                            <QrCode2Icon />
                          </IconButton>
                        </Tooltip>
                    <Tooltip title="View" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="success"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="error"
                          >
                            <DeleteIcon />
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
                        my: 4,
                      }}
                    >
                      <Pagination
                        count={3}
                        page={1}
                        // onChange={(event, value) => setPage(value)}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2 }}
                      />
                    </Box>
      </Container>
    </Box>
  );
};

export default Products;
