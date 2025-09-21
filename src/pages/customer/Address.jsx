import {
  Box,
  Button,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import Paper from "@mui/material/Paper";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddUpdateProfile from "./AddUpdateAddress";

const Address = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "25px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <LocationPinIcon sx={{ mr: 1 }} /> My Addresses
          </Typography>
          
          <AddUpdateProfile/>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px !important",
            borderRadius: "5px",
            mb: 1,
            cursor: "pointer",
          }}
        >
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ textWrap: "nowrap" }}>
                  Country:{" "}
                  <Box sx={{ display: "inline-block", color: "#7a7a7aff" }}>
                    Pakistan
                  </Box>
                </TableCell>
                <TableCell sx={{ textWrap: "nowrap" }}>
                  Name:{" "}
                  <Box sx={{ display: "inline-block", color: "#7a7a7aff" }}>
                    Humair Sarwar
                  </Box>
                </TableCell>
                <TableCell sx={{ textWrap: "nowrap" }}>
                  Address:{" "}
                  <Box sx={{ display: "inline-block", color: "#7a7a7aff" }}>
                    london
                  </Box>
                </TableCell>
                <TableCell sx={{ textWrap: "nowrap" }}>
                  City:{" "}
                  <Box sx={{ display: "inline-block", color: "#7a7a7aff" }}>
                    Bermingam
                  </Box>
                </TableCell>
                <TableCell sx={{ textWrap: "nowrap" }}>
                  Postcode:{" "}
                  <Box sx={{ display: "inline-block", color: "#7a7a7aff" }}>
                    123456
                  </Box>
                </TableCell>
                <TableCell sx={{ textWrap: "nowrap" }}>
                  Phone:{" "}
                  <Box sx={{ display: "inline-block", color: "#7a7a7aff" }}>
                    123456
                  </Box>
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="View" arrow>
                      <IconButton
                        size="small"
                        aria-label="edit"
                        color="primary"
                      >
                        <EditIcon sx={{ fontSize: "19px" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete" arrow>
                      <IconButton size="small" aria-label="edit" color="error">
                        <DeleteIcon sx={{ fontSize: "19px" }} />
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
            my: 2,
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
      </Box>
    </>
  );
};

export default Address;
