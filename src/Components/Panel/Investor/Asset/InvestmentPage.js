import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  InputLabel

} from "@mui/material";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const InvestmentForm = () => {
  const [formData, setFormData] = useState({
    investor: "",
    partner_id: "",
    partner_name: "",
    escrow_id: "",
    property_name: "",
    property_type: "",
    property_value: "",
    no_of_investors: "",
    total_units: "",
    price_per_unit: "",
    agent: "",
    agent_name: "",
    transaction_type: "Purchase",
    available_units: "",
    no_of_units_to_be_purchased: "",
    investment_period: "",
    total_value: "",
    advance_payment: "",
    total_paid_amount: ""
  });
  const navigate = useNavigate();

  const hiddenFields = [
    "investor",
    "agent",
    "property_type",
    "partner_id",
    "partner_name",
    "escrow_id",
    "no_of_investors",
    "total_units",
    "available_units",
    "transaction_type",
    "deposit_amount",
    "transaction_reference",
    "commission_paid_date",
    "approval_date",
    "remarks",
    "commission_paid_status",
    "commission_paid_date",
    "resale_status",
    "resale_buyer",
    "remarks",
    "resale_price",
    "contract_signed",
    "approved_by",
    "approval_date",
    "expected_roi",
    "agent_name",
    "investment_period",
    "total_paid_amount"
  ];

  // Get property_id from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("property_id");

  console.log("Current location:", location);
  console.log("Extracted Property ID:", propertyId);
  const [partners, setPartners] = useState([]);

  // Fetch Partners (Role: Partner)
  useEffect(() => {
    fetch("http://175.29.21.7:83/users/role/Partner/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Partners:", data);
        if (Array.isArray(data)) {
          setPartners(data); // Store partners in state
        }
      })
      .catch((error) => console.error("Error fetching partners:", error));
  }, []);

  // Fetch property details when propertyId is available
  useEffect(() => {
    if (propertyId) {
      // Fetch property details
      fetch(`http://175.29.21.7:83/property/${propertyId}/`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Property Data:", data);
          if (data) {
            setFormData((prevData) => ({
              ...prevData,
              property_name: data.property_name || "",
              property_type: data.property_type || "",
              agent: data.agent || "",
              available_units: data.available_units || "0",
              property_value: data.property_value || "",
              total_units: data.total_units || "",
              total_value: data.total_value || "",
              no_of_investors: data.no_of_investors || "",
            }));

            // Fetch Escrow ID after fetching property details
            fetch(`http://175.29.21.7:83/escrow/account/property-id/${propertyId}/`)
              .then((response) => response.json())
              .then((escrowData) => {
                console.log("Fetched Escrow Data:", escrowData);
                setFormData((prevData) => ({
                  ...prevData,
                  escrow_id: escrowData.escrow_id || "", // Update escrow_id in state
                  deposit_amount: escrowData.deposit_amount || "",
                }));
              })
              .catch((error) => console.error("Error fetching escrow details:", error));
          }
        })
        .catch((error) => console.error("Error fetching property:", error));
    }
  }, [propertyId]);



  useEffect(() => {
    if (formData.property_value && formData.no_of_investors) {
      setFormData((prevData) => ({
        ...prevData,
        price_per_unit: (Number(prevData.property_value) / Number(prevData.no_of_investors)).toFixed(2),

      }));
    }
  }, [formData.property_value, formData.no_of_investors]);

  useEffect(() => {
    if (formData.price_per_unit && formData.no_of_units_to_be_purchased) {
      setFormData((prevData) => ({
        ...prevData,
        total_value: (Number(formData.price_per_unit) * Number(formData.no_of_units_to_be_purchased)).toFixed(2),
      }));
    }
  }, [formData.price_per_unit, formData.no_of_units_to_be_purchased]);

  useEffect(() => {
    if (formData.total_value) {
      setFormData((prevData) => ({
        ...prevData,
        advance_payment: (Number(formData.total_value) * 0.1).toFixed(2),
      }));
    }
  }, [formData.total_value]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (name === "partner_id") {
        const selectedPartner = partners.find((partner) => partner.user_id === value);
        return {
          ...prevData,
          partner_id: value,
          partner_name: selectedPartner ? selectedPartner.username : "", // Assign partner_name
        };
      }

      // Clear dependent fields if no_of_units_to_be_purchased is cleared
      if (name === "no_of_units_to_be_purchased") {
        if (value === "") {
          return {
            ...prevData,
            no_of_units_to_be_purchased: "",
            total_value: "",
            advance_payment: "",
          };
        } else {
          return {
            ...prevData,
            [name]: value,
          };
        }
      }


      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };


  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");

    const sanitizedData = {
      ...formData,
      property_id: propertyId,
      partner_name: formData.partner_name || null,
      partner_id: Number(formData.partner_id) || 0,
      available_units: Number(formData.available_units) || 0,
      price_per_unit: Number(formData.price_per_unit) || 0,
      property_value: Number(formData.property_value) || 0,
      total_amount: Number(formData.total_value) || 0,
      purchased_units: Number(formData.no_of_units_to_be_purchased) || 0,
      ownership_percentage: Number(formData.ownership_percentage) || 0,
      investment_period: Number(formData.investment_period) || 0,
      tax_amount: Number(formData.tax_amount) || 0,
      processing_fee: Number(formData.processing_fee) || 0,
      discount_amount: Number(formData.discount_amount) || 0,
      commission_percentage: Number(formData.commission_percentage) || 0,
      commission_amount: Number(formData.commission_amount) || 0,
      resale_price: Number(formData.resale_price) || 0,
      commission_paid_date: formData.commission_paid_date || null,
      no_of_investors: formData.no_of_investors || null,
      user_id: userId || null, // Replace with dynamic user ID if available
      user_name: userName || null,
      escrow_id: formData.escrow_id || "", // Default or fetched escrow ID
      paid_amount: formData.advance_payment || "0.00",
      total_paid_amount: formData.advance_payment || "0.00",
      remaining_amount: (Number(formData.total_value) - Number(formData.advance_payment)).toFixed(2),
      payment_type: "Token-Payment",
      payment_method: "Cash",
    };

    try {
      // Step 1: Submit the transaction
      const response = await fetch("http://175.29.21.7:83/transactions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        const result = await response.json();
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Transaction submitted successfully!',
        }).then(() => {
          navigate("/i-buyunits");
        });
        console.log("Transaction Success:", result);

        // Step 3: Update available units
        if (propertyId) {
          const updatedUnits = Math.max(
            Number(formData.available_units) - Number(formData.no_of_units_to_be_purchased),
            0
          );

          const updateResponse = await fetch(`http://175.29.21.7:83/property/${propertyId}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ available_units: updatedUnits }),
          });

          if (updateResponse.ok) {
            console.log("Property available units updated successfully!");
          } else {
            console.error("Failed to update available units.");
          }
        }

        // Step 4: Fetch current deposit_amount and update it
        const escrowResponse = await fetch(`http://175.29.21.7:83/escrow/account/property-id/${propertyId}/`);
        if (escrowResponse.ok) {
          const escrowData = await escrowResponse.json();
          const currentDepositAmount = Number(escrowData.deposit_amount) || 0;
          const advancePayment = Number(formData.advance_payment) || 0;
          const updatedDepositAmount = (currentDepositAmount + advancePayment).toFixed(2);
          console.log("updatedDepositAmount:", updatedDepositAmount)
          // Step 5: Update deposit_amount
          const updateDepositResponse = await fetch(
            `http://175.29.21.7:83/escrow/account/property-id/${propertyId}/`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ deposit_amount: updatedDepositAmount }),
            }
          );

          if (updateDepositResponse.ok) {
            console.log("Deposit amount updated successfully!");
          } else {
            console.error("Failed to update deposit amount.");
          }
        } else {
          console.error("Failed to fetch escrow details.");
        }


      } else {
        const errorData = await response.json();
        await Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: errorData.message || "Unable to submit the transaction.",
        });
        console.error("Transaction Error:", errorData);
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
      });
      console.error("Error:", error);
    }
  };


  const fieldLabels = {
    property_name: "Property Name",
    property_type: "Property Type",
    property_value: "Property Value (₹)",
    no_of_units_to_be_purchased: "Units to Buy",
    investment_period: "Investment Period (Months)",
    price_per_unit: "Price per Unit (₹)",
    total_value: "Total Investment (₹)",
    advance_payment: "Token Amount (₹)",
    total_paid_amount: "Total Paid Amount (₹)",
    available_units: "Available Units",
    total_units: "Total Units",
    no_of_investors: "No. of Investors",
    partner_id: "Partner",
    partner_name: "Partner Name",
    escrow_id: "Escrow ID",
    agent_name: "Agent Name",
    transaction_type: "Transaction Type",
    agent: "Agent ID",
    // Add more mappings as needed...
  };




  return (
    <>
      <InvestorHeader />
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Buy Units
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            {/* Partner ID Dropdown */}
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="partner_id">Select Partner</InputLabel>
                <Select
                  labelId="partner_id"
                  id="partner_id"
                  name="partner_id"
                  value={formData.partner_id}
                  onChange={handleChange}
                  label="Select Partner"
                  required
                >
                  {partners.map((partner) => (
                    <MenuItem key={partner.user_id} value={partner.user_id}>
                      {partner.username}-{partner.user_id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

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
                      label={fieldLabels[key] || key.replace(/_/g, " ")}
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        readOnly: ["property_name", "escrow_id", "total_value", "advance_payment", "deposit_amount", "no_of_investors", "property_type", "property_value", "total_units", "available_units", "price_per_unit", "total_value"].includes(
                          key
                        ),
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
};

export default InvestmentForm;
