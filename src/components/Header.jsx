import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  Menu as MenuIcon,
  VpnKey,
  Support,
  Logout,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import logoIcon from "../assets/logo.png"
import profile from "../assets/profile.jpeg"

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  color: "#333",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  borderBottom: "1px solid #e0e0e0",
}));

const LogoImageContainer = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
  padding: theme.spacing(1, 0),

  '& .logo-icon': {
    height: '32px',
    width: 'auto',
    marginRight: theme.spacing(1),
    objectFit: 'contain',
    transition: 'transform 0.3s ease-in-out',
  },

  '& .logo-text': {
    fontSize: 20,
    fontWeight: "normal",
    font: 'caption',
    textTransform: 'uppercase',
    marginRight: theme.spacing(2),
    letterSpacing: '.1rem',
    color: 'inherit',
    transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out',
  },

  '&:hover': {
    '& .logo-icon': {
      transform: 'scale(1.1)',
    },
    '& .logo-text': {
      transform: 'scale(1.01)',
      color: theme.palette.primary.light,
    },
  },

  // Responsivitas
  [theme.breakpoints.down('sm')]: {
    '& .logo-icon': {
      height: '24px',
      marginRight: theme.spacing(0.5),
    },
    '& .logo-text': {
      fontSize: '1.2rem',
    },
  },
}));

const Header = ({ onMenuClick, isMobile, onLogout }) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleProfileClick = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setNotificationAnchor(null);
    setProfileAnchor(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  const notifications = [
    {
      id: 1,
      message: "New assignment posted for UI/UX Design",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Class reminder: Web Development starts in 1 hour",
      time: "3 hours ago",
    },
    { id: 3, message: "Your assessment has been graded", time: "1 day ago" },
    { id: 4, message: "New course material available", time: "2 days ago" },
  ];

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        {/* Left Side */}
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          {isMobileView && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {
            isMobileView ? (
              <LogoImageContainer to="/">
                <img src={logoIcon} alt="Company Logo" className="logo-icon" />
                <p className="logo-text">Freshvora</p>
              </LogoImageContainer>
            ) : (
              <LogoImageContainer to="/">
                <img src={logoIcon} alt="Company Logo" className="logo-icon" />
                <p className="logo-text">Learning Management System</p>
              </LogoImageContainer>
            )
          }
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Notifications */}
          <IconButton
            color="inherit"
            onClick={handleNotificationClick}
            sx={{ color: "#666" }}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile */}
          <IconButton
            color="inherit"
            onClick={handleProfileClick}
            sx={{ color: "#666" }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "#4aa72c" }}>
              <img src={profile} alt="" />
            </Avatar>
          </IconButton>
        </Box>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 300,
              maxHeight: 400,
              overflow: "auto",
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
          </Box>
          {notifications.map((notification) => (
            <MenuItem key={notification.id} sx={{ py: 1.5, px: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              john.doe@example.com
            </Typography>
          </Box>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>My Account</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <VpnKey fontSize="small" />
            </ListItemIcon>
            <ListItemText>Change Password</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Support fontSize="small" />
            </ListItemIcon>
            <ListItemText>Support</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
