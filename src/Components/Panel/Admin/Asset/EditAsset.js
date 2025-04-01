import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";
import axios from "axios";

function EditAsset() {
  const location = useLocation();
  const navigate = useNavigate();
  const { assetId } = location.state || {};
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchAssetDetails = async () => {
      try {
        const response = await axios.get(
          `http://175.29.21.7:83/property/${assetId}/`
        );
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load asset details.");
        setLoading(false);
      }
    };
    fetchAssetDetails();
  }, [assetId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Prepare FormData to include both text data and the image file
    const formDataPayload = new FormData();

    // Append all asset data to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataPayload.append(key, formData[key]);
      }
    });

    // Append image if a new one is selected
    if (imageFile) {
      formDataPayload.append("property_image", imageFile);
    }

    try {
      await axios.put(
        `http://175.29.21.7:83/property/${assetId}/`,
        formDataPayload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      navigate("/a-asset"); // Redirect on success
    } catch (err) {
      console.error("Error Response:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update asset.");
    }

    setLoading(false);
  };

  const excludedFields = ["created_at", "updated_at", "sold_units","property_image",];

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Asset
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {Object.keys(formData)
                .filter((key) => !excludedFields.includes(key)) // Exclude specific fields
                .map((key) => (
                  <Grid item xs={12} md={4} key={key}>
                    <TextField
                      fullWidth
                      label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      name={key}
                      type="text"
                      value={formData[key] || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              <Grid item xs={12} md={4} >
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    label="Property Image"
                    type="file"
                    name="Property Image"
                    onChange={handleFileChange}
                    inputProps={{
                      accept: "image" ? "image/*" : ".pdf,.jpg,.jpeg,.png",
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <a href={`http://175.29.21.7:83${formData.property_image}`} target="_blank" rel="noopener noreferrer">
                    View Image
                  </a>
                </FormControl>
              </Grid>
            </Grid>
            <Button sx={{ mt: 3 }} type="submit" variant="contained" color="primary">
              Update Asset
            </Button>
          </form>
        )}
      </Container>
    </>
  );
}

export default EditAsset;
