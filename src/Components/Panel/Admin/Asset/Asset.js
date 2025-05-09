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
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AssetDashboard = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [counts, setCounts] = useState({});
  const [sortBy, setSortBy] = useState("latest");

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
    navigate('/a-addasset');
  };

  const filteredAssets = assets.filter(asset =>
    ["property_name", "description", "city", "state"].some(field =>
      asset[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    asset.property_value?.toString().includes(searchTerm) // Search by property value
  );
  

  const handleEdit = (assetId) => {
    navigate(`/a-edit-asset`, { state: { assetId } });
    console.log("Edit asset with ID:", assetId);
  };

  const handleDelete = (assetId) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      fetch(`http://175.29.21.7:83/property/${assetId}/`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            window.location.reload(); // Reloads the page after successful deletion
          } else {
            throw new Error("Failed to delete asset");
          }
        })
        .catch((error) => console.error("Error deleting asset:", error));
    }
  };


  // const summaryCardsData = [
  //   {
  //     title: "Total Assets",
  //     value: counts.total_properties || "Loading...", // Dynamic value
  //   },
  //   {
  //     title: "Total Value",
  //     value: counts.total_properties_value ? `₹${counts.total_properties_value}` : "Loading...", // Dynamic value
  //   },
  //   {
  //     title: "Active Units",
  //     value: counts.total_properties_available_units || "Loading...", // Dynamic value
  //   },
  // ];



  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortBy === "latest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortBy === "price-high") return b.property_value - a.property_value;
    if (sortBy === "price-low") return a.property_value - b.property_value;
    return 0;
  });

  return (
    <>
      <Header />
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
                      borderColor: '#2c3e50'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2c3e50'
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
            <Grid item xs={12} md={3} lg={2}>
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
            </Grid>
          </Grid>
        </Box>
        {/* Stats Cards */}
        {/* <Grid container spacing={2} sx={{ mb: 4 }}>
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
        </Grid> */}
        <Grid container spacing={2}>
          {sortedAssets.map((asset, index) => (
            <Grid item xs={12} md={6} lg={4} key={index} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  // boxShadow: '0 4px 5px rgba(0, 0, 0, 0.749)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  backgroundColor: 'white',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 5px rgba(0, 0, 0, 0.749)',
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
                        <Typography variant="body2" fontWeight="bold" color="#2c3e50" align="right">
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
                    <Typography variant="body2" color="#2c3e50" mb={0.5}>
                      Funding Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={60}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#2c3e50", // custom progress bar color
                        },
                        backgroundColor: "#e0e0e0", // optional: change track color
                      }}
                    />
                    <Typography variant="caption" color="#2c3e50" display="block" mt={0.5}>
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
                      <IconButton
                        sx={{ color: '#2c3e50', '&:hover': { color: '#2c3e50' } }}
                        onClick={() => handleOpenDialog(asset)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#FFC107", "&:hover": { color: "#FF9800" } }}
                        onClick={() => handleEdit(asset.property_id)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        sx={{ color: "#F44336", "&:hover": { color: "#D32F2F" } }}
                        onClick={() => handleDelete(asset.property_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
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
                <Button onClick={handleCloseDialog} color="#2c3e50">Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </>
  );
};

export default AssetDashboard;
