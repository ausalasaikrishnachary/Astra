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
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';

const PurchasedAssets = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [propertyId, setPropertyId] = useState([]);
  const [purchasedUnits, setpurchasedUnits] = useState([]);


  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    fetch(`http://175.29.21.7:83/transactions/user-id/${userId}/payment-type/Full-Payment/`)
      .then(response => {
        // Check if response is valid JSON
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const ids = data.map(item => item.property_id);
          setPropertyId(ids);
          const purchasedUnits = data.map(item => item.purchased_units);
          setpurchasedUnits(purchasedUnits);
          console.log("Property IDs:", ids);
          console.log("purchasedUnits:", purchasedUnits);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch(`http://175.29.21.7:83/property/${propertyId}/`)
      .then(response => response.json())
      .then(data => setAssets(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleOpenDialog = (asset) => {
    setSelectedAsset(asset);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAsset(null);
  };

  const filteredAssets = assets.filter(asset =>
    asset.property_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <InvestorHeader />
      <Container sx={{ py: 4 }}>
        <Box
          sx={{
            backgroundColor: 'white',
            p: 2.5,
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            mb: 4
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Search Input */}
            <Grid item xs={12} md={6} lg={7}>
              <TextField
                placeholder="Search assets..."
                fullWidth
                variant="outlined"
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
                  defaultValue="latest"
                  sx={{
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'white',
                    border: '1px solid #E0E0E0'
                  }}
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        <Grid container spacing={2}>
          {filteredAssets.map((asset, index) => (
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
                  {/* {console.log(`http://175.29.21.7:83${asset.property_image}`)} */}
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
                        <Typography variant="body2" fontWeight="bold" color="#4A90E2" align="right">
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

                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#4A90E2', '&:hover': { backgroundColor: '#357ABD' },marginBottom:"10px", }}
                      onClick={() => handleOpenDialog(asset)}
                    >
                      View Details
                    </Button>

                    <Grid item>
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width:"340px",
                        }}>
                      </Grid>
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
                    <Typography variant="body2" color="text.secondary" gutterBottom>Asset Type: <strong>{selectedAsset.property_type}</strong></Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Location: <strong>{selectedAsset.address},{selectedAsset.city}, {selectedAsset.state}, {selectedAsset.pin_code}</strong></Typography>
                    {/* <Typography variant="body2" color="text.secondary" gutterBottom>No of Investors: <strong>{selectedAsset.no_of_investors}</strong></Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Total Units: <strong>{selectedAsset.total_units}</strong></Typography> */}
                    <Typography variant="body2" color="text.secondary" gutterBottom>Purchased Units: <strong>{purchasedUnits}</strong></Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </>
  );
};

export default PurchasedAssets;
