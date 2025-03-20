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
  ButtonGroup,
} from '@mui/material';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BuyShares = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://175.29.21.7:83/transactions/');
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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
      <Box p={5}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Buy Units
        </Typography>
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8} container spacing={2}>
              <Grid item>
                <TextField
                  label="Search Transactions"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ width: '200px' }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Grid>
              <Grid item>
                <FormControl variant="outlined" size="small" fullWidth sx={{ width: '200px' }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select value={sortBy} onChange={handleSortChange} label="Sort By">
                    <MenuItem value="name">Property Name</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                fullWidth
                sx={{ width: '200px', marginLeft: '270px', color: 'white', backgroundColor: '#000' }}
                onClick={handleClick}
              >
                + Buy Units
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

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
                    Purchased Units
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Price Per Unit
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Total Units Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Paid Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Remaining Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Transaction Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Remaining Payment
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.transaction_id}>
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
                      {transaction.purchased_units}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                      {transaction.price_per_unit}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                      {transaction.total_amount}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                      {transaction.paid_amount}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                      {transaction.remaining_amount}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() =>
                          navigate(`/i-payment-form?property_id=${transaction.property_id}&transaction_id=${transaction.transaction_id}`)
                        }
                      >
                        Pay Now
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
