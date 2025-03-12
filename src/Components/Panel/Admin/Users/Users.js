import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Typography, IconButton, Tooltip, Select, MenuItem
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material"; // Icons
import Header from "../../../Shared/Navbar/Navbar";

const roleOptions = ["Admin", "Partner-(IFA)", "Partner-(REC)", "Investor"];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://46.37.122.105:91/users/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then(async (data) => {
        if (!Array.isArray(data)) {
          data = [data]; // Ensure data is an array
        }

        // Fetch roles for each user
        const usersWithRoles = await Promise.all(
          data.map(async (user) => {
            try {
              const roleResponse = await fetch(`http://46.37.122.105:91/roles/${user.user_id}/`);
              if (!roleResponse.ok) throw new Error("Failed to fetch role");
              const roleData = await roleResponse.json();
              return { ...user, role_name: roleData.role_name || "N/A" };
            } catch (error) {
              console.error(`Error fetching role for user ${user.user_id}:`, error);
              return { ...user, role_name: "N/A" }; // Default role if fetch fails
            }
          })
        );

        setUsers(usersWithRoles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // API call to assign role to user
  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.user_id === userId ? { ...user, role_name: newRole } : user
      )
    );

    fetch("http://46.37.122.105:91/roles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role_name: newRole,
        user_id: userId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to assign role");
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Role assigned successfully:`, data);
        alert(`Role "${newRole}" assigned to user ${userId} successfully!`);
      })
      .catch((error) => {
        console.error("Error assigning role:", error);
        alert("Error assigning role. Please try again.");
      });
  };

  // Action Handlers
  const handleEdit = (id) => {
    console.log("Edit user:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete user:", id);
  };

  const handleView = (id) => {
    console.log("View user:", id);
  };

  return (
    <>
      <Header />
      <Typography variant="h4" align="center" sx={{ mt: 3, mb: 2 }}>
        Users List
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: "90%", margin: "auto", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assign Role</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role_name || ""}
                      onChange={(e) => handleRoleChange(user.user_id, e.target.value)}
                      displayEmpty
                      sx={{ minWidth: 150 }}
                    >
                      <MenuItem value="" disabled>
                        Select Role
                      </MenuItem>
                      {roleOptions.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{user.role_name || "N/A"}</TableCell>
                  <TableCell>
                    <Tooltip title="View">
                      <IconButton onClick={() => handleView(user.user_id)} color="primary">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(user.user_id)} color="secondary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(user.user_id)} color="error">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Users;
