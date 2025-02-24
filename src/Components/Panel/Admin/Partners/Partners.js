import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BusinessIcon from '@mui/icons-material/Business';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../../../Shared/Navbar/Navbar';
import { DataGrid } from '@mui/x-data-grid';

const partnersData = [
  { id: "PARTNER001", name: "Naveen", role: "Property Manager", ownership: "10%", rating: "4.8", status: "Active" },
  { id: "PARTNER002", name: "Rohit", role: "Investor", ownership: "15%", rating: "4.5", status: "Inactive" },
  { id: "PARTNER003", name: "Anjali", role: "Co-Founder", ownership: "20%", rating: "4.7", status: "Active" },
  { id: "PARTNER004", name: "Mahesh", role: "Business Consultant", ownership: "12%", rating: "4.2", status: "Inactive" },
  { id: "PARTNER005", name: "Sonia", role: "Legal Advisor", ownership: "8%", rating: "4.9", status: "Active" },
  { id: "PARTNER006", name: "Javid", role: "Technical Lead", ownership: "18%", rating: "4.3", status: "Active" },
  { id: "PARTNER007", name: "Arjun", role: "Financial Advisor", ownership: "7%", rating: "4.6", status: "Inactive" },
  { id: "PARTNER008", name: "Akhil", role: "Marketing Head", ownership: "9%", rating: "4.1", status: "Active" },
  { id: "PARTNER009", name: "Dikshith", role: "Operations Manager", ownership: "11%", rating: "4.7", status: "Inactive" },
  { id: "PARTNER010", name: "Abhishek", role: "HR Manager", ownership: "5%", rating: "4.4", status: "Active" },
];

const PartnersDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const totalPages = Math.ceil(partnersData.length / rowsPerPage);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePartnerClick = (partner) => {
    setSelectedPartner(partner);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Updated columns using flex and minWidth so cells adjust to content
  const columns = [
    { field: 'id', headerName: 'Partner ID', minWidth: 120, flex: 0.7 },
    { field: 'name', headerName: 'Partner Name', minWidth: 150, flex: 1 },
    { field: 'role', headerName: 'Role', minWidth: 150, flex: 1 },
    { field: 'ownership', headerName: 'Ownership%', minWidth: 100, flex: 0.8 },
    { field: 'rating', headerName: 'Rating', minWidth: 80, flex: 0.8 },
    { 
      field: 'status', 
      headerName: 'Status', 
      minWidth: 100, 
      flex: 0.8,
      renderCell: (params) => (
        <Box
          sx={{
            // backgroundColor: params.value === 'Active' ? '#2e7d32' : '#c62828',
            color: params.value === 'Active' ? '#2e7d32' : '#c62828',
            borderRadius: '20px',
            px: 1,
            py: 0.5,
            fontSize: '0.875rem',
            fontWeight: 500,
            textAlign: 'start',
            width: '100%'
          }}
        >
          {params.value}
        </Box>
      )
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      minWidth: 120, 
      flex: 1,
      sortable: false,
      renderCell: () => (
        <>
          <IconButton size="small"><VisibilityIcon /></IconButton>
          <IconButton size="small"><EditIcon /></IconButton>
          <IconButton size="small"><DeleteIcon /></IconButton>
        </>
      )
    }
  ];

  // Updated renderPartnersList to use DataGrid with autoHeight and responsive columns
  const renderPartnersList = () => {
    const start = (page - 1) * rowsPerPage;
    const paginatedData = partnersData.slice(start, start + rowsPerPage);
    return (
      <Box sx={{ width: '100%', backgroundColor: 'white', borderRadius: '15px', boxShadow: 2, mt: 2 }}>
        <DataGrid
          autoHeight
          rows={paginatedData}
          columns={columns}
          pageSize={rowsPerPage}
          hideFooter
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'white',
            },
            '& .MuiDataGrid-cell': {
              outline: 'none',
            }
          }}
        />
      </Box>
    );
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
          p: 2,
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          {/* Dashboard Header */}
          <Box
            sx={{
              backgroundColor: 'white',
              p: 2,
              borderRadius: '15px',
              mb: 3,
              boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HandshakeIcon sx={{ mr: 1 }} />
              Partners <span style={{ color: '#4a90e2', marginLeft: 4 }}>Dashboard</span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage partner applications, track performance, and handle permissions efficiently.
            </Typography>
          </Box>

          {/* Navigation Tabs */}
          <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
            <Tab label="Partners" />
            <Tab label="Partners List" />
          </Tabs>

          {/* Content Sections */}
          <Box sx={{ mt: 2 }}>
            {tabValue === 0 && (
              <Grid container spacing={2}>
                {/* Pending Reviews Card */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      borderRadius: '15px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Pending Reviews</Typography>
                        <Box
                          sx={{
                            backgroundColor: '#ffc107',
                            borderRadius: '20px',
                            px: 1,
                            py: 0.5,
                            color: 'white',
                            fontWeight: 500,
                          }}
                        >
                          2 New
                        </Box>
                      </Box>
                      {/* Pending Partner Item 1 */}
                      <Box
                        sx={{
                          backgroundColor: '#f8f9fa',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: '#ffffff', borderLeft: '4px solid #4a90e2', transform: 'translateX(5px)' },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f1c40f', mr: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                            Naveenchary
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                          <BusinessIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">Property Manager</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, fontSize: '0.9rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: '#ffc107', fontSize: 16 }} />
                            <Typography variant="body2">4.8</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ color: '#17a2b8', fontSize: 16 }} />
                            <Typography variant="body2">Last active: 2024-03-10</Typography>
                          </Box>
                        </Box>
                      </Box>
                      {/* Pending Partner Item 2 */}
                      <Box
                        sx={{
                          backgroundColor: '#f8f9fa',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: '#ffffff', borderLeft: '4px solid #4a90e2', transform: 'translateX(5px)' },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f1c40f', mr: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                            Naveen
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                          <BusinessIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">Property Manager</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, fontSize: '0.9rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: '#ffc107', fontSize: 16 }} />
                            <Typography variant="body2">4.2</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ color: '#17a2b8', fontSize: 16 }} />
                            <Typography variant="body2">Last active: 2024-03-11</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Active Partners Card */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      borderRadius: '15px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Active Partners</Typography>
                        <Box
                          sx={{
                            backgroundColor: '#28a745',
                            borderRadius: '20px',
                            px: 1,
                            py: 0.5,
                            color: 'white',
                            fontWeight: 500,
                          }}
                        >
                          2 Online
                        </Box>
                      </Box>
                      {/* Active Partner Item 1 */}
                      <Box
                        sx={{
                          backgroundColor: '#f8f9fa',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: '#ffffff', borderLeft: '4px solid #4a90e2', transform: 'translateX(5px)' },
                        }}
                        onClick={() => handlePartnerClick({ name: 'Naveen', role: 'Investment Partner', projects: 12, rating: '4.8' })}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2ecc71', mr: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                            Naveen
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                          <ShowChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">Investment Partner</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, fontSize: '0.9rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: '#4a90e2', fontSize: 16 }} />
                            <Typography variant="body2">12 Projects</Typography>
                          </Box>
                        </Box>
                      </Box>
                      {/* Active Partner Item 2 */}
                      <Box
                        sx={{
                          backgroundColor: '#f8f9fa',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: '#ffffff', borderLeft: '4px solid #4a90e2', transform: 'translateX(5px)' },
                        }}
                        onClick={() => handlePartnerClick({ name: 'XYZ', role: 'Investment Partner', projects: 8 })}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2ecc71', mr: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                            XYZ
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                          <ShowChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">Investment Partner</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, fontSize: '0.9rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: '#4a90e2', fontSize: 16 }} />
                            <Typography variant="body2">8 Projects</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Performance Overview Card */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      borderRadius: '15px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' },
                    }}
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>Performance Overview</Typography>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1">Average Rating</Typography>
                          <Typography variant="h6">4.5</Typography>
                        </Box>
                        <Box sx={{ height: 8, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)' }}>
                          <Box sx={{ width: '90%', height: '100%', backgroundColor: '#fff' }} />
                        </Box>
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1">Total Partners</Typography>
                          <Typography variant="h6">3</Typography>
                        </Box>
                        <Box sx={{ height: 8, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)' }}>
                          <Box sx={{ width: '60%', height: '100%', backgroundColor: '#fff' }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
            {tabValue === 1 && (
              <Box>
                {/* Search & Filter Section */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center',justifyContent:"end" }}>
                  <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Select defaultValue="latest" size="small">
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                  </Select>
                  <Button variant="outlined" color="secondart">
                    Filters
                  </Button>
                </Box>
                {renderPartnersList()}
                {/* Pagination Section */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>
                  <Button
                    variant="contained"
                    color="success"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </Button>
                  <Box
                    sx={{
                      border: '1px solid #28a745',
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      fontWeight: 'bold',
                      color: '#28a745',
                    }}
                  >
                    {page}
                  </Box>
                  <Button
                    variant="contained"
                    color="success"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Partner Details Modal */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ backgroundColor: '#f5f5f5', p: 1, borderRadius: '50%' }}>
                <PersonIcon sx={{ fontSize: 30, color: '#4a90e2' }} />
              </Box>
              <Typography variant="h6">Partner Details</Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedPartner && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: '50%' }}>
                    <PersonIcon sx={{ fontSize: 40, color: '#4a90e2' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6">{selectedPartner.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedPartner.role}
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        backgroundColor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Projects
                      </Typography>
                      <Typography variant="h6">{selectedPartner.projects || 12}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        backgroundColor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Rating
                      </Typography>
                      <Typography variant="h6">{selectedPartner.rating || '4.8 ⭐'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default PartnersDashboard;
