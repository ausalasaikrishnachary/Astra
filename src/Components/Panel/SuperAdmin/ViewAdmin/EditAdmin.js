import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid, Paper } from "@mui/material";
import SuperAdmin from "../../../Shared/SuperAdmin/SuperAdmin";

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
    console.log("formData", formData);
  
    try {
      const updatedData = {
        ...formData,
        role_ids: Array.isArray(formData.role_ids)
          ? formData.role_ids.map(Number) // Ensure all role IDs are numbers
          : [Number(formData.role_ids)], // Convert a single role ID to an array
      };
  
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) throw new Error("Failed to update admin");
  
      alert("Admin updated successfully!");
      navigate("/s-viewadmins");
    } catch (error) {
      console.error("Error updating admin:", error);
      alert("Error updating admin");
    }
  };
  
  
  

  return (
    <>
    <SuperAdmin />
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Edit Admin</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={6} key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                  name={key}
                  type={key === "password" ? "password" : "text"}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
          <Button sx={{ mt: 3 }} type="submit" variant="contained" color="primary">Update Admin</Button>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default EditAdmin;