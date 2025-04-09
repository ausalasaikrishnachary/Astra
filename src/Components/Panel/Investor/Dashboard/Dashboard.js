import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Link } from 'react-router-dom';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';

// Register required ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [counts, setCounts] = useState({});
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    // Fetch the counts data
    fetch(`http://175.29.21.7:83/transaction-summary/${userId}/Full-Payment/`)
      .then(response => response.json())
      .then(data => setCounts(data))
      .catch(error => console.error("Error fetching counts:", error));
  }, []);


  // Data and options for the line chart (Price Trend)
  const priceData = {
    labels: ['2023-01', '2023-02', '2023-03', '2023-04'],
    datasets: [
      {
        label: 'Price Trend',
        data: [200000, 210000, 220000, 240000],
        borderColor: '#ffa500',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const priceOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Data and options for the pie chart (Distribution)
  const distributionData = {
    labels: ['Industry 1', 'Industry 1', 'Industry 1'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ['#0066cc', '#ffa500', '#00cc88'],
      },
    ],
  };

  const distributionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const summaryCardsData = [
    {
      title: "Total Purchased Assets",
      value: counts.total_properties_purchased || "0", // Dynamic value
    },
    {
      title: "Total Amount Invested",
      value: counts.total_paid_amount ? `₹${counts.total_paid_amount}` : "0", // Dynamic value
    },
    {
      title: "Total Purchased Units",
      value: counts.total_purchased_units || "0", // Dynamic value
    },
  ];

  return (
    <>
      <InvestorHeader />
      <Box
        sx={{

          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Container>
          {/* Page Title */}
          <Typography
            variant="h4"
            sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, mb: 4, pl: 2, textAlign: "center" }}
          >
            Investor Dashboard
          </Typography>

          {/* Stats Cards */}
          <Grid container spacing={2}>
            {summaryCardsData.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: "#f8f9fa",
                    textAlign: "center",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ color: "rgb(30,10,80)" }}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2">{card.subtext}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={3} borderRadius={2} p={3} sx={{ bgcolor: '#1a5ca3', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Finish your KYC to start investing
            </Typography>
            <Typography mb={3}>
              Make sure you complete all the sections to submit your KYC details for review. Please keep scanned images of your Address proof, ID proof and a cancelled cheque/bank statement ready.
            </Typography>
            <Box display="flex" flexWrap="wrap" mb={3}>
              {['Personal Info', 'Address', 'PAN', 'Bank Account'].map((item, idx) => (
                <Typography key={idx} mr={4} mb={1}>
                  {item}
                </Typography>
              ))}
            </Box>
            <Link to="/i-profiledetails" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'white',
                  color: '#0a3c72',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#f0f0f0' }, // optional hover styling
                }}
              >
                Complete your KYC
              </Button>
            </Link>
          </Box>

        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
