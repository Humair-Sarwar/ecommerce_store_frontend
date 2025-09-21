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
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import SettingsIcon from '@mui/icons-material/Settings';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


const Pages = () => {
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
         
          <AutoStoriesIcon sx={{mr: 1}} color="secondary"/> Pages
        </Box>
          <Box sx={{textAlign: 'end', mb: 2}}>
            <Button
          className="custom-secondary-btn-admin-side"
          onClick={()=>navigation('/vendor/products/create')}
        >
          <AddIcon sx={{ mr: 1 }} /> Add New Page
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
                  Page Name	
                </TableCell>
                 <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Page Key	
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
                 Home
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", padding: "12px", minWidth: "200px" }}
                >
                 Home Page	
                </TableCell>
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                  home-page	

                </TableCell>
                
                <TableCell sx={{ fontSize: "12px", padding: "12px" }}>
                   <Box sx={{display: 'flex', alignItems: 'center'}}>
                   
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="primary"
                          >
                            <SettingsIcon sx={{fontSize: '20px'}} />
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

export default Pages;
