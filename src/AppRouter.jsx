import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4aa72c',
      light: '#6bb84a',
      dark: '#3d8f24',
    },
    secondary: {
      main: '#666',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function AppRouter() {
  // TODO: Replace with real auth logic
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {!isLoggedIn && (
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          )}
          {isLoggedIn ? (
            <Route path="/*" element={<Layout onLogout={handleLogout} />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default AppRouter;
