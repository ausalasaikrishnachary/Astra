// import React from "react";
// import {
//   Box,
//   Card,
//   CardHeader,
//   CardContent,
//   CardActions,
//   Grid,
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Divider,
//   Typography,
// } from "@mui/material";
// import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

// const PartnerKyc = () => {
//   return (
//     <>
//     <PartnerHeader/>
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//         height: "100vh",
//         // backgroundColor: "#f8f9fa",
//         // paddingTop: "10x",
//       }}
//     >
//       <Card
//         sx={{
//           width: 800,
//           padding: "20px",
//           borderRadius: "12px",
//           boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
//           marginTop: "10px",
//         }}
//       >
//         {/* Header */}
//         <CardHeader
//           title="Investor Registration"
//           sx={{
//             backgroundColor: "rgb(30, 10, 80)",
//             color: "white",
//             textAlign: "center",
//             padding: "15px",
//             fontSize: "20px",
//             borderTopLeftRadius: "12px",
//             borderTopRightRadius: "12px",
//           }}
//         />

//         {/* Form Content */}
//         <CardContent>
//           {/* Basic Information */}
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "bold",
//               color: "rgb(30, 10, 80)",
//               marginTop: "15px",
//             }}
//           >
//             Basic Information
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Full Name"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Email"
//                 variant="outlined"
//                 size="small"
//                 type="email"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Mobile Number"
//                 variant="outlined"
//                 size="small"
//                 type="tel"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Date of Birth"
//                 variant="outlined"
//                 size="small"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Gender"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

//           {/* Address Details */}
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "bold",
//               color: "rgb(30, 10, 80)",
//               marginTop: "15px",
//             }}
//           >
//             Address Details
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 placeholder="Address"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 fullWidth
//                 placeholder="Country"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 fullWidth
//                 placeholder="State"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 fullWidth
//                 placeholder="City"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 fullWidth
//                 placeholder="ZIP Code"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

//           {/* Banking Details */}
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "bold",
//               color: "rgb(30, 10, 80)",
//               marginTop: "15px",
//             }}
//           >
//             Banking Details
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="PAN Number"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Aadhar Number"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Bank Name"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Account Number"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="IFSC Code"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Bank Branch"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

//           {/* Investment Details */}
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "bold",
//               color: "rgb(30, 10, 80)",
//               marginTop: "15px",
//             }}
//           >
//             Investment Details
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Investment Type"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Risk Profile"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Expected Investment Amount"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

//           {/* Nominee Details */}
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "bold",
//               color: "rgb(30, 10, 80)",
//               marginTop: "15px",
//             }}
//           >
//             Nominee Details
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Nominee Name"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Nominee Relationship"
//                 variant="outlined"
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 placeholder="Nominee Date of Birth"
//                 variant="outlined"
//                 size="small"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

//           {/* KYC Verification */}
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "bold",
//               color: "rgb(30, 10, 80)",
//               marginTop: "15px",
//             }}
//           >
//             KYC Verification
//           </Typography>
//           <Grid container spacing={2} alignItems="center">
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               sx={{ display: "flex", alignItems: "center" }}
//             >
//               <Button
//                 variant="outlined"
//                 component="label"
//                 sx={{ flex: 1, marginRight: "10px" }}
//               >
//                 Upload File
//                 <input type="file" hidden />
//               </Button>
//               <Button
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "green",
//                   "&:hover": { backgroundColor: "darkred" },
//                 }}
//               >
//                 KYC
//               </Button>
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

//           {/* Terms & Conditions */}
//           <Grid
//             container
//             justifyContent="center"
//             alignItems="center"
//             sx={{ marginTop: "10px", whiteSpace: "nowrap" }}
//           >
//             <Grid item>
//               <FormControlLabel
//                 control={<Checkbox />}
//                 label={
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontWeight: "bold",
//                       color: "rgb(30, 10, 80)",
//                     }}
//                   >
//                     I agree to the Terms & Conditions
//                   </Typography>
//                 }
//               />
//             </Grid>
//           </Grid>
//         </CardContent>

//         {/* Footer with Submit Button */}
//         <CardActions sx={{ justifyContent: "center" }}>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "rgb(20, 5, 60)",
//               "&:hover": { backgroundColor: "rgb(15, 4, 50)" },
//             }}
//           >
//             Submit
//           </Button>
//         </CardActions>
//       </Card>
//     </Box>
//     </>
//   );
// };

// export default PartnerKyc;


import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
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
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../Shared/Navbar/Navbar";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

const PartnerKyc = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
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
    role: "",
    status: "",
    pan_number: "",
    aadhaar_number: "",
    kyc_status: "",
    account_holder_name: "",
    bank_name: "",
    branch_name: "",
    account_number: "",
    ifsc_code: "",
    nominee_name: "",
    nominee_relationship: "",
    nominee_phone: "",
    nominee_email: "",
    image: "",
  });

  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://175.29.21.7:83/roles/");
        const data = await response.json();
        if (response.ok) {
          setRoles(data);
        } else {
          console.error("Failed to fetch roles:", data);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file, // Store file object
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Split full name into first and last names
    const [first_name, ...lastNameParts] = formData.full_name.trim().split(" ");
    const last_name = lastNameParts.join(" ") || "";

    // Create FormData object for multipart form submission
    const formDataToSend = new FormData();
    formDataToSend.append("roles", formData.role);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("first_name", first_name);
    formDataToSend.append("last_name", last_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("dob", formData.date_of_birth);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("postal_code", formData.postal_code);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("pan_number", formData.pan_number);
    formDataToSend.append("aadhaar_number", formData.aadhaar_number);
    formDataToSend.append("kyc_status", "pending");
    formDataToSend.append("account_holder_name", `${first_name} ${last_name}`);
    formDataToSend.append("bank_name", formData.bank_name);
    formDataToSend.append("branch_name", formData.branch_name);
    formDataToSend.append("account_number", formData.account_number);
    formDataToSend.append("ifsc_code", formData.ifsc_code);
    formDataToSend.append("nominee_name", formData.nominee_name);
    formDataToSend.append("nominee_relationship", formData.nominee_relationship);
    formDataToSend.append("nominee_dob", formData.nominee_dob);
    formDataToSend.append("investment_type", formData.investment_type);
    formDataToSend.append("risk_profile", formData.risk_profile);
    formDataToSend.append("expected_investment_amount", formData.expected_investment_amount);
    formDataToSend.append("added_by", "admin");
    console.log("roleid :", formData.role)
    // Append the image file only if it's selected
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("http://175.29.21.7:83/users/", {
        method: "POST",
        body: formDataToSend, // Send FormData
      });

      const result = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        // Reset form state
        setFormData({
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
          role: "",
          status: "",
          pan_number: "",
          aadhaar_number: "",
          bank_name: "",
          branch_name: "",
          account_number: "",
          ifsc_code: "",
          nominee_name: "",
          nominee_relationship: "",
          nominee_dob: "",
          investment_type: "",
          risk_profile: "",
          expected_investment_amount: "",
          image: null, // Reset image field
        });
      } else {
        console.error("Registration failed:", result);
        alert(`Error: ${result.image ? result.image[0] : "Registration failed."}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };



  const handleAddRole = async () => {
    if (!newRole) {
      alert("Please enter a role before submitting.");
      return;
    }

    try {
      const response = await fetch("http://175.29.21.7:83/roles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role_name: newRole }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Role added successfully!");
        setRoles([...roles, { role_name: newRole }]);
        setNewRole("");
        setOpen(false);
      } else {
        console.error("Failed to add role:", result);
        alert(`Error: ${result.message || "Failed to add role."}`);
      }
    } catch (error) {
      console.error("Error adding role:", error);
      alert("Error occurred while adding role.");
    }
  };

  return (
    <>
      <PartnerHeader />
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
            width: "80%",
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
                  name="first_name"
                  placeholder="First Name"
                  variant="outlined"
                  size="small"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="last_name"
                  placeholder="Last Name"
                  variant="outlined"
                  size="small"
                  value={formData.last_name}
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
              <Grid item xs={12} sm={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="user-type-label"
                      name="role"
                      value={formData.role || ""} // Ensuring value is correctly set
                      onChange={(e) => {
                        const selectedRoleId = e.target.value;
                        console.log("Selected Role ID:", selectedRoleId); // Debugging
                        setFormData((prevData) => ({
                          ...prevData,
                          role: [selectedRoleId], // Correctly storing role_id
                        }));
                      }}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select User Type
                      </MenuItem>
                      {roles.map((role) => (
                        <MenuItem key={role.role_id} value={role.role_id}>
                          {role.role_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>



                  <IconButton color="primary" onClick={() => setOpen(true)}>
                    <AddIcon />
                  </IconButton>

                  <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Add New Role</DialogTitle>
                    <DialogContent>
                      <TextField
                        fullWidth
                        size="small"
                        label="Enter Role"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleAddRole}>
                        Add Role
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="status"
                  placeholder="Status"
                  variant="outlined"
                  size="small"
                  type="text"
                  value={formData.status}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="added_by"
                  placeholder="Added_by"
                  variant="outlined"
                  size="small"
                  value={formData.added_by}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="profile-image-upload"
                />
                <label htmlFor="profile-image-upload">
                  <Button variant="outlined" component="span" color="primary">
                    Upload Image
                  </Button>
                </label>
                {formData.image && (
                  <Typography variant="body2">{formData.image.name}</Typography>
                )}
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

export default PartnerKyc;