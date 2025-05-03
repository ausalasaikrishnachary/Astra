import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Card,
  CardContent,
  FormControl,
  Select,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Header from "../../../Shared/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';


// API Endpoint
const API_URL = "http://175.29.21.7:83/users/role/Investor/";

// Summary Cards Data
const summaryCardsData = [
  { title: "Total Investors", key: "total" },
  { title: "Active", key: "active" },
  { title: "Inactive", key: "inactive" },
];

const Tmanagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setUsers(data); // Set user data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Status Color
  const getStatusColor = (status) => (status === "active" ? "green" : "red");

  const handleEdit = (userId) => {
    navigate("/a-editinvestors", { state: { userId } });
    console.log("Edit user with ID:", userId);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://175.29.21.7:83/users/${userId}/`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      // Remove deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));

      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };



  // Filter Users based on Search
  const filteredUsers = users.filter((user) =>
    ["user_id", "username", "email", "phone_number", "status"].some((key) =>
      user[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Count Active & Inactive Users
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const inactiveUsers = totalUsers - activeUsers;

  const KYC_STATUS_OPTIONS = ["Pending", "Under Review", "Verified"];

  const handleKycStatusChange = async (userId, newStatus) => {
    try {
      const response = await fetch(`http://175.29.21.7:83/users/${userId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kyc_status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update KYC status");

      // Update the UI with the new KYC status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === userId ? { ...user, kyc_status: newStatus } : user
        )
      );

      alert("KYC status updated successfully!");
    } catch (error) {
      console.error("Error updating KYC status:", error);
      alert("Failed to update KYC status. Please try again.");
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Header />
      <Container sx={{ maxWidth: "900px", pt: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: "center" }}>
          Investor Management
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={2}>
          {summaryCardsData.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#f8f9fa",
                  textAlign: "center",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>{card.title}</Typography>
                  <Typography variant="h4" sx={{ color: "rgb(30,10,80)" }}>
                    {card.key === "total" ? totalUsers : card.key === "active" ? activeUsers : inactiveUsers}
                  </Typography>
                  {/* <Typography variant="body2">
                    {card.key === "active" ? "Currently active" : "Currently inactive"}
                  </Typography> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Search & Sort */}
        <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", gap: "10px", mt: 3, mb: 2 }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{ width: "250px" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <FormControl size="small" sx={{ width: "120px" }}>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="Latest">Latest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              fontSize: "14px",
              padding: "5px",
              backgroundColor: "white",
              border: "1px solid #ced4da",
              color: "black",
              textTransform: "none",
              "&:hover": { backgroundColor: "#f8f9fa" },
            }}
          >
            Filters
          </Button> */}
        </Box>

        <Box >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Table sx={{ border: "1px solid black" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>
                    User ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>
                    Username
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>
                    Phone
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>
                  KYC Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.user_id}

                    sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" } }}
                  >
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{user.user_id}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{user.username}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{user.email}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{user.phone_number}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000", color: user.status === "active" ? "green" : "red" }}>
                      {user.status}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>
                      <FormControl size="small" fullWidth>
                        <Select
                          value={user.kyc_status ?? ""} // Ensure it defaults to the fetched status
                          onChange={(e) => handleKycStatusChange(user.user_id, e.target.value)}
                          disabled={user.kyc_status === "Verified"} // Disable if status is verified
                          displayEmpty
                        >
                          {KYC_STATUS_OPTIONS.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>


                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>
                      <IconButton size="small" color="primary" sx={{ color: '#2c3e50', '&:hover': { color: '#2c3e50' } }} onClick={() => handleView(user)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton size="small" color="primary" sx={{ color: "#FFC107", "&:hover": { color: "#FF9800" } }} onClick={() => handleEdit(user.user_id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(user.user_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

<Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
  <DialogTitle>User Details</DialogTitle>
  <DialogContent dividers>
    {selectedUser && (
      <Box>
        <Grid container spacing={2}>
          {/* Basic Details */}
          <Grid item xs={6}>
            <Typography><strong>User ID:</strong> {selectedUser.user_id}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Username:</strong> {selectedUser.username}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Phone:</strong> {selectedUser.phone_number}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>DOB:</strong> {selectedUser.date_of_birth}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Gender:</strong> {selectedUser.gender}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Status:</strong> {selectedUser.status}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>KYC Status:</strong> {selectedUser.kyc_status}</Typography>
          </Grid>

          {/* Address Details */}
          <Grid item xs={6}>
            <Typography><strong>Address:</strong> {selectedUser.address || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>City:</strong> {selectedUser.city || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>State:</strong> {selectedUser.state || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Country:</strong> {selectedUser.country || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Pin Code:</strong> {selectedUser.pin_code || "N/A"}</Typography>
          </Grid>

          {/* Bank & Document Info */}
          <Grid item xs={6}>
            <Typography><strong>Account Type:</strong> {selectedUser.account_type || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Pan Number:</strong> {selectedUser.pan_number || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Aadhaar Number:</strong> {selectedUser.aadhaar_number || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Account Holder Name:</strong> {selectedUser.account_holder_name || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Bank Name:</strong> {selectedUser.bank_name || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Branch Name:</strong> {selectedUser.branch_name || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Account Number:</strong> {selectedUser.account_number || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>IFSC Code:</strong> {selectedUser.ifsc_code || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Referral Id:</strong> {selectedUser.referral_id || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Created At:</strong> {selectedUser.created_at || "N/A"}</Typography>
          </Grid>
        </Grid>

        {/* Images Section */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom><strong>Documents</strong></Typography>
        
            <Box>
              <Typography><strong>Profile Image:</strong></Typography>
              <img
                src={`http://175.29.21.7:83/${selectedUser.image}`}
                alt="User Profile"
                style={{ width: "100%", maxWidth: "200px", borderRadius: "5px", marginTop: "5px" }}
              />
            </Box>

            <Box>
              <Typography><strong>PAN Card:</strong></Typography>
              {selectedUser.pan?.match(/\.(jpg|jpeg|png)$/i) ? (
                <img
                  src={`http://175.29.21.7:83/${selectedUser.pan}`}
                  alt="PAN Card"
                  style={{ width: "100%", maxWidth: "200px", borderRadius: "5px", marginTop: "5px" }}
                />
              ) : (
                <a
                  href={`http://175.29.21.7:83/${selectedUser.pan}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", marginTop: "5px", color: "blue", textDecoration: "underline" }}
                >
                  View PAN File
                </a>
              )}
            </Box>

            <Box>
              <Typography><strong>Aadhaar Card:</strong></Typography>
              {selectedUser.aadhaar?.match(/\.(jpg|jpeg|png)$/i) ? (
                <img
                  src={`http://175.29.21.7:83/${selectedUser.aadhaar}`}
                  alt="Aadhaar Card"
                  style={{ width: "100%", maxWidth: "200px", borderRadius: "5px", marginTop: "5px" }}
                />
              ) : (
                <a
                  href={`http://175.29.21.7:83/${selectedUser.aadhaar}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", marginTop: "5px", color: "blue", textDecoration: "underline" }}
                >
                  View Aadhaar File
                </a>
              )}
            </Box>
       
        </Box>
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="000000DE">Close</Button>
  </DialogActions>
</Dialog>


        </Box>
      </Container>
    </>
  );
};

export default Tmanagement;
