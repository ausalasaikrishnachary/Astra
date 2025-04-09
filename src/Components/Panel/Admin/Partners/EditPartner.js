import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    status: "",
    pan_number: "",
    aadhaar_number: "",
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
    image: null,
    pan: null,
    aadhaar: null,
  });

  const [preview, setPreview] = useState({
    image: "",
    pan: "",
    aadhaar: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${userId}/`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setFormData({
          ...data,
          role_ids: data.roles.map((role) => role.role_id), // Ensure it's an array
          pan: null, // Reset file fields
          aadhaar: null,
          image: null,
        });

        // Set preview URLs
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
          [name]: URL.createObjectURL(file), // Show selected file preview
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
      if (formData[key] !== null && formData[key] !== "" && key !== "roles") {
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
      navigate("/a-partners");
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: `Error updating user: ${err.message}`,
      });
    }
  };

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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              {/* Regular Fields */}
              {Object.keys(formData)
                .filter(
                  (key) =>
                    !["user_id", "created_at", "updated_at", "password", "role_ids", "roles", "image", "pan", "aadhaar", ].includes(
                      key
                    )
                )
                .map((key) => (
                  <Grid item xs={12} md={4} key={key}>
                    {key === "gender" ? (
                      <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
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
                ))}

              {/* Image, PAN, Aadhaar in Last Row */}
              <Grid container item spacing={2}>
                {["image", "pan", "aadhaar"].map((key) => (
                  <Grid item xs={12} md={4} key={key}>
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
                        (
                          <a href={`http://175.29.21.7:83${preview[key]}`} target="_blank" rel="noopener noreferrer">
                            View {key.toUpperCase()}
                          </a>
                        )
                      )}
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
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
