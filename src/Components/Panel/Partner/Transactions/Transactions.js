import React, { useEffect, useState } from 'react';
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
    const [propertyData, setPropertyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://46.37.122.105:91/property/');
                const data = await response.json();
                setPropertyData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'property_id', headerName: 'ID', flex: 0.5, headerAlign: 'center', align: 'center' },
        { field: 'property_name', headerName: 'Property Name', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'property_type', headerName: 'Type', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'city', headerName: 'City', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'state', headerName: 'State', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'country', headerName: 'Country', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'property_value', headerName: 'Value', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'ownership_type', headerName: 'Ownership', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'available_units', headerName: 'Available Units', flex: 1, headerAlign: 'center', align: 'center' },
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
                        { title: 'Total Portfolio Value', value: '₹750,000/-', change: '+12.5%' },
                        { title: 'Monthly Returns', value: '₹8,50,000/-', change: '+5.2%' },
                        { title: 'Active Investments', value: '3', change: '+1' },
                    ].map((stat, index) => (
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
                        { name: 'Property A', value: '₹250,000/-', unit: 'Unit: 25%', pdfUrl: 'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf' },
                        { name: 'Property B', value: '₹180,000/-', unit: 'Unit: 15%', pdfUrl: '/path/to/propertyB.pdf' },
                        { name: 'Property C', value: '₹320,000/-', unit: 'Unit: 30%', pdfUrl: '/path/to/propertyC.pdf' },
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
                                        <a href={asset.pdfUrl} download>
                                            <InsertDriveFileIcon color="action" />
                                        </a>
                                    </Box>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {asset.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {asset.unit}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Recent Transactions */}
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Property List
                </Typography>
                <Card sx={{ boxShadow: 3 }}>
                    <Paper sx={{  width: '100%' }}>
                        <DataGrid
                            rows={propertyData.map((item, index) => ({ id: index + 1, ...item }))}
                            columns={columns}
                            autoHeight
                            loading={loading}
                            disableSelectionOnClick
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
