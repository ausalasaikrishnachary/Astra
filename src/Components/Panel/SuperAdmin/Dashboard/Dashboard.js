import React from 'react';
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
import SuperAdmin from "../../../Shared/SuperAdmin/SuperAdmin";

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
        labels: ['Apartments', 'Villas', 'Commercial Spaces'],
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
          title: "Total Portfolio Value",
          value: "4.5 Cr",
          // subtext: "Last 7 Days",
        },
        {
          title: "Total Performance",
          value: "22.30%",
          // subtext: "+2.3% from last week",
        },
        {
          title: "Total amount Invested",
          value: "10.5L",
          // subtext: "+12% increase",
        },
        ,
        {
          title: "Number of Assets",
          value: "2",
          // subtext: "+12% increase",
        },
        ,
        {
          title: "Total Interest",
          value: "10%",
          // subtext: "+12% increase",
        },
      ];
  return (
    <>
    <SuperAdmin/>
    <Box
        sx={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/contemporary-building-blur_23-2147694747.jpg')",
          minHeight: '100vh',
          backgroundSize: 'cover',
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
            Super Admin Dashboard
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

          {/* Analytics Section */}
          <Typography
            variant="h5"
            sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, mt: 4, mb: 3, pl: 2, textAlign: "center" }}
          >
            Analytics
          </Typography>

          <Grid container spacing={3}>
            {/* Line Chart Card */}
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
                  Luxury apartment (ABC) Performance
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Line data={priceData} options={priceOptions} />
                </Box>
              </Box>
            </Grid>

            {/* Pie Chart Card */}
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
                  Commercial Space (ABC) Performance
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Pie data={distributionData} options={distributionOptions} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Dashboard
