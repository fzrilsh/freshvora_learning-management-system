// ...existing code...
import {
  Box,
  Grid,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ProgressChart from '../components/widgets/ProgressChart';
import OngoingClass from '../components/widgets/OngoingClass';
import PendingAssessments from '../components/widgets/PendingAssessments';
import InformationSlider from '../components/widgets/InformationSlider';
import WidgetSkeleton from '../components/widgets/WidgetSkeleton';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const DashboardContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: '#fafafa',
  minHeight: 'calc(100dvh + 20px)',
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 700,
  color: '#333',
  marginBottom: theme.spacing(1),
}));

const WelcomeSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#666',
}));

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardContainer>
      <Container maxWidth="xl">
        <WelcomeSection>
          <WelcomeTitle>Welcome back, John!</WelcomeTitle>
          <WelcomeSubtitle>
            Here's what's happening with your learning journey today.
          </WelcomeSubtitle>
        </WelcomeSection>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
          {/* Progress Chart - 60% width on desktop */}
          <Box sx={{ width: { xs: '100%', lg: '60%' } }}>
            {loading ? <WidgetSkeleton height={260} /> : <ProgressChart />}
          </Box>

          {/* Ongoing Class - 40% width on desktop */}
          <Box sx={{ width: { xs: '100%', lg: '40%' } }}>
            {loading ? <WidgetSkeleton height={260} /> : <OngoingClass />}
          </Box>
        </Box>

        {/* Pending Assessments and Information Slider - Side by side */}
        <Box sx={{ 
          mt: 3, 
          display: 'flex', 
          flexDirection: { xs: 'column', lg: 'row' }, 
          gap: 3 
        }}>
          {/* Information Slider - 30% width on desktop */}
          <Box sx={{ width: { xs: '100%', lg: '40%' } }}>
            {loading ? <WidgetSkeleton height={180} /> : <InformationSlider />}
          </Box>

          {/* Pending Assessments - 70% width on desktop */}
          <Box sx={{ width: { xs: '100%', lg: '60%' } }}>
            {loading ? <WidgetSkeleton height={180} /> : <PendingAssessments />}
          </Box>
        </Box>
      </Container>
      <Footer />
    </DashboardContainer>
  );
};

export default DashboardPage;
