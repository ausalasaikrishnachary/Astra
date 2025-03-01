import React, { useState, useRef } from 'react';
import Logo from '../../Images/Logo File.png';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { NavLink, Link } from 'react-router-dom';

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop dropdown states (if needed)
  const [anchorInvest, setAnchorInvest] = useState(null);
  const [anchorAbout, setAnchorAbout] = useState(null);

  // Timer refs for delayed menu close
  const investTimerRef = useRef(null);
  const aboutTimerRef = useRef(null);

  // --- Invest Dropdown Handlers ---
  const handleInvestButtonMouseEnter = (event) => {
    if (investTimerRef.current) clearTimeout(investTimerRef.current);
    setAnchorInvest(event.currentTarget);
  };

  const handleInvestButtonMouseLeave = () => {
    investTimerRef.current = setTimeout(() => {
      setAnchorInvest(null);
    }, 300);
  };

  const handleInvestMenuMouseEnter = () => {
    if (investTimerRef.current) clearTimeout(investTimerRef.current);
  };

  const handleInvestMenuMouseLeave = () => {
    investTimerRef.current = setTimeout(() => {
      setAnchorInvest(null);
    }, 300);
  };

  // --- About Dropdown Handlers ---
  const handleAboutButtonMouseEnter = (event) => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    setAnchorAbout(event.currentTarget);
  };

  const handleAboutButtonMouseLeave = () => {
    aboutTimerRef.current = setTimeout(() => {
      setAnchorAbout(null);
    }, 300);
  };

  const handleAboutMenuMouseEnter = () => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
  };

  const handleAboutMenuMouseLeave = () => {
    aboutTimerRef.current = setTimeout(() => {
      setAnchorAbout(null);
    }, 300);
  };

  // Navigation items with paths for navigation
  const navItems = [
    // Example submenu (if needed):
    // {
    //   label: 'Ways To Invest',
    //   submenu: ['cadre funds', 'deal-by-deal', 'secondary market'],
    //   path: '/invest',
    // },
    { label: 'About Us', path: '/aboutus' },
    { label: 'Properties', path: '/properties' },
    { label: 'Contact us', path: '/contactus' },
    { label: 'FAQs', path: '/FAQ' },
  ];

  // --- Mobile Drawer Submenu (if needed) ---
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  const toggleMobileSubmenu = (label) => {
    setMobileSubmenuOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // --- Mobile Drawer Content ---
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      {/* Drawer header with close (cross) button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={() => setMobileOpen(false)}>
          <CloseIcon sx={{ color: '#333333' }} />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Box key={item.label}>
            {item.submenu ? (
              <>
                <ListItem button onClick={() => toggleMobileSubmenu(item.label)}>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      color: '#333333',
                      fontSize: '16px',
                      fontFamily: 'Calibre, sans-serif',
                      fontWeight: 'bold',
                    }}
                  />
                  {mobileSubmenuOpen[item.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {mobileSubmenuOpen[item.label] &&
                  item.submenu.map((subItem) => (
                    <ListItem
                      button
                      key={subItem}
                      sx={{ pl: 4 }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <ListItemText
                        primary={subItem}
                        primaryTypographyProps={{
                          color: '#333333',
                          fontSize: '16px',
                          fontFamily: 'Calibre, sans-serif',
                          fontWeight: 'bold',
                        }}
                      />
                    </ListItem>
                  ))}
              </>
            ) : (
              <ListItem
                button
                component={NavLink}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  textDecoration: 'none',
                  // Active styles for the inner text:
                  '&.active .MuiListItemText-primary': {
                    color: '#2E166D',
                    textDecoration: 'underline',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    color: '#333333',
                    fontSize: '16px',
                    fontFamily: 'Calibre, sans-serif',
                    fontWeight: 'bold',
                  }}
                />
              </ListItem>
            )}
          </Box>
        ))}
        <Divider />
        {/* Additional ListItems if needed */}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#ffffff',
          color: '#333333',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar>
          {isMobile ? (
            // Mobile / iPad view
            <>
              <IconButton edge="start" onClick={() => setMobileOpen(true)}>
                <MenuIcon sx={{ color: '#333333' }} />
              </IconButton>
              <Box display="flex" justifyContent="center" flexGrow={1}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{ height: '50px', width: 'auto', maxWidth: '150px', transform: 'scale(2.0)' }}
                  />
                </Link>
              </Box>
              <Button
                variant="outlined"
                sx={{
                  mr: 1,
                  borderColor: '#333333',
                  color: '#333333',
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  fontWeight: 'bold',
                }}
                component={NavLink}
                to="/signup"
                style={{ textDecoration: 'none' }}
              >
                Sign up
              </Button>
              <Button
                variant="outlined"
                sx={{
                  mr: 1,
                  borderColor: '#333333',
                  color: '#333333',
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  fontWeight: 'bold',
                }}
                component={NavLink}
                to="/signup"
                style={{ textDecoration: 'none' }}
              >
                Sign in
              </Button>
              {/* Uncomment if you want to use the Search icon */}
              {/* <IconButton>
                <SearchIcon sx={{ color: '#333333' }} />
              </IconButton> */}
            </>
          ) : (
            // Desktop view
            <>
              {/* Logo */}
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{ height: '75px', width: 'auto', maxWidth: '150px', transform: 'scale(2.0)' }}
                  />
                </Link>
              </Typography>

              {/* Navigation Items */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                  marginLeft: '300px',
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  color: '#333333',
                }}
              >
                {navItems.map((item) => {
                  if (item.submenu) {
                    // If using dropdown menus, add active state styling as needed.
                    const isInvest = item.label === 'Ways To Invest';
                    return (
                      <Box
                        key={item.label}
                        sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
                      >
                        <Button
                          color="inherit"
                          sx={{
                            color: '#333333',
                            fontSize: '16px',
                            fontFamily: 'Calibre, sans-serif',
                            fontWeight: 'bold',
                          }}
                          onMouseEnter={
                            isInvest
                              ? handleInvestButtonMouseEnter
                              : handleAboutButtonMouseEnter
                          }
                          onMouseLeave={
                            isInvest
                              ? handleInvestButtonMouseLeave
                              : handleAboutButtonMouseLeave
                          }
                          endIcon={<ExpandMore />}
                        >
                          {item.label}
                        </Button>
                        {/*
                        <Menu
                          anchorEl={isInvest ? anchorInvest : anchorAbout}
                          open={Boolean(isInvest ? anchorInvest : anchorAbout)}
                          onClose={
                            isInvest
                              ? () => setAnchorInvest(null)
                              : () => setAnchorAbout(null)
                          }
                          MenuListProps={{
                            onMouseEnter: isInvest
                              ? handleInvestMenuMouseEnter
                              : handleAboutMenuMouseEnter,
                            onMouseLeave: isInvest
                              ? handleInvestMenuMouseLeave
                              : handleAboutMenuMouseLeave,
                          }}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                          {item.submenu.map((subItem) => (
                            <MenuItem
                              key={subItem}
                              onClick={
                                isInvest
                                  ? () => setAnchorInvest(null)
                                  : () => setAnchorAbout(null)
                              }
                              sx={{
                                color: '#333333',
                                fontSize: '16px',
                                fontFamily: 'Calibre, sans-serif',
                                fontWeight: 'bold',
                              }}
                            >
                              {subItem}
                            </MenuItem>
                          ))}
                        </Menu>
                        */}
                      </Box>
                    );
                  }
                  return (
                    <Button
                      key={item.label}
                      component={NavLink}
                      to={item.path}
                      sx={{
                        ml: 2,
                        fontSize: '16px',
                        fontFamily: 'Calibre, sans-serif',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        color: '#333333', // Inactive color
                        '&.active': {
                          color: '#2E166D', // Active color
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Box>

              {/* Uncomment if you want to use the Search Field */}
              {/*
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 1,
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                  mr: 2,
                }}
              >
                <Box
                  sx={{
                    padding: theme.spacing(0, 2),
                    height: '100%',
                    position: 'absolute',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SearchIcon sx={{ color: '#333333' }} />
                </Box>
                <InputBase
                  placeholder="Search…"
                  sx={{
                    color: '#333333',
                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                    width: '20ch',
                    fontSize: '16px',
                    fontFamily: 'Calibre, sans-serif',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
              */}

              {/* Signup & Signin Buttons */}
              <Button
                variant="outlined"
                sx={{
                  mr: 1,
                  borderColor: '#333333',
                  color: '#333333',
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  fontWeight: 'bold',
                }}
                component={NavLink}
                to="/signup"
                style={{ textDecoration: 'none' }}
              >
                Sign up
              </Button>
              <Button
                variant="outlined"
                sx={{
                  mr: 1,
                  borderColor: '#333333',
                  color: '#333333',
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  fontWeight: 'bold',
                }}
                component={NavLink}
                to="/signin"
                style={{ textDecoration: 'none' }}
              >
                Sign in
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;
