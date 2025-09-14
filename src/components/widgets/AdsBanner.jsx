import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery, Skeleton, Card, CardContent } from '@mui/material';

const AdsBanner = ({ loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) {
    return (
      <Card sx={{ borderRadius: 3, boxShadow: 2, minHeight: 90 }}>
        <CardContent>
          <Skeleton variant="rectangular" height={isMobile ? 90 : 70} width="100%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        background: 'linear-gradient(90deg, #4aa72c 0%, #134e4a 100%)', // darker green/teal
        color: '#fff',
        minHeight: 90,
        display: 'flex',
        alignItems: 'center',
        px: isMobile ? 2 : 4,
        py: isMobile ? 2 : 3,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={700} gutterBottom>
          🚀 Join Our Next Webinar: "Master Modern Learning!"
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.95 }}>
          Register now for exclusive access to expert-led classes, Q&amp;A, and networking. Limited seats available!
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        size={isMobile ? 'small' : 'large'}
        sx={{ ml: isMobile ? 0 : 4, mt: isMobile ? 2 : 0, fontWeight: 700, borderRadius: 2, boxShadow: 1 }}
        href="#"
      >
        Register Now
      </Button>
    </Card>
  );
};

export default AdsBanner;
