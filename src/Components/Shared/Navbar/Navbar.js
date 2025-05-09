import React, { useState, useEffect } from 'react';
import Logo from '../../Images/Logo File.png';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Header() {
  const navItems = [
    { label: 'Dashboard', path: '/a-dashboard' },
    { label: 'Assets', path: '/a-asset' },
    { label: 'Investors', path: '/a-investormanagement' },
    { label: 'Partners', path: '/a-partners' },
  ];

  const dropdownItems = [
    { label: 'Escrow Account', path: '/a-escrow' },
    { label: 'Transactions', path: '/a-transactionmoniter' },
    { label: 'KYC', path: '/a-profiledetails' },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(profileAnchorEl);
  const handleAvatarClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);

  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const moreMenuOpen = Boolean(moreAnchorEl);

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreAnchorEl(null);

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {[...navItems, ...dropdownItems].map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerToggle();
                navigate(item.path);
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  color: location.pathname === item.path ? 'blue' : 'inherit',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', color: '#000' }}>
        <Toolbar>
          {isMobile ? (
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>

              <Box display="flex" justifyContent="center" flexGrow={1}>
                <Link to="/a-dashboard" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{ height: '50px', width: 'auto', maxWidth: '150px', transform: 'scale(2.0)' }}
                  />
                </Link>
              </Box>

              <Box display="flex" alignItems="center">
                <IconButton sx={{ color: '#000' }}>
                  <NotificationsNoneIcon />
                </IconButton>
                <Typography variant="h6">Admin</Typography>
                <Button
                  onClick={() => {
                    localStorage.removeItem('user_id');
                    handleProfileMenuClose();
                    navigate('/login');
                  }}
                  sx={{ color: 'red', fontWeight: 'bold', textTransform: 'none' }}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{ height: '75px', width: 'auto', maxWidth: '150px', transform: 'scale(2.0)' }}
                  />
                </Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3,  }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: location.pathname === item.path ? 'blue' : '#000',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontSize: '16px',
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                {/* Dropdown button with arrow */}
                <Button
                  onClick={handleMoreClick}
                  sx={{
                    color: dropdownItems.some((d) => d.path === location.pathname) ? 'blue' : '#000',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  Operations {moreMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Button>

                <Menu
                  anchorEl={moreAnchorEl}
                  open={moreMenuOpen}
                  onClose={handleMoreClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  {dropdownItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={() => {
                        navigate(item.path);
                        handleMoreClose();
                      }}
                      sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: location.pathname === item.path ? 'blue' : '#000',
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <IconButton sx={{ color: '#000' }}>
                <NotificationsNoneIcon />
              </IconButton>
              <Typography variant="h6" >Admin</Typography>
              <Button
                onClick={() => {
                  localStorage.removeItem('user_id');
                  handleProfileMenuClose();
                  navigate('/login');
                }}
                sx={{ fontSize: '16px', fontWeight: 'bold', color: 'red', display: 'flex', alignItems: 'center', marginLeft:"10px" }}
                // startIcon={<LogoutIcon />}
              >
                Logout <LogoutIcon sx={{ ml: 1 }} />
              </Button>
            </>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
          {drawer}
        </Drawer>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={profileMenuOpen}
        onClose={handleProfileMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/a-profile'); }} sx={{ fontSize: '16px', fontWeight: 'bold' }}>Profile</MenuItem>
        {/* <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/a-profiledetails'); }} sx={{ fontSize: '16px', fontWeight: 'bold' }}>KYC</MenuItem> */}
        <MenuItem
          onClick={() => {
            localStorage.removeItem('user_id');
            handleProfileMenuClose();
            navigate('/login');
          }}
          sx={{ fontSize: '16px', fontWeight: 'bold', color: 'red', display: 'flex', alignItems: 'center' }}
        >
          Logout <LogoutIcon sx={{ ml: 1 }} />
        </MenuItem>
      </Menu>
    </>
  );
}
