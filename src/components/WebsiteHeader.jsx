import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { CardMedia, colors, Container, List, ListItem } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Login from '../pages/website/Login';
import { Link, NavLink } from 'react-router';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


export default function WebsiteHeader() {
    const handleOpenLogin = ()=> {
        return <Login/>
    }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
const pages = ['Home', 'Products', 'About Us', 'Contact'];
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (

    <>
      <Box className="slide-text-section-mini-header">
        <Box className="text_scroller_1 scroller_item_1 ul-li">
          <List>
            <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
            <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
           <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
             <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
            <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
             <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
           <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
             <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
            <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
             <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
          </List>
          <List aria-hidden="true">
             <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
             <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
           <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
             <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
            <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
             <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
           <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
             <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
            <ListItem>
              <h3>Free shipping on all orders above £35</h3>
            </ListItem>
             <ListItem>
              <FiberManualRecordIcon sx={{fontSize: '6px', color: 'white'}}/>
            </ListItem>
          </List>
        </Box>
      </Box>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'white', color: 'black', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'}}>
        <Container sx={{maxWidth: '1450px !important'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
         
         <Link to={'/'}>
              <CardMedia
                component="img"
                style={{ height: "auto", width: "60px" }}
                image="/logo.png"
                alt="Footer Logo"
              />
              </Link>
       <Box sx={{display: 'flex'}}>
         {pages.map((page) => (
  <MenuItem key={page}>
    <Typography textAlign="center">{page}</Typography>
  </MenuItem>
))}
       </Box>
          









          
        <Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
             <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
               <SearchIcon/>
            </IconButton>
             <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} sx={{
    '& .MuiBadge-badge': {
      backgroundColor: '#f76209',
      color: 'white', // optional, to ensure text is readable
    }
  }}>
                <LocalMallIcon />
              </Badge>
            </IconButton>
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
               <PersonIcon/>
            </IconButton> */}
              <NavLink to={'/login'}>
                <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
               <PersonIcon  sx={{color: 'black'}}/>
            </IconButton>
              </NavLink>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            
            </IconButton>
          </Box>
        </Box>
        </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </>
  );
}
