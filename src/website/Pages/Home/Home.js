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
   
        <Container maxWidth="lg">
          <Box className="home-hero-content" sx={{ textAlign: 'center' }}>
            {/* Logo added above the heading */}
            <Box
              component="img"
              src={Logo} // Replace with your logo URL or import
              alt="Astra Logo"
              sx={{
                display: 'block',
                mx: 'auto', // centers the logo horizontally
                mb: 2,      // adds spacing below the logo
                height:"100px",
                transform: 'scale(2.5)',
              }}
            />
            <Typography variant="h3" align="center" fontWeight="bold" gutterBottom >
              Astra revolutionizes the real estate industry with impactful innovation.
            </Typography>
            <Typography variant="h6" sx={{ color: '#636363', textAlign: "justify" }}>
              Astra is a forward-thinking commercial real estate investment firm, built on the principle that a strategic, value-driven approach in the overlooked middle market can yield outstanding returns. We invest across various asset types, risk levels, and locations, always prioritizing exceptional risk-adjusted gains for our clients. Our clientele includes endowments, foundations, wealth managers, family offices, and individual investors.
            </Typography>
            <StatsSection/>
          </Box>
          
        </Container>
        <Divider/>
      
      <Box >
        {/* Properties Section */}
        <Container disableGutters maxWidth={false} sx={{  p: 4 }}>
          <Typography variant="h4" sx={{ textAlign:"center",fontWeight:"bold" }}>Properties</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>Search by:</Typography>
            <FormControl sx={{ minWidth: 150 }}>
              <Select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                size="small"
              >
                <MenuItem value="value">Value</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="location">Location</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Container>

        {/* Property Cards */}
        <Container sx={{ mt: 4 }} maxWidth={false} >
          <Grid container spacing={4}>
            {/* First Property Card */}
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                      <CardMedia
                        component="img"
                        image={img1}
                        alt="Property"
                        sx={{
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'primary.main',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Typography variant="h5" fontWeight="bold">Greenmark Villa</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Address: 2-11-4/2, Hyderabad, Telangana.
                      </Typography>

                      <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={4} sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" fontWeight="bold">Gross Entry Yield</Typography>
                            <Typography color="success.main">9.02%</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" fontWeight="bold">Asset Value</Typography>
                            <Typography color="success.main">₹45,00,00,000</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" fontWeight="bold">Target IRR</Typography>
                            <Typography color="success.main">13.4%</Typography>
                          </Grid>
                        </Grid>
                      </Paper>

                      <Box sx={{ mb: 3 }}>
                        <LinearProgress
                          variant="determinate"
                          value={100}
                          sx={{ height: 8, borderRadius: 1 }}
                          color="success"
                        />
                        <Typography color="success.main" fontWeight="bold" sx={{ mt: 1 }}>
                          100% Funded
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary">
                          Join in Wait List
                        </Button>
                        <Button variant="outlined">
                          View Details
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Second Property Card */}
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                      <CardMedia
                        component="img"
                        image={img2}
                        alt="Property"
                        sx={{
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'primary.main',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Typography variant="h5" fontWeight="bold">Greenmark Villa</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Address: 2-11-4/2, Hyderabad, Telangana.
                      </Typography>

                      <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={4} sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" fontWeight="bold">Gross Entry Yield</Typography>
                            <Typography color="success.main">9.02%</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" fontWeight="bold">Asset Value</Typography>
                            <Typography color="success.main">₹45,00,00,000</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" fontWeight="bold">Target IRR</Typography>
                            <Typography color="success.main">13.4%</Typography>
                          </Grid>
                        </Grid>
                      </Paper>

                      <Box sx={{ mb: 3 }}>
                        <LinearProgress
                          variant="determinate"
                          value={100}
                          sx={{ height: 8, borderRadius: 1 }}
                          color="success"
                        />
                        <Typography color="success.main" fontWeight="bold" sx={{ mt: 1 }}>
                          100% Funded
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary">
                          Join in Wait List
                        </Button>
                        <Button variant="outlined">
                          View Details
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              component={Link}
              to="/properties"
              variant="contained"
              color="inherit"
              sx={{ px: 5,mb:"30px" }}
            >
              View All
            </Button>
          </Box>
        </Container>
        <hr/>



        {/* Team Section */}
        {/* Team Section */}
        <Container sx={{ mt: 4, mb: 4 }} maxWidth={false} >
          <Typography variant="h4" align="center" sx={{ mb: 4, textAlign:"center",fontWeight:"bold" }}>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={3}>
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      src={member.image}
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


        {/* Company Tour Section */}
        <Container sx={{ mt: 6, }} >
          <Typography variant="h4" sx={{textAlign:"center",fontWeight:"bold",mb:2}}>Company Tour</Typography>
          <Typography sx={{ mt: 1,textAlign:"center",fontWeight:"bold" }}>
            Take a tour of the office to explore the workplace and facilities.
          </Typography>
          <Box sx={{ mt: 2, position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="YouTube Video"
              allowFullScreen
            />
          </Box>
        </Container>


        {/* Partners Guidelines Section */}
        <Container sx={{ mt: 6, mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{textAlign:"center",fontWeight:"bold"}}>Partners Guidelines</Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>Who Can Be Our Partners ?</Typography>
            </Grid>
          </Grid>

          <Typography sx={{ mt: 2 }}>
            Our partners can be individuals or organizations who want to collaborate with us in bringing investment opportunities to a broader audience. We welcome:
          </Typography>

          <List>
            {[
              'Financial Advisors - Professionals who guide investors in making informed financial decisions.',
              'Real Estate Agents & Firms - Experts who can help investors navigate property-related investments.',
              'Investment Consultants - Specialists who analyze market trends and suggest profitable investment opportunities.',
              'Wealth Managers - Individuals who manage high-net-worth clients and their investments.',
              'Marketing & Referral Partners - Influencers, agencies, or businesses that help expand our network through promotions and referrals.',
              'Business Entities & Brokers - Companies or brokers who want to collaborate for mutual growth and better investment solutions.'
            ].map((item, index) => {
              // Split the item into title and description
              const [title, description] = item.split(' - ');

              return (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>{title}</strong> - {description}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>

          <Typography sx={{ mt: 2 }}>
            By partnering with us, you gain access to a trusted investment platform, exclusive opportunities, and financial growth while helping investors make smarter choices.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;