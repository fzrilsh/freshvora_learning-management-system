import React from 'react';
import {
  Box,
  Typography,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import logoIcon from "../assets/logo.png"

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  borderTop: '1px solid #e0e0e0',
  padding: theme.spacing(2, 0),
  marginTop: 20,
}));

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: theme.spacing(1),
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
  textAlign: { xs: 'center', sm: 'left' },
}));

const CompanyImage = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',

  '& .logo-icon': {
    height: '32px',
    width: 'auto',
    marginRight: theme.spacing(1),
    objectFit: 'contain',
    transition: 'transform 0.3s ease-in-out',
  },

  '&:hover': {
    '& .logo-icon': {
      transform: 'scale(1.1)',
    },
  },

  // Responsivitas
  [theme.breakpoints.down('sm')]: {
    '& .logo-icon': {
      height: '24px',
      marginRight: theme.spacing(0.5),
    },
  },
}));

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent maxWidth="xl">
        <CopyrightText>
          © {new Date().getFullYear()} FreshVora. All rights reserved.
        </CopyrightText>
        <CompanyImage to="/">
          <img src={logoIcon} alt="Company Logo" className="logo-icon" />
        </CompanyImage>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;
