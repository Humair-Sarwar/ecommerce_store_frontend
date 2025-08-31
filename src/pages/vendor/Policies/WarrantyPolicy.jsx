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

const WarrantyPolicy = () => {
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
         
          Warranty Policies
        </Box>
          <Box sx={{textAlign: 'end', mb: 2}}>
            <Button
          className="custom-secondary-btn-admin-side"
          onClick={()=>navigation('/vendor/products/create')}
        >
          <AddIcon sx={{ mr: 1 }} /> Add Warranty Policy
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
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
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
                  sx={{ fontSize: "12px", padding: "12px", minWidth: "200px" }}
                >
                 6 Month warranty
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
                    Approved
                  </Box>
                </TableCell>
                
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                   <Box sx={{display: 'flex', alignItems: 'center'}}>
                   
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

export default WarrantyPolicy;
