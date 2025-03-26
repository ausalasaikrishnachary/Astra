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
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            const userId = localStorage.getItem("user_id");
            try {
                const response = await axios.get("http://175.29.21.7:83/transactions/");

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
                <Paper sx={{ padding: '20px', maxWidth: '1300px', margin: '0 auto' }}>
                    <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                        Transaction List
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Transaction ID</TableCell>
                                    <TableCell>Property Name</TableCell>
                                    <TableCell>Property Value</TableCell>
                                    {/* <TableCell>Partner Name</TableCell> */}
                                    <TableCell>Payment Type</TableCell>
                                    <TableCell>Purchased Units</TableCell>
                                    <TableCell>Price Per Unit</TableCell>
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell>Paid Amount</TableCell>
                                    <TableCell>Remaining Amount</TableCell>
                                    <TableCell>Payment Method</TableCell>
                                    <TableCell>Transaction Date</TableCell>
                                    {/* <TableCell>Action</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.transaction_id}>
                                        <TableCell>{transaction.transaction_id}</TableCell>
                                        {/* <TableCell>{transaction.property_name}</TableCell> */}
                                        <TableCell>{transaction.property_value || 'N/A'}</TableCell>
                                        <TableCell>{transaction.partner_name || 'N/A'}</TableCell>
                                        <TableCell>{transaction.payment_type || 'N/A'}</TableCell>
                                        <TableCell>{transaction.purchased_units}</TableCell>
                                        <TableCell>{transaction.price_per_unit}</TableCell>
                                        <TableCell>{transaction.total_amount}</TableCell>
                                        <TableCell>{transaction.paid_amount}</TableCell>
                                        <TableCell>{transaction.remaining_amount}</TableCell>
                                        <TableCell>{transaction.payment_method}</TableCell>
                                        <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                                        {/* <TableCell>
                                            {transaction.remaining_amount > 0 && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() =>
                                                        navigate(`/i-payment-form?property_id=${transaction.property_id}&transaction_id=${transaction.transaction_id}`)
                                                    }
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
                    {/* Back Button */}
                    <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                        <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default TransactionMoniterDetails;
