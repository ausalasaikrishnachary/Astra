// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   TextField,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Button,
//   Grid,
//   Box,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   ButtonGroup,
//   CircularProgress,
// } from '@mui/material';
// import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
// import { useNavigate } from 'react-router-dom';

// const BuyShares = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [sortBy, setSortBy] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(0);
//   const rowsPerPage = 5;
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://175.29.21.7:83/transactions/');
//       setTransactions(response.data);
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       setError('Failed to fetch transactions.');
//     }
//     setLoading(false);
//   };

//   const handleSortChange = (event) => {
//     setSortBy(event.target.value);
//     setCurrentPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(0);
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => prev + 1);
//   };

//   const filteredRows = transactions.filter((row) =>
//     row.property_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     row.transaction_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     row.transaction_id.toString().includes(searchQuery)
//   );

//   const sortedRows = [...filteredRows].sort((a, b) => {
//     if (sortBy === 'name') {
//       return a.property_name.localeCompare(b.property_name);
//     } else if (sortBy === 'date') {
//       return new Date(a.created_at) - new Date(b.created_at);
//     } else if (sortBy === 'type') {
//       return a.transaction_type.localeCompare(b.transaction_type);
//     }
//     return 0;
//   });

//   const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
//   const paginatedRows = sortedRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

//   return (
//     <>
//       <InvestorHeader />
//       {/* <Box p={5}>
//         <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
//           Transaction History
//         </Typography>

//         <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} sm={8} container spacing={2}>
//               <Grid item>
//                 <TextField
//                   label="Search Transactions"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   sx={{ width: '200px' }}
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                 />
//               </Grid>

//               <Grid item>
//                 <FormControl variant="outlined" size="small" fullWidth sx={{ width: '200px' }}>
//                   <InputLabel id="sort-by-label">Sort By</InputLabel>
//                   <Select
//                     labelId="sort-by-label"
//                     id="sort-by"
//                     value={sortBy}
//                     onChange={handleSortChange}
//                     label="Sort By"
//                   >
//                     <MenuItem value="name">Property Name</MenuItem>
//                     <MenuItem value="date">Date</MenuItem>
//                     <MenuItem value="type">Transaction Type</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{ width: '200px', marginLeft: '270px', color: 'white', backgroundColor: '#000' }}
//                 onClick={() => navigate('/i-asset')}
//               >
//                 Sell Units
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box> */}

//       <Box sx={{ marginTop: 4, padding: '50px' }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center">
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Typography color="error" align="center">
//             {error}
//           </Typography>
//         ) : (
//           <Table sx={{ border: '1px solid black', width: '100%' }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Transaction ID</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Property Name</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Transaction Type</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Units Purchased</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Price per Unit</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Total Value</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedRows.map((row) => (
//                 <TableRow key={row.transaction_id}>
//                   <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.transaction_id}</TableCell>
//                   <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.property_name}</TableCell>
//                   <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.transaction_type}</TableCell>
//                   <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.purchased_units}</TableCell>
//                   <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.price_per_unit}</TableCell>
//                   <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.total_value}</TableCell>
//                   <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{new Date(row.created_at).toLocaleDateString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}

//                     <Box display="flex" justifyContent="flex-end" mt={4} mb={4} mr={1}>
//                       <ButtonGroup>
//                         <Button
//                           variant="contained"
//                           disabled={currentPage === 0}
//                           onClick={handlePrevPage}
//                           sx={{ backgroundColor: '#000', color: 'white' }}
//                         >
//                           Previous
//                         </Button>
//                         <Typography sx={{ padding: '4px 12px', border: '1px solid #ddd', borderRadius: '4px' }}>
//                           {currentPage + 1}
//                         </Typography>
//                         <Button
//                           variant="contained"
//                           disabled={currentPage >= totalPages - 1}
//                           onClick={handleNextPage}
//                           sx={{ backgroundColor: '#000', color: 'white' }}
//                         >
//                           Next
//                         </Button>
//                       </ButtonGroup>
//                     </Box>
//       </Box>
//     </>
//   );
// };

// export default BuyShares;


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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem("user_id"); // Get user_id from localStorage
        const advancePayment = "Full-Payment"

        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://175.29.21.7:83/transactions/user-id/${userId}/payment-type/${advancePayment}/`);
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);


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
                  <React.Fragment key={transaction.transaction_id}>
                     <TableRow>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.property_name}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.property_value}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.purchased_units}
                      </TableCell>
                      {/* <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.price_per_unit}
                      </TableCell> */}
                      {/* <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.transaction_type}
                      </TableCell> */}
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
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        <IconButton onClick={() => handleToggleExpand(transaction.transaction_id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row */}
                    {expandedRows[transaction.transaction_id] && (
                      <TableRow>
                        <TableCell colSpan={10} sx={{ backgroundColor: '#f9f9f9', border: '1px solid #000' }}>
                          <Grid container spacing={2} p={2}>
                            <Grid item xs={4}><strong>Partner Name:</strong> {transaction.partner_name}</Grid>
                            <Grid item xs={4}><strong>Property Value:</strong> {transaction.property_value}</Grid>
                            <Grid item xs={4}><strong>Purchased Units:</strong> {transaction.purchased_units}</Grid>
                            <Grid item xs={4}><strong>Price Per Unit:</strong> {transaction.price_per_unit}</Grid>
                            <Grid item xs={4}><strong>Total Units Amount:</strong> {transaction.total_amount}</Grid>
                            <Grid item xs={4}><strong>Paid Amount:</strong> {transaction.paid_amount}</Grid>
                            <Grid item xs={4}><strong>Total Paid Amount:</strong> {transaction.total_paid_amount}</Grid>
                            <Grid item xs={4}><strong>Remaining Amount:</strong> {transaction.remaining_amount}</Grid>
                            <Grid item xs={4}><strong>Payment Method:</strong> {transaction.payment_method}</Grid>
                            <Grid item xs={4}><strong>Transaction Date:</strong> {new Date(transaction.created_at).toLocaleDateString()}</Grid>
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
