import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const OrderRightSummary = () => {
  return (
    <div>
      <Box
        sx={{
          p: 4,
          border: "1px solid rgb(26 26 26 / 12%)",
          borderRadius: "15px",
          backgroundColor: "white",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              pb: 2,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  height: "60px",
                  width: "60px",
                  border: "1px solid #cbcbcb",
                  borderRadius: "8px",
                  //   overflow: "hidden",
                  mr: 2,
                  position: "relative",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  src="/playstation-5-pro-console-advanced-graphics-ultra-high-definition-image-1.png"
                  alt=""
                />
                <Box
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "#666666",
                    height: "20px",
                    width: "20px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    position: "absolute",
                    right: "-8px",
                    top: "-8px",
                  }}
                >
                  10
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontSize: "14px" }}>
                iPhone 16 Pro Max
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "14px" }}>£100.00</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              pb: 2,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  height: "60px",
                  width: "60px",
                  border: "1px solid #cbcbcb",
                  borderRadius: "8px",
                  //   overflow: "hidden",
                  mr: 2,
                  position: "relative",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  src="/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png"
                  alt=""
                />
                <Box
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "#666666",
                    height: "20px",
                    width: "20px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    position: "absolute",
                    right: "-8px",
                    top: "-8px",
                  }}
                >
                  10
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontSize: "14px" }}>
                iPhone 16 Pro Max
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "14px" }}>£100.00</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            size="small"
            fullWidth
            label="Discount Code Or Gift Card"
            color="secondary"
          />
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "black",
              ml: 1,
            }}
          >
            Apply
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "15px" }}>Subtotal</Typography>
            <Typography sx={{ fontSize: "15px" }}>£100.00</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography sx={{ fontSize: "15px" }}>In-Store Pickup</Typography>
            <Typography sx={{ fontSize: "15px", color: "#8d8d8dff" }}>
              Free
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography sx={{ fontSize: "18px" }}>Total</Typography>
            <Typography sx={{ fontSize: "18px" }}>£100.00</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OrderRightSummary;
