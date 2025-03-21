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
    no_of_investors:"",
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        alert("Invalid file type. Please upload a JPG or PNG image.");
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
        alert("Invalid file type. Please upload only JPG or PNG images.");
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



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://175.29.21.7:83/property/", formData);
  //     console.log("Response:", response.data);
  //     alert("Property added successfully!");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     console.error("Response Data:", error.response?.data); // Log the error details
  //     alert(`Error adding property: ${error.response?.data?.message || "Unknown error"}`);
  //   }
  // };

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
        alert("Property added successfully!");
        navigate("/a-asset");
      } else {
        alert(`Error adding property: ${responseData.property_image?.[0] || responseData.legal_documents?.[0] || responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };





  return (
    <>
      < Header />
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, pt: 4, pl: 2, textAlign: "center" }}
        >
          Add Asset
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "86vw", marginLeft: "-20%", paddingTop: "15px" }}>
          <Grid container spacing={2} sx={{ width: "90%", margin: 0 }}>
            <Grid item xs={6}>
              <TextField fullWidth label="Property Name" name="property_name" value={formData.property_name} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField select fullWidth label="Property Type" name="property_type" value={formData.property_type} onChange={handleChange}>
                <MenuItem value="Manufacturing Facilities">Manufacturing Facilities</MenuItem>
                <MenuItem value="Warehouses">Warehouses </MenuItem>
                <MenuItem value="Distribution">Distribution Centers</MenuItem>
                <MenuItem value="Data Centers">Data Centers </MenuItem>
                <MenuItem value="R&D">(R&D)</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Location" name="address" value={formData.address} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Postal Code" name="pin_code" value={formData.pin_code} onChange={handleChange} />
            </Grid>

            {/* <Grid item xs={6}>
              <TextField fullWidth label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} type="number" />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} type="number" />
            </Grid> */}
            <Grid item xs={6}>
              <TextField fullWidth label="No of Investors" name="no_of_investors" value={formData.no_of_investors} onChange={handleChange} type="number" />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Total Units" name="total_units" value={formData.total_units} onChange={handleChange} type="number" />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Available Units" name="available_units" value={formData.available_units} onChange={handleChange} type="number" />
            </Grid>

            {/* <Grid item xs={6}>
              <TextField fullWidth label="Area (sqft)" name="area_sqft" value={formData.area_sqft} onChange={handleChange} type="number" />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Price per sqft" name="price_per_sqft" value={formData.price_per_sqft} onChange={handleChange} type="number" />
            </Grid> */}

            <Grid item xs={6}>
              <TextField fullWidth label="Total Price" name="property_value" value={formData.property_value} onChange={handleChange} type="number" />
            </Grid>

            {/* <Grid item xs={12}>
              <Typography variant="h6">Amenities</Typography>
              <FormGroup row>
                {amenitiesOptions.map((amenity) => (
                  <FormControlLabel
                    key={amenity}
                    control={
                      <Checkbox
                        value={amenity}
                        onChange={(e) => handleCheckboxChange(e, "amenities")}
                      />
                    }
                    label={amenity}
                  />
                ))}
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Security Features</Typography>
              <FormGroup row>
                {securityOptions.map((feature) => (
                  <FormControlLabel
                    key={feature}
                    control={
                      <Checkbox
                        value={feature}
                        onChange={(e) => handleCheckboxChange(e, "security_features")}
                      />
                    }
                    label={feature}
                  />
                ))}
              </FormGroup>
            </Grid> */}

            {/* <Grid item xs={6}>
              <TextField fullWidth label="Parking Spaces" name="parking_spaces" value={formData.parking_spaces} onChange={handleChange} type="number" />
            </Grid>

            <Grid item xs={6}>
              <TextField select fullWidth label="Furnished Status" name="furnished_status" value={formData.furnished_status} onChange={handleChange}>
                <MenuItem value="fully_furnished">Fully Furnished</MenuItem>
                <MenuItem value="semi_furnished">Semi Furnished</MenuItem>
                <MenuItem value="unfurnished">Unfurnished</MenuItem>
              </TextField>
            </Grid> */}

            <Grid item xs={4}>
              <Typography variant="h6">Property Image</Typography>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "property_image")} />
              <Grid item xs={3} >
                {previewImages.property_image && (
                  <img src={previewImages.property_image} alt="Property Preview" style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }} />
                )}
              </Grid>
            </Grid>

            {/* <Grid item xs={4}>
              <Typography variant="h6">Additional Images</Typography>
              <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, "additional_images")} />
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {previewImages.additional_images?.map((src, index) => (
                  <Grid item xs={3} key={index}>
                    <img src={src} alt={`Preview ${index}`} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">Legal Documents</Typography>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "legal_documents")} />
              {previewImages.legal_documents && (
                <Grid item xs={3} >
                  <img src={previewImages.legal_documents} alt="Legal Document Preview" style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }} />
                </Grid>
              )}

            </Grid> */}




          </Grid>
          <Grid sx={{ marginTop: 3, marginBottom: "10px" }}>
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
