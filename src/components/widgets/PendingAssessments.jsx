import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column',
}));

const CardHeader = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  borderBottom: '1px solid #e0e0e0',
  marginBottom: theme.spacing(1),
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

const AssessmentItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  borderBottom: '1px solid #f0f0f0',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const LessonTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: '#333',
  marginBottom: theme.spacing(0.5),
}));

const ClassCode = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#666',
  fontFamily: 'monospace',
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(0.25, 0.75),
  borderRadius: 4,
  display: 'inline-block',
  marginBottom: theme.spacing(0.5),
}));

const DeadlineInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
}));

const DeadlineText = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#ff6b35',
  fontWeight: 500,
}));

const StartButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4aa72c',
  color: 'white',
  fontSize: '12px',
  fontWeight: 600,
  padding: theme.spacing(0.5, 1.5),
  borderRadius: 6,
  textTransform: 'none',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: '#3d8f24',
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  color: '#666',
}));

const ListContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  maxHeight: 300, // Match the information slider height
}));

const PendingAssessments = () => {
  const theme = useTheme();

  const assessments = [
    {
      id: 1,
      lessonName: 'Introduction to Prototyping',
      classCode: 'CLASS-UX01',
      deadline: 'Due in 3 days',
      isUrgent: true,
    },
    {
      id: 2,
      lessonName: 'JavaScript Fundamentals Quiz',
      classCode: 'CLASS-WD02',
      deadline: 'Due in 5 days',
      isUrgent: false,
    },
    {
      id: 3,
      lessonName: 'Digital Marketing Strategy',
      classCode: 'CLASS-DM01',
      deadline: 'Due in 1 week',
      isUrgent: false,
    },
  ];

  const handleStartAssessment = (assessmentId) => {
    console.log(`Starting assessment ${assessmentId}`);
    // Handle start assessment logic here
  };

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <CardHeader>
          <Title>Pending Assessments</Title>
          <Subtitle>Complete your assignments on time</Subtitle>
        </CardHeader>

        <ListContainer>
          {assessments.length > 0 ? (
            <List sx={{ p: 0 }}>
              {assessments.map((assessment, index) => (
                <React.Fragment key={assessment.id}>
                  <AssessmentItem>
                    <ListItemText
                      primary={
                        <Box>
                          <LessonTitle>{assessment.lessonName}</LessonTitle>
                          <ClassCode>{assessment.classCode}</ClassCode>
                          <DeadlineInfo>
                            <ScheduleIcon sx={{ fontSize: 14, color: '#ff6b35' }} />
                            <DeadlineText>{assessment.deadline}</DeadlineText>
                          </DeadlineInfo>
                        </Box>
                      }
                      secondary={
                        assessment.isUrgent && (
                          <Chip
                            label="Urgent"
                            size="small"
                            sx={{
                              backgroundColor: '#ffebee',
                              color: '#d32f2f',
                              fontSize: '10px',
                              height: 20,
                              mt: 1,
                            }}
                          />
                        )
                      }
                    />
                    <ListItemSecondaryAction>
                      <StartButton
                        startIcon={<PlayIcon sx={{ fontSize: 14 }} />}
                        onClick={() => handleStartAssessment(assessment.id)}
                      >
                        Start
                      </StartButton>
                    </ListItemSecondaryAction>
                  </AssessmentItem>
                  {index < assessments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <EmptyState>
              <AssignmentIcon sx={{ fontSize: 48, color: '#e0e0e0', mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                No pending assessments
              </Typography>
            </EmptyState>
          )}
        </ListContainer>
      </CardContent>
    </StyledCard>
  );
};

export default PendingAssessments;
