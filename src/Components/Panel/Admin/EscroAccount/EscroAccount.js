import React, { useState, useEffect } from "react";
import {
    Container, TextField, Button, Grid, Typography,
    FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, Box
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function EscrowAccount() {
    const [formData, setFormData] = useState({
        property: "",
        account_number: "",
        account_type: "",
        bank_name: "",
        branch_name: "",
        ifsc_code: "",
        deposit_amount: "0",
        status: "",
    });
    const navigate = useNavigate();

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
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Data stored successfully!',
                }).then(() => {
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
                    navigate('/a-escrow');
                });
            }  else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error: unknown error',
                });
            }


        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'An error occurred while submitting the form.',
            });
        }
    };


    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 4, p: 3, borderRadius: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Escrow Account Form
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: "100%", paddingTop: "15px" }}>
                    <Grid container spacing={2} sx={{ width: "100%", margin: "0 auto" }}>
                        {/* Property ID Dropdown */}
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="property-label">Property ID</InputLabel>
                                <Select
                                    labelId="property-label"
                                    id="property"
                                    name="property"
                                    value={formData.property}
                                    onChange={handleChange}
                                    label="Property ID"
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

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Account Number" name="account_number" value={formData.account_number} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Account Type" name="account_type" value={formData.account_type} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Bank Name" name="bank_name" value={formData.bank_name} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Branch Name" name="branch_name" value={formData.branch_name} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="IFSC Code" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Deposit Amount" name="deposit_amount" value={formData.deposit_amount} onChange={handleChange} variant="outlined" InputProps={{ readOnly: true }} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Status" name="status" value={formData.status} onChange={handleChange} variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: "left", marginTop: 3 }}>
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
