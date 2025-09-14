import React from 'react';
import { Skeleton, Box, Card, CardContent, Grid, TextField } from '@mui/material';

export function ScheduleItemSkeleton() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, width: '100%', mb: 2 }}>
      <CardContent>
        <Skeleton variant="text" width="40%" height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={16} />
      </CardContent>
    </Card>
  );
}

export function ProgramCardSkeleton() {
  return (
    <Card sx={{ width: 320, height: 380, borderRadius: 3, boxShadow: 2, mb: 2 }}>
      <Skeleton variant="rectangular" width={320} height={160} />
      <CardContent>
        <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton variant="rectangular" width={60} height={24} />
          <Skeleton variant="rectangular" width={80} height={24} />
        </Box>
        <Skeleton variant="rectangular" width="100%" height={36} />
      </CardContent>
    </Card>
  );
}

export function ProgramSearchSkeleton() {
  return (
    <Box sx={{ mb: 3, maxWidth: 400 }}>
      <Skeleton variant="rectangular" width={400} height={56} />
    </Box>
  );
}
