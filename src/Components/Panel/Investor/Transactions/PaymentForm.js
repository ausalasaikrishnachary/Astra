import React, { useState } from 'react';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Button 
} from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";

function PaymentForm() {
  const [formData, setFormData] = useState({
    investor: "",
    escrow_id: "",
    property_name: "",
    property_type: "",
    property_value: "",
    no_of_investors: "",
    total_units: "",
    price_per_unit: "",
    transaction_type: "Purchase",
    available_units: "",
    no_of_units_purchased: "",
    // investment_period: "",
    total_value: "",
    paid_amount: "",
    remaining_amount:"",
  });
    // Get property_id from URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const propertyId = queryParams.get("property_id");

  const hiddenFields = []; // Define hiddenFields array
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <InvestorHeader />
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Payment
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            {Object.keys(formData)
              .filter((key) => !hiddenFields.includes(key)) // Exclude hidden fields
              .map((key) => (
                <Grid item xs={12} md={3} key={key}>
                  {typeof formData[key] === "boolean" ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={key}
                          checked={formData[key]}
                          onChange={handleChange}
                        />
                      }
                      label={key.replace(/_/g, " ")}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      label={key.replace(/_/g, " ")}
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        readOnly: [
                          "property_name",
                          "property_type",
                          "property_value",
                          "total_units",
                          "available_units",
                          "price_per_unit",
                          "total_value"
                        ].includes(key),
                      }}
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
}

export default PaymentForm;
