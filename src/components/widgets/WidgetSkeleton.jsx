import React from 'react';
import { Skeleton, Box, Card, CardContent } from '@mui/material';

const WidgetSkeleton = ({ height = 220 }) => (
  <Card sx={{ borderRadius: 3, boxShadow: 2, width: '100%', mb: 2 }}>
    <CardContent>
      <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={height} />
    </CardContent>
  </Card>
);

export default WidgetSkeleton;
