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
  FormControl,
  InputLabel,
  Select,
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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function PartnerHeader() {
  // Define nav items with navigation paths.
  // For the "Transactions" item, we add a submenu.
  const navItems = [
    { label: 'Dashboard', path: '/p-dashboard' },
    { label: 'Assets', path: '/p-myassets' },
    { label: 'My Investors', path: '/p-myinvestors' },
    // {
    //   label: 'Transactions', path: "/p-transactions",
    //   path: '/p-transactions',
    //   submenu: [
    //     { label: 'Buy Units', path: '/buy-units' },
    //     { label: 'Sell Units', path: '/sell-units' },
    //   ],
    // },
    { label: 'Commission', path: '/p-commission' },
    { label: 'Report', path: '/p-report' },
  ];

  // Inside your PartnerHeader component:
  const [partnerType, setPartnerType] = useState('Partner');
  const [username, setUsername] = useState("");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (userId) {
      fetch(`http://175.29.21.7:83/users/${userId}/`)
        .then((response) => response.json())
        .then((data) => {
          if (data.username) {
            setUsername(data.username.trim() || "Investor");
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userId]);

  useEffect(() => {
    const savedType = localStorage.getItem('partnerType');
    if (savedType) {
      setPartnerType(savedType);
    }
  }, []);

  // Responsive helper.
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Navigation hooks.
  const navigate = useNavigate();
  const location = useLocation();

  // State for mobile drawer.
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // State for the Profile Avatar dropdown menu.
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(profileAnchorEl);
  const handleAvatarClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  // State for the Transactions dropdown menu in desktop view.
  const [transAnchorEl, setTransAnchorEl] = useState(null);
  const transMenuOpen = Boolean(transAnchorEl);
  const handleTransClick = (event) => {
    setTransAnchorEl(event.currentTarget);
  };
  const handleTransClose = () => {
    setTransAnchorEl(null);
  };

  // Drawer content for mobile view with a close (cross) button.
  const drawer = (
    <Box sx={{ width: 250 }}>
      {/* Drawer header with a close icon */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navItems.map((item) => (
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
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [roles, setRoles] = useState([]); // Store roles from API
  const [selectedRole, setSelectedRole] = useState(''); // Store selected role

  useEffect(() => {
    // Fetch roles from API
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://175.29.21.7:83/roles/');
        setRoles(response.data); // Set roles from API response
        setSelectedRole(response.data[0]?.role_name || ''); // Set default role
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);

    // Define role-based navigation
    const rolePaths = {
      Admin: '/a-dashboard',
      Partner: '/p-dashboard',
      Investor: '/i-dashboard',
    };

    // Navigate to the corresponding dashboard if role exists
    if (rolePaths[role]) {
      navigate(rolePaths[role]);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          color: '#000',
          boxShadow: "-moz-initial"
        }}
      >
        <Toolbar>
          {isMobile ? (
            // Mobile / iPad Layout.
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              {/* Left: Menu Icon */}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              {/* Center: Logo */}
              <Box display="flex" justifyContent="center" flexGrow={1}>
                <Link to="/p-dashboard" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{
                      height: '50px',
                      width: 'auto',
                      maxWidth: '150px',
                      transform: 'scale(2.0)',
                    }}
                  />
                </Link>
              </Box>

              {/* Right: Notification, Username, Profile Avatar */}
              <Box display="flex" alignItems="center">
                <IconButton sx={{ color: '#000' }}>
                  <NotificationsNoneIcon />
                </IconButton>
                {/* <FormControl sx={{ minWidth: 120, ml: 2, mr: 2 }}>
                  <InputLabel>Role</InputLabel>
                  <Select value={selectedRole} onChange={handleRoleChange} displayEmpty>
                    {roles.map((role) => (
                      <MenuItem key={role.role_id} value={role.role_name}>
                        {role.role_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <Typography variant="h6">
                  {username ? `${username} (Partner)` : "Partner"}
                </Typography>
                <Avatar
                  onClick={handleAvatarClick}
                  sx={{ width: 40, height: 40, cursor: 'pointer' }}
                  alt="Profile Avatar"
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" // Replace with your own image.
                />
              </Box>
            </Box>
          ) : (
            <>
              {/* Left: Logo */}
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{
                      height: '75px',
                      width: 'auto',
                      maxWidth: '150px',
                      transform: 'scale(2.0)',
                    }}
                  />
                </Link>
              </Typography>

              {/* Center: Nav Items */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: location.pathname === item.path ? 'blue' : '#000',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontSize: "16px"

                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              {/* Right: Notification, Username, Profile Avatar */}
              <IconButton sx={{ color: '#000' }}>
                <NotificationsNoneIcon />
              </IconButton>
              {/* <FormControl sx={{ minWidth: 120, ml: 2, mr: 2 }}>
                <InputLabel>Role</InputLabel>
                <Select value={selectedRole} onChange={handleRoleChange} displayEmpty>
                  {roles.map((role) => (
                    <MenuItem key={role.role_id} value={role.role_name}>
                      {role.role_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <Typography variant="h6">
                {username ? `${username} (Partner)` : "Partner"}
              </Typography>
              <Avatar
                onClick={handleAvatarClick}
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
                alt="Partner"
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" // Replace with your own image.
              />
            </>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </AppBar>

      {/* Profile Avatar Dropdown Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={profileMenuOpen}
        onClose={handleProfileMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/p-profile');
          }}
          sx={{ fontWeight: 'bold' }}
        >
          Profile
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/p-profiledetails');
          }}
          sx={{ fontWeight: 'bold' }}
        >
          KYC
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            localStorage.removeItem("user_id");
            handleProfileMenuClose();
            navigate('/login');
          }}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: "red",
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Logout <LogoutIcon sx={{ ml: 1 }} />
        </MenuItem>
      </Menu>

      {/* Transactions Dropdown Menu for Desktop */}
      {/* <Menu
        anchorEl={transAnchorEl}
        open={transMenuOpen}
        onClose={handleTransClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {navItems
          .find((item) => item.label === 'Transactions')
          .submenu.map((subitem) => (
            <MenuItem
              key={subitem.label}
              onClick={() => {
                handleTransClose();
                navigate(subitem.path);
              }}
              sx={{
                color: location.pathname === subitem.path ? 'blue' : 'inherit',
                fontWeight: 'bold',
                fontSize: "16px"
              }}
            >
              {subitem.label}
            </MenuItem>
          ))}
      </Menu> */}
    </>
  );
}
