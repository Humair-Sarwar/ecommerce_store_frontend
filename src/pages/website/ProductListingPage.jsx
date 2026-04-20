import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link, useNavigate, useParams } from "react-router";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MiniBottomCartModal from "../../components/MiniBottomCartModal";
import CustomizedSwitches from "../../components/switchButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderProcessingSection from "../../components/OrderProcessingSection";
import ResponsiveFilterSelect from "../../components/ResponsiveFilterSelect";
import SortFilterMenu from "../../components/SortFilterMenu";
import { getCategoriesFilterBaseApi } from "../../utils/apis/APIs";
import { handleError } from "../../toast";

function valuetext(value) {
  return `${value}`;
}

const minDistance = 0;

const ProductListingPage = () => {
  const [value1, setValue1] = React.useState([0, 100]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

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

  const navigate = useNavigate();
  const params = useParams();
  const category = params.slug;
  const [filterCategoryData, setFilterCategoryData] = useState({});

  const getFilterListingPage = async () => {
    let res = await getCategoriesFilterBaseApi({ category });

    if (res.status == 200) {
      if (category == "All") {
        console.log(res.data.parent_category);
        setFilterCategoryData(res.data);
      } else {
        setFilterCategoryData(res.data);
      }
    } else {
      handleError("Internal Server Error!");
    }
  };
  const [stateReload, setStateReload] = useState(false);
  const nextCategoryOpen = (slug) => {
    navigate(`/buy/products/${slug}/1`);
    setStateReload(!stateReload);
  };

  useEffect(() => {
    getFilterListingPage();
  }, [category]);

  console.log(filterCategoryData);
  return (
    <>
      {filterCategoryData?.parent_category?.cover_image ? (
        <Box sx={{ position: "relative", pt: 6, backgroundColor: "#f0f0f0" }}>
          <img
            src={
              import.meta.env.VITE_BASE_URL +
              "/uploads/" +
              filterCategoryData?.parent_category?.cover_image
            }
            className="banner-image-style"
            alt=""
          />
          <Box className="featured-product-box-target">
            <Typography
              variant="h5"
              sx={{
                fontSize: "12px",
                color: "white",
                fontWeight: "600",
                textAlign: "end",
                mb: 1,
                mr: 2,
              }}
            >
              Featured product
            </Typography>
            <Link to={"/"} className="f-product-box">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/apple-iphone-16-pro-unlocked-1tb-smartphone-with-apple-intelligence-1.png"
                  alt=""
                />
                <Box sx={{ mx: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "white",
                      width: "180px",
                      lineHeight: "25px",
                    }}
                  >
                    Apple iPhone 15 Pro Max Unlocked - 1 TB Storage
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgb(255 255 255 / 70%)", marginTop: "5px" }}
                  >
                    £1,150.00
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      ) : (
        ""
      )}
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          pt: 6,
          px: 6,
          textAlign: "start",
          pb: 2,
        }}
      >
        {filterCategoryData?.parent_category?.cover_image ||
        filterCategoryData?.parent_category?.description == "" ? (
          <Typography
            variant="h2"
            sx={{ textAlign: "center" }}
            className="p-listing-p-heading-main"
          >
            {filterCategoryData?.parent_category?.name}
          </Typography>
        ) : (
          <Box>
            <Typography
              variant="h2"
              sx={{ fontSize: "42px", fontWeight: "500" }}
              className=""
            >
              {filterCategoryData?.parent_category?.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {filterCategoryData?.parent_category?.description}
            </Typography>
          </Box>
        )}
      </Box>
      {filterCategoryData?.child_category?.length > 0 && (
        <Box
          sx={{ backgroundColor: "#f0f0f0", py: 5 }}
          className={`${
            filterCategoryData?.child_category?.length > 4
              ? ""
              : "categories-list-row-target"
          }`}
        >
          <Container sx={{ maxWidth: "1470px !important" }}>
            {Array.isArray(filterCategoryData?.child_category) &&
            filterCategoryData?.child_category?.length > 0 ? (
              <Carousel
                responsive={responsive}
                className="slide-carousol-service-box-set"
              >
                {filterCategoryData?.child_category?.map((list) => (
                  <Box
                    onClick={() => nextCategoryOpen(list.slug)}
                    className="box-features-style"
                    key={list.id}
                  >
                    <img
                      src={
                        list?.image
                          ? import.meta.env.VITE_BASE_URL +
                            "/uploads/" +
                            list?.image
                          : "/empty-image.jpg"
                      }
                      alt=""
                    />
                    <Typography
                      sx={{
                        mb: 2,
                        ml: 2,
                        fontWeight: "600",
                        textAlign: "start",
                        zIndex: 2,
                        position: "absolute",
                        bottom: "5px",
                      }}
                    >
                      {list?.name}
                    </Typography>
                    <Box className="arrow-btn-style">
                      <KeyboardArrowRightIcon />
                    </Box>
                  </Box>
                ))}
              </Carousel>
            ) : (
              ""
            )}
          </Container>
        </Box>
      )}

      <Box sx={{ backgroundColor: "#f0f0f0", py: 5 }}>
        <Container sx={{ maxWidth: "1470px !important" }}>
          <Box sx={{ display: "flex" }}>
            <Box className="p-listing-page-left-menu-target" sx={{ pr: 5 }}>
              <Typography sx={{ display: "flex", alignItems: "center", py: 3 }}>
                <svg
                  role="presentation"
                  fill="none"
                  focusable="false"
                  stroke-width="2"
                  width="20"
                  height="14"
                  class="icon-subdued icon icon-filter"
                  viewBox="0 0 20 14"
                >
                  <path
                    d="M1 2C0.447715 2 0 2.44772 0 3C0 3.55228 0.447715 4 1 4V2ZM1 4H5V2H1V4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M1 10C0.447715 10 0 10.4477 0 11C0 11.5523 0.447715 12 1 12V10ZM1 12H11V10H1V12Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M10 2H9V4H10V2ZM19 4C19.5523 4 20 3.55228 20 3C20 2.44772 19.5523 2 19 2V4ZM10 4H19V2H10V4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M16 10H15V12H16V10ZM19 12C19.5523 12 20 11.5523 20 11C20 10.4477 19.5523 10 19 10V12ZM16 12H19V10H16V12Z"
                    fill="currentColor"
                  ></path>
                  <circle cx="7" cy="3" r="2" stroke="currentColor"></circle>
                  <circle cx="13" cy="11" r="2" stroke="currentColor"></circle>
                </svg>{" "}
                <Box sx={{ ml: 1 }}>Filters</Box>
              </Typography>
              <Box
                sx={{
                  py: 2,
                  borderTop: "1px solid rgb(26 26 26 / 12%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>
                  In stock only
                </Typography>
                <CustomizedSwitches />
              </Box>

              <Box>
                <div className="left-slt-filters-target">
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
                      <Typography sx={{ fontWeight: "600" }}>
                        Categories
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0, pb: 2 }}>
                      <Accordion
                        className="accordion-expand-left-filter-target"
                        sx={{
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          borderTop: "1px solid rgb(26 26 26 / 12%)",
                          borderRadius: "0 !important",
                          ml: 1,
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="product-condition-filter"
                          sx={{ px: 0, py: 1 }}
                        >
                          <Link to={"/"}>
                            <Typography
                              sx={{ fontWeight: "600", color: "black" }}
                            >
                              Mobile & Computing
                            </Typography>
                          </Link>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0, pb: 2 }}>
                          <Accordion
                            className="accordion-expand-left-filter-target"
                            sx={{
                              backgroundColor: "transparent",
                              boxShadow: "none",
                              borderTop: "1px solid rgb(26 26 26 / 12%)",
                              borderRadius: "0 !important",
                              ml: 1,
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id="product-condition-filter"
                              sx={{ px: 0, py: 1 }}
                            >
                              <Link to={"/"}>
                                <Typography
                                  sx={{ fontWeight: "600", color: "black" }}
                                >
                                  Smartphones
                                </Typography>
                              </Link>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0, pb: 2 }}>
                              <Accordion
                                className="accordion-expand-left-filter-target"
                                sx={{
                                  backgroundColor: "transparent",
                                  boxShadow: "none",
                                  borderTop: "1px solid rgb(26 26 26 / 12%)",
                                  borderRadius: "0 !important",
                                  ml: 1,
                                }}
                              >
                                <AccordionSummary
                                  aria-controls="panel1-content"
                                  id="product-condition-filter"
                                  sx={{ px: 0, py: 1 }}
                                >
                                  <Link to={"/"}>
                                    <Typography
                                      sx={{ fontWeight: "600", color: "black" }}
                                    >
                                      Apple iPhones
                                    </Typography>
                                  </Link>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{ p: 0, pb: 2 }}
                                ></AccordionDetails>
                              </Accordion>
                            </AccordionDetails>
                          </Accordion>
                        </AccordionDetails>
                      </Accordion>
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
                      id="price-filter"
                      sx={{ px: 0, py: 1 }}
                    >
                      <Typography sx={{ fontWeight: "600" }}>Price</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0, pb: 2 }}>
                      <Box sx={{ width: "100%", px: 1 }}>
                        <Slider
                          getAriaLabel={() => "Minimum distance"}
                          value={value1}
                          onChange={handleChange1}
                          getAriaValueText={valuetext}
                          disableSwap
                        />
                      </Box>
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{ position: "relative" }}
                          className="range-inputs-target-set"
                        >
                          <input type="number" className="range-input-target" />
                          <Typography className="currency-target">£</Typography>
                        </Box>

                        <Typography>to</Typography>

                        <Box
                          sx={{ position: "relative" }}
                          className="range-inputs-target-set"
                        >
                          <input type="number" className="range-input-target" />
                          <Typography className="currency-target">£</Typography>
                        </Box>
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
                      id="brands-filter"
                      sx={{ px: 0, py: 1 }}
                    >
                      <Typography sx={{ fontWeight: "600" }}>Brand</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0, pb: 2 }}>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id=""
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="Apple"
                          />
                          <label for="checkbox-template--15569882415178__main--sidebar-filter-p-m-custom-brand-apple">
                            Apple (38)
                          </label>
                        </div>
                      </Box>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id=""
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="Apple"
                          />
                          <label for="checkbox-template--15569882415178__main--sidebar-filter-p-m-custom-brand-apple">
                            Apple (38)
                          </label>
                        </div>
                      </Box>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id=""
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="Apple"
                          />
                          <label for="checkbox-template--15569882415178__main--sidebar-filter-p-m-custom-brand-apple">
                            Apple (38)
                          </label>
                        </div>
                      </Box>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id=""
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="Apple"
                          />
                          <label for="checkbox-template--15569882415178__main--sidebar-filter-p-m-custom-brand-apple">
                            Apple (38)
                          </label>
                        </div>
                      </Box>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id="checkbox-template--15569882415178__main--sidebar-filter-p-m-custom-brand-apple"
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="Apple"
                          />
                          <label for="checkbox-template--15569882415178__main--sidebar-filter-p-m-custom-brand-apple">
                            Apple (38)
                          </label>
                        </div>
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
                      <Typography sx={{ fontWeight: "600" }}>
                        Condition
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0, pb: 2 }}>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id="new"
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="New"
                          />
                          <label for="new">New (38)</label>
                        </div>
                      </Box>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id="refurbished"
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="Refurbished"
                          />
                          <label for="refurbished">Refurbished (38)</label>
                        </div>
                      </Box>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id="used"
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="Used"
                          />
                          <label for="used">Used (38)</label>
                        </div>
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
                      <Typography sx={{ fontWeight: "600" }}>
                        Stock Filters
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0, pb: 2 }}>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id="new"
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="New"
                          />
                          <label for="new">On Sale (38)</label>
                        </div>
                      </Box>
                      <Box className="custom-check-box-style-set">
                        <div class="checkbox-container">
                          <input
                            id="refurbished"
                            class="checkbox"
                            type="checkbox"
                            name="filter.p.m.custom.brand"
                            value="Refurbished"
                          />
                          <label for="refurbished">Featured (38)</label>
                        </div>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Box>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Box className="sort-filter-box-set" sx={{ mb: 1 }}>
                <SortFilterMenu />
              </Box>
              <Grid container spacing={{ sm: 3, xs: 1 }}>
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 4 }}>
                  <Box className="product-box-style">
                    <Box className="upper-img-box">
                      <img
                        src="/playstation-5-pro-console-advanced-graphics-ultra-high-definition-image-1.png"
                        alt=""
                      />
                      <MiniBottomCartModal />
                      <Box className="mobile-view-add-cart-btn">
                        <svg
                          role="presentation"
                          fill="none"
                          stroke-width="1.5"
                          focusable="false"
                          width="16"
                          height="15"
                          class="icon icon-quick-buy-cart"
                          viewBox="0 0 16 15"
                        >
                          <path
                            d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <circle
                            cx="5.955"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
                          <circle
                            cx="11.5"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
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
                      <Link to={"/product-detail-page"}>
                        <Typography
                          className="product-heading"
                          sx={{ fontWeight: "600", color: "black" }}
                        >
                          PlayStation 5 Pro Console - Advanced Graphics &
                          Ultra-High Definition Gaming Console
                        </Typography>
                      </Link>
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
                </Grid>

                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 4 }}>
                  <Box className="product-box-style">
                    <Box className="upper-img-box">
                      <img
                        src="/playstation-5-pro-console-advanced-graphics-ultra-high-definition-image-1.png"
                        alt=""
                      />
                      <MiniBottomCartModal />
                      <Box className="mobile-view-add-cart-btn">
                        <svg
                          role="presentation"
                          fill="none"
                          stroke-width="1.5"
                          focusable="false"
                          width="16"
                          height="15"
                          class="icon icon-quick-buy-cart"
                          viewBox="0 0 16 15"
                        >
                          <path
                            d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <circle
                            cx="5.955"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
                          <circle
                            cx="11.5"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
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
                        PlayStation 5 Pro Console - Advanced Graphics &
                        Ultra-High Definition Gaming Console
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
                </Grid>

                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 4 }}>
                  <Box className="product-box-style">
                    <Box className="upper-img-box">
                      <img
                        src="/playstation-5-pro-console-advanced-graphics-ultra-high-definition-image-1.png"
                        alt=""
                      />
                      <MiniBottomCartModal />
                      <Box className="mobile-view-add-cart-btn">
                        <svg
                          role="presentation"
                          fill="none"
                          stroke-width="1.5"
                          focusable="false"
                          width="16"
                          height="15"
                          class="icon icon-quick-buy-cart"
                          viewBox="0 0 16 15"
                        >
                          <path
                            d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <circle
                            cx="5.955"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
                          <circle
                            cx="11.5"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
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
                        PlayStation 5 Pro Console - Advanced Graphics &
                        Ultra-High Definition Gaming Console
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
                </Grid>

                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 4 }}>
                  <Box className="product-box-style">
                    <Box className="upper-img-box">
                      <img
                        src="/playstation-5-pro-console-advanced-graphics-ultra-high-definition-image-1.png"
                        alt=""
                      />
                      <MiniBottomCartModal />
                      <Box className="mobile-view-add-cart-btn">
                        <svg
                          role="presentation"
                          fill="none"
                          stroke-width="1.5"
                          focusable="false"
                          width="16"
                          height="15"
                          class="icon icon-quick-buy-cart"
                          viewBox="0 0 16 15"
                        >
                          <path
                            d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <circle
                            cx="5.955"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
                          <circle
                            cx="11.5"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
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
                        PlayStation 5 Pro Console - Advanced Graphics &
                        Ultra-High Definition Gaming Console
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
                </Grid>
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 4 }}>
                  <Box className="product-box-style">
                    <Box className="upper-img-box">
                      <img
                        src="/playstation-5-pro-console-advanced-graphics-ultra-high-definition-image-1.png"
                        alt=""
                      />
                      <MiniBottomCartModal />
                      <Box className="mobile-view-add-cart-btn">
                        <svg
                          role="presentation"
                          fill="none"
                          stroke-width="1.5"
                          focusable="false"
                          width="16"
                          height="15"
                          class="icon icon-quick-buy-cart"
                          viewBox="0 0 16 15"
                        >
                          <path
                            d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <circle
                            cx="5.955"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
                          <circle
                            cx="11.5"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
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
                        PlayStation 5 Pro Console - Advanced Graphics &
                        Ultra-High Definition Gaming Console
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
                </Grid>
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 4 }}>
                  <Box className="product-box-style">
                    <Box className="upper-img-box">
                      <img
                        src="/playstation-5-pro-console-advanced-graphics-ultra-high-definition-image-1.png"
                        alt=""
                      />
                      <MiniBottomCartModal />
                      <Box className="mobile-view-add-cart-btn">
                        <svg
                          role="presentation"
                          fill="none"
                          stroke-width="1.5"
                          focusable="false"
                          width="16"
                          height="15"
                          class="icon icon-quick-buy-cart"
                          viewBox="0 0 16 15"
                        >
                          <path
                            d="M4.5 3.545H15l-2.546 5.728H5.136L3.546 1H1"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <circle
                            cx="5.955"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
                          <circle
                            cx="11.5"
                            cy="12.682"
                            r=".5"
                            fill="#252627"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
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
                        PlayStation 5 Pro Console - Advanced Graphics &
                        Ultra-High Definition Gaming Console
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
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  my: 4,
                }}
              >
                <Pagination count={10} variant="outlined" />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <OrderProcessingSection />
      <ResponsiveFilterSelect />
    </>
  );
};

export default ProductListingPage;
