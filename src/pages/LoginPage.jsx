import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Container,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  width: "100%",
  margin: "0 auto",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  borderRadius: 16,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4aa72c",
  color: "white",
  padding: "12px 24px",
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: 8,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#3d8f24",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "bold",
  color: "#4aa72c",
  marginBottom: theme.spacing(1),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#666",
  fontWeight: 400,
}));

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (formData.email && formData.password) {
      onLogin();
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "linear-gradient(to top, #f6fff7 32%, #e8f5e9 102%, #4aa72c 104%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <StyledCard>
          <CardContent sx={{ p: 4 }}>
            <LogoContainer>
              <LogoText>FreshVora</LogoText>
              <Subtitle>Learning Management System</Subtitle>
            </LogoContainer>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="FreshVora ID or Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <StyledButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                Login
              </StyledButton>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Link
                  href="#"
                  sx={{
                    color: "#4aa72c",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default LoginPage;
