import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
  Bookmarks as SessionIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
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

const ClassTypeChip = styled(Chip)(({ theme }) => ({
  border: '1px solid #4aa72c',
  color: '#4aa72c',
  backgroundColor: 'transparent',
  fontWeight: 600,
  fontSize: '12px',
  height: 24,
}));

const CountdownText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  color: '#4aa72c',
  marginBottom: theme.spacing(1),
}));

const ClassCode = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
  fontFamily: 'monospace',
  backgroundColor: 'transparent',
  fontWeight: 600,
}));

const ProgramText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
  fontFamily: 'monospace',
  backgroundColor: 'transparent',
  marginBottom: theme.spacing(2),
}));

const InstructorInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const InstructorName = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: '#333',
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ProgressLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
}));

const ProgressPercentage = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: '#4aa72c',
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 8,
}));

const SliderWrapper = styled(Box)(({ theme, translatex }) => ({
  display: 'flex',
  transform: `translateX(${translatex}%)`,
  transition: 'transform 0.3s ease-in-out',
}));

const ClassSlide = styled(Box)(({ theme }) => ({
  minWidth: '100%',
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

const OngoingClass = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [currentClass, setCurrentClass] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  // Helper to convert countdown timestamp to "Xd Yh", "Hh Mm", or "Mm Ss" format
  function parseCountdown(timestamp) {
    let diff = Math.max(0, Math.floor((timestamp - Date.now()) / 1000)); // in seconds
    const days = Math.floor(diff / (24 * 3600));
    diff -= days * 24 * 3600;
    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff - minutes * 60;
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      let out = [`${hours}h`];
      if (minutes) out.push(`${minutes}m`);
      return out.join(' ');
    } else {
      let out = [];
      if (minutes) out.push(`${minutes}m`);
      if (seconds) out.push(`${seconds}s`);
      if (out.length === 0) out.push('0m');
      return out.join(' ');
    }
  }

  // Use future timestamps for countdown (ms since epoch)
  const now = Date.now();
  const classes = [
    {
      id: 1,
      type: 'Online Class',
      countdown: now + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000, // 2 days 3 hours from now
      classCode: 'CLASS-UX01',
      program: 'UI/UX Design',
      instructors: ['John Doe', 'Sarah Miller', 'Mike Johnson'],
      schedule: '13:00 - 15:00',
      progress: 65,
      session: 5,
    },
    {
      id: 2,
      type: 'Onsite Class',
      location: 'SMKN 1 Tangerang - Room 101',
      countdown: now + 5 * 60 * 60 * 1000 + 30 * 60 * 1000, // 5 hours 30 min from now
      classCode: 'CLASS-WD02',
      program: 'Web Development',
      instructors: ['Alex Chen', 'Emma Wilson'],
      schedule: '09:00 - 11:00',
      progress: 30,
      session: 3,
    },
    {
      id: 3,
      type: 'Online Class',
      countdown: now + 7 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000, // 1 week 1 hour from now
      classCode: 'CLASS-DM01',
      program: 'Digital Marketing',
      instructors: ['David Kim', 'Lisa Park', 'Tom Brown'],
      schedule: '14:00 - 16:00',
      progress: 80,
      session: 8,
    },
    {
      id: 4,
      type: 'Online Class',
      countdown: now + 45 * 60 * 1000 + 10 * 1000, // 45 min 10 sec from now
      classCode: 'CLASS-NEW04',
      program: 'Data Science',
      instructors: ['Jane Smith'],
      schedule: '16:00 - 17:00',
      progress: 10,
      session: 1,
    },
  ];

  useEffect(() => {
    setTranslateX(-currentClass * 100);
  }, [currentClass]);


  const handleDotClick = (index) => {
    setCurrentClass(index);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClass((prev) => (prev === classes.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [classes.length, currentClass]);

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <CardHeader>
          <Title>Ongoing Class</Title>
          <Subtitle>Next upcoming class information</Subtitle>
        </CardHeader>

        <SliderContainer>
          <SliderWrapper translatex={translateX}>
            {classes.map((classItem, index) => (
              <ClassSlide key={classItem.id}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <ClassTypeChip label={classItem.type} />
                  <CountdownText sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ScheduleIcon sx={{ fontSize: 18, color: '#4aa72c', mr: 0.5 }} />
                    {parseCountdown(classItem.countdown)}
                  </CountdownText>
                </Box>

                <ClassCode>{classItem.classCode}</ClassCode>
                <ProgramText>{classItem.program}</ProgramText>

                <InstructorInfo>
                  <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                    {classItem.instructors.slice(0, 3).map((instructor, idx) => (
                      <Avatar key={idx} sx={{ bgcolor: ['#4aa72c', '#2196f3', '#ff9800'][idx], fontSize: '14px' }}>
                        {instructor.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                    ))}
                    {classItem.instructors.length > 3 && (
                      <Avatar sx={{ bgcolor: '#999', fontSize: '14px' }}>
                        +{classItem.instructors.length - 3}
                      </Avatar>
                    )}
                  </AvatarGroup>
                  <InstructorName>
                    {classItem.instructors[0]}{classItem.instructors.length > 1 ? ` +${classItem.instructors.length - 1} more` : ''}
                  </InstructorName>
                </InstructorInfo>

                <InfoContainer>
                  <ScheduleIcon sx={{ fontSize: 16, color: '#666' }} />
                  <InfoText>{classItem.schedule} GMT+7</InfoText>
                </InfoContainer>

                <InfoContainer>
                  <PlaceIcon sx={{ fontSize: 16, color: '#666' }} />
                  <InfoText>{classItem.type === 'Online Class' ? 'Zoom Meeting' : classItem.location}</InfoText>
                </InfoContainer>

                <InfoContainer>
                  <SessionIcon sx={{ fontSize: 16, color: '#666' }} />
                  <InfoText>Session {classItem.session}</InfoText>
                </InfoContainer>

                <ProgressContainer>
                  <ProgressLabel>
                    <ProgressText>My Progress</ProgressText>
                    <ProgressPercentage>{classItem.progress}%</ProgressPercentage>
                  </ProgressLabel>
                  <LinearProgress
                    variant="determinate"
                    value={classItem.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4aa72c',
                        borderRadius: 4,
                      },
                    }}
                  />
                </ProgressContainer>
              </ClassSlide>
            ))}
          </SliderWrapper>

        </SliderContainer>

        {/* Dots Navigation */}
        <DotsContainer>
          {classes.map((_, index) => (
            <Dot
              key={index}
              active={index === currentClass}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </DotsContainer>
      </CardContent>
    </StyledCard>
  );
};

export default OngoingClass;
