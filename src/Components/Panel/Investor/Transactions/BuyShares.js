import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  ButtonGroup,
} from '@mui/material';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BuyShares = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;
  const [expandedRows, setExpandedRows] = useState({});

  const navigate = useNavigate();
  const [remainingAmount, setRemainingAmount] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem("user_id"); // Get user_id from localStorage
        const advancePayment = "Advance-Payment"

        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://175.29.21.7:83/transactions/user-id/${userId}/payment-type/${advancePayment}/`);
        setTransactions(response.data);
        console.log("response", response.data)
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchRemainingAmount = async () => {
      const userId = localStorage.getItem("user_id");

      if (!transactions || transactions.length === 0) return; // Ensure transactions exist

      try {
        for (const transaction of transactions) {
          const response = await fetch(
            `http://175.29.21.7:83/transactions/user-id/${userId}/property-id/${transaction.property_id}/payment-type/Full-Payment/`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();


          if (Array.isArray(data) && data.length > 0) {
            const remainingAmounts = data.map((item) => parseFloat(item.remaining_amount));
            setRemainingAmount(remainingAmounts); // Store all remaining amounts in state
          }

        }
      } catch (error) {
        console.error("Error fetching remaining amount:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRemainingAmount();
  }, [transactions]); // Depend on transactions array
  // Depend on transactions array


  const handleToggleExpand = (transactionId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };


  const handleClick = () => {
    navigate('/i-asset');
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleRemainingPaymentClick = (transactionId) => {
    navigate(`/i-payment-form/${transactionId}`);
  };

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.property_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.transaction_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort the transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'name') {
      return a.property_name.localeCompare(b.property_name);
    } else if (sortBy === 'date') {
      return new Date(a.created_at) - new Date(b.created_at);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTransactions.length / rowsPerPage);
  const paginatedTransactions = sortedTransactions.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <>
      <InvestorHeader />
      <Box sx={{ marginTop: 4, padding: '50px' }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Table sx={{ border: '1px solid black', width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Transaction ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Property Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Transaction Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Payment Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <React.Fragment key={transaction.transaction_id}>
                    <TableRow>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.transaction_id}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.property_name}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.transaction_type}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.payment_type}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        <IconButton onClick={() => handleToggleExpand(transaction.transaction_id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row */}
                    {expandedRows[transaction.transaction_id] && (
                      <TableRow>
                        <TableCell colSpan={5} sx={{ backgroundColor: '#f9f9f9', border: '1px solid #000' }}>
                          <Grid container spacing={2} p={2}>
                            <Grid item xs={4}><strong>Partner Name:</strong> {transaction.partner_name}</Grid>
                            <Grid item xs={4}><strong>Property Value:</strong> {transaction.property_value}</Grid>
                            <Grid item xs={4}><strong>Purchased Units:</strong> {transaction.purchased_units}</Grid>
                            <Grid item xs={4}><strong>Price Per Unit:</strong> {transaction.price_per_unit}</Grid>
                            <Grid item xs={4}><strong>Total Units Amount:</strong> {transaction.total_amount}</Grid>
                            <Grid item xs={4}><strong>Paid Amount:</strong> {transaction.paid_amount}</Grid>
                            <Grid item xs={4}><strong>Remaining Amount:</strong> {transaction.remaining_amount}</Grid>
                            <Grid item xs={4}><strong>Payment Method:</strong> {transaction.payment_method}</Grid>
                            <Grid item xs={4}><strong>Transaction Date:</strong> {new Date(transaction.created_at).toLocaleDateString()}</Grid>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                color="primary"
                                disabled={parseFloat(remainingAmount) === 0}
                                onClick={() =>
                                  navigate(`/i-payment-form?property_id=${transaction.property_id}&transaction_id=${transaction.transaction_id}`)
                                }
                              >
                                Pay Now
                              </Button>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Box>
    </>
  );
};

export default BuyShares;
