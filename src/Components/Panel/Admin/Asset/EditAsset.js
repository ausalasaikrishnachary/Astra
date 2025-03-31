import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
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

    let updatedData = { ...formData };

    // Handle image upload if an image is selected
    if (imageFile) {
      const formDataImage = new FormData();
      formDataImage.append("property_image", imageFile);

      try {
        const imageResponse = await axios.post(
          "http://175.29.21.7:83/upload-image/",
          formDataImage,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        updatedData.property_image = imageResponse.data.image_url; // Ensure API returns an image URL
      } catch (err) {
        setError("Image upload failed.");
        setLoading(false);
        return;
      }
    }

    console.log("Updated Data before sending:", updatedData); // Debugging log

    // Send update request
    try {
      await axios.put(
        `http://175.29.21.7:83/property/${assetId}/`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("/a-asset"); // Redirect on success
    } catch (err) {
      console.error("Error Response:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update asset.");
    }

    setLoading(false);
  };


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
              {Object.keys(formData).map(
                (key) =>
                  key !== "property_image" && ( // Exclude property_image from text fields
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
                  )
              )}
              <Grid item xs={12} md={4}>
                <Typography>Property Image:</Typography>
                <input type="file" onChange={handleFileChange} />
                {formData.property_image && (
                  <img
                    src={`http://175.29.21.7:83${formData.property_image}`} // Adjust based on API response
                    alt="Current Property"
                    width={100}
                    style={{ marginTop: 10 }}
                  />
                )}
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
