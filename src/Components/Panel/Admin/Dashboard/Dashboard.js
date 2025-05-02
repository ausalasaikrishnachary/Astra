import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
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
import Header from '../../../Shared/Navbar/Navbar';
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the counts data
    fetch("http://175.29.21.7:83/counts/")
      .then(response => response.json())
      .then(data => setCounts(data))
      .catch(error => console.error("Error fetching counts:", error));
  }, []);

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
    labels: ['Industry 1', 'Industry 2', 'Industry 3'],
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
      title: "Total Assets",
      value: counts.total_properties || "0",
      path: "/a-asset",
    },
    {
      title: "Total Value",
      value: counts.total_properties_value ? `₹${counts.total_properties_value}` : "0",
      // Same path or change as needed
    },
    {
      title: "Active Units",
      value: counts.total_properties_available_units || "0",
    
    },
    {
      title: "Total Investors",
      value: counts.total_investors || "0",
      path: "/a-investormanagement",
    },
    {
      title: "Total Partners",
      value: counts.total_partners || "0",
      path: "/a-partners",
    },
  ];

  return (
    <>
      <Header />
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
            Admin Dashboard
          </Typography>

          <Grid container spacing={2}>
            {summaryCardsData.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  onClick={() => navigate(card.path)}
                  sx={{
                    backgroundColor: "#f8f9fa",
                    textAlign: "center",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer", // Indicate clickability
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ color: "rgb(30,10,80)" }}>
                      {card.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>


          {/* <Typography
            variant="h5"
            sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, mt: 4, mb: 3, pl: 2, textAlign: "center" }}
          >
            Analytics
          </Typography> */}

          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: 'white',
                  borderRadius: '10px',
                  p: 2,
                  boxShadow: 3,
                  mb: 4,
                }}
              >
                <Typography sx={{ fontSize: '16px', color: '#666', mb: 2 }}>
                  Performance
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Line data={priceData} options={priceOptions} />
                </Box>
              </Box>
            </Grid>

           
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: 'white',
                  borderRadius: '10px',
                  p: 2,
                  boxShadow: 3,
                  mb: 4,
                }}
              >
                <Typography sx={{ fontSize: '16px', color: '#666', mb: 2 }}>
                  Performance
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Pie data={distributionData} options={distributionOptions} />
                </Box>
              </Box>
            </Grid>
          </Grid> */}
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
