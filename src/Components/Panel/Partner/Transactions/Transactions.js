import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    Paper,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { DataGrid } from '@mui/x-data-grid';

const Transaction = () => {
    const columns = [
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'asset',
            headerName: 'Asset',
            flex: 1.2,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'amount',
            headerName: 'Credit/Debit Amount',
            flex: 1.2,
            headerAlign: 'center',
            align: 'center',
            cellClassName: (params) =>
                params.value && params.value.startsWith('+') ? 'positive' : '',
        },
    ];

    const rows = [
        { id: 1, date: '2024-03-15', type: 'Dividend', asset: 'Property A', amount: '+₹20000/-' },
        { id: 2, date: '2024-03-10', type: 'Dividend', asset: 'Property B', amount: '+₹50000/-' },
        { id: 3, date: '2024-03-05', type: 'Dividend', asset: 'Property C', amount: '+₹80000/-' },
    ];

    return (
        <>
            <PartnerHeader />
            <Box sx={{ p: 4, minHeight: '100vh', width: "80%", margin: "0 auto" }}>
                <Typography variant="h4" sx={{ marginLeft: '10px', textAlign: "center" }}>
                    Transactions
                </Typography>
                {/* Profile Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                        src="https://www.w3schools.com/w3images/team2.jpg"
                        sx={{ width: 50, height: 50, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h6">ABC</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Partner since 2024
                        </Typography>
                    </Box>
                </Box>

                {/* Stat Cards */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {[
                        {
                            title: 'Total Portfolio Value',
                            value: '₹750,000/-',
                            change: '+12.5%',
                        },
                        {
                            title: 'Monthly Returns',
                            value: '₹8,50,000/-',
                            change: '+5.2%',
                        },
                        {
                            title: 'Active Investments',
                            value: '3',
                            change: '+1',
                        },
                    ].map((stat, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                                 sx={{
                                    backgroundColor: "#f8f9fa",
                                    // textAlign: "center",
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                                  }}
                            >
                                <CardContent>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        {stat.title}
                                    </Typography>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {stat.value}
                                    </Typography>
                                    <Chip label={stat.change} color="success" size="small" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Assets Section */}
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Your Assets
                </Typography>
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {[
                        { name: 'Property A', value: '₹250,000/-', share: 'Share: 25%' },
                        { name: 'Property B', value: '₹180,000/-', share: 'Share: 15%' },
                        { name: 'Property C', value: '₹320,000/-', share: 'Share: 30%' },
                    ].map((asset, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                               sx={{
                                backgroundColor: "#f8f9fa",
                                p: 2,
                                borderRadius: 2,
                                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography variant="subtitle1">{asset.name}</Typography>
                                        <InsertDriveFileIcon color="action" />
                                    </Box>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {asset.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {asset.share}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Recent Transactions */}
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Recent Transactions
                </Typography>
                <Card sx={{  boxShadow: 3 }}>
                    
                        <Paper sx={{ height: 300, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                autoHeight
                                disableSelectionOnClick
                                hideFooter
                                sx={{
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: '#f5f5f5',
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiDataGrid-cell': {
                                        borderBottom: 'none',
                                    },
                                }}
                            />
                        </Paper>
                    
                </Card>
            </Box>
        </>
    );
};

export default Transaction;
