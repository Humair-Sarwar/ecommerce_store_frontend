import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  useScrollTrigger,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddIcon from "@mui/icons-material/Add";
import { getMediaApi } from "../../utils/apis/APIs";
const Media = () => {
  const [media, setMedia] = useState([]);

  const images = [
    {
      image:
        "/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png",
    },
    {
      image:
        "/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png",
    },
    {
      image:
        "/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png",
    },
    {
      image:
        "/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png",
    },
    {
      image:
        "/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png",
    },
    {
      image:
        "/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png",
    },
    {
      image:
        "/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png",
    },
  ];

 
  const getMediaAssets = async () => {
    const res = await getMediaApi({ business_id: "123" });
    if (res.status == 200) {
      setMedia(res.data.media);
    }
  };
   useEffect(() => {
    getMediaAssets();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        py: 3,
        overflowY: "auto",
      }}
      className="pages-admin-target-style"
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
          <PermMediaIcon sx={{ mr: 1 }} color="secondary" /> Media
        </Box>
        <Box sx={{ textAlign: "end", mb: 2 }}>
          <Button
            className="custom-secondary-btn-admin-side"
            onClick={() => navigation("/vendor/products/create")}
          >
            <AddIcon sx={{ mr: 1 }} /> Add Media
          </Button>
        </Box>
        <Box
          sx={{
            borderRadius: "15px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            overflowX: "auto",
            p: 2,
            backgroundColor: "white",
          }}
        >
          <Grid container spacing={1}>
            {media.map((list) => (
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Box
                  sx={{
                    height: "auto",
                    width: "100%",
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    src={
                      import.meta.env.VITE_BASE_URL + "/uploads/" + list?.image
                    }
                    alt=""
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
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

export default Media;
