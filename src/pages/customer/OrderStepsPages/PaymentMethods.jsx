import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  Radio,
  TextField,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AddressModalSelect from "./AddressModalSelect";
import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { NavLink, useNavigate } from "react-router";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CardPaymentForm from "./CardPaymentForm";

export default function PaymentMethods() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  // ✅ set default "Same as billing address" selected
  const [expanded2, setExpanded2] = React.useState("panel3");
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [selectedValue2, setSelectedValue2] = React.useState("c");

  const handleChange = (panel, value) => (event, isExpanded) => {
    if (isExpanded) {
      setExpanded(panel);
      setSelectedValue(value);
    } else {
      if (!selectedValue) {
        setExpanded(false);
      }
    }
  };

  const handleChangeR = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setExpanded(value === "a" ? "panel1" : "panel2");
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      className="acc-header-style-target"
    >
      {/* Cash on Delivery */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1", "a")}
      >
        <AccordionSummary>
          <Typography
            component="span"
            sx={{ width: "33%", flexShrink: 0, display: "flex" }}
          >
            <Radio
              size="small"
              checked={selectedValue === "a"}
              onChange={handleChangeR}
              value="a"
              name="delivery-method"
              color="secondary"
            />
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography sx={{ fontSize: "14px", textWrap: "nowrap" }}>
                Cash On Delivery
              </Typography>
            </Box>
          </Typography>
          <Typography component="span" sx={{ color: "text.secondary", display: "flex" }}>
            <Typography sx={{ color: "black", fontSize: "14px" }}>
              Pay On Delivery
            </Typography>
            <PaymentsIcon sx={{ ml: 2 }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          <Typography sx={{ fontSize: "15px", color: "#707070ff", mb: 2 }}>
            You'll pay when the product is delivered to your doorstep.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, }} > <NavLink to={ "/cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/shipping" } className={"b-btn-style-target"} style={{ fontSize: "15px", display: "flex", alignItems: "center", }} > <ArrowBackIosNewIcon sx={{ fontSize: "13px" }} /> Return to Shipping </NavLink> <Button onClick={()=>navigate('/orders/66672287-e33f-4705-b863-124d7f8408f1')} variant="outlined" sx={{ textTransform: "capitalize", borderRadius: "10px !important", backgroundColor: "black", color: "white", border: "0", }} > Confirm Order </Button> </Box>
        </AccordionDetails>
      </Accordion>

      {/* Credit Card */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2", "b")}
      >
        <AccordionSummary>
          <Typography
            component="span"
            sx={{ width: "33%", flexShrink: 0, display: "flex" }}
          >
            <Radio
              size="small"
              checked={selectedValue === "b"}
              onChange={handleChangeR}
              value="b"
              name="delivery-method"
              color="secondary"
            />
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography sx={{ fontSize: "14px", textWrap: "nowrap" }}>
                Credit Card
              </Typography>
            </Box>
          </Typography>
          <Typography component="span" sx={{ color: "text.secondary", display: "flex" }}>
            <CreditCardIcon sx={{ ml: 2 }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h3" sx={{ fontSize: "20px", mt: 1 }}>
            Credit / Debit Card
          </Typography>
          <Divider sx={{ my: 2 }} />
          <CardPaymentForm />
 <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", mt: 2 }}>
              <Typography sx={{ fontSize: "20px", textWrap: "nowrap" }}>
                Billing address
              </Typography>
              <Typography sx={{fontSize: '15px', color: '#979797ff'}}>Select the address that matches your card or payment method.</Typography>
            </Box>
          {/* Nested Accordions */}
          <Box sx={{ mt: 2, border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden" }}>
            {/* Same as billing (default selected & expanded) */}
            <Accordion
              expanded={expanded2 === "panel3"}
              onChange={(e, isExpanded) => {
                if (isExpanded) {
                  setExpanded2("panel3");
                  setSelectedValue2("c"); // always stay selected
                }
              }}
            >
              <AccordionSummary>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Radio
                    size="small"
                    checked={selectedValue2 === "c"}
                    onChange={() => setSelectedValue2("c")}
                    value="c"
                    name="billing-method"
                    color="secondary"
                  />
                  <Typography sx={{ fontSize: "14px", textWrap: "nowrap" }}>
                    Same as billing address
                  </Typography>
                </Box>
              </AccordionSummary>
            </Accordion>

            {/* Use different billing */}
            <Accordion
              expanded={expanded2 === "panel4"}
              onChange={(e, isExpanded) => {
                if (isExpanded) {
                  setExpanded2("panel4");
                  setSelectedValue2("d"); // always stay selected
                }
              }}
            >
              <AccordionSummary>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Radio
                    size="small"
                    checked={selectedValue2 === "d"}
                    onChange={() => setSelectedValue2("d")}
                    value="d"
                    name="billing-method"
                    color="secondary"
                  />
                  <Typography sx={{ fontSize: "14px", textWrap: "nowrap" }}>
                    Use a different billing address
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h3" sx={{ fontSize: "18px" }}>
                    Billing Address
                  </Typography>
                  <AddressModalSelect />
                </Box>
                <Box>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                      <Autocomplete
                        disablePortal
                        options={["one", "two"]}
                        renderInput={(params) => (
                          <TextField {...params} label="Country" color="secondary" />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <TextField label="First Name" color="secondary" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <TextField label="Last Name" color="secondary" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                      <TextField label="Address" color="secondary" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                      <TextField label="Apartment, suite, etc" color="secondary" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <TextField label="City" color="secondary" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <TextField label="Postcode" color="secondary" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                      <TextField label="Phone" color="secondary" fullWidth />
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>

            
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, }} > <NavLink to={ "/cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/shipping" } className={"b-btn-style-target"} style={{ fontSize: "15px", display: "flex", alignItems: "center", }} > <ArrowBackIosNewIcon sx={{ fontSize: "13px" }} /> Return to Shipping </NavLink> <Button variant="outlined" onClick={()=>navigate('/cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/review')} sx={{ textTransform: "capitalize", borderRadius: "10px !important", backgroundColor: "black", color: "white", border: "0", }} > Review Order </Button> </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
