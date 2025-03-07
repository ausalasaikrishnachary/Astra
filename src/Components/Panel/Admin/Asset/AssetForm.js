import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import Header from '../../../Shared/Navbar/Navbar';

function AdminAssetForm() {
  const [formData, setFormData] = useState({
    property_id: '',
    property_name: '',
    property_type: '',
    description: '',
    location: '',
    city: '',
    state: '',
    country: '',
    postal_code: [],
    latitude: '',    // Default Hyderabad coordinates
    longitude: '',
    total_units: '',
    total_price: [],
    available_units: '',
    area_sqft: '',
    price_per_sqft: '',
    ownership_type: [],
    rental_yield: '',
    expected_roi: '',
    legal_status: [],
    regulatory_approvals: '',
    tax_identification_number: '',
    amenities: [],
    parking_spaces: '',
    security_features: [],
    furnished_status: '',
    listing_status: [],
    investors: [],         // Hardcoded for testing
    agent: '',
    property_img: '',
    additional_images: '',
    legal_documents: '',           // Hardcoded for testing
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    // Handle single file uploads
    if (name === 'property_img') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] // Store the first file only
      }));
    }




    // Handle multiple file uploads
    if (name === 'additional_images' || name === 'legal_documents') {
      setFormData(prev => ({
        ...prev,
        [name]: Array.from(files) // Convert FileList to array
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append normal form fields
      Object.keys(formData).forEach((key) => {
        if (key !== 'property_img' && key !== 'additional_images' && key !== 'legal_documents') {
          if (Array.isArray(formData[key])) {
            formDataToSend.append(key, JSON.stringify(formData[key])); // Convert arrays to JSON
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Append files separately
      if (formData.property_img) {
        formDataToSend.append('property_img', formData.property_img);
      }
      if (formData.additional_images.length > 0) {
        formData.additional_images.forEach((file, index) => {
          formDataToSend.append(`additional_images[${index}]`, file);
        });
      }
      if (formData.legal_documents.length > 0) {
        formData.legal_documents.forEach((file, index) => {
          formDataToSend.append(`legal_documents[${index}]`, file);
        });
      }

      // Ensure postal_code is a string and within the limit
      if (Array.isArray(formData.postal_code)) {
        formDataToSend.set("postal_code", formData.postal_code[0].substring(0, 15));
      }

      // Ensure total_price is a number
      if (Array.isArray(formData.total_price)) {
        formDataToSend.set("total_price", Number(formData.total_price[0]) || 0);
      }

      // Ensure investors are valid IDs
      if (Array.isArray(formData.investors)) {
        const validInvestors = formData.investors.map(Number).filter((id) => !isNaN(id));
        formDataToSend.set("investors", JSON.stringify(validInvestors));
      }

      // Ensure agent is a valid ID
      if (Array.isArray(formData.agent)) {
        const validAgent = Number(formData.agent[0]) || null;
        if (validAgent) {
          formDataToSend.set("agent", validAgent);
        }
      }

      const response = await axios.post('http://46.37.122.105:91/property/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Submission successful:', response.data);
      alert('Property registered successfully!');
    } catch (error) {
      console.error('Full error details:', error.response?.data);
      alert(`Submission failed: ${error.response?.data?.detail || error.message}`);
    }
  };


  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Card sx={{ p: 4, mb: 4, boxShadow: 1, maxWidth: '80%', mx: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Property Registration Form
              </Typography>

              {/* Basic Information Section */}
              <Box sx={{ border: '1px solid #ddd', p: 2, mb: 4, borderRadius: '5px' }}>
                <Typography variant="h6" gutterBottom>Basic Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="property_id"
                      label="Property id"
                      value={formData.property_id}
                      onChange={handleChange}
                      fullWidth

                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="property_name"
                      label="Property Name"
                      value={formData.property_name}
                      onChange={handleChange}
                      fullWidth

                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Property Type</InputLabel>
                      <Select
                        name="property_type"
                        value={formData.property_type}
                        onChange={handleChange}
                        label="Property Type"
                      >
                        <MenuItem value="residential">Residential</MenuItem>
                        <MenuItem value="commercial">Commercial</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      label="Description"
                      value={formData.description}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Location Details Section */}
              <Box sx={{ border: '1px solid #ddd', p: 2, mb: 4, borderRadius: '5px' }}>
                <Typography variant="h6" gutterBottom>Location Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="location"
                      label="Location"
                      value={formData.location}
                      onChange={handleChange}
                      fullWidth

                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="state"
                      label="State"
                      value={formData.state}
                      onChange={handleChange}
                      fullWidth

                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="country"
                      label="Country"
                      value={formData.country}
                      onChange={handleChange}
                      fullWidth

                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="city"
                      label="City"
                      value={formData.city}
                      onChange={handleChange}
                      fullWidth

                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="postal_code"
                      label="Postal Code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      fullWidth

                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="latitude"
                      label="Latitude"
                      type="number"
                      value={formData.latitude}
                      onChange={handleChange}
                      fullWidth

                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="longitude"
                      label="Longitude"
                      type="number"
                      value={formData.longitude}
                      onChange={handleChange}
                      fullWidth

                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Pricing & Units Section */}
              <Box sx={{ border: '1px solid #ddd', p: 2, mb: 4, borderRadius: '5px' }}>
                <Typography variant="h6" gutterBottom>Pricing & Units</Typography>
                <Grid container spacing={2}>
                  {[
                    { name: 'total_units', label: 'Total Units', type: 'number' },
                    { name: 'available_units', label: 'Available Units', type: 'number' },
                    { name: 'area_sqft', label: 'Area (sqft)', type: 'number' },
                    { name: 'price_per_sqft', label: 'Price per sqft', type: 'number' },
                    { name: 'legal_status', label: 'Legal_status', type: 'text' },
                    { name: 'rental_yield', label: 'Rental Yield (%)', type: 'number' },
                    { name: 'expected_roi', label: 'Expected ROI (%)', type: 'number' },
                    { name: 'regulatory_approvals', label: 'Regulatory_approvals', type: 'text' },
                    { name: 'ownership_type', label: 'Ownership_type', type: 'text' },



                  ].map((field) => (
                    <Grid item xs={6} md={4} key={field.name}>
                      <TextField
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Features & Amenities Section */}
              <Box sx={{ border: '1px solid #ddd', p: 2, mb: 4, borderRadius: '5px' }}>
                <Typography variant="h6" gutterBottom>Features & Amenities</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Amenities</Typography>
                    <FormGroup row>
                      {['Swimming Pool', 'Gym', 'Clubhouse'].map((amenity) => (
                        <FormControlLabel
                          key={amenity}
                          control={
                            <Checkbox
                              name="amenities"
                              value={amenity}
                              checked={formData.amenities.includes(amenity)}
                              onChange={handleCheckboxChange}
                            />
                          }
                          label={amenity}
                        />
                      ))}
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Security Features</Typography>
                    <FormGroup row>
                      {['CCTV Surveillance', '24/7 Security'].map((feature) => (
                        <FormControlLabel
                          key={feature}
                          control={
                            <Checkbox
                              name="security_features"
                              value={formData.security_features}
                              checked={formData.security_features.includes(feature)}
                              onChange={handleCheckboxChange}
                            />
                          }
                          label={feature}
                        />
                      ))}
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name="regulatory_approvals"
                      label="Regulatory Approvals (comma-separated)"
                      value={formData.regulatory_approvals}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="parking_spaces"
                      label="Parking Spaces"
                      type="number"
                      value={formData.parking_spaces}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>

                </Grid>
              </Box>

              {/* Legal & Financial Section */}
              <Box sx={{ border: '1px solid #ddd', p: 2, mb: 4, borderRadius: '5px' }}>
                <Typography variant="h6" gutterBottom>Legal & Financial Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <input
                      type="file"
                      name="legal_documents"
                      onChange={handleFileChange}

                    />
                  </Grid>


                </Grid>
              </Box>

              <Box sx={{ border: '1px solid #ddd', p: 2, mb: 4, borderRadius: '5px' }}>
                <Typography variant="h6" gutterBottom>Additional Information</Typography>
                <Grid container spacing={2}>
                  {/* Furnished Status (already exists in your example) */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Furnished Status</InputLabel>
                      <Select
                        name="furnished_status"
                        value={formData.furnished_status}
                        onChange={handleChange}
                        label="Furnished Status"
                      >
                        <MenuItem value="fully_furnished">Fully Furnished</MenuItem>
                        <MenuItem value="semi_furnished">Semi Furnished</MenuItem>
                        <MenuItem value="unfurnished">Unfurnished</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Property Images */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="file"
                      name="property_img"
                      label="Property Image"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ accept: "image/*" }}
                      onChange={handleFileChange}
                      fullWidth
                    />
                  </Grid>

                  {/* Additional Images */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="file"
                      name="additional_images"
                      label="Additional Images"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ accept: "image/*", multiple: true }}
                      onChange={handleFileChange}
                      fullWidth
                    />
                  </Grid>

                  {/* Legal Documents */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="file"
                      name="legal_documents"
                      label="Legal Documents"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ multiple: true }}
                      onChange={handleFileChange}
                      fullWidth
                    />
                  </Grid>

                  {/* Listing Status */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Listing Status</InputLabel>
                      <Select
                        name="listing_status"
                        value={formData.listing_status}
                        onChange={handleChange}
                        label="Listing Status"
                      >
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="published">Published</MenuItem>
                        <MenuItem value="archived">Archived</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Agent */}
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="agent"
                      label="Agent ID"
                      type="number"
                      value={formData.agent}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>

                  {/* Investors */}
                  <Grid item xs={6} md={3}>
                    <TextField
                      name="investors"
                      label="Investor IDs (comma-separated)"
                      value={formData.investors}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'investors',
                          value: e.target.value.split(',').map(Number)
                        }
                      })}
                      fullWidth
                    />
                  </Grid>

                  {/* Read-only Timestamps */}
                  {/* <Grid item xs={6} md={3}>
      <TextField
        name="created_at"
        label="Created At"
        value={formData.created_at}
        fullWidth
      />
    </Grid>
    <Grid item xs={6} md={3}>
      <TextField
        name="updated_at"
        label="Updated At"
        value={formData.updated_at}
        fullWidth
      />
    </Grid> */}
                </Grid>
              </Box>


              {/* Action Buttons */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button variant="outlined" sx={{ mr: 2, width: 120 }}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 120 }}
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default AdminAssetForm;