import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
  overflow: 'hidden',
}));

const CardHeader = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  borderBottom: '1px solid #e0e0e0',
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  color: '#333',
  marginBottom: theme.spacing(1),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 'fit-content',
  overflow: 'hidden',
  borderRadius: 8,
  backgroundColor: '#f5f5f5',
}));

const SliderWrapper = styled(Box)(({ theme, translatex }) => ({
  display: 'flex',
  height: 250,
  transform: `translateX(${translatex}%)`,
  transition: 'transform 0.3s ease-in-out',
}));

const Slide = styled(Box)(({ theme }) => ({
  minWidth: '100%',
  height: 250,
  backgroundColor: '#f0f0f0',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  position: 'relative',
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: '#4aa72c',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  zIndex: 2,
}));

const LeftButton = styled(NavigationButton)(({ theme }) => ({
  left: 8,
}));

const RightButton = styled(NavigationButton)(({ theme }) => ({
  right: 8,
}));

const DotsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const Dot = styled(Box)(({ theme, active }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: active ? '#4aa72c' : '#ccc',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: active ? '#3d8f24' : '#999',
  },
}));

const InformationSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://freshvora.com/_next/static/media/freshvora_4.3c9a58a6.png',
    },
    {
      id: 2,
      image: 'https://freshvora.com/_next/static/media/freshvora_5.120f344c.png',
    },
    {
      id: 3,
      image: 'https://freshvora.com/_next/static/media/freshvora_2.3105fa2e.jpg',
    }
  ];

  useEffect(() => {
    setTranslateX(-currentSlide * 100);
  }, [currentSlide]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleImageClick = (imageUrl) => {
    const win = window.open(imageUrl, '_blank');
    if (win) {
      win.focus();
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, currentSlide]);

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <CardHeader>
          <Title>Information & Updates</Title>
          <Subtitle>Stay updated with latest news and announcements</Subtitle>
        </CardHeader>

        <SliderContainer>
          <SliderWrapper translatex={translateX}>
            {slides.map((slide) => (
              <Slide
                key={slide.id}
                sx={{
                  backgroundImage: `url(${slide.image})`,
                }}
                onClick={() => handleImageClick(slide.image)}
              />
            ))}
          </SliderWrapper>

          {/* Navigation Buttons */}
          <LeftButton onClick={handlePrevious} size="small">
            <ChevronLeftIcon />
          </LeftButton>
          <RightButton onClick={handleNext} size="small">
            <ChevronRightIcon />
          </RightButton>
        </SliderContainer>

        {/* Dots Navigation */}
        <DotsContainer>
          {slides.map((_, index) => (
            <Dot
              key={index}
              active={index === currentSlide}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </DotsContainer>
      </CardContent>
    </StyledCard>
  );
};

export default InformationSlider;
