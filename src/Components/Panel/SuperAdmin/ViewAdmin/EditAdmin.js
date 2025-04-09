import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid, Paper } from "@mui/material";
import SuperAdmin from "../../../Shared/SuperAdmin/SuperAdmin";
import Swal from 'sweetalert2';

const EditAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin } = location.state || {}; // Get admin data from navigation state

  const [formData, setFormData] = useState({
    username: admin?.username || "",
    first_name: admin?.first_name || "",
    last_name: admin?.last_name || "",
    email: admin?.email || "",
    phone_number: admin?.phone_number || "",
    date_of_birth: admin?.date_of_birth || "",
    gender: admin?.gender || "",
    address: admin?.address || "",
    city: admin?.city || "",
    state: admin?.state || "",
    country: admin?.country || "",
    pin_code: admin?.pin_code || "",
    status: admin?.status || "Active",
    pan_number: admin?.pan_number || "",
    aadhaar_number: admin?.aadhaar_number || "",
    kyc_status: admin?.kyc_status || "Verified",
    account_holder_name: admin?.account_holder_name || "",
    bank_name: admin?.bank_name || "",
    branch_name: admin?.branch_name || "",
    account_number: admin?.account_number || "",
    account_type: admin?.account_type || "Savings",
    ifsc_code: admin?.ifsc_code || "",
    nominee_reference_to: admin?.nominee_reference_to || "",
    referral_id: admin?.referral_id || 1,
    role_ids: admin?.roles?.map(role => role.role_id) || [],
    password: ""
  });

  const API_URL = `http://175.29.21.7:83/users/${admin?.user_id}/`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, role_ids, ...updatedData } = formData;

    try {
      const response = await fetch(API_URL, {
        method: "PUT", // If PUT fails, try "PATCH"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const responseData = await response.json(); // Parse response JSON

      console.log("Response Status:", response.status);
      console.log("Response Data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update admin");
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Admin updated successfully!',
      });

      navigate("/s-viewadmins");
    } catch (error) {
      console.error("Error updating admin:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error updating admin: ${error.message}`,
      });
    }
  };


  const hiddenFields = ["password", "referral_id", "role_ids"];


  return (
    <>
      <SuperAdmin />
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Typography variant="h4" gutterBottom>Edit Admin</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((key) =>
              !hiddenFields.includes(key) ? ( // Hide specified fields
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <TextField
                    fullWidth
                    label={key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                    name={key}
                    type={key === "password" ? "password" : "text"}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
          <Button sx={{ mt: 3 }} type="submit" variant="contained" color="primary">Update Admin</Button>
        </form>
      </Container>
    </>
  );
};

export default EditAdmin;