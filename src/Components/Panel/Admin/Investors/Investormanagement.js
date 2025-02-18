import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../../../Shared/Navbar/Navbar';

const investors = [
  { id: 'ID001', name: 'Naveen', email: 'xyz@gmail.com', lastActive: '2 hours ago', status: 'Active' },
  { id: 'ID002', name: 'Xyz', email: 'zyx@gmail.com', lastActive: '3 hours ago', status: 'Inactive' },
  { id: 'ID003', name: 'Bharath', email: 'abc@gmail.com', lastActive: '30 min ago', status: 'Inactive' },
  { id: 'ID004', name: 'Naveen', email: 'zyx@gmail.com', lastActive: '5 hours ago', status: 'Active' },
  { id: 'ID005', name: 'Abc', email: 'abc@gmail.com', lastActive: '1 day ago', status: 'Active' },
];

const Tmanagement = () => {
  const [sortBy, setSortBy] = useState('Latest');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option) => {
    if (option) {
      setSortBy(option);
    }
    setAnchorEl(null);
  };

  return (
    <>
    <Header/>
    <Container sx={{ maxWidth: '900px', mt: 4 }}>
      {/* Header */}
      <Typography variant="h4" component="h2" gutterBottom>
        Investor Management
      </Typography>

      {/* Search, Sort & Filters Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: 'none' }}
        />
        <Button variant="outlined" onClick={handleSortClick}>
          Sort by: {sortBy}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleSortClose(null)}
        >
          <MenuItem onClick={() => handleSortClose('Latest')}>Latest</MenuItem>
          <MenuItem onClick={() => handleSortClose('Oldest')}>Oldest</MenuItem>
        </Menu>
        <Button variant="contained">Filters</Button>
      </Box>

      {/* Investors Table */}
      <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Asset ID</TableCell>
              <TableCell align="center">Investor Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Last Active</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investors.map((investor) => (
              <TableRow
                key={investor.id}
                sx={{
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                <TableCell align="center">{investor.id}</TableCell>
                <TableCell align="center">{investor.name}</TableCell>
                <TableCell align="center">{investor.email}</TableCell>
                <TableCell align="center">{investor.lastActive}</TableCell>
                <TableCell
                  align="center"
                  sx={{ color: investor.status === 'Active' ? 'green' : 'red' }}
                >
                  {investor.status}
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Button variant="contained">Prev</Button>
        <Typography>1</Typography>
        <Button variant="contained">Next</Button>
      </Box>
    </Container>
    </>
  );
};

export default Tmanagement;
