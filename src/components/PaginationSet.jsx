import { Box, Pagination } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PaginationSet = ({
  count,
  page,
  onPageChange,
  per_page,
  onPerPageChange,
  variant,
  color,
  from,
  to,
  total,
}) => {
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between !important",
        width: "100%",
      }}
    >
      <Box sx={{ mb: 0, fontSize: "14px" }}>
        Showing {from}-{to} of {total}
      </Box>
      <Pagination
        count={count}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        variant={variant}
        color={color}
      />
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "14px" }}
      >
        Records per page:
        <FormControl>
          <Select
            value={per_page}
            size="small"
            onChange={(e) => onPerPageChange(e.target.value)}
          >
            <MenuItem value={10} sx={{ fontSize: "14px" }}>
              10
            </MenuItem>
            <MenuItem value={15} sx={{ fontSize: "14px" }}>
              15
            </MenuItem>
            <MenuItem value={25} sx={{ fontSize: "14px" }}>
              25
            </MenuItem>
            <MenuItem value={30} sx={{ fontSize: "14px" }}>
              30
            </MenuItem>
            <MenuItem value={50} sx={{ fontSize: "14px" }}>
              50
            </MenuItem>
            <MenuItem value={60} sx={{ fontSize: "14px" }}>
              60
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PaginationSet;
