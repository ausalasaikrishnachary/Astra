import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import axios from 'axios';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useLocation } from "react-router-dom";
import Header from "../../../Shared/Navbar/Navbar";


const TransactionMoniterDetails = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const propertyId = queryParams.get("property_id");
    const userId = queryParams.get("user_id");
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            
            try {
                const response = await axios.get(`http://175.29.21.7:83/transactions/user-id/${userId}/property-id/${propertyId}/`);

                if (!response.data || response.data.length === 0) {
                    throw new Error("No transactions found");
                }
                setTransactions(response.data);
            } catch (err) {
                setError("Failed to fetch transaction details");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [propertyId]);

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <Header />
            <Box sx={{ marginTop: 4, padding: '30px' }}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <div >
                        <Box sx={{ marginTop: 3, textAlign: 'left' }}>
                            <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
                        </Box>
                        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
                            Transaction List
                        </Typography>
                        <TableContainer>
                            <Table sx={{ border: '1px solid black', width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Transaction ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Property Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Property Value</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Payment Type</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Purchased Units</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Price Per Unit</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Total Amount</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Paid Amount</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Remaining Amount</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Payment Method</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Transaction Date</TableCell>
                                        {/* <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Action</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow
                                            key={transaction.transaction_id}
                                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                                        >
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.transaction_id}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.property_name || 'N/A'}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.property_value || 'N/A'}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.payment_type || 'N/A'}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.purchased_units}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.price_per_unit}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.total_amount}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.paid_amount}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.remaining_amount}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.payment_method}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{new Date(transaction.created_at).toLocaleDateString('en-IN')}</TableCell>
                                            {/* <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }} onClick={(e) => e.stopPropagation()}>
                                                {transaction.remaining_amount > 0 && (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/payment-form?transaction_id=${transaction.transaction_id}`);
                                                        }}
                                                    >
                                                        Pay Remaining
                                                    </Button>
                                                )}
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </div>
                )}
            </Box>
        </>

    );
};

export default TransactionMoniterDetails;
