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
const API_URL = "http://175.29.21.7:83/users/role/Partner/";

// Summary Cards Data
const summaryCardsData = [
  { title: "Total Partners", key: "total" },
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

  // Fetch Users
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

  const handleEdit = (userId) => {
    navigate("/a-editpartners", { state: { userId } });
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
          Partners Management
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



{/* Modal for User Details */}
<Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
  <DialogTitle>User Details</DialogTitle>
  <DialogContent dividers>
    {selectedUser && (
      <Box>
        <Grid container spacing={2}>
          {[
            ['User ID', selectedUser.user_id],
            ['Username', selectedUser.username],
            ['Email', selectedUser.email],
            ['Phone', selectedUser.phone_number],
            ['DOB', selectedUser.date_of_birth],
            ['Gender', selectedUser.gender],
            ['Status', selectedUser.status],
            ['KYC Status', selectedUser.kyc_status],
            ['Address', selectedUser.address],
            ['City', selectedUser.city],
            ['State', selectedUser.state],
            ['Country', selectedUser.country],
            ['Pin Code', selectedUser.pin_code],
            ['Account Type', selectedUser.account_type],
            ['Pan Number', selectedUser.pan_number],
            ['Aadhaar Number', selectedUser.aadhaar_number],
            ['Account Holder Name', selectedUser.account_holder_name],
            ['Bank Name', selectedUser.bank_name],
            ['Branch Name', selectedUser.branch_name],
            ['Account Number', selectedUser.account_number],
            ['IFSC Code', selectedUser.ifsc_code],
            ['Referral Id', selectedUser.referral_id],
            ['Created At', selectedUser.created_at],
          ].map(([label, value], index) => (
            <Grid item xs={6} key={index}>
              <Typography ><strong>{label}:</strong>{value || 'N/A'}</Typography>
              {/* <Typography variant="body2"></Typography> */}
            </Grid>
          ))}
        </Grid>

        {/* Display Images and Files at the End */}
        <Box mt={4}>
          <Typography variant="subtitle1" fontWeight="bold">Profile Image:</Typography>
          <img
            src={`http://175.29.21.7:83/${selectedUser.image}`}
            alt="User Profile"
            style={{ width: "100%", maxWidth: "200px", borderRadius: "5px", marginTop: "5px" }}
          />

          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">PAN Card:</Typography>
            {selectedUser.pan?.endsWith(".jpg") || selectedUser.pan?.endsWith(".png") ? (
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

          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">Aadhaar Card:</Typography>
            {selectedUser.aadhaar?.endsWith(".jpg") || selectedUser.aadhaar?.endsWith(".png") ? (
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
    <Button onClick={handleCloseModal} color="primary">Close</Button>
  </DialogActions>
</Dialog>


        </Box>
      </Container>
    </>
  );
};

export default Tmanagement;
