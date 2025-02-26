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
  Divider,
} from '@mui/material';
import { Check, AArrowDown as Add, Move as Remove } from 'lucide-react';
import CheckIcon from '@mui/icons-material/Check';
import img1 from './../../../Images/4k-architecture.jpg'
import img2 from './../../../Images/images.jpeg';
import { faker } from '@faker-js/faker';

const PropertyCard = () => {
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
        'Experience in handling large-scale investment portfolios.'
      ],
      image: 'https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png' // Fixed avatar image
    },
    {
      role: 'Chief Financial Officer (CFO)',
      description: 'Leads financial planning, budgeting, and investment risk management.',
      experience: [
        '8+ Years in finance, accounting, or wealth management.',
        'Strong analytical skills, financial forecasting, and risk assessment.',
        'Experience in managing large-scale investment budgets and financial audits.'
      ],
      image: 'https://tse4.mm.bing.net/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH&pid=Api&P=0&h=180' // Fixed avatar image
    },
    {
      role: 'Chief Investment Officer (CIO)',
      description: 'Manages investment strategies, market analysis, and portfolio optimization.',
      experience: [
        '10+ years in asset management, stock markets, or real estate investments.',
        'Expertise in financial modeling, risk mitigation and high-return strategies.',
        'Organized'
      ],
      image: 'https://i.pravatar.cc/150?img=12' // Fixed avatar image
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
    <Paper
            sx={{
              position: 'relative',
              height: '60vh',
              
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `linear-gradient(rgba(26, 32, 44, 0.7), rgba(45, 55, 72, 0.7)), `,
              display: 'flex',
              alignItems: 'center',
              mb: 8
            }}
          >
  <Container maxWidth="lg" 
      >
  <Box className="home-hero-content" sx={{ textAlign: 'center' }}>
    <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
      Astra revolutionizes the real estate industry with impactful innovation.
    </Typography>
    <Typography variant="h6" sx={{ color: '#636363' }}>
      Astra is a forward-thinking commercial real estate investment firm, built on the principle that a strategic, value-driven approach in the overlooked middle market can yield outstanding returns. We invest across various asset types, risk levels, and locations, always prioritizing exceptional risk-adjusted gains for our clients. Our clientele includes endowments, foundations, wealth managers, family offices, and individual investors.
    </Typography>
  </Box>
</Container>
</Paper>

    <Box >
      {/* Properties Section */}
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Properties</Typography>
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
      <Container sx={{ mt: 4 }}>
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
      sx={{ px: 5 }}
    >
      View All
    </Button>
  </Box>
      </Container>

      {/* Returns Calculator Section */}
      <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
      
        <Grid item xs={12} md={3}>
          <Typography variant="h4" fontWeight="bold">
            Earn higher return
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            with oneastrarealtech
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Own your bit with the most dependable fractional ownership company.
          </Typography>
        </Grid>

      
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ p: 3 }}>
            <CardContent>
              <Typography>If I invest a sum of</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
                <IconButton onClick={() => setInvestment((prev) => Math.max(0, prev - 100000))}>
                  <Remove />
                </IconButton>
                <Typography variant="h6">{investment.toLocaleString()} rupees</Typography>
                <IconButton onClick={() => setInvestment((prev) => prev + 100000)}>
                  <Add />
                </IconButton>
              </Box>

              <Typography sx={{ mt: 3 }}>For a period of</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
                <IconButton onClick={() => setYears((prev) => Math.max(1, prev - 1))}>
                  <Remove />
                </IconButton>
                <Typography variant="h6">{years} years</Typography>
                <IconButton onClick={() => setYears((prev) => prev + 1)}>
                  <Add />
                </IconButton>
              </Box>

              <Button variant="contained" color="primary" sx={{ mt: 3, width: "100%" }}>
                Show Me Returns
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Third Column */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            {investmentOptions.map((item, index) => (
              <Grid item xs={6} key={index}>
                <Card elevation={3} sx={{ p: 1, textAlign: "center" }}>
                  <CardContent>
                    <Typography>{item.title}</Typography>
                    <Typography variant="h4" sx={{ my: 1 }}>
                      {item.amount}
                    </Typography>
                    <Typography>{item.xirr}</Typography>
                    {item.extra && (
                      <Button variant="text" sx={{ mt: 1 }}>
                        {item.extra}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>

      {/* Company Tour Section */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">Company Tour:</Typography>
        <Typography sx={{ mt: 1 }}>
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

      {/* Team Section */}
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Our Team:
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
          <Grid container spacing={2}>
            <Grid item xs={4} sx={{ textAlign: 'right' }}>
              <Typography fontWeight="bold">Role:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{member.role}</Typography>
              <Typography variant="body2" color="text.secondary">
                {member.description}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={4} sx={{ textAlign: 'right' }}>
              <Typography fontWeight="bold">Experience:</Typography>
            </Grid>
            <Grid item xs={8}>
              <List dense>
                {member.experience.map((exp, i) => (
                  <ListItem key={i} sx={{ px: 0 }}>
                    <ListItemText primary={exp} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
      </Container>

      {/* Partners Guidelines Section */}
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4">Partners Guidelines:</Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>Who Can Be Our Partners?</Typography>
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

export default PropertyCard;