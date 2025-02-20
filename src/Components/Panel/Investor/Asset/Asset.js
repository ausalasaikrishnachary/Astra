import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardMedia,
  CardContent,
  ButtonGroup,
  Grid,
} from '@mui/material';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Asset Value Icon

import image1 from '../images/pic1.jpeg';
import image2 from '../images/pic2.jpeg';
import image3 from '../images/pic3.jpeg';
import AssetDetailModal from './AssetDetailModal';  // Import the modal component
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useNavigate } from "react-router-dom";

const AssetsPage = () => {
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);  // State to control modal visibility
  const [selectedAsset, setSelectedAsset] = useState(null);  // Store selected asset details

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1); // reset to first page when sorting changes
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // reset to first page when search changes
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = (totalPages) => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);  // Set the selected asset
    setOpenModal(true);  // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);  // Close the modal
  };

  // Added a dummy "date" property for demonstration of sorting by date.
  const cards = [
    {
      id: 1,
      image: image1,
      leftText: 'Pune Industrial-oppurtunity',
      rightText: '100% Funded',
      date: '2025-01-01',
    },
    {
      id: 2,
      image: image2,
      leftText: 'Goa Industrial-oppurtunity',
      rightText: '100% Funded',
      date: '2025-02-01',
    },
    {
      id: 3,
      image: image3,
      leftText: 'Hyd Industrial-oppurtunity',
      rightText: '100% Funded',
      date: '2025-03-01',
    },
  ];

  // Filter cards based on search query
  const filteredCards = cards.filter((card) =>
    card.leftText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort the filtered cards based on the sortBy state
  if (sortBy === 'name') {
    filteredCards.sort((a, b) => a.leftText.localeCompare(b.leftText));
  } else if (sortBy === 'date') {
    filteredCards.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === 'status') {
    filteredCards.sort((a, b) => a.rightText.localeCompare(b.rightText));
  }

  // Calculate pagination values based on filteredCards
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const displayedCards = filteredCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  // If the current page becomes invalid due to filtering, reset it.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <InvestorHeader />
      <Box p={2}>
        {/* Heading */}
        <Typography variant="h4" sx={{ marginLeft: '10px',textAlign:"center" }}>
          Assets
        </Typography>

        {/* Row containing search, sort by, and filter button */}
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
          <Grid container spacing={2} sx={{ width: '60%' }}>
            {/* Search bar */}
            <Grid item xs={6}>
              <TextField
                label="Search Assets"
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Grid>

            {/* Sort by dropdown */}
            <Grid item xs={4}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by"
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Filter button */}
            <Grid item xs={2}>
              <Button variant="outlined" color="primary" fullWidth>
                Filter
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box mt={1} p={3}>
        <Box p={2}>
          <Grid container spacing={2}>
            {displayedCards.map((card) => (
              <Grid item xs={12} sm={4} key={card.id}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Box p={2}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={card.image}
                      alt={`Card image ${card.id}`}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Box>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1">{card.leftText}</Typography>
                      <Typography variant="body2">{card.rightText}</Typography>
                    </Box>
                    {/* IRR and Gross Entry Yield Section */}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      {/* Target IRR */}
                      <Box display="flex" alignItems="center">
                        <TrendingUpIcon color="primary" sx={{ marginRight: 1 }} />
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                          <Typography variant="body2">Target IRR</Typography>
                          <Typography variant="h6" fontWeight="bold">
                            13%
                          </Typography>
                        </Box>
                      </Box>

                      {/* Gross Entry Yield */}
                      <Box display="flex" alignItems="center">
                        <BarChartIcon color="secondary" sx={{ marginRight: 1 }} />
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                          <Typography variant="body2">Gross Entry Yield</Typography>
                          <Typography variant="h6" fontWeight="bold">
                            8.1%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Asset Value & Type Section */}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      {/* Asset Value */}
                      <Box display="flex" alignItems="center">
                        <AttachMoneyIcon color="success" sx={{ marginRight: 1 }} />
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                          <Typography variant="body2">Asset Value</Typography>
                          <Typography variant="h6" fontWeight="bold">
                            30 Cr
                          </Typography>
                        </Box>
                      </Box>

                      {/* Asset Type */}
                      <Box display="flex" alignItems="center">
                        <BarChartIcon color="secondary" sx={{ marginRight: 1 }} />
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                          <Typography variant="body2">Asset Type</Typography>
                          <Typography variant="h6" fontWeight="bold">
                            Industrial
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Three Buttons - Column Wise */}
                    <Box display="flex" flexDirection="column" alignItems="center" mt={2} gap={1}>
                      <Button variant="contained" color="primary" fullWidth>
                        Join Waitlist
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => handleViewDetails(card)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => navigate("/investment-page")}
                      >
                        Invest Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={1} mb={4} mr={5}>
        <ButtonGroup sx={{ gap: 0 }}>
          <Button
            variant="contained"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            sx={{
              backgroundColor: '#8FD14F',
              color: 'white',
              '&:hover': {
                backgroundColor: '#8FD14F',
              },
              '&:disabled': {
                backgroundColor: '#C8E6A4',
                color: 'white',
              },
            }}
          >
            Previous
          </Button>
          <Typography
            variant="body1"
            sx={{
              border: '1px solid #ddd',
              padding: '4px 12px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {currentPage}
          </Typography>
          <Button
            variant="contained"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => handleNextPage(totalPages)}
            sx={{
              backgroundColor: '#8FD14F',
              color: 'white',
              '&:hover': {
                backgroundColor: '#8FD14F',
              },
              '&:disabled': {
                backgroundColor: '#C8E6A4',
                color: 'white',
              },
            }}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>

      {/* Modal for showing asset details */}
      {selectedAsset && (
        <AssetDetailModal
          open={openModal}
          handleClose={handleCloseModal}
          assetDetails={selectedAsset}
        />
      )}
    </>
  );
};

export default AssetsPage;
