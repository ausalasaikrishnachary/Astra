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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../Shared/Navbar/Navbar";

const ApiForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    role_ids: [],
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
  });

  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [pancard, setPancard] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [image, setImage] = useState(null);
  const [pancardName, setPancardName] = useState("");
  const [aadharName, setAadharName] = useState("");
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    fetch("http://175.29.21.7:83/roles/")
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error("Error fetching roles:", err));

    fetch("http://175.29.21.7:83/users/")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
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
    if (!pancard || !aadhar || !image) {
      alert("Please upload Pancard, Aadhar, and an Image.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append("pan", pancard);
    formDataToSend.append("aadhaar", aadhar);
    formDataToSend.append("image", image);

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

  return (
    <>
    <Header />
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
    <Box style={{ padding: 20, maxWidth: 1200, margin: "auto", marginTop: 20, marginBottom: 50 }}>

        <Typography variant="h5" gutterBottom align="center" marginBottom={5}>
          User Registration
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            {Object.keys(formData).map(
              (key) =>
                key !== "role_ids" && (
                  <Grid item xs={12} sm={4} key={key}>
                    <TextField
                      fullWidth
                      label={key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      required
                      type={key.includes("password") || key.includes("account_number") ? "password" : key.includes("date") ? "date" : "text"}
                      InputLabelProps={key.includes("date") ? { shrink: true } : {}}
                    />
                  </Grid>
                )
            )}

            <Grid item xs={6} sm={3}>
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

            <Grid item xs={2} sm={1}>
              <IconButton color="primary">
                <AddIcon />
              </IconButton>
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
