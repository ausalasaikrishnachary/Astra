import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

// API Endpoint
const API_BASE_URL = "http://175.29.21.7:83/users/";

const EditPartner = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = location.state || {};

  const [formData, setFormData] = useState({
    user_id: "",
    role_ids: [],
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    image: null,
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    status: "",
    pan_number: "",
    aadhaar_number: "",
    pan: null,
    aadhaar: null,
    kyc_status: "",
    account_holder_name: "",
    bank_name: "",
    branch_name: "",
    account_number: "",
    account_type: "",
    ifsc_code: "",
    nominee_reference_to: "",
    referral_id: "",
    created_at: "",
    updated_at: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${userId}/`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        setFormData({
            ...data,
            role_ids: data.roles.map((role) => role.role_id), // Ensure it's an array
          });
          
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


// Handle form submission (update API call)
const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Define fields to exclude from update
    const excludedFields = ["created_at", "updated_at", "user_id","password"];
  
    // Create a filtered object excluding unwanted fields
    const updatedData = Object.fromEntries(
      Object.entries(formData).filter(([key]) => !excludedFields.includes(key))
    );
  
    try {
      const response = await fetch(`${API_BASE_URL}${userId}/`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) throw new Error("Failed to update user");
  
      alert("User updated successfully!");
      navigate("/a-partners"); // Redirect after update
    } catch (err) {
      alert("Error updating user: " + err.message);
    }
  };
  

// Define fields to exclude from UI
const hiddenFields = [ "created_at", "updated_at", "password", "role_ids", "roles", "image", "pan", "aadhaar"];

return (
  <>
    <Header />
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Partner
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((key) => 
              !hiddenFields.includes(key) && ( // Skip rendering hidden fields
                <Grid item xs={12} md={4} key={key}>
                  {key === "gender" ? (
                    <TextField
                      select
                      fullWidth
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  ) : (
                    <TextField
                      fullWidth
                      label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      name={key}
                      type="text"
                      value={formData[key] || ""}
                      onChange={handleChange}
                    />
                  )}
                </Grid>
              )
            )}
          </Grid>
          <Button sx={{ mt: 3 }} type="submit" variant="contained" color="primary">
            Update Partner
          </Button>
        </form>
      )}
    </Container>
  </>
);

};

export default EditPartner;
