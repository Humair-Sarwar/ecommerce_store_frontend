import React, { useEffect, useState } from "react";
import HeroBannerSlider from "../../components/HeroBannerSlider";
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router";
import MiniBottomCartModal from "../../components/MiniBottomCartModal";
import OrderProcessingSection from "../../components/OrderProcessingSection";
import { getWebsiteCategoriesApi } from "../../utils/apis/APIs";
import { handleError } from "../../toast";

export const Home = () => {
  
  useEffect(()=>{
    getCategoriesList();
  }, [])
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const responsive2 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 650 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 1,
    },
  };

  const [categoriesListResult, setCategoriesListResult] = useState([]);
  const navigate = useNavigate();

  

  


  const getCategoriesList = async () => {
    let res = await getWebsiteCategoriesApi();
    if(res.status == 200){
     
      setCategoriesListResult(res.data.result);
    }else{
      handleError('Internal Server Error!')
    }
  }

  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(60deg, rgba(191, 173, 255, 1) 25%, rgba(229, 210, 255, 1) 48%, rgba(224, 168, 247, 1) 90%);",
          py: 5,
        }}
      >
        <HeroBannerSlider />
      </Box>
      <Box className="slide-text-section" sx={{ px: 2 }}>
        <Box className="text_scroller_1 scroller_item_1 ul-li">
          <List>
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
          </List>
          <List aria-hidden="true">
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
            <ListItem>
              <h3>Your Favourite Tech Brands - All Under One Roof!</h3>
            </ListItem>
          </List>
        </Box>
      </Box>

{categoriesListResult.length > 0 && <Box sx={{ backgroundColor: "#f0f0f0", py: 5, px: 4 }}>
        <Carousel
          responsive={responsive}
          className="slide-carousol-service-box-set"
        >
{categoriesListResult.map((list)=>{
  return(
    <Box className="box-features-style" onClick={()=>navigate(`/buy/products/${list?.category?.slug}/1`)}>
            <img
              src={list.category?.image ? import.meta.env.VITE_BASE_URL+'/uploads/'+list.category.image : "/empty-image.jpg"}
              alt=""
            />
            <Typography
              sx={{ mb: 2, ml: 2, fontWeight: "600", textAlign: "start", zIndex: 2, position: 'absolute', bottom: '5px' }}
            >
              {list?.category?.name}
            </Typography>
            <Box className="arrow-btn-style">
              <KeyboardArrowRightIcon />
            </Box>
          </Box>
  )
})}
      
          
          
        </Carousel>
      </Box>}






      <Box sx={{ backgroundColor: "#f0f0f0", py: 5, px: 4 }}>
        <Box className='title-row-box-w-btn'>
          <Typography component={"h2"} className="main-h-heading-style-set">
          Latest in Tech
        </Typography>
        <Link to={'/product-listing-page'} className="link-all-view-p"><span className="text-l">View all</span> <Box className='arrow-btn'><KeyboardArrowRightIcon sx={{fontSize: '15px'}}/></Box></Link>

        
        </Box>

        <Grid container spacing={3}>
          <Grid size={12} my={4}>
            <Carousel
              responsive={responsive2}
              className="slide-carousol-service-box-set"
            >
              <Box className="product-box-style" sx={{mr: 3}}>
                <Box className="upper-img-box">
                  <img
                    src="/playstation-5-pro-console-advanced-graphics-ultra-high-definition-image-1.png"
                    alt=""
                  />
                  <MiniBottomCartModal/>
                  <Box className="mobile-view-add-cart-btn">
                    <svg role="presentation" fill="none" stroke-width="1.5" focusable="false" width="16" height="15" class="icon icon-quick-buy-cart" viewBox="0 0 16 15">
            <path d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="5.955" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
            <circle cx="11.5" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
          </svg>
                  </Box>
                  <Box className="badge-style-discount">Save £199.00</Box>
                </Box>
                <Box sx={{ mx: 2, mb: 2 }}>
                  <Typography
                    className="brand-text"
                    sx={{
                      color: "#909090",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Apple
                  </Typography>
                  <Typography
                    className="product-heading"
                    sx={{ fontWeight: "600" }}
                  >
                    PlayStation 5 Pro Console - Advanced Graphics & Ultra-High
                    Definition Gaming Console
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      className="price"
                      sx={{ color: "#F83A3A", mr: 1 }}
                    >
                      £600.00
                    </Typography>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "rgb(26 26 26 / 70%)",
                      }}
                    >
                      £799.00
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="product-box-style" sx={{mr: 3}}>
                <Box className="upper-img-box">
                  <img
                    src="/apple-iphone-16-pro-unlocked-1tb-smartphone-with-apple-intelligence-1.png"
                    alt=""
                  />
                   <MiniBottomCartModal/>
                     <Box className="mobile-view-add-cart-btn">
                    <svg role="presentation" fill="none" stroke-width="1.5" focusable="false" width="16" height="15" class="icon icon-quick-buy-cart" viewBox="0 0 16 15">
            <path d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="5.955" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
            <circle cx="11.5" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
          </svg>
                  </Box>
                  <Box className="badge-style-discount">Save £199.00</Box>
                </Box>
                <Box sx={{ mx: 2, mb: 2 }}>
                  <Typography
                    className="brand-text"
                    sx={{
                      color: "#909090",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Apple
                  </Typography>
                  <Typography
                    className="product-heading"
                    sx={{ fontWeight: "600" }}
                  >
                    PlayStation 5 Pro Console - Advanced Graphics & Ultra-High
                    Definition Gaming Console
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      className="price"
                      sx={{ color: "#F83A3A", mr: 1 }}
                    >
                      £600.00
                    </Typography>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "rgb(26 26 26 / 70%)",
                      }}
                    >
                      £799.00
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="product-box-style" sx={{mr: 3}}>
                <Box className="upper-img-box">
                  <img
                    src="/apple-watch-series-10-gps-42mm-rose-gold-aluminium-case-smartwatch-1.png"
                    alt=""
                  />
                 <MiniBottomCartModal/>
                     <Box className="mobile-view-add-cart-btn">
                    <svg role="presentation" fill="none" stroke-width="1.5" focusable="false" width="16" height="15" class="icon icon-quick-buy-cart" viewBox="0 0 16 15">
            <path d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="5.955" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
            <circle cx="11.5" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
          </svg>
                  </Box>
                  <Box className="badge-style-discount">Save £199.00</Box>
                </Box>
                <Box sx={{ mx: 2, mb: 2 }}>
                  <Typography
                    className="brand-text"
                    sx={{
                      color: "#909090",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Apple
                  </Typography>
                  <Typography
                    className="product-heading"
                    sx={{ fontWeight: "600" }}
                  >
                    PlayStation 5 Pro Console - Advanced Graphics & Ultra-High
                    Definition Gaming Console
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      className="price"
                      sx={{ color: "#F83A3A", mr: 1 }}
                    >
                      £600.00
                    </Typography>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "rgb(26 26 26 / 70%)",
                      }}
                    >
                      £799.00
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="product-box-style" sx={{mr: 3}}>
                <Box className="upper-img-box">
                  <img
                    src="/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png"
                    alt=""
                  />
                 <MiniBottomCartModal/>
                     <Box className="mobile-view-add-cart-btn">
                    <svg role="presentation" fill="none" stroke-width="1.5" focusable="false" width="16" height="15" class="icon icon-quick-buy-cart" viewBox="0 0 16 15">
            <path d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="5.955" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
            <circle cx="11.5" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
          </svg>
                  </Box>
                  <Box className="badge-style-discount">Save £199.00</Box>
                </Box>
                <Box sx={{ mx: 2, mb: 2 }}>
                  <Typography
                    className="brand-text"
                    sx={{
                      color: "#909090",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Apple
                  </Typography>
                  <Typography
                    className="product-heading"
                    sx={{ fontWeight: "600" }}
                  >
                    PlayStation 5 Pro Console - Advanced Graphics & Ultra-High
                    Definition Gaming Console
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      className="price"
                      sx={{ color: "#F83A3A", mr: 1 }}
                    >
                      £600.00
                    </Typography>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "rgb(26 26 26 / 70%)",
                      }}
                    >
                      £799.00
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="product-box-style" sx={{mr: 3}}>
                <Box className="upper-img-box">
                  <img
                    src="/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png"
                    alt=""
                  />
                 <MiniBottomCartModal/>
                     <Box className="mobile-view-add-cart-btn">
                    <svg role="presentation" fill="none" stroke-width="1.5" focusable="false" width="16" height="15" class="icon icon-quick-buy-cart" viewBox="0 0 16 15">
            <path d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="5.955" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
            <circle cx="11.5" cy="12.682" r=".5" fill="#252627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
          </svg>
                  </Box>
                  <Box className="badge-style-discount">Save £199.00</Box>
                </Box>
                <Box sx={{ mx: 2, mb: 2 }}>
                  <Typography
                    className="brand-text"
                    sx={{
                      color: "#909090",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Apple
                  </Typography>
                  <Typography
                    className="product-heading"
                    sx={{ fontWeight: "600" }}
                  >
                    PlayStation 5 Pro Console - Advanced Graphics & Ultra-High
                    Definition Gaming Console
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      className="price"
                      sx={{ color: "#F83A3A", mr: 1 }}
                    >
                      £600.00
                    </Typography>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "rgb(26 26 26 / 70%)",
                      }}
                    >
                      £799.00
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Carousel>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ pt: 2, pb: 2, backgroundColor: "#f0f0f0", px: 4 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12} size={12} sx={{ textAlign: "center" }}>
            <Box class="set-red-heading-setting">
              <Typography
                variant={"h2"}
                className="heading-gradient-style-box"
                sx={{
                  fontWeight: "600",
                  mb: 1,
                  textTransform: "capitalize",
                  textAlign: "center",
                }}
              >
                Redefining the Future of Innovation
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, textAlign: "center", mx: 1 }}
              >
                The new iPhone 16 series introduces unparalleled innovation,
                merging cutting-edge technology with sleek design to set a new
                standard for smartphones worldwide!
              </Typography>
              <Button className="custom-primary-btn">Get Yours!</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        className="video-box-container"
        sx={{ px: 4, pb: 4, backgroundColor: "#f0f0f0" }}
      >
        <video
          playsinline="true"
          preload="metadata"
          autoPlay
          muted="muted"
          loop="loop"
          poster="//eclattech.co.uk/cdn/shop/files/preview_images/a222e8566f7a4192a6a263f526d59fef.thumbnail.0000000000_800x.jpg?v=1729616498"
        >
          <source
            src="//eclattech.co.uk/cdn/shop/videos/c/vp/a222e8566f7a4192a6a263f526d59fef/a222e8566f7a4192a6a263f526d59fef.HD-1080p-7.2Mbps-36833746.mp4?v=0"
            type="video/mp4"
          />
          <img src="//eclattech.co.uk/cdn/shop/files/preview_images/a222e8566f7a4192a6a263f526d59fef.thumbnail.0000000000_800x.jpg?v=1729616498" />
        </video>
      </Box>

      <Box
        className="videos-box-container"
        sx={{ px: 4, py: 4, backgroundColor: "white" }}
      >
        <Grid container spacing={3}>
          <Grid size={{ sm: 12, md: 6 }}>
            <Link to={'/'}>
            <Box class="video-1">
              <Typography component={"h2"} className="inner-heading">
                iPad Pro: Thinpossible
              </Typography>
              <video
                autoPlay
                playsinline="true"
                muted="muted"
                loop="loop"
                preload="metadata"
                class="object-fill"
                poster="//eclattech.co.uk/cdn/shop/files/preview_images/75984a3b4d7844e287fa69c89e64528c.thumbnail.0000000000_small.jpg?v=1716052531"
              >
                <source
                  src="//eclattech.co.uk/cdn/shop/videos/c/vp/75984a3b4d7844e287fa69c89e64528c/75984a3b4d7844e287fa69c89e64528c.HD-1080p-4.8Mbps-29314013.mp4?v=0"
                  type="video/mp4"
                />
                <img src="//eclattech.co.uk/cdn/shop/files/preview_images/75984a3b4d7844e287fa69c89e64528c.thumbnail.0000000000_small.jpg?v=1716052531" />
              </video>
            </Box></Link>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <Grid container spacing={3}>
              <Grid size={6}>
                <Link to={'/'}>
                <Box class="img-box">
                  <Typography component={"h2"} className="inner-heading">
                    Airpods 4th Gen
                  </Typography>
                  <img
                    src="//eclattech.co.uk/cdn/shop/files/card_spatial_audio__uga42js3h4ya_large_2x_25ec37d1-7b2f-478b-894f-5d742cfab5cf.jpg?v=1731275233&amp;width=744"
                    alt=""
                    srcset="//eclattech.co.uk/cdn/shop/files/card_spatial_audio__uga42js3h4ya_large_2x_25ec37d1-7b2f-478b-894f-5d742cfab5cf.jpg?v=1731275233&amp;width=200 200w, //eclattech.co.uk/cdn/shop/files/card_spatial_audio__uga42js3h4ya_large_2x_25ec37d1-7b2f-478b-894f-5d742cfab5cf.jpg?v=1731275233&amp;width=300 300w, //eclattech.co.uk/cdn/shop/files/card_spatial_audio__uga42js3h4ya_large_2x_25ec37d1-7b2f-478b-894f-5d742cfab5cf.jpg?v=1731275233&amp;width=400 400w, //eclattech.co.uk/cdn/shop/files/card_spatial_audio__uga42js3h4ya_large_2x_25ec37d1-7b2f-478b-894f-5d742cfab5cf.jpg?v=1731275233&amp;width=500 500w, //eclattech.co.uk/cdn/shop/files/card_spatial_audio__uga42js3h4ya_large_2x_25ec37d1-7b2f-478b-894f-5d742cfab5cf.jpg?v=1731275233&amp;width=600 600w, //eclattech.co.uk/cdn/shop/files/card_spatial_audio__uga42js3h4ya_large_2x_25ec37d1-7b2f-478b-894f-5d742cfab5cf.jpg?v=1731275233&amp;width=700 700w"
                    width="744"
                    height="1360"
                    loading="lazy"
                    sizes="(max-width: 699px) 100vw, min(390px, 25vw)"
                    class="content-over-media__media zoom-image"
                  ></img>
                </Box>
                </Link>
              </Grid>

              <Grid size={6}>
               <Link to={'/'}>
                 <Box class="video-2">
                  <Typography component={"h2"} className="inner-heading">
                    PS5 Pro: Nex Gen Gaming
                  </Typography>
                  <iframe
                    src="https://www.youtube.com/embed/pmzfmoe7Jmw?playsinline=1&amp;autoplay=1&amp;controls=0&amp;mute=1&amp;loop=1&amp;playlist=pmzfmoe7Jmw&amp;enablejsapi=1&amp;rel=0&amp;modestbranding=1&amp;origin=https%3A%2F%2Feclattech.co.uk"
                    allow="autoplay; encrypted-media"
                    allowfullscreen="allowfullscreen"
                    id="widget2"
                    data-gtm-yt-inspected-15="true"
                    title="PlayStation 5 Pro Console - Launch Trailer"
                  ></iframe>
                </Box>
               </Link>
              </Grid>
              <Grid size={12}>
                <Link to={'/'}>
                  <Box class="video-2">
                  <Typography component={"h2"} className="inner-heading">
                    Latest in Smartwatches
                  </Typography>
                  <video
                    playsinline="true"
                    muted="muted"
                    autoPlay
                    loop="loop"
                    preload="metadata"
                    class="object-fill"
                    poster="//eclattech.co.uk/cdn/shop/files/preview_images/da2efb245789496a804b5fa00fc86a5e.thumbnail.0000000000_small.jpg?v=1729620199"
                  >
                    <source
                      src="//eclattech.co.uk/cdn/shop/videos/c/vp/da2efb245789496a804b5fa00fc86a5e/da2efb245789496a804b5fa00fc86a5e.HD-1080p-4.8Mbps-36837576.mp4?v=0"
                      type="video/mp4"
                    />
                    <img src="//eclattech.co.uk/cdn/shop/files/preview_images/da2efb245789496a804b5fa00fc86a5e.thumbnail.0000000000_small.jpg?v=1729620199" />
                  </video>
                </Box>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px: 4, py: 4, backgroundColor: "#f0f0f0" }}>
        <Box className="x-box-p-style">
          <Box>
            <Typography component={"h2"} className="main-heading">
              Latest XBOX <br /> Gaming <br /> Consoles
            </Typography>
            <Typography variant="body1" sx={{ my: 3 }} className="para">
              Discover the next level of gaming with the <br /> Xbox Series X,
              offering fast load times, <br /> stunning graphics and a vast
              library of games!
            </Typography>
            <Button className="custom-secondary-btn">Shop Now</Button>
          </Box>
          <Box class="right-img-sec">
            <img src="/Screenshot 2025-05-28 223444.png" alt="" />
          </Box>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: "#f0f0f0", py: 5, px: 4 }}>
        <Typography
          component={"h2"}
          sx={{ mb: 3 }}
          className="main-h-heading-style-set"
        >
          Brands
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box className="brands-box-style">
              <img src="/Eclat-Brand-Apple-UK.png" alt="" />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box className="brands-box-style">
              <img src="/Eclat-Brand-Beats-UK.png" alt="" />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box className="brands-box-style">
              <img src="/Eclat-Brand-Sony-UK.png" alt="" />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box className="brands-box-style">
              <img src="/Eclat-Brand-Samsung-UK.png" alt="" />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box className="brands-box-style">
              <img src="/Eclat-Brand-Bang-_-Olufsen-UK.png" alt="" />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box className="brands-box-style">
              <img src="/Eclat-Brand-Google-Pixel-UK.png" alt="" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <OrderProcessingSection/>
    </>
  );
};
