import { ProgramCardSkeleton, ProgramSearchSkeleton } from '../components/widgets/SectionSkeletons';
import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Tabs,
  Tab,
  Autocomplete,
  TextField,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const programs = [
  { id: 1, title: 'UI/UX Design Career Path', description: 'Learn to design beautiful and functional user interfaces from scratch.', category: 'UI/UX Design', type: 'Paid', level: 'Beginner', image: 'https://picsum.photos/400/200?random=1' },
  { id: 2, title: 'Intro to Web Development', description: 'Master the basics of HTML, CSS, and JavaScript.', category: 'Web Development', type: 'Free', level: 'Beginner', image: 'https://picsum.photos/400/200?random=2' },
  { id: 3, title: 'Data Science with Python', description: 'Analyze data and build machine learning models using Python.', category: 'Data Science', type: 'Paid', level: 'Intermediate', image: 'https://picsum.photos/400/200?random=3' },
  { id: 4, title: 'Digital Marketing Fundamentals', description: 'Learn SEO, SEM, and Social Media Marketing to grow any business.', category: 'Digital Marketing', type: 'Free', level: 'Beginner', image: 'https://picsum.photos/400/200?random=4' },
  { id: 5, title: 'Advanced Web Development', description: 'Dive deep into React, Node.js, and advanced web concepts.', category: 'Web Development', type: 'Paid', level: 'Advanced', image: 'https://picsum.photos/400/200?random=4' },
  { id: 6, title: 'Product Management Essentials', description: 'Understand the lifecycle of a product from idea to launch.', category: 'Product Management', type: 'Paid', level: 'Intermediate', image: 'https://picsum.photos/400/200?random=5' }
];

const filterOptions = [
  'UI/UX Design',
  'Web Development',
  'Data Science',
  'Digital Marketing',
  'Product Management',
];

function ProgramExplorerPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tab, setTab] = useState(0); // 0: Free, 1: Paid
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchesType = tab === 0 ? p.type === 'Free' : p.type === 'Paid';
      const matchesFilter = filter ? p.category === filter : true;
      return matchesType && matchesFilter;
    });
  }, [tab, filter]);

  return (
    <Box maxWidth={'xl'} sx={{ p: { xs: 2, md: 4 }, minHeight: 'calc(100dvh + 20px)', }}>
      <Typography variant="h4" fontWeight={700} color="primary" mb={3}>
        Program Explorer
      </Typography>
      {loading ? <ProgramSearchSkeleton /> : (
        <Autocomplete
          options={filterOptions}
          value={filter}
          onChange={(_, v) => setFilter(v)}
          clearOnEscape
          renderInput={(params) => (
            <TextField {...params} label="Search for programs by interest or major" variant="outlined" />
          )}
          sx={{ mb: 3, maxWidth: 400 }}
        />
      )}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="Free Programs" />
        <Tab label="Paid Programs" />
      </Tabs>
      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i} display="flex" justifyContent="center">
                <ProgramCardSkeleton />
              </Grid>
            ))
          : filteredPrograms.length === 0 ? (
              <Grid item xs={12}>
                <Typography color="text.secondary" align="center">
                  No programs found.
                </Typography>
              </Grid>
            ) : (
              filteredPrograms.map((program) => (
                <Grid item xs={12} sm={6} md={4} key={program.id} display="flex" justifyContent="center">
                  <Card
                    sx={{
                      width: 320,
                      height: 380,
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      boxShadow: 2,
                      flex: 'none',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={program.image}
                      alt={program.title}
                      sx={{ objectFit: 'cover', width: '100%' }}
                    />
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                        {program.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {program.description}
                      </Typography>
                      <Stack direction="row" spacing={1} mb={2}>
                        <Chip label={program.level} color="success" size="small" />
                        <Chip label={program.category} color="primary" size="small" />
                      </Stack>
                      <Box mt="auto">
                        <Button variant="contained" color="primary" fullWidth onClick={() => navigate(`/course/${program.id}`)}>
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
      </Grid>
      <Footer />
    </Box>
  );
}

export default ProgramExplorerPage;
