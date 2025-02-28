import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Typography,
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";

const AdminKyc = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    full_name: "",
    date_of_birth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct payload with additional fixed fields required by your API
    const payload = {
      ...formData,
      user_type: 1,
      status: 1,
      kyc_status: 1,
      added_by: null,
    };

    try {
      const response = await fetch("https://rahul30.pythonanywhere.com/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const data = await response.json();
      console.log("Registration successful", data);
      // Optionally reset the form or provide user feedback here
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <>
      <Header />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            width: 800,
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            marginTop: "10px",
          }}
        >
          <CardHeader
            title="Registration"
            sx={{
              backgroundColor: "rgb(30, 10, 80)",
              color: "white",
              textAlign: "center",
              padding: "15px",
              fontSize: "20px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          />

          <CardContent>
            {/* Basic Information */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "rgb(30, 10, 80)",
                marginTop: "15px",
              }}
            >
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="full_name"
                  placeholder="Full Name"
                  variant="outlined"
                  size="small"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="email"
                  placeholder="Email"
                  variant="outlined"
                  size="small"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="phone"
                  placeholder="Mobile Number"
                  variant="outlined"
                  size="small"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="date_of_birth"
                  placeholder="Date of Birth"
                  variant="outlined"
                  size="small"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="gender"
                  placeholder="Gender"
                  variant="outlined"
                  size="small"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="username"
                  placeholder="Username"
                  variant="outlined"
                  size="small"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="password"
                  placeholder="Password"
                  variant="outlined"
                  size="small"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

            {/* Address Details */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "rgb(30, 10, 80)",
                marginTop: "15px",
              }}
            >
              Address Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="address"
                  placeholder="Address"
                  variant="outlined"
                  size="small"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  name="country"
                  placeholder="Country"
                  variant="outlined"
                  size="small"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  name="state"
                  placeholder="State"
                  variant="outlined"
                  size="small"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  name="city"
                  placeholder="City"
                  variant="outlined"
                  size="small"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  name="postal_code"
                  placeholder="ZIP Code"
                  variant="outlined"
                  size="small"
                  value={formData.postal_code}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />
             {/* Banking Details */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "rgb(30, 10, 80)",
                          marginTop: "15px",
                        }}
                      >
                        Banking Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="PAN Number"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Aadhar Number"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Bank Name"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Account Number"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="IFSC Code"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Bank Branch"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />
            
                      {/* Investment Details */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "rgb(30, 10, 80)",
                          marginTop: "15px",
                        }}
                      >
                        Investment Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Investment Type"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Risk Profile"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Expected Investment Amount"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />
            
                      {/* Nominee Details */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "rgb(30, 10, 80)",
                          marginTop: "15px",
                        }}
                      >
                        Nominee Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Nominee Name"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Nominee Relationship"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            placeholder="Nominee Date of Birth"
                            variant="outlined"
                            size="small"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />
            
                      {/* KYC Verification */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "rgb(30, 10, 80)",
                          marginTop: "15px",
                        }}
                      >
                        KYC Verification
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Button
                            variant="outlined"
                            component="label"
                            sx={{ flex: 1, marginRight: "10px" }}
                          >
                            Upload File
                            <input type="file" hidden />
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "green",
                              "&:hover": { backgroundColor: "darkred" },
                            }}
                          >
                            KYC
                          </Button>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />
            

            {/* Additional sections such as Banking, Investment, Nominee, and KYC can be added here */}

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: "10px", whiteSpace: "nowrap" }}
            >
              <Grid item>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color: "rgb(30, 10, 80)",
                      }}
                    >
                      I agree to the Terms & Conditions
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "rgb(20, 5, 60)",
                "&:hover": { backgroundColor: "rgb(15, 4, 50)" },
              }}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default AdminKyc;
