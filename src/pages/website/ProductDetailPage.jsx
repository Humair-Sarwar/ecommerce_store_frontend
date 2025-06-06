import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IncludedInTheBox from "../../components/IncludedInTheBox";
import OrderProcessingSection from "../../components/OrderProcessingSection";

const ProductDetailPage = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const imageData = [{
        image: '/apple-iphone-16-pro-unlocked-256gb-smartphone-5.png'
    }, 
    {
        image: '/apple-airpods-4-with-adaptive-audio-usb-c-active-noise-cancellation-wireless-earbuds-image-7.png'
    }, 
    {
        image: '/apple-watch-series-10-gps-42mm-rose-gold-aluminium-case-smartwatch-1.png'
    }, 
    {
        image: '/apple-iphone-16-pro-unlocked-1tb-smartphone-with-apple-intelligence-1.png'
    }, 
]

    const [featureExpand, setFeatureExpand] = useState(false);
    useEffect(()=>{
        setSelectedImage(imageData[0].image);
    }, [])
    const handleFeatureMoreShow = () => {
        if(!featureExpand){
            setFeatureExpand(true);
        }else{
            setFeatureExpand(false);
        }
    }
    const handleSelectImage = (image)=>{
       
        setSelectedImage(image);
    }

  return (
    <>
      <Box sx={{ backgroundColor: "#f0f0f0", pt: 5, pb: 8 }}>
        <Container sx={{ maxWidth: "1470px !important" }}>
          <Box
            className="product-detail-page-list-p-box"
            sx={{
              backgroundColor: "white",
              borderRadius: "1.5rem",
              p: { xs: 2, sm: 3, md: 6, lg: 6 },
              boxShadow: "0px 18px 50px rgb(26 26 26 / 0.1)",
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7 }}>



<Box sx={{display: 'flex'}} className='left-imge-detail-section-style-target'>
    <Box sx={{width: '70px', display: 'flex', flexDirection: 'column'}} className='left-mini-img-style-target'>
        {imageData?.map((imgItem, indx)=>(
            <Box className={`${(imgItem?.image == selectedImage) && 'selected-mini-image-box'} mini-box`} onClick={()=>handleSelectImage(imgItem?.image)}>
            <img src={imgItem?.image} alt="" />
        </Box>
        ))}
        





       
    </Box>
    <Box sx={{width: '100%', justifyItems: 'center'}}>
        <Box sx={{textAlign: 'center'}} className='main-img-target-set'>
        <img src={selectedImage} alt="" />
    </Box>
    </Box>
</Box>


              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5 }}>
                <Box className="right-content-side">
                  <Typography variant="h1">
                    Apple iPhone 16 Pro Max Unlocked - 1TB Smartphone With Apple
                    Intelligence
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <Typography
                      className="price-d-p"
                      sx={{ color: "#F83A3A", mr: 1 }}
                    >
                      £1,359.15
                    </Typography>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "rgb(26 26 26 / 70%)",
                        mr: 1,
                      }}
                      className="cross-p-d-style"
                    >
                      £799.00
                    </Typography>
                    <Box className="badge-style-discount">Save £199.00</Box>
                  </Box>

                  <Box className="left-slt-filters-target">
                    <Accordion
                      className="accordion-expand-left-filter-target"
                      sx={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderTop: "1px solid rgb(26 26 26 / 12%)",
                        borderRadius: "0 !important",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="product-condition-filter"
                        sx={{ px: 0, py: 1 }}
                      >
                        <Typography
                          sx={{ fontWeight: "600" }}
                          className="accordion-d-title-style-target-s"
                        >
                          Key Features
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 0, pb: 2 }}>
                        <Box>
                          <Typography
                            variant="body1"
                            className="accordion-d-description-style-target-s"
                          >
                            <Typography
                              sx={{
                                fontWeight: "600",
                                display: "inline-block",
                              }}
                            >
                              512GB Storage:
                            </Typography>{" "}
                            Massive space for storing high-resolution photos, 4K
                            videos, apps, and large files, offering ample
                            storage for all your digital needs.
                          </Typography>
                          <Typography
                            variant="body1"
                            className="accordion-d-description-style-target-s"
                            sx={{ mt: 2 }}
                          >
                            <Typography
                              sx={{
                                fontWeight: "600",
                                display: "inline-block",
                              }}
                            >
                              512GB Storage:
                            </Typography>{" "}
                            Massive space for storing high-resolution photos, 4K
                            videos, apps, and large files, offering ample
                            storage for all your digital needs.
                          </Typography>
                        </Box>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      className="accordion-expand-left-filter-target"
                      sx={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderTop: "1px solid rgb(26 26 26 / 12%)",
                        borderRadius: "0 !important",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="product-condition-filter"
                        sx={{ px: 0, py: 1 }}
                      >
                        <Typography
                          sx={{ fontWeight: "600" }}
                          className="accordion-d-title-style-target-s"
                        >
                          What's Like New Tech?
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 0, pb: 2 }}>
                        <Box>
                          <Typography
                            variant="body1"
                            className="accordion-d-description-style-target-s"
                          >
                            While the packaging of this product may exhibit
                            minor or major signs of wear, the item itself is in
                            immaculate, pristine condition—just like new.
                          </Typography>
                          <Typography
                            variant="body1"
                            className="accordion-d-description-style-target-s"
                            sx={{ mt: 2 }}
                          >
                            It has been thoroughly inspected to ensure it meets
                            the highest standards of quality and performance.
                          </Typography>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>

                  <Box>
                    <Typography sx={{ color: "rgb(26 26 26 / 70%)", mb: 1 }}>
                      Quantity:
                    </Typography>
                    <Box
                      sx={{
                        display: "inline-block",
                        alignContent: "center",
                        border: "1px solid rgb(26 26 26 / 12%)",
                        borderRadius: "35px",
                        overflow: 'hidden'
                      }}
                    >
                      <Box sx={{display: "inline-block"}} > 
                        <Button
                        sx={{
                          
                          py: 2,
                          px: 2,
                          alignContent: "center",
                          color: 'black'
                        }}
                        className="m-p-btn-style-target"
                      >
                       <RemoveIcon sx={{fontSize: '17px'}}/>
                      </Button>
                      </Box>
                      <Box sx={{ display: "inline-block", px: 2 }}>9</Box>
                     <Box sx={{display: "inline-block"}} > 
                        <Button
                        sx={{
                          
                          py: 2,
                          px: 2,
                          alignContent: "center",
                          color: 'black'
                        }}
                        className="m-p-btn-style-target"
                      >
                        <AddIcon sx={{fontSize: '17px'}}/>
                      </Button>
                      </Box>
                    </Box>
                  </Box>


    <Box sx={{ py: 3}}><Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', color: 'rgb(0 163 65)'}}><CheckCircleIcon sx={{mr: 1}}/> In stock</Typography></Box>

               <Box sx={{display: 'flex', gap: '8px', flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column'}}}><Button className="custom-secondary-btn" fullWidth>Add to cart</Button> <Button className="custom-primary-btn" fullWidth>buy it now</Button></Box>



                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>





      <Box sx={{ backgroundColor: "#f0f0f0", pt: 2, pb: 5 }}>
        <Container sx={{ maxWidth: "1470px !important" }}>
              <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 12, md: 8, lg: 5 }}>
                <Box className='left-detail-bottom-content-sec-style'>
                    <Typography variant="h2">
                        The New iPhone 16 Pro Max is Here - Ultimate Performance, Storage, and Visuals!
                    </Typography>
                    <Typography variant="body1" sx={{my: 2}}>
                        The Apple iPhone 16 Pro Max 256GB has a stunning design and exceptional performance with the latest A18 Pro chip for ultra-fast processing, AAA gaming, and advanced photo/video features. With a 6.9" Super Retina XDR display offering ProMotion technology and a refresh rate of up to 120Hz, enjoy ultra-smooth visuals and adaptive brightness with up to 2000 nits of peak outdoor brightness.
                    </Typography>

                    <Typography variant="body1" sx={{my: 2}}>
                        Capture breathtaking shots with the 48MP camera system, including a 5x Telephoto lens, 4K Dolby Vision video recording at 120 fps, and enhanced Camera Control for instant access to tools like zoom and depth of field. The Ceramic Shield front is 2x tougher than any smartphone glass, ensuring durability, while IP68 water and dust resistance protects your device.
                    </Typography>
                </Box>
              </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 7 }}>
                    <Box className='right-detail-bottom-content-features-sec-style'>
                        <Box className='feature-row'>
                            <Typography variant="body1" className="left-title">Brand</Typography>
                            <Typography variant="body1" className="left-feature-value" sx={{color: 'rgb(26 26 26 / 70%)'}}>Apple</Typography>
                        </Box>

                         <Box className='feature-row'>
                            <Typography variant="body1" className="left-title">Category</Typography>
                            <Typography variant="body1" className="left-feature-value" sx={{color: 'rgb(26 26 26 / 70%)'}}>Apple iPhones

</Typography>
                        </Box>


                         <Box className='feature-row'>
                            <Typography variant="body1" className="left-title">Condition</Typography>
                            <Typography variant="body1" className="left-feature-value" sx={{color: 'rgb(26 26 26 / 70%)'}}>Like New

</Typography>
                        </Box>


                         <Box className='feature-row'>
                            <Typography variant="body1" className="left-title">Brand</Typography>
                            <Typography variant="body1" className="left-feature-value" sx={{color: 'rgb(26 26 26 / 70%)'}}>Apple</Typography>
                        </Box>

                        {featureExpand && <>
                            <Box className='feature-row'>
                            <Typography variant="body1" className="left-title">Model</Typography>
                            <Typography variant="body1" className="left-feature-value" sx={{color: 'rgb(26 26 26 / 70%)'}}>iPhone 16 Pro Max


</Typography>
                        </Box>
                        <Box className='feature-row'>
                            <Typography variant="body1" className="left-title">Dimensions</Typography>
                            <Typography variant="body1" className="left-feature-value" sx={{color: 'rgb(26 26 26 / 70%)'}}>149.6 x 71.5 x 8.25 mm

    </Typography>
                        </Box>
                        </>}




                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2}}>
                            <Box sx={{display: 'flex', alignItems: 'center'}} className='v-all-btn-style' onClick={handleFeatureMoreShow}><Typography>View {featureExpand ? 'less' : 'all'}</Typography><Box className='circle-style-exp'>{featureExpand ? <KeyboardArrowUpIcon sx={{fontSize: '14px'}}/> : <KeyboardArrowDownIcon sx={{fontSize: '14px'}}/>}</Box></Box>
                        </Box>
                    </Box>
                </Grid>
              </Grid>
                        
            </Container></Box>

            <IncludedInTheBox/>

            <OrderProcessingSection/>
    </>
  );
};

export default ProductDetailPage;
