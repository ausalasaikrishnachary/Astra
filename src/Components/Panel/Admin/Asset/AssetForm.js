import React, { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import axios from "axios";
import Header from '../../../Shared/Navbar/Navbar';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const PropertyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    property_name: "",
    property_type: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    latitude: "",
    longitude: "",
    no_of_investors: "",
    total_units: "",
    available_units: "",
    property_value: "",
    ownership_type: "freehold",
    property_image: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);
  const [previewLegalDocuments, setPreviewLegalDocuments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "no_of_investors") {
      const investors = parseInt(value, 10) || 0;
      const calculatedUnits = investors; // Or multiply by X if needed
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        total_units: calculatedUnits.toString(),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [key]: checked ? [...prev[key], value] : prev[key].filter((item) => item !== value),
    }));
  }

  const handleFileChange = (e, fieldName) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    // Handle single file fields
    if (fieldName === "property_image" || fieldName === "legal_documents") {
      const file = files[0];

      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please upload a JPG or PNG image.',
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: file, // Store single file
      }));

      // Generate preview
      setPreviewImages((prev) => ({
        ...prev,
        [fieldName]: URL.createObjectURL(file),
      }));
    }

    // Handle multiple file fields
    if (fieldName === "additional_images") {
      const validFiles = Array.from(files).filter((file) => allowedTypes.includes(file.type));

      if (validFiles.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please upload a JPG or PNG image.',
        });

        return;
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: validFiles, // Store array of files
      }));

      // Generate preview for multiple images
      setPreviewImages((prev) => ({
        ...prev,
        [fieldName]: validFiles.map((file) => URL.createObjectURL(file)),
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "property_image" || key === "legal_documents") {
          // Single file upload
          if (formData[key] instanceof File) {
            formDataToSend.append(key, formData[key]);
          }
        } else if (key === "additional_images") {
          // Multiple file upload
          if (Array.isArray(formData[key])) {
            formData[key].forEach((file) => formDataToSend.append(`${key}[]`, file));
          }
        } else if (Array.isArray(formData[key])) {
          // Handle array fields correctly
          formData[key].forEach((item) => formDataToSend.append(`${key}[]`, item));
        } else {
          // Handle all other fields
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch("http://175.29.21.7:83/property/", {
        method: "POST",
        body: formDataToSend,
      });

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (response.ok) {

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Property added successfully!',
        }).then(() => navigate("/a-asset"));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: responseData.property_image?.[0] ||
            responseData.legal_documents?.[0] ||
            responseData.message ||
            "Unknown error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: 'An error occurred while submitting the form.',
      });
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ width: "100%", px: 2 }}>
        <Typography
          variant="h4"
          sx={{ color: "#100f0f", fontSize: { xs: "24px", md: "28px" }, fontWeight: 700, pt: 4, textAlign: "center" }}
        >
          Add Asset
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%", paddingTop: "15px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Property Name" name="property_name" value={formData.property_name} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Property Type" name="property_type" value={formData.property_type} onChange={handleChange}>
                <MenuItem value="Manufacturing Facilities">Manufacturing Facilities</MenuItem>
                <MenuItem value="Warehouses">Warehouses</MenuItem>
                <MenuItem value="Distribution">Distribution Centers</MenuItem>
                <MenuItem value="Data Centers">Data Centers</MenuItem>
                <MenuItem value="R&D">(R&D)</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Location" name="address" value={formData.address} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Postal Code" name="pin_code" value={formData.pin_code} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="No of Investors" name="no_of_investors" value={formData.no_of_investors} onChange={handleChange} type="number" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Total Units" name="total_units" value={formData.total_units} onChange={handleChange} type="number" InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Available Units" name="available_units" value={formData.available_units} onChange={handleChange} type="number" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Total Price" name="property_value" value={formData.property_value} onChange={handleChange} type="number" />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Property Image</Typography>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "property_image")} />
              {previewImages.property_image && (
                <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                  <img src={previewImages.property_image} alt="Property Preview" style={{ height: "100px", objectFit: "cover", borderRadius: "8px" }} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid sx={{ marginTop: 3, marginBottom: "10px", textAlign: "left" }}>
            <Button type="submit" variant="contained" sx={{ color: "white", width: "200px" }}>
              Submit Property
            </Button>
          </Grid>
        </form>
      </Container>
    </>

  );
};

export default PropertyForm;
