import React, { useState, useEffect } from "react";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { Typography, Paper, Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Commission = () => {
    const [commissionData, setCommissionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommissions = async () => {
            try {
                // Get partner_id from localStorage
                const partnerId = localStorage.getItem("user_id");
                if (!partnerId) {
                    throw new Error("Partner ID not found in localStorage");
                }

                const response = await fetch(`http://175.29.21.7:83/commissions/partner/${partnerId}/`);
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }

                const data = await response.json();
                setCommissionData(Array.isArray(data) ? data : [data]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCommissions();
    }, []);

    const columns = [
        { field: "commission_id", headerName: "Commission ID", width: 150 },
        { field: "transaction_id", headerName: "Transaction ID", width: 150 },
        // { field: "partner_id", headerName: "Partner ID", width: 150 },
        { field: "property_id", headerName: "Property ID", width: 150 },
        { field: "sale_price", headerName: "Sale Price", width: 150, type: "number" },
        { field: "commission_percentage", headerName: "Commission (%)", width: 180, type: "number" },
        { field: "commission_amount", headerName: "Commission Amount", width: 180, type: "number" },
        // { field: "paid_commission_amount", headerName: "Paid Commission", width: 180, type: "number" },
        // { field: "balance_commission_amount", headerName: "Balance Commission", width: 180, type: "number" },
        { field: "commission_payment_status", headerName: "Payment Status", width: 180 },
    ];

    return (
        <>
            <PartnerHeader />
            <Typography variant="h4" sx={{ mb: 3,pt:3, textAlign: "center" }}>
                Commission Details
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography sx={{ width: "100%", maxWidth: 1300, padding: 2 }}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error" textAlign="center">
                            {error}
                        </Typography>
                    ) : (
                        <DataGrid
                            rows={commissionData.map((item) => ({ id: item.commission_id, ...item }))}
                            columns={columns}
                            autoHeight
                            disableSelectionOnClick
                            sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "#f5f5f5",
                                    fontWeight: "bold",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none",
                                },
                            }}
                        />
                    )}
                </Typography>
            </Box>
        </>
    );
};

export default Commission;
