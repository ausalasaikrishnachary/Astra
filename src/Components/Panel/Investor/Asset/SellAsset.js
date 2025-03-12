// import React, { useState, useEffect } from "react";
// import { Box, Typography, Grid, TextField, Button, Container, FormControlLabel, Checkbox } from "@mui/material";
// import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
// import { useLocation } from "react-router-dom";

// const SellAsset = () => {
//   const [formData, setFormData] = useState({
//     investor: "",
//     property: "",
//     agent: "",
//     transaction_type: "Sell",
//     shares_purchased: "",
//     price_per_share: "",
//     total_amount: "",
//     ownership_percentage: "",
//     investment_period: "",
//     expected_roi: "",
//     payment_method: "",
//     transaction_reference: "",
//     currency: "USD",
//     tax_amount: "",
//     processing_fee: "",
//     discount_amount: "",
//     escrow_status: "pending",
//     commission_percentage: "",
//     commission_amount: "",
//     commission_paid_status: "pending",
//     commission_paid_date: "",
//     resale_status: "available",
//     resale_price: "",
//     resale_buyer: "",
//     remarks: "",
//     approval_status: "pending",
//     approved_by: "",
//     approval_date: "",
//     contract_signed: false,
//   });

//   const location = useLocation();
//   console.log("Current location:", location);
  
//   const queryParams = new URLSearchParams(location.search);
//   const propertyId = queryParams.get("property_id");
//   console.log("Property ID:", propertyId);
  

//   useEffect(() => {
//     console.log("inside useffect")
//     if (propertyId) {
//       fetch(`http://46.37.122.105:91/property/${propertyId}`)
//         .then((response) => response.json())
        
//         .then((data) => {
//           console.log(data)
//           if (data) {
//             setFormData((prevData) => ({
//               ...prevData,
//               property: data.property_id || "",
//               agent: data.agent || "",
//               total_amount: data.total_price?.toString() || "",
//               price_per_share: data.price_per_sqft?.toString() || "",
//               expected_roi: data.expected_roi?.toString() || "",
//               ownership_percentage: data.total_units
//                 ? ((10 / data.total_units) * 100).toFixed(2).toString()
//                 : "",
//             }));
//           }
//         })
//         .catch((error) => console.error("Error fetching property:", error));
//     }
//   }, [propertyId]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const sanitizedData = {
//       ...formData,
//       shares_purchased: Number(formData.shares_purchased) || 0,
//       price_per_share: Number(formData.price_per_share) || 0,
//       total_amount: Number(formData.total_amount) || 0,
//       ownership_percentage: Number(formData.ownership_percentage) || 0,
//       investment_period: Number(formData.investment_period) || 0,
//       expected_roi: Number(formData.expected_roi) || 0,
//       tax_amount: Number(formData.tax_amount) || 0,
//       processing_fee: Number(formData.processing_fee) || 0,
//       discount_amount: Number(formData.discount_amount) || 0,
//       commission_percentage: Number(formData.commission_percentage) || 0,
//       commission_amount: Number(formData.commission_amount) || 0,
//       resale_price: Number(formData.resale_price) || 0,
//       commission_paid_date: formData.commission_paid_date || null,
//       approval_date: formData.approval_date || null,
//     };

//     if (!sanitizedData.investor || !sanitizedData.property || !sanitizedData.transaction_type) {
//       alert("Investor, Property, and Transaction Type are required fields.");
//       return;
//     }

//     try {
//       const response = await fetch("http://46.37.122.105:91/transactions/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(sanitizedData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert("Success: Transaction submitted successfully!");
//         console.log("Success:", result);
//       } else {
//         const errorData = await response.json();
//         alert(`Failed: ${errorData.message || "Unable to submit the transaction."}`);
//         console.error("Error response:", errorData);
//       }
//     } catch (error) {
//       alert("Error: Something went wrong. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <InvestorHeader />
//       <Container maxWidth="xl" sx={{ padding: 3 }}>
//         <Typography variant="h4" gutterBottom textAlign="center">
//           Sell Units
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
//           <Grid container spacing={2}>
//             {Object.keys(formData).map((key) => (
//               <Grid item xs={12} md={3} key={key}>
//                 {typeof formData[key] === "boolean" ? (
//                   <FormControlLabel
//                     control={<Checkbox name={key} checked={formData[key]} onChange={handleChange} />}
//                     label={key.replace(/_/g, " ")}
//                   />
//                 ) : (
//                   <TextField
//                     fullWidth
//                     label={key.replace(/_/g, " ")}
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     variant="outlined"
//                   />
//                 )}
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ marginTop: 3 }}>
//             <Button type="submit" variant="contained" sx={{ color: "white", width: "200px" }}>
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default SellAsset;


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
} from "@mui/material";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { useLocation, useNavigate } from "react-router-dom";

const InvestmentForm = () => {
  const [formData, setFormData] = useState({
    investor: "",
    property_name: "",
    property_type: "",
    property_value: "",
    total_units: "",
    price_per_unit: "",
    agent: "",
    agent_name: "",
    transaction_type: "Purchase",
    available_units: "",
    no_of_units_to_sell: "",
    investment_period: "",
    total_value: ""
  });
  const navigate = useNavigate();

  const hiddenFields = [
    "investor",
    "agent",
    "transaction_type",
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
    "investment_period"
  ];

  // Get property_id from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("property_id");

  console.log("Current location:", location);
  console.log("Extracted Property ID:", propertyId);

  // Fetch property details when propertyId is available
  useEffect(() => {
    if (propertyId) {
      fetch(`http://46.37.122.105:91/property/${propertyId}/`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Data:", data);
          if (data) {
            setFormData((prevData) => {
              const updatedData = {
                ...prevData,
                property_id:propertyId,
                property_name: data.property_name || "",
                property_type: data.property_type || "",
                agent: data.agent || "",
                available_units: data.available_units || "0",
                property_value: data.property_value || "",
                total_units: data.total_units || "",
                expected_roi: data.expected_roi?.toString() || "",
                total_value: data.total_value || ""
              };
  
              // Ensure price per unit is calculated immediately after fetching data
              if (updatedData.property_value && updatedData.total_units) {
                updatedData.price_per_unit = (Number(updatedData.property_value) / Number(updatedData.total_units)).toFixed(2);
              }
  
              return updatedData;
            });
          }
        })
        .catch((error) => console.error("Error fetching property:", error));
    }
  }, [propertyId]);
  

  useEffect(() => {
    if (formData.property_value && formData.total_units) {
      setFormData((prevData) => ({
        ...prevData,
        price_per_unit: (Number(prevData.property_value) / Number(prevData.total_units)).toFixed(2),

      }));
    }
  }, [formData.property_value, formData.total_units]);

  useEffect(() => {
    if (formData.price_per_unit && formData.no_of_units_to_sell) {
      setFormData((prevData) => ({
        ...prevData,
        total_value: (Number(formData.price_per_unit) * Number(formData.no_of_units_to_sell)).toFixed(2),
      }));
    }
  }, [formData.price_per_unit, formData.no_of_units_to_sell]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form submission handler
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert numeric values
    const sanitizedData = {
      ...formData,
      available_units: Number(formData.available_units) || 0,
      price_per_unit: Number(formData.price_per_unit) || 0,
      total_amount: Number(formData.property_value) || 0,
      purchased_units: Number(formData.no_of_units_to_sell) || 0,
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

    try {
      // Step 1: Submit the transaction
      const response = await fetch("http://46.37.122.105:91/transactions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Success: Transaction submitted successfully!");
        navigate("/i-sellunits");
        console.log("Success:", result);

        // Step 2: Update available_units after a successful transaction
        if (propertyId) {
          const updatedUnits = Math.max(
            Number(formData.available_units) - Number(formData.no_of_units_to_sell),
            0
          ); // Ensure it doesn't go negative

          const updateResponse = await fetch(`http://46.37.122.105:91/property/${propertyId}/`, {
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
          Buy Units
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
                        readOnly: ["property_name", "property_type", "property_value", "total_units", "available_units", "price_per_unit", "total_value"].includes(
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



