import React, { useEffect, useState } from "react";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from "@mui/material";
import { useLocation, useNavigate  } from "react-router-dom";
import Header from "../../../Shared/Navbar/Navbar";

function CommissionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("property_id");
  const transactionId = queryParams.get("transaction_id");
  const [formData, setFormData] = useState({
    // escrow_id: "",
    transaction_id:transactionId,
    partner_id: "",
    property_name: "",
    property_type: "",
    // no_of_investors: "",
    // total_units: "",
    price_per_unit: "",
    transaction_type: "Purchase",
    // available_units: "",
    no_of_units_purchased: "",
    paid_amount: "",
    property_value: "",
    commission_percentage: "2",
    commission_amount: "",
    remaining_amount: "",
    total_paid_amount: "",

  });

  const hiddenFields = [
    "total_paid_amount",
    "remaining_amount",
    "escrow_id",
    "paid_amount",
    "no_of_units_purchased",
    "transaction_type",
    "price_per_unit",
  ]



  useEffect(() => {
    if (propertyId) {
      fetchPropertyData(propertyId);
      fetchEscrowData(propertyId);
      fetchTransactionData(transactionId);
    }
  }, [propertyId]);

  // Fetch Property Data
  const fetchPropertyData = async (propertyId) => {
    try {
      const response = await fetch(`http://175.29.21.7:83/property/${propertyId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch property data");
      }
      const data = await response.json();
      const commissionAmount = ((data.property_value / 100) * Number(formData.commission_percentage)).toFixed(2);

      setFormData((prevData) => ({
        ...prevData,
        property_name: data.property_name,
        property_type: data.property_type,
        property_value: data.property_value,
        // total_units: data.total_units,
        // available_units: data.available_units,
        // no_of_investors: data.no_of_investors,
        price_per_unit: (data.property_value / data.total_units).toFixed(2),
        commission_amount: commissionAmount,
      }));
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  // Fetch Escrow Data
  let globalDepositAmount = 0; // Define a global variable

  const fetchEscrowData = async (propertyId) => {
    try {
      const response = await fetch(`http://175.29.21.7:83/escrow/account/property-id/${propertyId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch escrow data");
      }
      const data = await response.json();

      // Assign deposit_amount to the global variable
      globalDepositAmount = data.deposit_amount;

      setFormData((prevData) => ({
        ...prevData,
        escrow_id: data.escrow_id,
        total_paid_amount: data.deposit_amount
      }));

      console.log("Global Deposit Amount:", globalDepositAmount); // Debugging
    } catch (error) {
      console.error("Error fetching escrow data:", error);
    }
  };


  const fetchTransactionData = async (transactionId) => {
    try {
      const response = await fetch(`http://175.29.21.7:83/transactions/${transactionId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch escrow data");
      }
      const data = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        paid_amount: data.paid_amount,
        no_of_units_purchased: data.purchased_units,
        remaining_amount: data.remaining_amount,
        partner_id: data.partner_id,
        property_name:data.property_name,
        property_value:data.property_value,
        property_id:data.property_id,
      }));
    } catch (error) {
      console.error("Error fetching escrow data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };

      // Calculate total value and remaining amount dynamically
      if (name === "no_of_units_purchased") {
        updatedData.total_value = (updatedData.no_of_units_purchased * updatedData.price_per_unit).toFixed(2);
        updatedData.remaining_amount = (updatedData.total_value - updatedData.paid_amount).toFixed(2);
      }
      if (name === "paid_amount") {
        updatedData.remaining_amount = (updatedData.total_value - value).toFixed(2);
      }
      // Recalculate commission amount
      if (name === "commission_percentage" || name === "property_value") {
        const commissionAmount = ((Number(updatedData.property_value) / 100) * Number(updatedData.commission_percentage)).toFixed(2);
        updatedData.commission_amount = commissionAmount;
      }

      return updatedData;
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      // Step 4: Save Commission Data
      const commissionData = {
        transaction_id: formData.transaction_id, // Ensure correct transaction_id
        partner_id: formData.partner_id,
        property_id: formData.property_id,
        sale_price: formData.property_value,
        commission_percentage: formData.commission_percentage,
        commission_amount: formData.commission_amount,
        commission_payment_status: "Paid", // Default status
      };

      const commissionResponse = await fetch("http://175.29.21.7:83/commissions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commissionData),
      });

      if (!commissionResponse.ok) {
        throw new Error("Failed to save commission data");
      }

      console.log("Commission data saved successfully");

      alert("commission data saved successfully!");
      navigate("/a-transactionmoniter")
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred, please try again.");
    }
  };


  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Commission Payment
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((key) =>
              !hiddenFields.includes(key) ? ( // Hide fields from UI
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
                          "price_per_unit",
                          "total_value",
                          "remaining_amount",
                        ].includes(key),
                      }}
                    />
                  )}
                </Grid>
              ) : null
            )}
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

export default CommissionForm;
