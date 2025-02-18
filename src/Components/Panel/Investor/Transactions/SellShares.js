import React, { useState } from 'react';
import {
        Container, Typography, TextField, MenuItem, FormControl,
        InputLabel, Select, Button, Grid, Box, Table, TableHead, TableRow, TableCell, TableBody, TablePagination,
        ButtonGroup
} from '@mui/material';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';

const rows = [
        { id: 1, assetId: 'A123', date: '2025-02-18', assetName: 'Asset A', description: 'Asset Description A', nomineeName: 'Nominee A', transactionId: 'TX12345', amount: 1000 },
        { id: 2, assetId: 'B456', date: '2025-02-19', assetName: 'Asset B', description: 'Asset Description B', nomineeName: 'Nominee B', transactionId: 'TX12346', amount: 2000 },
        { id: 3, assetId: 'C789', date: '2025-02-20', assetName: 'Asset C', description: 'Asset Description C', nomineeName: 'Nominee C', transactionId: 'TX12347', amount: 3000 },
        // Add more rows as needed
];

const SellShares = () => {
        const [sortBy, setSortBy] = useState('');
        const [currentPage, setCurrentPage] = useState(0);  // Set initial page to 0 (page index starts from 0)
        const rowsPerPage = 3;  // Number of rows per page

        const handleSortChange = (event) => {
                setSortBy(event.target.value);
        };

        const handlePrevPage = () => {
                setCurrentPage(currentPage - 1);
        };

        const handleNextPage = () => {
                setCurrentPage(currentPage + 1);
        };

        const totalPages = Math.ceil(rows.length / rowsPerPage);

        return (
                <>
                <InvestorHeader/>
                        <Box p={5}>
                                {/* Heading */}
                                <Typography variant="h4" gutterBottom>
                                        SellShares
                                </Typography>
                                <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px' }}>

                                        {/* Row containing search, sort by, filter, and buy shares button */}
                                        <Grid container spacing={2} alignItems="center" sx={{ width: '100%' }}>
                                                {/* Left section: Search bar, Sort by, Filter buttons */}
                                                <Grid item xs={12} sm={8} container spacing={2}>
                                                        {/* Search bar with fixed width of 200px */}
                                                        <Grid item>
                                                                <TextField
                                                                        label="Search Assets"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        fullWidth
                                                                        sx={{ width: '200px' }}
                                                                />
                                                        </Grid>

                                                        {/* Sort by dropdown with fixed width of 200px */}
                                                        <Grid item>
                                                                <FormControl variant="outlined" size="small" fullWidth sx={{ width: '200px' }}>
                                                                        <InputLabel id="sort-by-label">Sort By</InputLabel>
                                                                        <Select
                                                                                labelId="sort-by-label"
                                                                                id="sort-by"
                                                                                value={sortBy}
                                                                                onChange={handleSortChange}
                                                                                label="Sort By"
                                                                        >
                                                                                <MenuItem value="name">Name</MenuItem>
                                                                                <MenuItem value="date">Date</MenuItem>
                                                                                <MenuItem value="status">Status</MenuItem>
                                                                        </Select>
                                                                </FormControl>
                                                        </Grid>

                                                        {/* Filter button with fixed width of 150px */}
                                                        <Grid item>
                                                                <Button variant="outlined" color="primary" fullWidth sx={{ width: '150px' }}>
                                                                        Filter
                                                                </Button>
                                                        </Grid>
                                                </Grid>

                                                {/* Right section: Buy Shares button with fixed width of 200px */}
                                                <Grid item xs={12} sm={4}>
                                                        <Button variant="contained" fullWidth sx={{ width: '200px', marginLeft: '270px', color: 'white', backgroundColor: '#8FD14F' }}>
                                                                + Sell Shares
                                                        </Button>
                                                </Grid>
                                        </Grid>
                                </Box>
                        </Box>


                        {/* Table with 7 columns */}
                        <Box sx={{ marginTop: 4, padding: '50px' }}>
                                <Table sx={{ border: '1px solid black ', width: '100%' }}>
                                        <TableHead>
                                                <TableRow>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid blue' }}>Asset ID</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid blue' }}>Date</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid blue' }}>Asset Name</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid blue' }}>Description</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid blue' }}>Nominee Name</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid blue' }}>Transaction ID</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid blue' }}>Amount</TableCell>
                                                </TableRow>
                                        </TableHead>
                                        <TableBody>
                                                {rows
                                                        .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                                                        .map((row) => (
                                                                <TableRow key={row.id}>
                                                                        <TableCell sx={{ textAlign: 'center', border: '1px solid blue' }}>{row.assetId}</TableCell>
                                                                        <TableCell sx={{ textAlign: 'center', border: '1px solid blue' }}>{row.date}</TableCell>
                                                                        <TableCell sx={{ textAlign: 'center', border: '1px solid blue' }}>{row.assetName}</TableCell>
                                                                        <TableCell sx={{ textAlign: 'center', border: '1px solid blue' }}>{row.description}</TableCell>
                                                                        <TableCell sx={{ textAlign: 'center', border: '1px solid blue' }}>{row.nomineeName}</TableCell>
                                                                        <TableCell sx={{ textAlign: 'center', border: '1px solid blue' }}>{row.transactionId}</TableCell>
                                                                        <TableCell sx={{ textAlign: 'center', border: '1px solid blue' }}>{row.amount}</TableCell>
                                                                </TableRow>
                                                        ))}
                                        </TableBody>
                                </Table>

                                <Box display="flex" justifyContent="flex-end" mt={4} mb={4} mr={1}>
                                        <ButtonGroup sx={{ gap: 0 }}>
                                                <Button
                                                        variant="contained"
                                                        disabled={currentPage === 0}
                                                        onClick={handlePrevPage}
                                                        sx={{
                                                                backgroundColor: '#8FD14F',  // Background color
                                                                color: 'white',  // Text color
                                                                '&:hover': {
                                                                        backgroundColor: '#8FD14F',  // Keep the same color on hover
                                                                },
                                                                '&:disabled': {
                                                                        backgroundColor: '#C8E6A4',  // Lighter shade when disabled
                                                                        color: 'white',  // Text color when disabled
                                                                }
                                                        }}
                                                >
                                                        Previous
                                                </Button>
                                                <Typography
                                                        variant="body1"
                                                        sx={{
                                                                border: '1px solid #ddd',
                                                                padding: '4px 12px', // Optional padding for better appearance
                                                                borderRadius: '4px', // Optional rounded corners for the border
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                        }}
                                                >
                                                        {currentPage}
                                                </Typography>
                                                <Button
                                                        variant="contained"
                                                        disabled={currentPage === totalPages - 1}
                                                        onClick={handleNextPage}
                                                        sx={{
                                                                backgroundColor: '#8FD14F',  // Background color
                                                                color: 'white',  // Text color
                                                                '&:hover': {
                                                                        backgroundColor: '#8FD14F',  // Keep the same color on hover
                                                                },
                                                                '&:disabled': {
                                                                        backgroundColor: '#C8E6A4',  // Lighter shade when disabled
                                                                        color: 'white',  // Text color when disabled
                                                                }
                                                        }}
                                                >
                                                        Next
                                                </Button>

                                        </ButtonGroup>
                                </Box>


                        </Box>
                </>
        );
};

export default SellShares;
