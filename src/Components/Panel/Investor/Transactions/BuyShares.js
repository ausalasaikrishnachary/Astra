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
  const [remainingAmount, setRemainingAmount] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://175.29.21.7:83/transactions/user-id/${userId}/`);
        let transactionsData = response.data;

        if (!Array.isArray(transactionsData)) {
          throw new Error("Invalid response format");
        }

        // Group transactions by property_id
        const groupedTransactions = transactionsData.reduce((acc, transaction) => {
          if (!acc[transaction.property_id]) {
            acc[transaction.property_id] = [];
          }
          acc[transaction.property_id].push(transaction);
          return acc;
        }, {});

        // Filter transactions based on the given logic
        const filteredTransactions = Object.values(groupedTransactions).map((transactions) => {
          const fullPayment = transactions.find((t) => t.payment_type === "Full-Payment");
          if (fullPayment) {
            return fullPayment;
          }
          return transactions.find((t) => t.payment_type === "Advance-Payment");
        });

        setTransactions(filteredTransactions);
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
        let allRemainingAmounts = [];

        for (const transaction of transactions) {
          const response = await fetch(
            `http://175.29.21.7:83/transactions/user-id/${userId}/property-id/${transaction.property_id}/`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();

          if (Array.isArray(data) && data.length > 0) {
            const amounts = data.map((item) => parseFloat(item.remaining_amount));
            allRemainingAmounts = [...allRemainingAmounts, ...amounts];
          }
        }

        setRemainingAmount(allRemainingAmounts); // Store all remaining amounts in state
        console.log("remainingAmounts", allRemainingAmounts);
      } catch (error) {
        console.error("Error fetching remaining amount:", error);
      }
    };

    fetchRemainingAmount();
  }, [transactions]); // Depend on transactions array

  // Get the last element of the remainingAmount array
  const highestIndexValue = remainingAmount.length > 0 ? remainingAmount[remainingAmount.length - 1] : null;


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
                    Property Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Property Value
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Purchased Units
                  </TableCell>
                  {/* <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                                  Price Per Unit
                                </TableCell> */}
                  {/* <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                                  Transaction Type
                                </TableCell> */}
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Payment Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Total Paid Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Remaining Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Transaction Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow
                  key={transaction.property_id}
                  onClick={() => navigate(`/i-transaction-details?property_id=${transaction.property_id}`)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                    {transaction.property_name}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                    {transaction.property_value}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                    {transaction.purchased_units}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                    {transaction.payment_type}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                    {transaction.total_paid_amount}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                    {transaction.remaining_amount}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </TableCell>
                  {/* Prevent row click for this column */}
                  <TableCell
                    sx={{ textAlign: 'center', border: '1px solid #000' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking the button
                        navigate(
                          `/i-payment-form?property_id=${transaction.property_id}&transaction_id=${transaction.transaction_id}`
                        );
                      }}
                      disabled={transaction.remaining_amount <= 0}
                    >
                      Pay Remaining
                    </Button>
                  </TableCell>
                </TableRow>
                
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
