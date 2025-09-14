import React from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardPage from "../pages/DashboardPage";
import ProgramExplorerPage from "../pages/ProgramExplorerPage";
import SchedulePage from "../pages/SchedulePage";
import VoraSpacePage from "../pages/VoraSpacePage";

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#fafafa",
  overflow: "hidden",
}));

const MainContent = styled(Box)(({ theme, isMobile, sidebarOpen }) => ({
  display: "flex",
  flex: 1,
  overflow: "auto",
  minHeight: "calc(100vh - 64px)", // Subtract header height
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  minHeight: "100%",
}));


const Layout = ({ onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar menu item selection based on path
  const pathToMenu = {
    "/": "dashboard",
    "/dashboard": "dashboard",
    "/schedule": "schedule",
    "/program": "program",
    "/voraspace": "voraspace",
    "/assessment": "assessment",
    "/portfolio": "portfolio",
  };
  const selectedMenuItem = pathToMenu[location.pathname] || "dashboard";

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuItemSelect = (itemId) => {
    // Map menu id to route
    const menuToPath = {
      dashboard: "/dashboard",
      schedule: "/schedule",
      program: "/program",
      voraspace: "/voraspace",
      assessment: "/assessment",
      portfolio: "/portfolio",
    };
    navigate(menuToPath[itemId] || "/dashboard");
  };

  return (
    <LayoutContainer>
      <Header
        onMenuClick={handleMenuClick}
        isMobile={isMobile}
        onLogout={onLogout}
      />

      <MainContent isMobile={isMobile} sidebarOpen={sidebarOpen}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedItem={selectedMenuItem}
          onItemSelect={handleMenuItemSelect}
        />

        <ContentArea>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/program" element={<ProgramExplorerPage />} />
            <Route path="/voraspace" element={<VoraSpacePage />} />
            <Route path="/assessment" element={<Box sx={{ p: 3, textAlign: 'center' }}><h2>Assessment</h2><p>This section is under development.</p></Box>} />
            <Route path="/portfolio" element={<Box sx={{ p: 3, textAlign: 'center' }}><h2>Portofolio</h2><p>This section is under development.</p></Box>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
