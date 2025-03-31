// // import React, { useState, useEffect } from "react";
// // import {
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   IconButton,
// //   Box,
// //   Card,
// //   CardHeader,
// //   CardContent,
// //   CardActions,
// //   Grid,
// //   TextField,
// //   Button,
// //   Checkbox,
// //   FormControlLabel,
// //   Divider,
// //   Typography,
// // } from "@mui/material";
// // import AddIcon from "@mui/icons-material/Add";
// // import SuperAdmin from "../../../Shared/SuperAdmin/SuperAdmin";

// // function AddAdmin() {
// //       const [formData, setFormData] = useState({
// //         username: "",
// //         password: "",
// //         first_name: "",
// //         last_name: "",
// //         email: "",
// //         phone: "",
// //         full_name: "",
// //         date_of_birth: "",
// //         gender: "",
// //         address: "",
// //         city: "",
// //         state: "",
// //         country: "",
// //         postal_code: "",
// //         role: [],
// //         status: "",
// //         pan_number: "",
// //         aadhaar_number: "",
// //         kyc_status: "",
// //         account_holder_name: "",
// //         bank_name: "",
// //         branch_name: "",
// //         account_number: "",
// //         ifsc_code: "",
// //         nominee_name: "",
// //         nominee_relationship: "",
// //         nominee_phone: "",
// //         nominee_email: "",
// //         image: "",
// //       });
    
// //       const [roles, setRoles] = useState([]);
// //       const [open, setOpen] = useState(false);
// //       const [newRole, setNewRole] = useState("");
    
// //       useEffect(() => {
// //         const fetchRoles = async () => {
// //           try {
// //             const response = await fetch("http://175.29.21.7:83/roles/");
// //             const data = await response.json();
// //             if (response.ok) {
// //               setRoles(data);
// //             } else {
// //               console.error("Failed to fetch roles:", data);
// //             }
// //           } catch (error) {
// //             console.error("Error fetching roles:", error);
// //           }
// //         };
    
// //         fetchRoles();
// //       }, []);
    
// //       const handleChange = (event) => {
// //         setFormData({
// //           ...formData,
// //           [event.target.name]: event.target.value,
// //         });
// //       };
    
// //       const handleRoleChange = (event) => {
// //         const selectedValues = event.target.value;
// //         const numericValues = selectedValues.map((value) => Number(value)); // Convert strings to numbers
    
// //         console.log("Selected Role IDs (converted):", numericValues);
// //         console.log("Type of numericValues:", Array.isArray(numericValues) ? "Array" : typeof numericValues);
    
// //         // Log typeof each element in the array
// //         numericValues.forEach((value, index) => {
// //             console.log(`Type of numericValues[${index}]:`, typeof value);
// //         });
    
// //         setFormData((prevData) => ({
// //           ...prevData,
// //           role: numericValues, // Ensure it's an array of numbers
// //         }));
// //     };
    
    
    
// //       const handleFileChange = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //           setFormData((prev) => ({
// //             ...prev,
// //             image: file, // Store file object
// //           }));
// //         }
// //       };
    
// //       const handleSubmit = async (event) => {
// //         event.preventDefault();
    
// //         // Split full name into first and last names
// //         const [first_name, ...lastNameParts] = formData.full_name.trim().split(" ");
// //         const last_name = lastNameParts.join(" ") || "";
    
// //         // Create FormData object for multipart form submission
// //         const formDataToSend = new FormData();
// //         formData.role.forEach((role_id) => {
// //           formDataToSend.append("role_ids", role_id);
// //         });
// //         // formDataToSend.append("role_ids", formData.role);
// //         console.log("role_ids", formData.role)
// //         formDataToSend.append("username", formData.username);
// //         formDataToSend.append("password", formData.password);
// //         formDataToSend.append("first_name", formData.first_name);
// //         formDataToSend.append("last_name", formData.last_name);
// //         formDataToSend.append("email", formData.email);
// //         formDataToSend.append("phone_number", formData.phone);
// //         formDataToSend.append("dob", formData.date_of_birth);
// //         formDataToSend.append("gender", formData.gender);
// //         formDataToSend.append("address", formData.address);
// //         formDataToSend.append("city", formData.city);
// //         formDataToSend.append("state", formData.state);
// //         formDataToSend.append("country", formData.country);
// //         formDataToSend.append("postal_code", formData.postal_code);
// //         formDataToSend.append("status", formData.status);
// //         formDataToSend.append("pan_number", formData.pan_number);
// //         formDataToSend.append("aadhaar_number", formData.aadhaar_number);
// //         formDataToSend.append("kyc_status", "pending");
// //         formDataToSend.append("account_holder_name", `${first_name} ${last_name}`);
// //         formDataToSend.append("bank_name", formData.bank_name);
// //         formDataToSend.append("branch_name", formData.branch_name);
// //         formDataToSend.append("account_number", formData.account_number);
// //         formDataToSend.append("ifsc_code", formData.ifsc_code);
// //         formDataToSend.append("nominee_name", formData.nominee_name);
// //         formDataToSend.append("nominee_relationship", formData.nominee_relationship);
// //         formDataToSend.append("nominee_dob", formData.nominee_dob);
// //         formDataToSend.append("investment_type", formData.investment_type);
// //         formDataToSend.append("risk_profile", formData.risk_profile);
// //         formDataToSend.append("expected_investment_amount", formData.expected_investment_amount);
// //         formDataToSend.append("added_by", "admin");
// //         console.log("roleid :", formData.role)
// //         // Append the image file only if it's selected
// //         if (formData.image) {
// //           formDataToSend.append("image", formData.image);
// //         }
    
// //         try {
// //           const response = await fetch("http://175.29.21.7:83/users/", {
// //             method: "POST",
// //             body: formDataToSend, // Send FormData
// //           });
    
// //           const result = await response.json();
    
// //           if (response.ok) {
// //             alert("User registered successfully!");
// //             // Reset form state
// //             setFormData({
// //               username: "",
// //               password: "",
// //               email: "",
// //               phone: "",
// //               full_name: "",
// //               date_of_birth: "",
// //               gender: "",
// //               address: "",
// //               city: "",
// //               state: "",
// //               country: "",
// //               postal_code: "",
// //               role: [], // Change from "" to []
// //               status: "",
// //               pan_number: "",
// //               aadhaar_number: "",
// //               bank_name: "",
// //               branch_name: "",
// //               account_number: "",
// //               ifsc_code: "",
// //               nominee_name: "",
// //               nominee_relationship: "",
// //               nominee_dob: "",
// //               investment_type: "",
// //               risk_profile: "",
// //               expected_investment_amount: "",
// //               image: null, // Reset image field
// //             });        
// //           } else {
// //             console.error("Registration failed:", result);
// //             alert(`Error: ${result.image ? result.image[0] : "Registration failed."}`);
// //           }
// //         } catch (error) {
// //           console.error("Error submitting form:", error);
// //           alert("An error occurred while submitting the form.");
// //         }
// //       };
    
    
    
// //       const handleAddRole = async () => {
// //         if (!newRole) {
// //           alert("Please enter a role before submitting.");
// //           return;
// //         }
    
// //         try {
// //           const response = await fetch("http://175.29.21.7:83/roles/", {
// //             method: "POST",
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ role_name: newRole }),
// //           });
    
// //           const result = await response.json();
    
// //           if (response.ok) {
// //             alert("Role added successfully!");
// //             setRoles([...roles, { role_name: newRole }]);
// //             setNewRole("");
// //             setOpen(false);
// //           } else {
// //             console.error("Failed to add role:", result);
// //             alert(`Error: ${result.message || "Failed to add role."}`);
// //           }
// //         } catch (error) {
// //           console.error("Error adding role:", error);
// //           alert("Error occurred while adding role.");
// //         }
// //       };
// //     return (
// //         <>
// //             <SuperAdmin />
// //             <Box
// //                 component="form"
// //                 onSubmit={handleSubmit}
// //                 sx={{
// //                     display: "flex",
// //                     justifyContent: "center",
// //                     alignItems: "flex-start",
// //                     height: "100vh",
// //                 }}
// //             >
// //                 <Card
// //                     sx={{
// //                         width: "80%",
// //                         padding: "20px",
// //                         borderRadius: "12px",
// //                         boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
// //                         marginTop: "10px",

// //                     }}
// //                 >
// //                     <CardHeader
// //                         title="Registration"
// //                         sx={{
// //                             backgroundColor: "rgb(30, 10, 80)",
// //                             color: "white",
// //                             textAlign: "center",
// //                             padding: "15px",
// //                             fontSize: "20px",
// //                             borderTopLeftRadius: "12px",
// //                             borderTopRightRadius: "12px",
// //                         }}
// //                     />

// //                     <CardContent>
// //                         {/* Basic Information */}
// //                         <Typography
// //                             variant="h6"
// //                             sx={{
// //                                 fontWeight: "bold",
// //                                 color: "rgb(30, 10, 80)",
// //                                 marginTop: "15px",
// //                             }}
// //                         >
// //                             Basic Information
// //                         </Typography>
// //                         <Grid container spacing={2}>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="full_name"
// //                                     placeholder="Full Name"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.full_name}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="first_name"
// //                                     placeholder="First Name"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.first_name}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="last_name"
// //                                     placeholder="Last Name"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.last_name}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="email"
// //                                     placeholder="Email"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     type="email"
// //                                     value={formData.email}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="phone"
// //                                     placeholder="Mobile Number"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     type="tel"
// //                                     value={formData.phone}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="date_of_birth"
// //                                     placeholder="Date of Birth"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     type="date"
// //                                     InputLabelProps={{ shrink: true }}
// //                                     value={formData.date_of_birth}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="gender"
// //                                     placeholder="Gender"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.gender}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="username"
// //                                     placeholder="Username"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.username}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="password"
// //                                     placeholder="Password"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     type="password"
// //                                     value={formData.password}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <Box display="flex" alignItems="center" gap={1}>
// //                                     <FormControl fullWidth size="small">
// //                                         <Select
// //                                             labelId="user-type-label"
// //                                             name="role"
// //                                             multiple
// //                                             value={formData.role}
// //                                             onChange={handleRoleChange} // Use updated handler
// //                                             displayEmpty
// //                                             renderValue={(selected) => {
// //                                                 if (selected.length === 0) {
// //                                                     return <em>Select User Type</em>;
// //                                                 }
// //                                                 return roles
// //                                                     .filter((role) => selected.includes(role.role_id))
// //                                                     .map((role) => role.role_name)
// //                                                     .join(", ");
// //                                             }}
// //                                         >
// //                                             <MenuItem value="" disabled>
// //                                                 Select User Type
// //                                             </MenuItem>
// //                                             {roles.map((role) => (
// //                                                 <MenuItem key={role.role_id} value={role.role_id}>
// //                                                     {role.role_name}
// //                                                 </MenuItem>
// //                                             ))}
// //                                         </Select>
// //                                     </FormControl>

// //                                     <IconButton color="primary" onClick={() => setOpen(true)}>
// //                                         <AddIcon />
// //                                     </IconButton>

// //                                     <Dialog open={open} onClose={() => setOpen(false)}>
// //                                         <DialogTitle>Add New Role</DialogTitle>
// //                                         <DialogContent>
// //                                             <TextField
// //                                                 fullWidth
// //                                                 size="small"
// //                                                 label="Enter Role"
// //                                                 value={newRole}
// //                                                 onChange={(e) => setNewRole(e.target.value)}
// //                                             />
// //                                         </DialogContent>
// //                                         <DialogActions>
// //                                             <Button onClick={() => setOpen(false)} color="secondary">
// //                                                 Cancel
// //                                             </Button>
// //                                             <Button variant="contained" color="primary" onClick={handleAddRole}>
// //                                                 Add Role
// //                                             </Button>
// //                                         </DialogActions>
// //                                     </Dialog>
// //                                 </Box>
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="status"
// //                                     placeholder="Status"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     type="text"
// //                                     value={formData.status}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="added_by"
// //                                     placeholder="Added_by"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.added_by}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={4}>
// //                                 <input
// //                                     accept="image/*"
// //                                     type="file"
// //                                     onChange={handleFileChange}
// //                                     style={{ display: "none" }}
// //                                     id="profile-image-upload"
// //                                 />
// //                                 <label htmlFor="profile-image-upload">
// //                                     <Button variant="outlined" component="span" color="primary">
// //                                         Upload Image
// //                                     </Button>
// //                                 </label>
// //                                 {formData.image && (
// //                                     <Typography variant="body2">{formData.image.name}</Typography>
// //                                 )}
// //                             </Grid>
// //                         </Grid>
// //                         <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

// //                         {/* Address Details */}
// //                         <Typography
// //                             variant="h6"
// //                             sx={{
// //                                 fontWeight: "bold",
// //                                 color: "rgb(30, 10, 80)",
// //                                 marginTop: "15px",
// //                             }}
// //                         >
// //                             Address Details
// //                         </Typography>
// //                         <Grid container spacing={2}>
// //                             <Grid item xs={12} sm={6}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="address"
// //                                     placeholder="Address"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.address}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={3}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="country"
// //                                     placeholder="Country"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.country}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={3}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="state"
// //                                     placeholder="State"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.state}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={3}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="city"
// //                                     placeholder="City"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.city}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={3}>
// //                                 <TextField
// //                                     fullWidth
// //                                     name="postal_code"
// //                                     placeholder="ZIP Code"
// //                                     variant="outlined"
// //                                     size="small"
// //                                     value={formData.postal_code}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Grid>
// //                         </Grid>

                        
// //                     </CardContent>

// //                     <CardActions sx={{ justifyContent: "center" }}>
// //                         <Button
// //                             type="submit"
// //                             variant="contained"
// //                             sx={{
// //                                 backgroundColor: "rgb(20, 5, 60)",
// //                                 "&:hover": { backgroundColor: "rgb(15, 4, 50)" },
// //                             }}
// //                         >
// //                             Submit
// //                         </Button>
// //                     </CardActions>
// //                 </Card>
// //             </Box>
// //         </>
// //     )
// // }

// // export default AddAdmin


// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Grid,
//   Paper,
//   Typography,
//   IconButton,
//   Box,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import SuperAdmin from "../../../Shared/SuperAdmin/SuperAdmin";

// const AddAdmin = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     first_name: "",
//     last_name: "",
//     role_ids: [],
//     email: "",
//     phone_number: "",
//     date_of_birth: "",
//     gender: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pin_code: "",
//     status: "",
//     pan_number: "",
//     aadhaar_number: "",
//     kyc_status: "",
//     account_holder_name: "",
//     bank_name: "",
//     branch_name: "",
//     account_number: "",
//     account_type: "",
//     ifsc_code: "",
//     nominee_reference_to: "",
//     referral_id: "",
//   });

//   const [roles, setRoles] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [pancard, setPancard] = useState(null);
//   const [aadhar, setAadhar] = useState(null);
//   const [image, setImage] = useState(null);
//   const [pancardName, setPancardName] = useState("");
//   const [aadharName, setAadharName] = useState("");
//   const [imageName, setImageName] = useState("");

//   useEffect(() => {
//     fetch("http://175.29.21.7:83/roles/")
//       .then((res) => res.json())
//       .then((data) => setRoles(data))
//       .catch((err) => console.error("Error fetching roles:", err));

//     fetch("http://175.29.21.7:83/users/")
//       .then((res) => res.json())
//       .then((data) => setUsers(data))
//       .catch((err) => console.error("Error fetching users:", err));
//   }, []);

//   const handleChange = (e) => {
//     if (e.target.name === "role_ids") {
//       setFormData({ ...formData, role_ids: [Number(e.target.value)] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleFileChange = (event, setFile, setFileName) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     setFile(file);
//     setFileName(file.name);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // if (!pancard || !aadhar || !image) {
//     //   alert("Please upload Pancard, Aadhar, and an Image.");
//     //   return;
//     // }

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });
//      // Append files ONLY if they are selected
//   if (pancard) formDataToSend.append("pan", pancard);
//   if (aadhar) formDataToSend.append("aadhaar", aadhar);
//   if (image) formDataToSend.append("image", image);

//     try {
//       const response = await fetch("http://175.29.21.7:83/users/", {
//         method: "POST",
//         body: formDataToSend,
//       });
//       const responseData = await response.json();
//       if (response.ok) {
//         alert("User registered successfully!");
//         setUsers([...users, responseData]);
//       } else {
//         console.error("Server Error:", responseData);
//         alert(`Failed to register user: ${JSON.stringify(responseData)}`);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An error occurred while submitting the form.");
//     }
//   };

//   return (
//     <>
//     <SuperAdmin />
//     <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
//     <Box style={{ padding: 20, maxWidth: 1200, margin: "auto", marginTop: 20, marginBottom: 50 }}>

//         <Typography variant="h4" component="h2"  gutterBottom align="center" marginBottom={5}>
//           User Registration
//         </Typography>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <Grid container spacing={2}>
//             {Object.keys(formData).map(
//               (key) =>
//                 key !== "role_ids" && (
//                   <Grid item xs={12} sm={4} key={key}>
//                     <TextField
//                       fullWidth
//                       label={key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
//                       name={key}
//                       value={formData[key]}
//                       onChange={handleChange}
//                       type={key.includes("password") || key.includes("account_number") ? "password" : key.includes("date") ? "date" : "text"}
//                       InputLabelProps={key.includes("date") ? { shrink: true } : {}}
//                     />
//                   </Grid>
//                 )
//             )}

//             <Grid item xs={6} sm={3}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Role"
//                 name="role_ids"
//                 value={formData.role_ids[0] || ""}
//                 onChange={handleChange}
//                 required
//               >
//                 {roles.map((role) => (
//                   <MenuItem key={role.role_id} value={role.role_id}>
//                     {role.role_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={2} sm={1}>
//               <IconButton color="primary">
//                 <AddIcon />
//               </IconButton>
//             </Grid>

//             <Box display="flex" justifyContent="center" alignItems="flex-start" gap={2} marginTop={3} marginBottom={3}>
//               {/* Pancard Upload */}
//               <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
//                 <Button variant="outlined" component="label">
//                   Upload Pancard (PDF Only)
//                   <input type="file" accept=".pdf" hidden onChange={(e) => handleFileChange(e, setPancard, setPancardName)} />
//                 </Button>
//                 {pancardName && <Typography variant="body2" color="textSecondary">{pancardName}</Typography>}
//               </Box>

//               {/* Aadhar Upload */}
//               <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
//                 <Button variant="outlined" component="label">
//                   Upload Aadhar Card (PDF Only)
//                   <input type="file" accept=".pdf" hidden onChange={(e) => handleFileChange(e, setAadhar, setAadharName)} />
//                 </Button>
//                 {aadharName && <Typography variant="body2" color="textSecondary">{aadharName}</Typography>}
//               </Box>

//               {/* Image Upload */}
//               <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
//                 <Button variant="outlined" component="label">
//                   Upload Image
//                   <input type="file" accept="image/*" hidden onChange={(e) => handleFileChange(e, setImage, setImageName)} />
//                 </Button>
//                 {imageName && <Typography variant="body2" color="textSecondary">{imageName}</Typography>}
//               </Box>
//             </Box>



//           </Grid>

//           <Grid container justifyContent="center" style={{ marginTop: 20 }}>
//             <Button type="submit" variant="contained" color="primary" size="small">
//               Submit
//             </Button>
//           </Grid>
//         </form>
//       </Box>
//     </Grid>
//     </>
//   );
// };

// export default AddAdmin;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../Shared/Navbar/Navbar";
import SuperAdmin from "../../../Shared/SuperAdmin/SuperAdmin";

const ApiForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    role_ids: [],
    email: "",
    password: "",
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
  });

  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [pancard, setPancard] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [image, setImage] = useState(null);
  const [pancardName, setPancardName] = useState("");
  const [aadharName, setAadharName] = useState("");
  const [imageName, setImageName] = useState("");
  const [partnerUsers, setPartnerUsers] = useState([]);

  useEffect(() => {
    fetch("http://175.29.21.7:83/roles/")
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error("Error fetching roles:", err));

    fetch("http://175.29.21.7:83/users/")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));

    // Fetch users with role "Partner"
    fetch("http://175.29.21.7:83/users/role/Partner/")
      .then((res) => res.json())
      .then((data) => setPartnerUsers(data))
      .catch((err) => console.error("Error fetching partner users:", err));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "role_ids") {
      setFormData({ ...formData, role_ids: [Number(e.target.value)] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (event, setFile, setFileName) => {
    const file = event.target.files[0];
    if (!file) return;
    setFile(file);
    setFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!pancard || !aadhar || !image) {
    //   alert("Please upload Pancard, Aadhar, and an Image.");
    //   return;
    // }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

     // Append files ONLY if they are selected
  if (pancard) formDataToSend.append("pan", pancard);
  if (aadhar) formDataToSend.append("aadhaar", aadhar);
  if (image) formDataToSend.append("image", image);

    try {
      const response = await fetch("http://175.29.21.7:83/users/", {
        method: "POST",
        body: formDataToSend,
      });
      const responseData = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
        setUsers([...users, responseData]);
      } else {
        console.error("Server Error:", responseData);
        alert(`Failed to register user: ${JSON.stringify(responseData)}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

    // Role Dialog States
    const [openRoleDialog, setOpenRoleDialog] = useState(false);
    const [newRole, setNewRole] = useState("");

    // Handle role addition popup
    const handleOpenRoleDialog = () => setOpenRoleDialog(true);
    const handleCloseRoleDialog = () => {
      setNewRole("");
      setOpenRoleDialog(false);
    };

    // Submit new role
    const handleAddRole = async () => {
      if (!newRole.trim()) {
        alert("Role name cannot be empty");
        return;
      }
  
      try {
        const response = await fetch("http://175.29.21.7:83/roles/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role_name: newRole }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to add role");
        }
  
        const addedRole = await response.json();
        setRoles([...roles, addedRole]); // Update roles list
        handleCloseRoleDialog(); // Close dialog
        alert("Role added successfully!");
      } catch (error) {
        console.error("Error adding role:", error);
        alert("Failed to add role");
      }
    };

  return (
    <>
      <SuperAdmin />
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <Box style={{ padding: 20, maxWidth: 1200, margin: "auto", marginTop: 20, marginBottom: 50 }}>

          <Typography variant="h4" component="h2"  gutterBottom align="center" marginBottom={5}>
            User Registration
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <Grid container spacing={2}>
              {Object.keys(formData).map(
                (key) =>
                  !["referral_id"].includes(key) &&
                  key !== "role_ids" && (
                    <Grid item xs={12} sm={4} key={key}>
                      <TextField
                        fullWidth
                        label={key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        required
                        type={key.includes("password") ? "password" : key.includes("date") ? "date" : "text"}
                        InputLabelProps={key.includes("date") ? { shrink: true } : {}}
                      />
                    </Grid>
                  )
              )}




              <Grid item xs={10} sm={3}>
                <TextField
                  select
                  fullWidth
                  label="Role"
                  name="role_ids"
                  value={formData.role_ids[0] || ""}
                  onChange={handleChange}
                  required
                >
                  {roles.map((role) => (
                    <MenuItem key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

             {/* Add Role Button */}
             <Grid item xs={2} sm={1}>
                <IconButton color="primary" onClick={handleOpenRoleDialog}>
                  <AddIcon />
                </IconButton>
              </Grid>

              {/* Role Dialog Popup */}
              <Dialog open={openRoleDialog} onClose={handleCloseRoleDialog}>
                <DialogTitle>Add New Role</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Role Name"
                    type="text"
                    fullWidth
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseRoleDialog} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={handleAddRole} color="primary">
                    Add Role
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Referral ID Dropdown */}
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="Referral ID"
                  name="referral_id"
                  value={formData.referral_id}
                  onChange={handleChange}
                >
                  {partnerUsers.length > 0 ? (
                    partnerUsers.map((user) => (
                      <MenuItem key={user.user_id} value={user.user_id}>
                        {user.user_id} - {user.first_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Partners Available</MenuItem>
                  )}
                </TextField>
              </Grid>

              <Box display="flex" justifyContent="center" alignItems="flex-start" gap={2} marginTop={3} marginBottom={3}>
                {/* Pancard Upload */}
                <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                  <Button variant="outlined" component="label">
                    Upload Pancard (PDF Only)
                    <input type="file" accept=".pdf" hidden onChange={(e) => handleFileChange(e, setPancard, setPancardName)} />
                  </Button>
                  {pancardName && <Typography variant="body2" color="textSecondary">{pancardName}</Typography>}
                </Box>

                {/* Aadhar Upload */}
                <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                  <Button variant="outlined" component="label">
                    Upload Aadhar Card (PDF Only)
                    <input type="file" accept=".pdf" hidden onChange={(e) => handleFileChange(e, setAadhar, setAadharName)} />
                  </Button>
                  {aadharName && <Typography variant="body2" color="textSecondary">{aadharName}</Typography>}
                </Box>

                {/* Image Upload */}
                <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                  <Button variant="outlined" component="label">
                    Upload Image
                    <input type="file" accept="image/*" hidden onChange={(e) => handleFileChange(e, setImage, setImageName)} />
                  </Button>
                  {imageName && <Typography variant="body2" color="textSecondary">{imageName}</Typography>}
                </Box>
              </Box>
            </Grid>
            <Grid container justifyContent="center" style={{ marginTop: 20 }}>
              <Button type="submit" variant="contained" color="primary" size="small">
                Submit
              </Button>
            </Grid>
          </form>
        </Box>
      </Grid>
    </>
  );
};

export default ApiForm;
