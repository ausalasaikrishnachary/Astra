import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, Container, FormControlLabel, Checkbox } from "@mui/material";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";

const SellAsset = () => {
  const [formData, setFormData] = useState({
    investor: "",
    property: "",
    agent: "",
    transaction_type: "Sell",
    shares_purchased: "",
    price_per_share: "",
    total_amount: "",
    ownership_percentage: "",
    investment_period: "",
    expected_roi: "",
    payment_method: "",
    transaction_reference: "",
    currency: "USD",
    tax_amount: "",
    processing_fee: "",
    discount_amount: "",
    escrow_status: "pending",
    commission_percentage: "",
    commission_amount: "",
    commission_paid_status: "pending",
    commission_paid_date: "",
    resale_status: "available",
    resale_price: "",
    resale_buyer: "",
    remarks: "",
    approval_status: "pending",
    approved_by: "",
    approval_date: "",
    contract_signed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert appropriate fields to numbers
    const sanitizedData = {
      ...formData,
      shares_purchased: formData.shares_purchased ? Number(formData.shares_purchased) : 0,
      price_per_share: formData.price_per_share ? Number(formData.price_per_share) : 0,
      total_amount: formData.total_amount ? Number(formData.total_amount) : 0,
      ownership_percentage: formData.ownership_percentage ? Number(formData.ownership_percentage) : 0,
      investment_period: formData.investment_period ? Number(formData.investment_period) : 0,
      expected_roi: formData.expected_roi ? Number(formData.expected_roi) : 0,
      tax_amount: formData.tax_amount ? Number(formData.tax_amount) : 0,
      processing_fee: formData.processing_fee ? Number(formData.processing_fee) : 0,
      discount_amount: formData.discount_amount ? Number(formData.discount_amount) : 0,
      commission_percentage: formData.commission_percentage ? Number(formData.commission_percentage) : 0,
      commission_amount: formData.commission_amount ? Number(formData.commission_amount) : 0,
      resale_price: formData.resale_price ? Number(formData.resale_price) : 0,
      commission_paid_date: formData.commission_paid_date || null, // Ensure empty date is sent as null
      approval_date: formData.approval_date || null,
    };
  
    // Validate required fields
    if (!sanitizedData.investor || !sanitizedData.property || !sanitizedData.transaction_type) {
      alert("Investor, Property, and Transaction Type are required fields.");
      return;
    }
  
    try {
      const response = await fetch("http://46.37.122.105:91/transactions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Success: Transaction submitted successfully!");
        console.log("Success:", result);
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.message || "Unable to submit the transaction."}`);
        console.error("Error response:", errorData);
      }
    } catch (error) {
      alert("Error: Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };
  
  

  return (
    <>
      <InvestorHeader />
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Sell Units
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", }}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} md={3} key={key}>
                {typeof formData[key] === "boolean" ? (
                  <FormControlLabel
                    control={<Checkbox name={key} checked={formData[key]} onChange={handleChange} />}
                    label={key.replace(/_/g, " ")}
                  />
                ) : (
                  <TextField
                    fullWidth
                    label={key.replace(/_/g, " ")}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    variant="outlined"
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box sx={{ marginTop: 3,  }}>
            <Button type="submit" variant="contained" sx={{  color: "white", width: "200px" }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SellAsset;
