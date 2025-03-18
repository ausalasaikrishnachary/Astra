// import React from 'react';
// import {
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   Box,
// } from '@mui/material';
// import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';

// function AssetForm() {
//   return (
//     <>
//     <PartnerHeader/>
//     <Container sx={{ mt: 4 }}>
//       <Card
//         sx={{
//           p: 4,
//           mb: 4,
//           boxShadow: 1,
//           maxWidth: '80%',
//           mx: 'auto',
//           // Allow card height to adjust automatically
//           height: 'auto',
//           overflowY: 'auto',
//         }}
//       >
//         <CardContent>
//           <Typography variant="h4" align="center" gutterBottom>
//             Asset Master Form
//           </Typography>

//           {/* Basic Asset Information */}
//           <Box
//             sx={{
//               border: '1px solid #ddd',
//               p: 2,
//               mb: 4,
//               borderRadius: '5px',
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Basic Asset Information
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={3}>
//                 <TextField label="Asset Name" variant="outlined" fullWidth />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField label="Asset Type" variant="outlined" fullWidth />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField label="Asset Code/ID" variant="outlined" fullWidth />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField label="Description" variant="outlined" fullWidth />
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Purchase Details */}
//           <Box
//             sx={{
//               border: '1px solid #ddd',
//               p: 2,
//               mb: 4,
//               borderRadius: '5px',
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Purchase Details
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Purchase Date"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Purchase Cost"
//                   type="number"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Vendor/Supplier"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Invoice Number"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Depreciation & Valuation */}
//           <Box
//             sx={{
//               border: '1px solid #ddd',
//               p: 2,
//               mb: 4,
//               borderRadius: '5px',
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Depreciation &amp; Valuation
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Depreciation Method"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Depreciation Rate (%)"
//                   type="number"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Useful Life (Years)"
//                   type="number"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Current Value"
//                   type="number"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Location & Assignment */}
//           <Box
//             sx={{
//               border: '1px solid #ddd',
//               p: 2,
//               mb: 4,
//               borderRadius: '5px',
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Location &amp; Assignment
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={3}>
//                 <TextField label="Location" variant="outlined" fullWidth />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField label="Department" variant="outlined" fullWidth />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField label="Assigned To" variant="outlined" fullWidth />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Documents"
//                   type="file"
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Maintenance & Condition */}
//           <Box
//             sx={{
//               border: '1px solid #ddd',
//               p: 2,
//               mb: 4,
//               borderRadius: '5px',
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Maintenance &amp; Condition
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Last Maintenance Date"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Next Maintenance Due"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField label="Condition" variant="outlined" fullWidth />
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Disposal Details */}
//           <Box
//             sx={{
//               border: '1px solid #ddd',
//               p: 2,
//               mb: 4,
//               borderRadius: '5px',
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Disposal Details
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Disposal Date"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Disposal Method"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Disposal Value"
//                   type="number"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Action Buttons */}
//           <Box sx={{ textAlign: 'center', mt: 2 }}>
//             <Button variant="outlined" sx={{ mr: 2 }}>
//               Cancel
//             </Button>
//             <Button variant="contained">Submit</Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//     </>
//   );
// }

// export default AssetForm;


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
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

const AssetForm = () => {
  const [formData, setFormData] = useState({
    property_name: "",
    property_type: "residential",
    description: "",
    location: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    latitude: "",
    longitude: "",
    total_units: "",
    available_units: "",
    area_sqft: "",
    price_per_sqft: "",
    total_price: "",
    ownership_type: "freehold",
    rental_yield: "",
    expected_roi: "",
    legal_status: "approved",
    regulatory_approvals: "",
    tax_identification_number: "",
    amenities: [],
    parking_spaces: "",
    security_features: [],
    furnished_status: "fully_furnished",
    listing_status: "available",
    investors: [1],
    agent: 1,
    property_img: "",
    additional_images: "",
    legal_documents: "",
  });

  const amenitiesOptions = ["Swimming Pool", "Gym", "Clubhouse"];
  const securityOptions = ["CCTV Surveillance", "24/7 Security", "Gated Community"];
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
    if (fieldName === "property_img" || fieldName === "legal_documents") {
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
        if (key === "property_img" || key === "legal_documents") {
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
      } else {
        alert(`Error adding property: ${responseData.property_img?.[0] || responseData.legal_documents?.[0] || responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };





  return (
    // <>
    //   < PartnerHeader />
    //   <Container maxWidth="md">
    //     <Typography
    //       variant="h4"
    //       sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, pt:4, pl: 2, textAlign: "center" }}
    //     >
    //       Add Asset
    //     </Typography>
    //     <form onSubmit={handleSubmit} style={{ width: "86vw", marginLeft: "-20%", paddingTop: "15px" }}>
    //       <Grid container spacing={2} sx={{ width: "90%", margin: 0 }}>
    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Property Name" name="property_name" value={formData.property_name} onChange={handleChange} />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField select fullWidth label="Property Type" name="property_type" value={formData.property_type} onChange={handleChange}>
    //             <MenuItem value="residential">Residential</MenuItem>
    //             <MenuItem value="commercial">Commercial</MenuItem>
    //           </TextField>
    //         </Grid>

    //         <Grid item xs={12}>
    //           <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Postal Code" name="postal_code" value={formData.postal_code} onChange={handleChange} />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} type="number" />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} type="number" />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Total Units" name="total_units" value={formData.total_units} onChange={handleChange} type="number" />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Available Units" name="available_units" value={formData.available_units} onChange={handleChange} type="number" />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Area (sqft)" name="area_sqft" value={formData.area_sqft} onChange={handleChange} type="number" />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Price per sqft" name="price_per_sqft" value={formData.price_per_sqft} onChange={handleChange} type="number" />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Total Price" name="total_price" value={formData.total_price} onChange={handleChange} type="number" />
    //         </Grid>

    //         <Grid item xs={12}>
    //           <Typography variant="h6">Amenities</Typography>
    //           <FormGroup row>
    //             {amenitiesOptions.map((amenity) => (
    //               <FormControlLabel
    //                 key={amenity}
    //                 control={
    //                   <Checkbox
    //                     value={amenity}
    //                     onChange={(e) => handleCheckboxChange(e, "amenities")}
    //                   />
    //                 }
    //                 label={amenity}
    //               />
    //             ))}
    //           </FormGroup>
    //         </Grid>

    //         <Grid item xs={12}>
    //           <Typography variant="h6">Security Features</Typography>
    //           <FormGroup row>
    //             {securityOptions.map((feature) => (
    //               <FormControlLabel
    //                 key={feature}
    //                 control={
    //                   <Checkbox
    //                     value={feature}
    //                     onChange={(e) => handleCheckboxChange(e, "security_features")}
    //                   />
    //                 }
    //                 label={feature}
    //               />
    //             ))}
    //           </FormGroup>
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField fullWidth label="Parking Spaces" name="parking_spaces" value={formData.parking_spaces} onChange={handleChange} type="number" />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField select fullWidth label="Furnished Status" name="furnished_status" value={formData.furnished_status} onChange={handleChange}>
    //             <MenuItem value="fully_furnished">Fully Furnished</MenuItem>
    //             <MenuItem value="semi_furnished">Semi Furnished</MenuItem>
    //             <MenuItem value="unfurnished">Unfurnished</MenuItem>
    //           </TextField>
    //         </Grid>

    //         <Grid item xs={4}>
    //           <Typography variant="h6">Property Image</Typography>
    //           <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "property_img")} />
    //           <Grid item xs={3} >
    //             {previewImages.property_img && (
    //               <img src={previewImages.property_img} alt="Property Preview" style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }} />
    //             )}
    //           </Grid>
    //         </Grid>

    //         <Grid item xs={4}>
    //           <Typography variant="h6">Additional Images</Typography>
    //           <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, "additional_images")} />
    //           <Grid container spacing={2} sx={{ marginTop: 2 }}>
    //             {previewImages.additional_images?.map((src, index) => (
    //               <Grid item xs={3} key={index}>
    //                 <img src={src} alt={`Preview ${index}`} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
    //               </Grid>
    //             ))}
    //           </Grid>
    //         </Grid>

    //         <Grid item xs={4}>
    //           <Typography variant="h6">Legal Documents</Typography>
    //           <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "legal_documents")} />
    //           {previewImages.legal_documents && (
    //             <Grid item xs={3} >
    //               <img src={previewImages.legal_documents} alt="Legal Document Preview" style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }} />
    //             </Grid>
    //           )}

    //         </Grid>



    //         <Grid item xs={3} style={{ marginBottom: "10px", textAlign: "center" }}>
    //           <Button  type="submit" variant="contained" color="primary" fullWidth>
    //             Submit Property
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </Container>
    // </>


    <>
  <PartnerHeader />
  <Container maxWidth="lg">
    <Typography
      variant="h4"
      sx={{
        color: '#100f0f',
        fontSize: { xs: '22px', sm: '26px', md: '28px' },
        fontWeight: 700,
        pt: 4,
        textAlign: "center",
      }}
    >
      Add Asset
    </Typography>

    <form onSubmit={handleSubmit} style={{ padding: "15px", display: "flex", justifyContent: "center" }}>
      <Grid container spacing={2} sx={{ maxWidth: "1200px" }}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Property Name" name="property_name" value={formData.property_name} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField select fullWidth label="Property Type" name="property_type" value={formData.property_type} onChange={handleChange}>
            <MenuItem value="residential">Residential</MenuItem>
            <MenuItem value="commercial">Commercial</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Postal Code" name="postal_code" value={formData.postal_code} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} type="number" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} type="number" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Total Units" name="total_units" value={formData.total_units} onChange={handleChange} type="number" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Available Units" name="available_units" value={formData.available_units} onChange={handleChange} type="number" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Area (sqft)" name="area_sqft" value={formData.area_sqft} onChange={handleChange} type="number" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Price per sqft" name="price_per_sqft" value={formData.price_per_sqft} onChange={handleChange} type="number" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Total Price" name="total_price" value={formData.total_price} onChange={handleChange} type="number" />
        </Grid>

        <Grid item xs={6}>
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

        <Grid item xs={6}>
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
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Parking Spaces" name="parking_spaces" value={formData.parking_spaces} onChange={handleChange} type="number" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField select fullWidth label="Furnished Status" name="furnished_status" value={formData.furnished_status} onChange={handleChange}>
            <MenuItem value="fully_furnished">Fully Furnished</MenuItem>
            <MenuItem value="semi_furnished">Semi Furnished</MenuItem>
            <MenuItem value="unfurnished">Unfurnished</MenuItem>
          </TextField>
        </Grid>

        {/* Image Upload Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Property Image</Typography>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "property_img")} />
          {previewImages.property_img && (
            <img src={previewImages.property_img} alt="Property Preview" style={{ width: "100%", maxHeight: "120px", objectFit: "cover", borderRadius: "8px" }} />
          )}
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Additional Images</Typography>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, "additional_images")} />
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {previewImages.additional_images?.map((src, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <img src={src} alt={`Preview ${index}`} style={{ width: "100%", maxHeight: "120px", objectFit: "cover", borderRadius: "8px" }} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Legal Documents</Typography>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "legal_documents")} />
          {previewImages.legal_documents && (
            <img src={previewImages.legal_documents} alt="Legal Document Preview" style={{ width: "100%", maxHeight: "120px", objectFit: "cover", borderRadius: "8px" }} />
          )}
        </Grid>

        <Grid item xs={12} style={{ textAlign: "left" }}>
          <Button type="submit" variant="contained" color="primary" >
            Submit Property
          </Button>
        </Grid>
      </Grid>
    </form>
  </Container>
</>

  );
};

export default AssetForm;