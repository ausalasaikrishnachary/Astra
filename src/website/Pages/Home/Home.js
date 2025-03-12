import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  Avatar,
} from '@mui/material';
import { Check, AArrowDown as Add, Move as Remove } from 'lucide-react';
import CheckIcon from '@mui/icons-material/Check';
import img1 from './../../../Images/4k-architecture.jpg'
import img2 from './../../../Images/images.jpeg';
import { faker } from '@faker-js/faker';
import "./Home.css"
import Logo from '../../Images/Logo File.png';
import StatsSection from './CountingCard';
import Divider from '@mui/material/Divider';

const Home = () => {
  const [searchBy, setSearchBy] = useState("value");

  const [investment, setInvestment] = useState(1000000);
  const [years, setYears] = useState(5);
  const teamMembers = [
    {
      role: 'Chief Executive Officer (CEO)',
      description: 'Leads key decision-making and partnerships.',
      experience: [
        '10+ years in investment banking, finance, or real estate.',
        'Strong leadership, strategic planning, and risk management skills.',
        'Extensive experience in managing large-scale investment portfolios, including multi-million dollar assets.'
      ],
      image: 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg'
    },
    {
      role: 'Chief Financial Officer (CFO)',
      description: 'Leads financial planning, budgeting, and investment risk management.',
      experience: [
        '8+ years in finance, accounting, or wealth management.',
        'Strong analytical skills, financial forecasting, and risk assessment.',
        'Experience in managing large-scale investment budgets and financial audits.'
      ],
      image: 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg'
    },
    {
      role: 'Chief Investment Officer (CIO)',
      description: 'Manages investment strategies, market analysis.',
      experience: [
        '10+ years in asset management, stock markets, or real estate investments.',
        'Expertise in financial modeling, risk mitigation, and high-return strategies.',
        'Proven track record in achieving consistent investment growth and managing diversified portfolios.'
      ],
      image: 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg'
    }
  ];


  const investmentOptions = [
    {
      title: "Commercial Real Estate",
      amount: "1,950,000",
      xirr: "17.1% XIRR since 2018",
      extra: "Monthly income of *7500",
    },
    {
      title: "Fixed Deposit",
      amount: "1,360,000",
      xirr: "7.2% XIRR since 2018",
    },
    {
      title: "Gold",
      amount: "1,437,981",
      xirr: "8.76% XIRR since 2018",
    },
    {
      title: "Stocks & Mutual Funds",
      amount: "1,600,000",
      xirr: "12% XIRR since 2018",
    },
  ];

  return (
    <>
      {/* Hero Section - Updated to match the design in Image 1 */}

      <Box
        sx={{
          background: 'linear-gradient(rgba(30, 30, 60, 0.85), rgba(30, 30, 60, 0.85)), url(https://img.freepik.com/free-photo/big-buildings_1127-2221.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          pt: 6,
          pb: 10
        }}
      >
        <Box
          component="img"
          src={Logo} // Replace with your logo URL or import
          alt="Astra Logo"
          sx={{
            display: 'block',
            mx: 'auto', // centers the logo horizontally
            mb: 2,      // adds spacing below the logo
            height: "100px",
            transform: 'scale(2.5)',
          }}
        />
        <Container maxWidth="lg">
          <Box className="home-hero-content">
            <Container maxWidth="lg">
              <Box className="home-hero-content" sx={{ textAlign: 'center', mt: 8 }}>
                {/* Logo added above the heading */}
                <Typography variant="h3" align="center" fontWeight="bold" gutterBottom >
                  Astra revolutionizes the real estate industry with impactful innovation.
                </Typography>
                <Typography variant="h6" sx={{ color: '#636363', textAlign: "justify" }}>
                  Astra is a forward-thinking commercial real estate investment firm, built on the principle that a strategic, value-driven approach in the overlooked middle market can yield outstanding returns. We invest across various asset types, risk levels, and locations, always prioritizing exceptional risk-adjusted gains for our clients. Our clientele includes endowments, foundations, wealth managers, family offices, and individual investors.
                </Typography>
                <StatsSection />
              </Box>
            </Container>

            <Box sx={{ my: 4 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Make your portfolio robust
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Explore exclusive selections
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Find your preferred asset & invest today
              </Typography>
            </Box>

            {/* Property Card within Hero */}
            <Card sx={{ maxWidth: 500, bgcolor: 'white', color: 'black', borderRadius: 2, mt: 4 }}>
              <Box sx={{ bgcolor: 'success.main', py: 1, px: 2, color: 'white' }}>
                <Typography variant="body1" fontWeight="bold">Fully Funded</Typography>
              </Box>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      src={img1}
                      alt="Healthcare Property"
                      sx={{ width: '100%', borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6" fontWeight="bold">Greenmark Villa</Typography>
                    <Typography variant="body2" color="text.secondary">Hosur</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Box>
                        <Typography variant="caption">Gross Entry Yield</Typography>
                        <Typography variant="body2" fontWeight="bold">9.02%</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption">Asset Value</Typography>
                        <Typography variant="body2" fontWeight="bold">₹45,00,00,000</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption">Target IRR</Typography>
                        <Typography variant="body2" fontWeight="bold">13.4%</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{ height: 6, borderRadius: 1 }}
                        color="success"
                      />
                      <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>
                        100% Funded
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Button variant="contained" size="small" sx={{ bgcolor: '#333', '&:hover': { bgcolor: '#222' } }}>
                        Invest Now
                      </Button>
                      <Button variant="outlined" size="small" sx={{ color: '#333', borderColor: '#ccc' }}>
                        View Details
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Button
              variant="contained"
              sx={{ mt: 4, bgcolor: 'white', color: 'black', '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              All Properties
            </Button>

            {/* App Download Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Box
                component="img"
                src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                alt="Download on App Store"
                sx={{ height: 40 }}
              />
              <Box
                component="img"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                sx={{ height: 40 }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container sx={{ mt: 6, mb: 6 }} maxWidth="lg">
          {/* Section Heading */}
          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 5 }}>
            Company Tour
          </Typography>

          <Grid container spacing={4}>

            {/* Left Side - Benefits Cards in 2x2 Grid */}
    <Grid item xs={8} md={6}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, pl: 1 }}>
        Key Benefits
      </Typography>
      <Grid container spacing={7.5}>
        {[
          { icon: "≡", title: "Stable Asset Class", description: "Lower volatility compared to public markets" },
          { icon: "↑", title: "Monthly Cashflow", description: "Consistent passive income generation" },
          { icon: "◢", title: "Capital Appreciation", description: "Property value growth over time" },
          { icon: "□○", title: "Portfolio Diversification", description: "Reduced overall investment risk" }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 3,
                
              }}
            >
              <Box sx={{ 
                fontSize: 36, 
                fontWeight: "bold", 
                mb: 2, 
                color: "#1976d2"
              }}>
                {item.icon}
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>

            {/* Right Side - Asset Comparison Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                CRE vs. Other Asset Classes
              </Typography>

              {/* Quadrant Chart Layout */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  gap: 2,
                  border: "2px solid #ddd",
                  position: "relative",
                  p: 3,
                  height: 400
                }}
              >
                {/* Axes Labels */}
                <Typography sx={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", fontWeight: "bold" }}>
                  Stable
                </Typography>
                <Typography sx={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", fontWeight: "bold" }}>
                  Volatile
                </Typography>
                <Typography sx={{ position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", fontWeight: "bold" }}>
                  Lower Returns
                </Typography>
                <Typography sx={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)", fontWeight: "bold" }}>
                  Higher Returns
                </Typography>

                {/* Quadrant Boxes */}
                {[
                  { title: "Residential Properties", bg: "#fff" },
                  { title: "Commercial Real Estate", bg: "#f5d7a1", fontWeight: "bold" },
                  { title: "Gold", bg: "#fff" },
                  { title: "Stocks & Mutual Funds", bg: "#fff" }
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: item.bg,
                      fontWeight: item.fontWeight || "normal",
                      p: 2,
                    }}
                  >
                    <Typography variant="body2" align="center">{item.title}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>


        {/* Team Section */}
        <Container sx={{ mt: 4, mb: 4 }} maxWidth={false} >
          <Typography variant="h4" align="center" sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={3}>
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      src={member.image || "https://www.w3schools.com/w3images/avatar5.png"}
                      sx={{
                        width: 150,
                        height: 150,
                        mx: 'auto',
                        mb: 3
                      }}
                    />
                    {/* Combined Role & Description */}
                    <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                      <strong>Role:</strong> {member.role} - {member.description}
                    </Typography>
                    {/* Combined Experience */}
                    <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                      <strong>Experience:</strong> {member.experience.join(' | ')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;