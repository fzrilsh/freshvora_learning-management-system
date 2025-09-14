import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
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

const LegendContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const LegendColor = styled(Box)(({ color }) => ({
  width: 12,
  height: 12,
  borderRadius: 2,
  backgroundColor: color,
}));

const ProgressChart = () => {
  const theme = useTheme();

  // Example chart data (replace with props/data as needed)
  const chartData = {
    series: [
      {
        data: [75, 40, 90, 60],
        label: 'My Progress',
        color: '#4aa72c',
      },
      {
        data: [60, 55, 85, 70],
        label: 'Class Progress',
        color: '#e0e0e0',
      },
    ],
    xAxis: [
      {
        data: ['UI/UX Design', 'Web Development', 'Digital Marketing', 'Data Science'],
        scaleType: 'band',
      },
    ],
  };

  // Calculate minWidth for scroll if data > 3
  const categoryCount = chartData.xAxis[0].data.length;
  const minWidth = categoryCount > 3 ? `${categoryCount * 160}px` : '100%';

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <CardHeader>
          <Title>My Progress</Title>
          <Subtitle>Compare your progress with class average</Subtitle>
        </CardHeader>

        {/* Custom Legend always visible */}
        <LegendContainer sx={{ justifyContent: 'center' }}>
          {chartData.series.map((s, idx) => (
            <LegendItem key={s.label}>
              <LegendColor color={s.color} />
              <Typography variant="body2" color="text.secondary">{s.label}</Typography>
            </LegendItem>
          ))}
        </LegendContainer>

        <Box sx={{ height: 260, width: '100%', overflowX: 'auto', overflowY: 'hidden', mt: 2 }}>
          <Box sx={{ minWidth, height: 260 }}>
            <BarChart
              series={chartData.series}
              xAxis={chartData.xAxis}
              height={300}
              margin={{ left: 0, right: 20, top: 20, bottom: 60 }}
              colors={['#4aa72c', '#e0e0e0']}
              hideLegend={true}
            />
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProgressChart;
