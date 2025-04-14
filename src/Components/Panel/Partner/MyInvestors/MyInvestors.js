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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Header from "../../../Shared/Navbar/Navbar";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

const userId = localStorage.getItem("user_id");

// API Endpoint
const API_URL = `http://175.29.21.7:83/users/referral-id/${userId}/`;

// Summary Cards Data
const summaryCardsData = [
  { title: "Total Investors", key: "total" },
  { title: "Active", key: "active" },
  { title: "Inactive", key: "inactive" },
];

const Tmanagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Latest");
  const [searchTerm, setSearchTerm] = useState("");

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
    console.log("Edit user with ID:", userId);
  };

  const handleDelete = (userId) => {
    console.log("Delete user with ID:", userId);
  };

  // Columns for DataGrid
  const columns = [
    { field: "user_id", headerName: "User ID", flex: 1, minWidth: 100 },
    { field: "first_name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 250 },
    { field: "phone_number", headerName: "Phone", flex: 1, minWidth: 150 },
    // { field: "dob", headerName: "DOB", flex: 1, minWidth: 150 },
    { field: "gender", headerName: "Gender", flex: 1, minWidth: 120 },
    { field: "kyc_status", headerName: "KYC Status", flex: 1, minWidth: 130 },
    // { field: "account_holder_name", headerName: "Bank Account Holder", flex: 1.5, minWidth: 200 },
    // { field: "bank_name", headerName: "Bank Name", flex: 1.5, minWidth: 180 },
    // { field: "ifsc_code", headerName: "IFSC Code", flex: 1, minWidth: 150 },
    { field: "referral_id", headerName: "Reference To", flex: 1, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 150, 
      renderCell: (params) => (
        <Typography sx={{ color: getStatusColor(params.value) }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: "5px" }}>
          <IconButton size="small" color="primary">
            <VisibilityIcon />
          </IconButton>
          {/* <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton> */}
        </Box>
      ),
    },
  ];

  // Filter Users based on Search
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Count Active & Inactive Users
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const inactiveUsers = totalUsers - activeUsers;

  return (
    <>
      <PartnerHeader />
      <Container sx={{ maxWidth: "900px", pt: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: "center" }}>
          Leads Management
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
        {/* <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", gap: "10px", mt: 3, mb: 2 }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{ width: "250px" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl size="small" sx={{ width: "120px" }}>
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
          </Button>
        </Box> */}

        <Box sx={{ marginTop: 4, padding: "50px" }}>
  {loading ? (
    <CircularProgress />
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
          {/* <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>
            Actions
          </TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow
              key={user.user_id}
              sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" } }}
            >
              <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{user.user_id}</TableCell>
              <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{user.username}</TableCell>
              <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{user.email}</TableCell>
              <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{user.phone_number}</TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  border: "1px solid #000",
                  color: user.status === "active" ? "green" : "red",
                }}
              >
                {user.status}
              </TableCell>
              {/* <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>
                <IconButton size="small" color="primary">
                  <VisibilityIcon />
                </IconButton>
                <IconButton size="small" color="primary" onClick={() => handleEdit(user.user_id)}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDelete(user.user_id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell> */}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} sx={{ textAlign: "center", border: "1px solid #000", padding: 2 }}>
              No data found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )}
</Box>

      </Container>
    </>
  );
};

export default Tmanagement;
