import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../../Shared/Navbar/Navbar';
import { useNavigate } from "react-router-dom";
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';

const AssetDashboard = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const [counts, setCounts] = useState({});

  useEffect(() => {
    fetch("http://175.29.21.7:83/property/")
      .then(response => response.json())
      .then(data => setAssets(data))
      .catch(error => console.error("Error fetching data:", error));

    // Fetch the counts data
    fetch("http://175.29.21.7:83/counts/")
      .then(response => response.json())
      .then(data => setCounts(data))
      .catch(error => console.error("Error fetching counts:", error));
  }, []);

  const handleOpenDialog = (asset) => {
    setSelectedAsset(asset);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAsset(null);
  };

  const handleClick = () => {
    navigate('/p-addasset');
  };


  const summaryCardsData = [
    {
      title: "Total Assets",
      value: counts.total_properties || "0", // Dynamic value
    },
    {
      title: "Total Value",
      value: counts.total_properties_value ? `₹${counts.total_properties_value}` : "0", // Dynamic value
    },
    {
      title: "Active Units",
      value: counts.total_properties_available_units || "0", // Dynamic value
    },
  ];

  const filteredAssets = assets.filter(asset =>
    ["property_name", "description", "city", "state"].some(field =>
      asset[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    asset.property_value?.toString().includes(searchTerm) // Search by property value
  );

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortBy === "latest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortBy === "price-high") return b.property_value - a.property_value;
    if (sortBy === "price-low") return a.property_value - b.property_value;
    return 0;
  });

  return (
    <>
      <PartnerHeader />
      <Container sx={{ py: 4 }}>
        <Box
          sx={{
            backgroundColor: 'white',
            p: 2.5,
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            mb: 4,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Search Input */}
            <Grid item xs={12} md={6} lg={7}>
              <TextField
                placeholder="Search by name or value..."
                fullWidth
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#757575' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '8px',
                    fontSize: '15px'
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E0E0E0'
                    },
                    '&:hover fieldset': {
                      borderColor: '#4A90E2'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4A90E2'
                    }
                  }
                }}
              />

            </Grid>

            {/* Filter Select */}
            <Grid item xs={12} md={3} lg={3}>
              <FormControl fullWidth>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ borderRadius: "8px", fontSize: "15px" }}
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Add Asset Button */}
            {/* <Grid item xs={12} md={3} lg={2}>
              <Button
                onClick={handleClick}
                variant="contained"
                fullWidth
                startIcon={<AddIcon />}
                sx={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  backgroundColor: '#2ECC71',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#27AE60',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Add Asset
              </Button>
            </Grid> */}
          </Grid>
        </Box>
        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
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
        <Grid container spacing={2}>
          {sortedAssets.map((asset, index) => (
            <Grid item xs={12} md={6} lg={4} key={index} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 4px 5px rgba(0, 0, 0, 0.749)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  backgroundColor: 'white',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  {console.log(`http://175.29.21.7:83${asset.property_image}`)}
                  <CardMedia
                    component="img"
                    image={`http://175.29.21.7:83${asset.property_image}`}
                    alt={asset.property_name}
                    sx={{ height: 220, objectFit: 'cover' }}
                  />

                  {/* <Chip
                    label={asset.listing_status}
                    sx={{
                      position: 'absolute',
                      top: 15,
                      right: 15,
                      backgroundColor: asset.listing_status === 'available' ? '#2ECC71' : '#E74C3C',
                      color: 'white',
                    }}
                  /> */}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {asset.property_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {asset.description}
                  </Typography>
                  <Box sx={{ backgroundColor: '#F8F9FA', borderRadius: 1, p: 1.5, mb: 2 }}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Asset Value
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight="bold" color=" #2c3e50" align="right">
                          ₹{asset.property_value}/-
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Location
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight="bold" color="text.secondary" align="right">
                          {asset.city}, {asset.state}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Funding Loading Section */}

                  <Box sx={{ px: 2, pb: 2 }}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Funding Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={60}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#2c3e50',
                        },
                        backgroundColor: '#e0e0e0', // Optional: set a lighter background
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                      60% funded
                    </Typography>
                  </Box>

                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="body2" color="text.secondary">
                        Available Units
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="#2ECC71">
                        {asset.available_units}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#4A90E2', '&:hover': { backgroundColor: '#357ABD' } }}
                        onClick={() => handleOpenDialog(asset)}
                      >
                        View Details
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
          {selectedAsset && (
            <>
              <DialogTitle>{selectedAsset.property_name}</DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      component="img"
                      src={`http://175.29.21.7:83${selectedAsset.property_image}`}
                      alt="Pune Property"
                      sx={{ width: '100%', borderRadius: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>{selectedAsset.description}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Asset Value: <strong>₹{selectedAsset.property_value}/-</strong></Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Location: <strong>{selectedAsset.city}, {selectedAsset.state}</strong></Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>No of Investors: <strong>{selectedAsset.no_of_investors}</strong></Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Total Units: <strong>{selectedAsset.total_units}</strong></Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Available Units: <strong>{selectedAsset.available_units}</strong></Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
               <Button onClick={handleCloseDialog} color="000000DE">Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </>
  );
};

export default AssetDashboard;
