import { Box, Typography } from "@mui/material";
import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HandshakeIcon from '@mui/icons-material/Handshake';
import DoneIcon from "@mui/icons-material/Done";
import ViewInArIcon from '@mui/icons-material/ViewInAr';

const AfterOrderCompletionSteps = ({ level }) => {
  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          mx: { lg: 3, md: 2, sm: 2, xs: 2 },
          my: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            className="correct-tick-icon-box-target-set"
            sx={{
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              backgroundColor: "#00a341",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: "-5px",
              top: "-2px",
            }}
          >
            <DoneIcon sx={{ fontSize: "16px" }} />
          </Box>
         
          <Box
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
            className="customer-order-steps-acitve"
          >
<ViewInArIcon/>
          </Box>
        </Box>
        <Box
          sx={{ height: "3px", width: "100%" }}
          className={`${level == 2 || level == 3 || level == 4 || level == 5 ? "customer-order-steps-acitve" : "customer-order-steps-inacitve"} customer-order-steps-line`}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          {(level == 3 || level == 4 || level == 5) && (
            <Box
              className="correct-tick-icon-box-target-set"
              sx={{
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                backgroundColor: "#00a341",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: "-5px",
                top: "-2px",
              }}
            >
              <DoneIcon sx={{ fontSize: "16px" }} />
            </Box>
          )}

       
          <Box
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
            className={`${level == 3 || level == 4 || level == 5 ? "customer-order-steps-acitve" : "customer-order-steps-inacitve"}`}
          >
            <LocalShippingIcon />
          </Box>
        </Box>
        <Box
          sx={{
            height: "3px",
            width: "100%",
            backgroundColor: "rgba(206, 209, 210, 1)",
          }}
          className={`${level == 3 || level == 4 || level == 5 ? "customer-order-steps-acitve" : "customer-order-steps-inacitve"} customer-order-steps-line`}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
            {(level == 4 || level == 5) && (
            <Box
              className="correct-tick-icon-box-target-set"
              sx={{
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                backgroundColor: "#00a341",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: "-5px",
                top: "-2px",
              }}
            >
              <DoneIcon sx={{ fontSize: "16px" }} />
            </Box>
          )}
       
          <Box
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
            className={`${level == 4 || level == 5 ? "customer-order-steps-acitve" : "customer-order-steps-inacitve"}`}
          >
            <HandshakeIcon />
          </Box>
        </Box>

      
      
      </Box>
    </>
  );
};

export default AfterOrderCompletionSteps;
