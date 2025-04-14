import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const API_BASE_URL = "http://175.29.21.7:83/users/";

const Kyc = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

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
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    pan_number: "",
    aadhaar_number: "",
    account_holder_name: "",
    bank_name: "",
    branch_name: "",
    account_number: "",
    account_type: "",
    ifsc_code: "",
    image: null,
    pan: null,
    aadhaar: null,
  });

  const [preview, setPreview] = useState({ image: "", pan: "", aadhaar: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${userId}/`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();

        setFormData({
          ...data,
          role_ids: data.roles.map((role) => role.role_id),
          pan: null,
          aadhaar: null,
          image: null,
        });

        setPreview({
          image: data.image || "",
          pan: data.pan || "",
          aadhaar: data.aadhaar || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, [name]: file }));
        setPreview((prev) => ({
          ...prev,
          [name]: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`${API_BASE_URL}${userId}/`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }
      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User updated successfully!',
      });

    } catch (err) {
      alert("Error updating user: " + err.message);
    }
  };

  const renderFields = (fields) => (
    <Grid container spacing={2}>
      {fields.map((key) => (
        <Grid item xs={12} md={4} key={key}>
          {key === "gender" ? (
            <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          ) : key === "date_of_birth" ? (
            <TextField
              fullWidth
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <TextField
              fullWidth
              label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <InvestorHeader />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" marginBottom={2}>
          Complete Investor's KYC
        </Typography>
  
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
              <Tab label="Personal Info" />
              <Tab label="Address Details" />
              <Tab label="Bank Details" />
              <Tab label="PAN Details" />
            </Tabs>
  
            <Box hidden={activeTab !== 0}>
              {renderFields(["username", "email", "phone_number", "date_of_birth", "gender"])}
            </Box>
  
            <Box hidden={activeTab !== 1}>
              {renderFields(["address", "city", "state", "country", "pin_code"])}
            </Box>
  
            <Box hidden={activeTab !== 2}>
              {renderFields([
                "account_holder_name",
                "bank_name",
                "branch_name",
                "account_number",
                "account_type",
                "ifsc_code",
              ])}
            </Box>
  
            {/* Only wrap final tab in a form */}
            {activeTab === 3 && (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Box>
                  {renderFields(["pan_number", "aadhaar_number"])}
  
                  <Grid container spacing={2}>
                    {["image", "pan", "aadhaar"].map((key) => (
                      <Grid item xs={4} mt={4} key={key}>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            label={key.toUpperCase()}
                            type="file"
                            name={key}
                            onChange={handleChange}
                            inputProps={{
                              accept: key === "image" ? "image/*" : ".pdf,.jpg,.jpeg,.png",
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                          {preview[key] && (
                            <a
                              href={`http://175.29.21.7:83${preview[key]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View {key.toUpperCase()}
                            </a>
                          )}
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
  
                <Box display="flex" justifyContent="space-between" mt={4}>
                  <Button
                    variant="outlined"
                    onClick={() => setActiveTab((prev) => prev - 1)}
                  >
                    Back
                  </Button>
  
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </form>
            )}
  
            {/* Navigation buttons for earlier tabs */}
            {activeTab < 3 && (
              <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                  variant="outlined"
                  disabled={activeTab === 0}
                  onClick={() => setActiveTab((prev) => prev - 1)}
                >
                  Back
                </Button>
  
                <Button
                  variant="contained"
                  onClick={() => setActiveTab((prev) => prev + 1)}
                >
                  Next
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
  
};

export default Kyc;
