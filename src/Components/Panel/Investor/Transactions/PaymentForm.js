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
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PaymentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    escrow_id: "",
    partner_id: "",
    partner_name:"",
    property_name: "",
    property_type: "",
    property_value: "",
    // no_of_investors: "",
    // total_units: "",
    price_per_unit: "",
    transaction_type: "Purchase",
    // available_units: "",
    no_of_units_purchased: "",
    paid_amount: "",
    commission_percentage: "2",
    commission_amount: "",
    remaining_amount: "",
    total_paid_amount: "",

  });

  const hiddenFields = [

    "commission_percentage",
    "commission_amount",
    "total_paid_amount",
    "partner_id",

  ]

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("property_id");
  const transactionId = queryParams.get("transaction_id");

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
        partner_name:data.partner_name,
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
    const userId = localStorage.getItem("user_id");

    // Convert fields to correct data types
    const transactionData = {
      transaction_id: Date.now(),
      user_role: null,
      purchased_from: null,
      property_name: formData.property_name,
      property_value: Number(formData.property_value),
      purchased_units: Number(formData.no_of_units_purchased),
      price_per_unit: Number(formData.price_per_unit),
      total_amount: Number(formData.no_of_units_purchased) * Number(formData.price_per_unit),
      paid_amount: Number(formData.remaining_amount),
      total_paid_amount: Number(formData.total_paid_amount) + Number(formData.remaining_amount),
      remaining_amount: 0,
      sold_units: null,
      available_units: null,
      agent_name: "",
      transaction_type: formData.transaction_type,
      payment_type: "Full-Payment",
      payment_method: "Cash",
      created_at: new Date().toISOString(),
      user_id: userId,
      property_id: Number(propertyId),
      escrow_id: Number(formData.escrow_id),
      partner_id: Number(formData.partner_id),
      partner_name:formData.partner_name,

    };

    try {
      // Step 1: Save Transaction
      const response = await fetch("http://175.29.21.7:83/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error("Failed to save transaction");
      }

      const responseData = await response.json();
      console.log("Transaction saved successfully:", responseData);

      // Step 2: Fetch existing deposit amount
      const escrowResponse = await fetch(`http://175.29.21.7:83/escrow/account/property-id/${propertyId}/`);
      if (!escrowResponse.ok) {
        throw new Error("Failed to fetch escrow account");
      }
      const escrowData = await escrowResponse.json();

      // Calculate new deposit amount
      const updatedDepositAmount = Number(escrowData.deposit_amount) + Number(transactionData.paid_amount);
      console.log("Updated Deposit Amount:", updatedDepositAmount);

      // Step 3: Update deposit amount
      const updateResponse = await fetch(`http://175.29.21.7:83/escrow/account/property-id/${propertyId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deposit_amount: updatedDepositAmount }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update deposit amount");
      }

      console.log("Deposit amount updated successfully");
      // Step 4: Save Commission Data
      // const commissionData = {
      //   transaction_id: responseData.transaction_id, // Ensure correct transaction_id
      //   partner_id: transactionData.partner_id,
      //   property_id: transactionData.property_id,
      //   sale_price: transactionData.property_value,
      //   commission_percentage: formData.commission_percentage,
      //   commission_amount: formData.commission_amount,
      //   commission_payment_status: "Paid", // Default status
      // };

      // const commissionResponse = await fetch("http://175.29.21.7:83/commissions/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(commissionData),
      // });

      // if (!commissionResponse.ok) {
      //   throw new Error("Failed to save commission data");
      // }

      // console.log("Commission data saved successfully");

      alert("Transaction and deposit amount data saved successfully!");
      navigate("/i-buyunits")
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred, please try again.");
    }
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

export default PaymentForm;
