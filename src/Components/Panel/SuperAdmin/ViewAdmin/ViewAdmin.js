import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from "@mui/material";
import SuperAdmin from "../../../Shared/SuperAdmin/SuperAdmin";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "http://175.29.21.7:83/users/role/Admin/";

const fields = [
  "user_id", "roles", "username", "first_name", "last_name", "email", "phone_number", 
//   "gender", "image", "address", "city", "state", "country", "pin_code", "status", "pan_number", "aadhaar_number","date_of_birth",
//   "pan", "aadhaar", "kyc_status", "account_holder_name", "bank_name", "branch_name", "account_number", "account_type",
//   "ifsc_code", "nominee_reference_to", "referral_id", "created_at", "updated_at"
];

function ViewAdmin() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch admin data");
        }
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleEdit = (admin) => {
    navigate("/s-editadmins", { state: { admin } });
    console.log("userid:",admin)
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://175.29.21.7:83/users/${id}/`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }
  
      // Remove deleted user from state
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.user_id !== id));
  
      alert("Admin deleted successfully!");
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("Failed to delete admin. Please try again.");
    }
  };
  

  return (
    <>
      <SuperAdmin />
      <Container maxWidth="lg" sx={{ maxWidth: "1400px !important" }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ my: 2, pt: 4 }}>
          <Typography variant="h4">Admin Details</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/s-addadmin")}
          >
            Add Admin
          </Button>
        </Grid>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell key={field} sx={{ fontWeight: "bold" }}>{field.replace(/_/g, " ").toUpperCase()}</TableCell>
                ))}
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={fields.length + 1} align="center">Loading...</TableCell>
                </TableRow>
              ) : admins.length > 0 ? (
                admins.map((admin, index) => (
                  <TableRow key={index}>
                    {fields.map((field) => (
                      <TableCell key={field}>
                        {field === "roles" ? admin.roles.map(role => role.role_name).join(", ") : admin[field] || "-"}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(admin)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(admin.user_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={fields.length + 1} align="center">No Admins Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default ViewAdmin;