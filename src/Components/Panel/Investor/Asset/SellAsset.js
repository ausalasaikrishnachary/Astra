import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField, Button, Container, FormControlLabel, Checkbox } from "@mui/material";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  console.log("Current location:", location);
  
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("property_id");
  console.log("Property ID:", propertyId);
  

  useEffect(() => {
    console.log("inside useffect")
    if (propertyId) {
      fetch(`http://46.37.122.105:91/property/${propertyId}`)
        .then((response) => response.json())
        
        .then((data) => {
          console.log(data)
          if (data) {
            setFormData((prevData) => ({
              ...prevData,
              property: data.property_id || "",
              agent: data.agent || "",
              total_amount: data.total_price?.toString() || "",
              price_per_share: data.price_per_sqft?.toString() || "",
              expected_roi: data.expected_roi?.toString() || "",
              ownership_percentage: data.total_units
                ? ((10 / data.total_units) * 100).toFixed(2).toString()
                : "",
            }));
          }
        })
        .catch((error) => console.error("Error fetching property:", error));
    }
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedData = {
      ...formData,
      shares_purchased: Number(formData.shares_purchased) || 0,
      price_per_share: Number(formData.price_per_share) || 0,
      total_amount: Number(formData.total_amount) || 0,
      ownership_percentage: Number(formData.ownership_percentage) || 0,
      investment_period: Number(formData.investment_period) || 0,
      expected_roi: Number(formData.expected_roi) || 0,
      tax_amount: Number(formData.tax_amount) || 0,
      processing_fee: Number(formData.processing_fee) || 0,
      discount_amount: Number(formData.discount_amount) || 0,
      commission_percentage: Number(formData.commission_percentage) || 0,
      commission_amount: Number(formData.commission_amount) || 0,
      resale_price: Number(formData.resale_price) || 0,
      commission_paid_date: formData.commission_paid_date || null,
      approval_date: formData.approval_date || null,
    };

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
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
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
          <Box sx={{ marginTop: 3 }}>
            <Button type="submit" variant="contained" sx={{ color: "white", width: "200px" }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SellAsset;
