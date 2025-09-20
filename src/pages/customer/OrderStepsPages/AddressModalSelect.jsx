import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function AddressModalSelect() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 600, p: 4 }}
      role="presentation"
      className="inner-modal-search-view-set"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "600" }}>
          Select Address
        </Typography>{" "}
        <Tooltip title="Close" arrow onClick={toggleDrawer(false)}>
          <IconButton size="small" aria-label="edit">
            <CloseIcon sx={{ fontSize: "23px" }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box
          className="add-slt-box-target-set"
          sx={{
            borderRadius: "8px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            p: 2,
            cursor: "pointer",
            mb: 1,
            border: '1px solid rgb(166, 23, 240)',
            backgroundColor: 'rgb(249, 245, 255)'
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Name:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> Humair Sarwar</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Phone:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> 03088340373</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Country:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> Pakistan</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Address:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> Pakistan</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Postcode:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> 123456</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              City:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> Islamabad</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Apartment:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> H8</Typography>
          </Box>

        </Box>
      <Box
          className="add-slt-box-target-set"
          sx={{
            borderRadius: "8px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            p: 2,
            cursor: "pointer",
            mb: 1,
            border: '1px solid rgb(166, 23, 240)',
            backgroundColor: 'rgb(249, 245, 255)'
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Name:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> Humair Sarwar</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Phone:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> 03088340373</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Country:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> Pakistan</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Address:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> Pakistan</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Postcode:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> 123456</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              City:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> Islamabad</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", color: "#7f7e7eff", mr: 1, width: '100px' }}>
              Apartment:{" "}
            </Typography>
            <Typography sx={{ fontWeight: "500" }}> H8</Typography>
          </Box>

        </Box>
      </Box>

      <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
        <Typography
          sx={{
            fontWeight: "500",
            textWrap: "nowrap",
            fontSize: "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          No results could be found.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        variant="outlined"
        color="secondary"
        size="small"
        sx={{ textTransform: "capitalize", borderRadius: "10px !important" }}
      >
        Select Address
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        className="search-modal-panel-style-set"
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
