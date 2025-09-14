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
import React, { useState, useEffect, useRef } from 'react';
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


const getTodayKey = () => {
  const today = new Date();
  return `welcome-spotlight-${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
};

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const subtitleRef = useRef(null);
  const [spotlightStyle, setSpotlightStyle] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Show spotlight only once per day
  useEffect(() => {
    const todayKey = getTodayKey();
    if (!localStorage.getItem(todayKey)) {
      setShowSpotlight(true);
      localStorage.setItem(todayKey, 'shown');
    }
  }, []);

  // Calculate position for spotlight cutout
  useEffect(() => {
    if (showSpotlight && subtitleRef.current) {
      const rect = subtitleRef.current.getBoundingClientRect();
      setSpotlightStyle({
        top: rect.top - 12,
        left: rect.left - 12,
        width: rect.width + 24,
        height: rect.height + 24,
      });
    }
  }, [showSpotlight]);

  // Handler to dismiss spotlight
  const handleDismissSpotlight = () => setShowSpotlight(false);

  return (
    <DashboardContainer sx={showSpotlight ? { position: 'relative', overflow: 'hidden' } : {}}>
      {showSpotlight && spotlightStyle && (
        <>
          {/* SVG mask overlay for spotlight */}
          <Box
            sx={{
              position: 'fixed',
              zIndex: 1300,
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'auto',
            }}
            onClick={handleDismissSpotlight}
          >
            <svg width="100vw" height="100vh" style={{ position: 'absolute', width: '100vw', height: '100vh', top: 0, left: 0 }}>
              <defs>
                <mask id="spotlight-mask">
                  <rect x="0" y="0" width="100vw" height="100vh" fill="white" />
                  <rect
                    x={spotlightStyle.left}
                    y={spotlightStyle.top}
                    width={spotlightStyle.width}
                    height={spotlightStyle.height}
                    rx="10"
                    fill="black"
                  />
                </mask>
              </defs>
              <rect
                x="0"
                y="0"
                width="100vw"
                height="100vh"
                fill="rgba(0,0,0,0.65)"
                mask="url(#spotlight-mask)"
              />
            </svg>
          </Box>
          {/* Tooltip message below the subtitle */}
          <Box
            sx={{
              position: 'fixed',
              zIndex: 1400,
              top: spotlightStyle.top + spotlightStyle.height + 16,
              left: spotlightStyle.left,
              bgcolor: 'background.paper',
              color: 'text.primary',
              px: 2,
              py: 1,
              borderRadius: 2,
              boxShadow: 3,
              fontWeight: 500,
              fontSize: 16,
              pointerEvents: 'auto',
            }}
          >
            Click anywhere to continue.
          </Box>
        </>
      )}
      <Container maxWidth="xl">
        <WelcomeSection>
          <WelcomeTitle>Halo, John!</WelcomeTitle>
          <WelcomeSubtitle ref={subtitleRef} sx={showSpotlight ? { position: 'relative', zIndex: 2000, borderRadius: 2, fontWeight: 700, transition: 'all 0.3s' } : {}}>
            <q>Siapa pun yang tidak pernah melakukan kesalahan, tidak pernah mencoba sesuatu yang baru.</q>
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
