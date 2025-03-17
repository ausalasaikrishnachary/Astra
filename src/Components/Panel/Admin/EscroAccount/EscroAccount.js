import React, { useState, useEffect } from "react";
import {
    Container, TextField, Button, Grid, Typography,
    FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, Box
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";

function EscrowAccount() {
    const [formData, setFormData] = useState({
        property: "",
        account_number: "",
        account_type: "",
        bank_name: "",
        branch_name: "",
        ifsc_code: "",
        deposit_amount: "",
        status: "",
    });

    const [properties, setProperties] = useState([]); // State for property list

    useEffect(() => {
        // Fetch property IDs dynamically
        const fetchProperties = async () => {
            try {
                const response = await fetch("http://175.29.21.7:83/property/");
                if (!response.ok) {
                    throw new Error("Failed to fetch properties");
                }
                const data = await response.json();
                setProperties(data); // Assuming API returns an array of properties
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://175.29.21.7:83/escrow/accounts/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert("Data stored successfully!");
                // Reset form after successful submission
            setFormData({
                property: "",
                account_number: "",
                account_type: "",
                bank_name: "",
                branch_name: "",
                ifsc_code: "",
                deposit_amount: "",
                status: "",
            });
              } else {
                alert("Error: unknown error");
              }
    
    
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while submitting the form.");
              }
    };
    

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4, p: 3, borderRadius: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Escrow Account Form
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: "95vw", marginLeft: "-32%", paddingTop: "15px" }}>
                    <Grid container spacing={2} sx={{ width: "90%", margin: 0 }}>
                        {/* Property ID Dropdown */}
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="property-label">Property ID</InputLabel>
                                <Select
                                    labelId="property-label"
                                    id="property"
                                    name="property"
                                    value={formData.property}
                                    onChange={handleChange}
                                    label="Property ID" // Add this to prevent overlap
                                >
                                    {properties.length > 0 ? (
                                        properties.map((property) => (
                                            <MenuItem key={property.property_id} value={property.property_id}>
                                                {property.property_name}-{property.property_id}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Properties Available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={4}>
                            <TextField fullWidth label="Account Number" name="account_number" value={formData.account_number} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField fullWidth label="Account Type" name="account_type" value={formData.account_type} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField fullWidth label="Bank Name" name="bank_name" value={formData.bank_name} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField fullWidth label="Branch Name" name="branch_name" value={formData.branch_name} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField fullWidth label="IFSC Code" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField fullWidth label="Deposit Amount" name="deposit_amount" value={formData.deposit_amount} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField fullWidth label="Status" name="status" value={formData.status} onChange={handleChange} variant="outlined" />
                        </Grid>
                        <Grid xs={12} sx={{ marginTop: 3, marginLeft: 2 }}>
                            <Button type="submit" variant="contained" sx={{ color: "white", width: "200px" }}>
                                Submit
                            </Button>
                        </Grid>

                    </Grid>

                </form>
            </Container>
        </>
    );
}

export default EscrowAccount;
