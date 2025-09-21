// CardPaymentForm.jsx
import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function CardPaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // Get clientSecret from backend
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000 }) // $50
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
console.log(e)
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: { name },
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      alert("✅ Payment successful!");
    }
  };

  const elementStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#333",
        "::placeholder": { color: "#bbb" },
      },
      invalid: { color: "#ff1744" },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 🔹 Card Number with Stripe’s Brand Icon */}
      <Box sx={{ mb: 2, p: 2 }} className='payment-input-target-set'>
        <Typography sx={{ mb: 1, fontSize: '14px' }}>Card Number</Typography>
        <Box>
          <CardNumberElement options={{ ...elementStyle, showIcon: true }} />
        </Box>
      </Box>

      {/* Expiry + CVC */}
      <Box sx={{ display: "flex", gap: 2 }}>
      
     
        <Box sx={{ flex: 1 }}>
          <Box sx={{ mb: 2, p: 2 }} className='payment-input-target-set'>
        <Typography sx={{ mb: 1, fontSize: '14px' }}>Expiry Date</Typography>
        <Box>
          <CardExpiryElement options={elementStyle} />
        </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>

<Box sx={{ mb: 2, p: 2 }} className='payment-input-target-set'>
        <Typography sx={{ mb: 1, fontSize: '14px' }}>CVC</Typography>
        <Box>
          <CardCvcElement options={elementStyle} />
        </Box>
          </Box>

        </Box>
      </Box>

      {/* Cardholder Name */}
      <Box sx={{ mb: 2 }}>
      
        <TextField value={name}
          onChange={(e) => setName(e.target.value)} className="payment-input-target-set" fullWidth placeholder="Name On Card" label="Name" variant="filled"  focused />
      </Box>

      {/* Pay Button */}
      <Button
        type="submit"
        variant="contained"
        disabled={!stripe}
        sx={{ backgroundColor: "black", color: "white", borderRadius: "10px" }}
      >
        Pay Now
      </Button>
    </form>
  );
}
