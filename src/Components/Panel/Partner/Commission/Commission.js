import React, { useState, useEffect } from "react";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { Typography, Paper, Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Commission = () => {
    const [commissionData, setCommissionData] = useState([]);
    const [userIdMap, setUserIdMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommissions = async () => {
            try {
                const partnerId = localStorage.getItem("user_id");
                if (!partnerId) {
                    throw new Error("Partner ID not found in localStorage");
                }
    
                // Fetch commissions data
                const response = await fetch(`http://175.29.21.7:83/commissions/partner-id/${partnerId}/`);
                if (!response.ok) {
                    throw new Error(`Error fetching commission data: ${response.statusText}`);
                }
    
                const data = await response.json();
                const commissions = Array.isArray(data) ? data : [data];
                setCommissionData(commissions);
                console.log("commissions", commissions);
    
                // Ensure commissions is not empty before accessing its properties
                if (commissions.length === 0) {
                    console.warn("No commissions found");
                    return;
                }
    
                const partnerCommission = commissions[0]; // Extract first commission object
                if (!partnerCommission.property_id) {
                    throw new Error("property_id is missing in commission data");
                }
    
                // Fetch user_id mapping
                const transactionResponse = await fetch(`http://175.29.21.7:83/transactions/property/${partnerCommission.property_id}/`);
                if (!transactionResponse.ok) {
                    throw new Error(`Error fetching transaction data: ${transactionResponse.statusText}`);
                }
    
                const transactionData = await transactionResponse.json();
                const userIdMap = {};
                transactionData.forEach((item) => {
                    userIdMap[item.transaction_id] = item.user_id; // Map transaction_id to user_id
                });
                console.log("userid", userIdMap);
    
                setUserIdMap(userIdMap);
            } catch (error) {
                console.error("Error:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCommissions();
    }, []);
    

    const columns = [
        { field: "commission_id", headerName: "Commission ID", width: 180 },
        // { field: "transaction_id", headerName: "Transaction ID", width: 180 },
        { field: "user_id", headerName: "User ID", width: 180 }, // New column for user_id
        { field: "property_id", headerName: "Property ID", width: 180 },
        { field: "sale_price", headerName: "Sale Price", width: 180, type: "number" },
        { field: "commission_percentage", headerName: "Commission (%)", width: 180, type: "number" },
        { field: "commission_amount", headerName: "Commission Amount", width: 180, type: "number" },
        { field: "commission_payment_status", headerName: "Payment Status", width: 180 },
    ];

    return (
        <>
            <PartnerHeader />
            <Typography variant="h4" sx={{ mb: 3, pt: 3, textAlign: "center" }}>
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
                            rows={commissionData.map((item) => ({
                                id: item.commission_id,
                                user_id: userIdMap[item.transaction_id] || "N/A", // Add user_id from mapping
                                ...item,
                            }))}
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
