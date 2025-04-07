import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../Shared/Navbar/Navbar";

function ViewEscrowAccount() {
  const [escrowAccounts, setEscrowAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://175.29.21.7:83/escrow/accounts/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setEscrowAccounts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ marginTop: 4, padding: "50px" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/a-addescrow")}>+ Add Escrow Account</Button>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table sx={{ border: "1px solid black" }}>
            <TableHead>
              <TableRow>
                {[
                  "Escrow ID",
                  "Property",
                  "Account Number",
                  "Account Type",
                  "Bank Name",
                  "Branch Name",
                  "IFSC Code",
                  "Deposit Amount",
                  "Status",
                  "Created At",
                  "Updated At",
                  "Actions",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {escrowAccounts.map((account) => (
                <TableRow
                  key={account.escrow_id}
                  sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{account.escrow_id}</TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{account.property}</TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{account.account_number}</TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{account.account_type}</TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{account.bank_name}</TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{account.branch_name}</TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{account.ifsc_code}</TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{account.deposit_amount}</TableCell>
                  <TableCell
                    sx={{ textAlign: "center", border: "1px solid #000", color: account.status === "Active" ? "green" : "red" }}
                  >
                    {account.status}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{new Date(account.created_at).toLocaleDateString('en-IN')}</TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{new Date(account.updated_at).toLocaleDateString('en-IN')}</TableCell>
                  <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>
                    {/* <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton> */}
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </>
  );
}

export default ViewEscrowAccount;
