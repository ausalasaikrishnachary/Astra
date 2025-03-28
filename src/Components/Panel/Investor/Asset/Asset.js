// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   TextField,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Button,
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   ButtonGroup,
// //   Grid,
// // } from '@mui/material';
// // import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// // import BarChartIcon from "@mui/icons-material/BarChart";
// // import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Asset Value Icon

// // import image1 from '../images/pic1.jpeg';
// // import image2 from '../images/pic2.jpeg';
// // import image3 from '../images/pic3.jpeg';
// // import AssetDetailModal from './AssetDetailModal';  // Import the modal component
// // import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
// // import { useNavigate } from "react-router-dom";

// // const AssetsPage = () => {
// //   const [sortBy, setSortBy] = useState('');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const cardsPerPage = 3;
// //   const navigate = useNavigate();
// //   const [openModal, setOpenModal] = useState(false);  // State to control modal visibility
// //   const [selectedAsset, setSelectedAsset] = useState(null);  // Store selected asset details

// //   const handleSortChange = (event) => {
// //     setSortBy(event.target.value);
// //     setCurrentPage(1); // reset to first page when sorting changes
// //   };

// //   const handleSearchChange = (event) => {
// //     setSearchQuery(event.target.value);
// //     setCurrentPage(1); // reset to first page when search changes
// //   };

// //   const handlePrevPage = () => {
// //     if (currentPage > 1) setCurrentPage(currentPage - 1);
// //   };

// //   const handleNextPage = (totalPages) => {
// //     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// //   };

// //   const handleViewDetails = (asset) => {
// //     setSelectedAsset(asset);  // Set the selected asset
// //     setOpenModal(true);  // Open the modal
// //   };

// //   const handleCloseModal = () => {
// //     setOpenModal(false);  // Close the modal
// //   };

// //   // Added a dummy "date" property for demonstration of sorting by date.
// //   const cards = [
// //     {
// //       id: 1,
// //       image: image1,
// //       leftText: 'Pune Industrial-oppurtunity',
// //       rightText: '100% Funded',
// //       date: '2025-01-01',
// //     },
// //     {
// //       id: 2,
// //       image: image2,
// //       leftText: 'Goa Industrial-oppurtunity',
// //       rightText: '100% Funded',
// //       date: '2025-02-01',
// //     },
// //     {
// //       id: 3,
// //       image: image3,
// //       leftText: 'Hyd Industrial-oppurtunity',
// //       rightText: '100% Funded',
// //       date: '2025-03-01',
// //     },
// //   ];

// //   // Filter cards based on search query
// //   const filteredCards = cards.filter((card) =>
// //     card.leftText.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   // Sort the filtered cards based on the sortBy state
// //   if (sortBy === 'name') {
// //     filteredCards.sort((a, b) => a.leftText.localeCompare(b.leftText));
// //   } else if (sortBy === 'date') {
// //     filteredCards.sort((a, b) => new Date(a.date) - new Date(b.date));
// //   } else if (sortBy === 'status') {
// //     filteredCards.sort((a, b) => a.rightText.localeCompare(b.rightText));
// //   }

// //   // Calculate pagination values based on filteredCards
// //   const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
// //   const displayedCards = filteredCards.slice(
// //     (currentPage - 1) * cardsPerPage,
// //     currentPage * cardsPerPage
// //   );

// //   // If the current page becomes invalid due to filtering, reset it.
// //   useEffect(() => {
// //     if (currentPage > totalPages) {
// //       setCurrentPage(1);
// //     }
// //   }, [currentPage, totalPages]);

// //   return (
// //     <>
// //       <InvestorHeader />
// //       <Box p={2}>
// //         {/* Heading */}
// //         <Typography variant="h4" sx={{ marginLeft: '10px',textAlign:"center" }}>
// //           Assets
// //         </Typography>

// //         {/* Row containing search, sort by, and filter button */}
// //         <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
// //           <Grid container spacing={2} sx={{ width: '60%' }}>
// //             {/* Search bar */}
// //             <Grid item xs={6}>
// //               <TextField
// //                 label="Search Assets"
// //                 variant="outlined"
// //                 size="small"
// //                 fullWidth
// //                 value={searchQuery}
// //                 onChange={handleSearchChange}
// //               />
// //             </Grid>

// //             {/* Sort by dropdown */}
// //             <Grid item xs={4}>
// //               <FormControl variant="outlined" size="small" fullWidth>
// //                 <InputLabel id="sort-by-label">Sort By</InputLabel>
// //                 <Select
// //                   labelId="sort-by-label"
// //                   id="sort-by"
// //                   value={sortBy}
// //                   onChange={handleSortChange}
// //                   label="Sort By"
// //                 >
// //                   <MenuItem value="name">Name</MenuItem>
// //                   <MenuItem value="date">Date</MenuItem>
// //                   <MenuItem value="status">Status</MenuItem>
// //                 </Select>
// //               </FormControl>
// //             </Grid>

// //             {/* Filter button */}
// //             <Grid item xs={2}>
// //               <Button variant="outlined" color="primary" fullWidth>
// //                 Filter
// //               </Button>
// //             </Grid>
// //           </Grid>
// //         </Box>
// //       </Box>

// //       <Box mt={1} p={3}>
// //         <Box p={2}>
// //           <Grid container spacing={2}>
// //             {displayedCards.map((card) => (
// //               <Grid item xs={12} sm={4} key={card.id}>
// //                 <Card
// //                   sx={{
// //                     borderRadius: '12px',
// //                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
// //                   }}
// //                 >
// //                   <Box p={2}>
// //                     <CardMedia
// //                       component="img"
// //                       height="200"
// //                       image={card.image}
// //                       alt={`Card image ${card.id}`}
// //                       sx={{ borderRadius: '8px' }}
// //                     />
// //                   </Box>
// //                   <CardContent>
// //                     <Box display="flex" justifyContent="space-between">
// //                       <Typography variant="body1">{card.leftText}</Typography>
// //                       <Typography variant="body2">{card.rightText}</Typography>
// //                     </Box>
// //                     {/* IRR and Gross Entry Yield Section */}
// //                     <Box display="flex" justifyContent="space-between" mt={2}>
// //                       {/* Target IRR */}
// //                       <Box display="flex" alignItems="center">
// //                         <TrendingUpIcon color="primary" sx={{ marginRight: 1 }} />
// //                         <Box display="flex" flexDirection="column" alignItems="flex-start">
// //                           <Typography variant="body2">Target IRR</Typography>
// //                           <Typography variant="h6" fontWeight="bold">
// //                             13%
// //                           </Typography>
// //                         </Box>
// //                       </Box>

// //                       {/* Gross Entry Yield */}
// //                       <Box display="flex" alignItems="center">
// //                         <BarChartIcon color="secondary" sx={{ marginRight: 1 }} />
// //                         <Box display="flex" flexDirection="column" alignItems="flex-start">
// //                           <Typography variant="body2">Gross Entry Yield</Typography>
// //                           <Typography variant="h6" fontWeight="bold">
// //                             8.1%
// //                           </Typography>
// //                         </Box>
// //                       </Box>
// //                     </Box>

// //                     {/* Asset Value & Type Section */}
// //                     <Box display="flex" justifyContent="space-between" mt={2}>
// //                       {/* Asset Value */}
// //                       <Box display="flex" alignItems="center">
// //                         <AttachMoneyIcon color="success" sx={{ marginRight: 1 }} />
// //                         <Box display="flex" flexDirection="column" alignItems="flex-start">
// //                           <Typography variant="body2">Asset Value</Typography>
// //                           <Typography variant="h6" fontWeight="bold">
// //                             30 Cr
// //                           </Typography>
// //                         </Box>
// //                       </Box>

// //                       {/* Asset Type */}
// //                       <Box display="flex" alignItems="center">
// //                         <BarChartIcon color="secondary" sx={{ marginRight: 1 }} />
// //                         <Box display="flex" flexDirection="column" alignItems="flex-start">
// //                           <Typography variant="body2">Asset Type</Typography>
// //                           <Typography variant="h6" fontWeight="bold">
// //                             Industrial
// //                           </Typography>
// //                         </Box>
// //                       </Box>
// //                     </Box>

// //                     {/* Three Buttons - Column Wise */}
// //                     <Box display="flex" flexDirection="column" alignItems="center" mt={2} gap={1}>
// //                       <Button variant="contained" color="primary" fullWidth>
// //                         Join Waitlist
// //                       </Button>
// //                       <Button
// //                         variant="contained"
// //                         color="success"
// //                         fullWidth
// //                         onClick={() => handleViewDetails(card)}
// //                       >
// //                         View Details
// //                       </Button>
// //                       <Button
// //                         variant="outlined"
// //                         color="secondary"
// //                         fullWidth
// //                         onClick={() => navigate("/a-investment-page")}
// //                       >
// //                         Invest Now
// //                       </Button>
// //                     </Box>
// //                   </CardContent>
// //                 </Card>
// //               </Grid>
// //             ))}
// //           </Grid>
// //         </Box>
// //       </Box>

// //       <Box display="flex" justifyContent="flex-end" mt={1} mb={4} mr={5}>
// //         <ButtonGroup sx={{ gap: 0 }}>
// //           <Button
// //             variant="contained"
// //             disabled={currentPage === 1}
// //             onClick={handlePrevPage}
// //             sx={{
// //               backgroundColor: '#8FD14F',
// //               color: 'white',
// //               '&:hover': {
// //                 backgroundColor: '#8FD14F',
// //               },
// //               '&:disabled': {
// //                 backgroundColor: '#C8E6A4',
// //                 color: 'white',
// //               },
// //             }}
// //           >
// //             Previous
// //           </Button>
// //           <Typography
// //             variant="body1"
// //             sx={{
// //               border: '1px solid #ddd',
// //               padding: '4px 12px',
// //               borderRadius: '4px',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //             }}
// //           >
// //             {currentPage}
// //           </Typography>
// //           <Button
// //             variant="contained"
// //             disabled={currentPage === totalPages || totalPages === 0}
// //             onClick={() => handleNextPage(totalPages)}
// //             sx={{
// //               backgroundColor: '#8FD14F',
// //               color: 'white',
// //               '&:hover': {
// //                 backgroundColor: '#8FD14F',
// //               },
// //               '&:disabled': {
// //                 backgroundColor: '#C8E6A4',
// //                 color: 'white',
// //               },
// //             }}
// //           >
// //             Next
// //           </Button>
// //         </ButtonGroup>
// //       </Box>

// //       {/* Modal for showing asset details */}
// //       {selectedAsset && (
// //         <AssetDetailModal
// //           open={openModal}
// //           handleClose={handleCloseModal}
// //           assetDetails={selectedAsset}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default AssetsPage;


// import React, { useState } from 'react';
// import {
//   Container,
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   TextField,
//   InputAdornment,
//   FormControl,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Pagination,
//   LinearProgress
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
// import { useNavigate } from "react-router-dom";

// const AssetsUI = () => {
//   const [sortBy, setSortBy] = useState('');
//   const [openPune, setOpenPune] = useState(false);
//   const [openGoa, setOpenGoa] = useState(false);
//   const [openHyd, setOpenHyd] = useState(false);
//   const navigate = useNavigate();

//   const handleSortChange = (event) => {
//     setSortBy(event.target.value);
//   };

//   return (
//     <>
//       <InvestorHeader />
//       <Container sx={{ py: 4 }}>
//         <Typography variant="h4" sx={{ marginLeft: '10px', textAlign: "center" }}>
//           Assets
//         </Typography>
//         <Box
//           sx={{
//             backgroundColor: 'white',
//             p: 2,
//             borderRadius: 2,
//             boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//             mb: 3
//           }}
//         >
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 placeholder="Search assets..."
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: '#757575' }} />
//                     </InputAdornment>
//                   )
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth>
//                 <Select
//                   value={sortBy}
//                   onChange={handleSortChange}
//                   displayEmpty
//                   sx={{
//                     borderRadius: '8px',
//                     fontSize: '15px'
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>Sort By</em>
//                   </MenuItem>
//                   <MenuItem value="latest">Latest</MenuItem>
//                   <MenuItem value="oldest">Oldest</MenuItem>
//                   <MenuItem value="price-high">Price: High to Low</MenuItem>
//                   <MenuItem value="price-low">Price: Low to High</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   padding: '12px 24px',
//                   borderRadius: '8px',
//                   backgroundColor: '#2ECC71',
//                   textTransform: 'none',
//                   fontWeight: 500,
//                   '&:hover': {
//                     backgroundColor: '#27AE60'
//                   }
//                 }}
//               >
//                 Filter
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Cards Section */}
//         <Grid container spacing={3}>
//           {/* Pune Industrial Card */}
//           <Grid item xs={12} md={6} lg={4}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: '0 4px 15px rgba(0,0,0,0.749)',
//                 transition: 'all 0.3s ease',
//                 position: 'relative',
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
//                 }
//               }}
//             >
//               <Box sx={{ position: 'relative' }}>
//                 <CardMedia
//                   component="img"
//                   height="220"
//                   image="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/25111806/Untitled-design-95.jpg?tr=w-1200,h-900"
//                   alt="Pune Industrial"
//                   sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
//                 />
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: 15,
//                     right: 15,
//                     px: 2,
//                     py: 1,
//                     borderRadius: '20px',
//                     fontSize: '0.85rem',
//                     fontWeight: 500,
//                     backgroundColor: '#2ECC71',
//                     color: 'white'
//                   }}
//                 >
//                   Approved
//                 </Box>
//               </Box>
//               <CardContent>
//                 <Typography variant="h6" fontWeight="bold" mb={1}>
//                   Pune Industrial - Opportunity
//                 </Typography>
//                 {/* Funding Status */}
//                 <Box mb={2}>
//                   <Typography variant="body2" color="text.secondary">
//                     Funding Progress: 100%
//                   </Typography>
//                   <LinearProgress 
//                     variant="determinate" 
//                     value={100} 
//                     sx={{ height: 8, borderRadius: 4, mt: 1 }}
//                   />
//                 </Box>
//                 <Grid
//                   container
//                   spacing={2}
//                   sx={{
//                     backgroundColor: '#F8F9FA',
//                     p: 1.5,
//                     borderRadius: 1,
//                     mb: 2
//                   }}
//                 >
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Target IRR
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       13%
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Entry Yield
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       8.1%
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Asset Value
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       ₹2.5cr
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Asset Type
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       Industrial
//                     </Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid container spacing={1}>
//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth
//                       variant="contained"
//                       sx={{
//                         backgroundColor: '#4A90E2',
//                         color: 'white',
//                         textTransform: 'none',
//                         '&:hover': { backgroundColor: '#357ABD' }
//                       }}
//                     >
//                       JOIN WAITLIST
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth
//                       variant="contained"
//                       sx={{
//                         backgroundColor: '#149c33',
//                         color: 'white',
//                         textTransform: 'none',
//                         '&:hover': { backgroundColor: '#59ed7c', color: 'rgb(5,5,5)' }
//                       }}
//                       onClick={() => setOpenPune(true)}
//                     >
//                       VIEW DETAILS
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       sx={{
//                         borderColor: '#4A90E2',
//                         color: '#4A90E2',
//                         textTransform: 'none'
//                       }}
//                       onClick={() => navigate("/a-investment-page")}
//                     >
//                       INVEST NOW
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Goa Industrial Card */}
//           <Grid item xs={12} md={6} lg={4}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: '0 4px 15px rgba(0,0,0,0.749)',
//                 transition: 'all 0.3s ease',
//                 position: 'relative',
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
//                 }
//               }}
//             >
//               <Box sx={{ position: 'relative' }}>
//                 <CardMedia
//                   component="img"
//                   height="220"
//                   image="https://wandaeilers.com/wp-content/uploads/2024/10/a-stunning-and-modern-office-space-with-floor-to-c-CZP1bc-ZTwq8TSOW9-PY8A-1X1RmV8MQuyZ2dDR2yAruQ.jpeg"
//                   alt="Goa Industrial"
//                   sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
//                 />
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: 15,
//                     right: 15,
//                     px: 2,
//                     py: 1,
//                     borderRadius: '20px',
//                     fontSize: '0.85rem',
//                     fontWeight: 500,
//                     backgroundColor: '#E74C3C',
//                     color: 'white'
//                   }}
//                 >
//                   Pending
//                 </Box>
//               </Box>
//               <CardContent>
//                 <Typography variant="h6" fontWeight="bold" mb={1}>
//                   Goa Industrial - Opportunity
//                 </Typography>
//                 {/* Funding Status */}
//                 <Box mb={2}>
//                   <Typography variant="body2" color="text.secondary">
//                     Funding Progress: 80%
//                   </Typography>
//                   <LinearProgress 
//                     variant="determinate" 
//                     value={80} 
//                     sx={{ height: 8, borderRadius: 4, mt: 1 }}
//                   />
//                 </Box>
//                 <Grid
//                   container
//                   spacing={2}
//                   sx={{
//                     backgroundColor: '#F8F9FA',
//                     p: 1.5,
//                     borderRadius: 1,
//                     mb: 2
//                   }}
//                 >
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Target IRR
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       15%
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Entry Yield
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       9.2%
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Asset Value
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       ₹1.2cr
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Asset Type
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       Industrial
//                     </Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid container spacing={1}>
//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth
//                       variant="contained"
//                       sx={{
//                         backgroundColor: '#4A90E2',
//                         color: 'white',
//                         textTransform: 'none',
//                         '&:hover': { backgroundColor: '#357ABD' }
//                       }}
//                     >
//                       JOIN WAITLIST
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth
//                       variant="contained"
//                       sx={{
//                         backgroundColor: '#149c33',
//                         color: 'white',
//                         textTransform: 'none',
//                         '&:hover': { backgroundColor: '#59ed7c', color: 'rgb(5,5,5)' }
//                       }}
//                       onClick={() => setOpenGoa(true)}
//                     >
//                       VIEW DETAILS
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       sx={{
//                         borderColor: '#4A90E2',
//                         color: '#4A90E2',
//                         textTransform: 'none'
//                       }}
//                     >
//                       INVEST NOW
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Hyd Industrial Card */}
//           <Grid item xs={12} md={6} lg={4}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: '0 4px 15px rgba(0,0,0,0.749)',
//                 transition: 'all 0.3s ease',
//                 position: 'relative',
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
//                 }
//               }}
//             >
//               <Box sx={{ position: 'relative' }}>
//                 <CardMedia
//                   component="img"
//                   height="220"
//                   image="https://t3.ftcdn.net/jpg/02/33/59/42/360_F_233594258_81s2Un5DEpmiHYxuOPAUfnrD0T9we5fd.jpg"
//                   alt="Hyd Industrial"
//                   sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
//                 />
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: 15,
//                     right: 15,
//                     px: 2,
//                     py: 1,
//                     borderRadius: '20px',
//                     fontSize: '0.85rem',
//                     fontWeight: 500,
//                     backgroundColor: '#2ECC71',
//                     color: 'white'
//                   }}
//                 >
//                   Approved
//                 </Box>
//               </Box>
//               <CardContent>
//                 <Typography variant="h6" fontWeight="bold" mb={1}>
//                   Hyd Industrial - Opportunity
//                 </Typography>
//                 {/* Funding Status */}
//                 <Box mb={2}>
//                   <Typography variant="body2" color="text.secondary">
//                     Funding Progress: 60%
//                   </Typography>
//                   <LinearProgress 
//                     variant="determinate" 
//                     value={60} 
//                     sx={{ height: 8, borderRadius: 4, mt: 1 }}
//                   />
//                 </Box>
//                 <Grid
//                   container
//                   spacing={2}
//                   sx={{
//                     backgroundColor: '#F8F9FA',
//                     p: 1.5,
//                     borderRadius: 1,
//                     mb: 2
//                   }}
//                 >
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Target IRR
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       14%
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Entry Yield
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       8.5%
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Asset Value
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       ₹1.2cr
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Asset Type
//                     </Typography>
//                     <Typography variant="subtitle1" fontWeight="600" color="#4A90E2">
//                       Industrial
//                     </Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid container spacing={1}>
//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth
//                       variant="contained"
//                       sx={{
//                         backgroundColor: '#4A90E2',
//                         color: 'white',
//                         textTransform: 'none',
//                         '&:hover': { backgroundColor: '#357ABD' }
//                       }}
//                     >
//                       JOIN WAITLIST
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth
//                       variant="contained"
//                       sx={{
//                         backgroundColor: '#149c33',
//                         color: 'white',
//                         textTransform: 'none',
//                         '&:hover': { backgroundColor: '#59ed7c', color: 'rgb(5,5,5)' }
//                       }}
//                       onClick={() => setOpenHyd(true)}
//                     >
//                       VIEW DETAILS
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       sx={{
//                         borderColor: '#4A90E2',
//                         color: '#4A90E2',
//                         textTransform: 'none'
//                       }}
//                     >
//                       INVEST NOW
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Pagination */}
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
//           <Pagination count={3} shape="rounded" />
//         </Box>

//         {/* Pune Modal */}
//         <Dialog open={openPune} onClose={() => setOpenPune(false)} fullWidth maxWidth="lg">
//           <DialogTitle>Pune Industrial - Opportunity Details</DialogTitle>
//           <DialogContent dividers>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   component="img"
//                   src="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/25111806/Untitled-design-95.jpg"
//                   alt="Pune Property"
//                   sx={{ width: '100%', borderRadius: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Investment Type:
//                   </Typography>
//                   <Typography variant="body2">Residential</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Expected Holding Period:
//                   </Typography>
//                   <Typography variant="body2">5 years</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Projected Annual Return:
//                   </Typography>
//                   <Typography variant="body2">13%</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Property Area:
//                   </Typography>
//                   <Typography variant="body2">5,000 sq.ft</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Property Age:
//                   </Typography>
//                   <Typography variant="body2">2 years</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Exit Strategy:
//                   </Typography>
//                   <Typography variant="body2">Open market resale</Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Management Fees:
//                   </Typography>
//                   <Typography variant="body2">1.5% annually</Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenPune(false)} variant="contained" color="error">
//               CLOSE
//             </Button>
//             <Button variant="contained" color="success">
//               INVEST NOW
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Goa Modal */}
//         <Dialog open={openGoa} onClose={() => setOpenGoa(false)} fullWidth maxWidth="lg">
//           <DialogTitle>Goa Industrial - Opportunity Details</DialogTitle>
//           <DialogContent dividers>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   component="img"
//                   src="https://wandaeilers.com/wp-content/uploads/2024/10/a-stunning-and-modern-office-space-with-floor-to-c-CZP1bc-ZTwq8TSOW9-PY8A-1X1RmV8MQuyZ2dDR2yAruQ.jpeg"
//                   alt="Goa Property"
//                   sx={{ width: '100%', borderRadius: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Investment Type:
//                   </Typography>
//                   <Typography variant="body2">Commercial</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Expected Holding Period:
//                   </Typography>
//                   <Typography variant="body2">7 years</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Projected Annual Return:
//                   </Typography>
//                   <Typography variant="body2">15%</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Property Area:
//                   </Typography>
//                   <Typography variant="body2">10,000 sq.ft</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Rental Occupancy:
//                   </Typography>
//                   <Typography variant="body2">95%</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Lease Tenure:
//                   </Typography>
//                   <Typography variant="body2">10 years (Fixed)</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Property Age:
//                   </Typography>
//                   <Typography variant="body2">5 years</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Exit Strategy:
//                   </Typography>
//                   <Typography variant="body2">REIT listing</Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Management Fees:
//                   </Typography>
//                   <Typography variant="body2">2% annually</Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenGoa(false)} variant="contained" color="error">
//               CLOSE
//             </Button>
//             <Button variant="contained" color="success">
//               INVEST NOW
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Hyd Modal */}
//         <Dialog open={openHyd} onClose={() => setOpenHyd(false)} fullWidth maxWidth="lg">
//           <DialogTitle>Hyd Industrial - Opportunity Details</DialogTitle>
//           <DialogContent dividers>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   component="img"
//                   src="https://t3.ftcdn.net/jpg/02/33/59/42/360_F_233594258_81s2Un5DEpmiHYxuOPAUfnrD0T9we5fd.jpg"
//                   alt="Hyd Property"
//                   sx={{ width: '100%', borderRadius: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Investment Type:
//                   </Typography>
//                   <Typography variant="body2">Residential</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Expected Holding Period:
//                   </Typography>
//                   <Typography variant="body2">5 years</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Projected Annual Return:
//                   </Typography>
//                   <Typography variant="body2">14%</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Property Area:
//                   </Typography>
//                   <Typography variant="body2">4,000 sq.ft</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Rental Occupancy:
//                   </Typography>
//                   <Typography variant="body2">100%</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Lease Tenure:
//                   </Typography>
//                   <Typography variant="body2">Annual</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Property Age:
//                   </Typography>
//                   <Typography variant="body2">3 years</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Exit Strategy:
//                   </Typography>
//                   <Typography variant="body2">Open market resale</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Tax Benefits:
//                   </Typography>
//                   <Typography variant="body2">Capital gains exemption</Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="subtitle2" fontWeight="bold">
//                     Management Fees:
//                   </Typography>
//                   <Typography variant="body2">1.5% annually</Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenHyd(false)} variant="contained" color="error">
//               CLOSE
//             </Button>
//             <Button variant="contained" color="success">
//               INVEST NOW
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Container>
//     </>
//   );
// };

// export default AssetsUI;

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

const AssetDashboard = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://175.29.21.7:83/property/")
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

  const handleClick = () => {
    navigate('/a-addasset');
  };

  const filteredAssets = assets.filter(asset =>
    asset.property_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const summaryCardsData = [
    {
      title: "Total Assets",
      value: "12",
      // subtext: "Last 7 Days",
    },
    {
      title: "Total Value",
      value: "8.5cr",
      // subtext: "+2.3% from last week",
    },
    {
      title: "Active Units",
      value: "450",
      // subtext: "+12% increase",
    },
  ];

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

                  {/* Funding Loading Section */}

                  <Box sx={{ px: 2, pb: 2 }}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Funding Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={60}
                      sx={{ height: 8, borderRadius: 4 }}
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
                        }}

                      >
                        {/* <Button
                          variant="contained"
                          sx={{
                            width:"340px",
                            marginBottom:"10px",
                            backgroundColor: '#4A90E2',
                            '&:hover': { backgroundColor: '#357ABD' }
                          }}
                          onClick={() => navigate(`/i-sellform?property_id=${asset.property_id}`)}
                        >
                          Sell Units
                        </Button> */}
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          sx={{
                            width:"340px",
                          }}
                          color="success"
                          fullWidth
                          onClick={() => navigate(`/i-investment-page?property_id=${asset.property_id}`)}
                        >
                          INVEST NOW
                        </Button>
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
                    <Typography variant="body2" color="text.secondary" gutterBottom>Location: <strong>{selectedAsset.city}, {selectedAsset.state}</strong></Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>No of Investors: <strong>{selectedAsset.no_of_investors}</strong></Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Total Units: <strong>{selectedAsset.total_units}</strong></Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Available Units: <strong>{selectedAsset.available_units}</strong></Typography>
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

export default AssetDashboard;
