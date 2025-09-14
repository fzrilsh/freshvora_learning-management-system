import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  WorkspacePremium as VoraSpaceIcon,
  Assignment as AssessmentIcon,
  Folder as PortfolioIcon,
  EventNoteSharp,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const StyledSidebar = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  backgroundColor: '#fafafa',
  borderRight: '1px solid #e0e0e0',
  height: '100%',
  overflow: 'auto',
}));

const NavigationItem = styled(ListItemButton)(({ theme, selected }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: 8,
  backgroundColor: selected ? '#4aa72c' : 'transparent',
  color: '#333',
  '&:hover': {
    backgroundColor: selected ? '#3d8f24' : '#f0f0f0',
  },
  '& .MuiListItemIcon-root': {
    color: '#666',
    minWidth: 40,
  },
  '& .MuiListItemText-primary': {
    fontWeight: selected ? 600 : 400,
  },
}));

const Sidebar = ({ open, onClose, selectedItem }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'schedule', label: 'Schedule', icon: <EventNoteSharp /> },
    { id: 'program', label: 'Program Explorer', icon: <SchoolIcon /> },
    { id: 'voraspace', label: 'VoraSpace', icon: <VoraSpaceIcon /> },
    { id: 'assessment', label: 'Assessment', icon: <AssessmentIcon /> },
    { id: 'portfolio', label: 'Portofolio', icon: <PortfolioIcon /> },
  ];


  // Map menu id to route
  const menuToPath = {
    dashboard: '/dashboard',
    schedule: '/schedule',
    program: '/program',
    voraspace: '/voraspace',
    assessment: '/assessment',
    portfolio: '/portfolio',
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <NavigationItem
              component={Link}
              to={menuToPath[item.id] || '/dashboard'}
              selected={selectedItem === item.id}
              onClick={isMobile ? onClose : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </NavigationItem>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <StyledSidebar
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      {drawerContent}
    </StyledSidebar>
  );
};

export default Sidebar;
