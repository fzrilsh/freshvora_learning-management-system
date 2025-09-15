import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Tabs,
  Tab,
  Stack,
  Divider,
  LinearProgress,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CodeIcon from "@mui/icons-material/Code";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ClassIcon from "@mui/icons-material/MeetingRoom";
import LinkIcon from "@mui/icons-material/Link";
import Footer from "../components/Footer";

const mockCourse = {
  title: "Zero to Job-Ready Programmer",
  code: "ZJP101",
  credits: 3,
  classInfo: "ZCRP-1",
  thumbnail:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  duration: 260,
  rating: 4.8,
  price: 49000,
  highlights: [
    { icon: <DescriptionIcon color="primary" />, label: "7 Topics" },
    { icon: <CheckCircleIcon color="success" />, label: "7 Assessments" },
    { icon: <PlayCircleOutlineIcon color="secondary" />, label: "22 Modules" },
    {
      icon: <Chip label="Certificate" color="success" size="small" />,
      label: "",
    },
  ],
  modules: [
    {
      title: "Introduction",
      submodules: ["Welcome", "Course Overview", "How to Succeed"],
    },
    {
      title: "Programming Basics",
      submodules: ["Variables", "Data Types", "Operators"],
    },
    {
      title: "Control Flow",
      submodules: ["If Statements", "Loops", "Switch"],
    },
  ],
  description:
    "This course is designed to take you from zero to job-ready programmer. You will learn the fundamentals of programming, problem-solving, and real-world application development. By the end, you will be able to build your own projects and have a strong foundation for a tech career.\n\nWhat you will learn:\n- Programming logic and structure\n- Real-world coding skills\n- How to think like a developer",
  trainers: [
    {
      name: "Sarah Lee, M.Sc.",
      trainer_type: "Primary Instructor",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "James Kim, M.Sc.",
      trainer_type: "Secondary Instructor",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ],
  sessions: [
    {
      title: "Operator, Operand, and Arithmetic",
      learningOutcome: [
        "Understand operators and operands",
        "Apply arithmetic operations in code",
      ],
      subTopics: ["Operators", "Operands", "Arithmetic Expressions"],
      schedule: {
        start: "2025-09-20T09:00",
        end: "2025-09-20T11:00",
        mode: "Onsite - F2F",
      },
      activities: [
        {
          icon: <ChecklistIcon color="secondary" />,
          name: "Class Attendance",
          time: "2m",
          status: "done",
        },
        {
          icon: <PlayCircleOutlineIcon color="secondary" />,
          name: "Zoom Meeting",
          time: "60m",
          status: "done",
        },
        {
          icon: <LinkIcon color="action" />,
          name: "External Material",
          time: "15m",
          status: "done",
        },
      ],
    },
    {
      title: "Control Flow Deep Dive",
      learningOutcome: [
        "Master if/else and switch statements",
        "Implement loops in real code",
      ],
      subTopics: ["If/Else", "Switch", "Loops"],
      schedule: {
        start: "2025-09-27T09:00",
        end: "2025-09-27T11:00",
        mode: "Online",
      },
      activities: [
        {
          icon: <ChecklistIcon color="secondary" />,
          name: "Class Attendance",
          time: "2m",
          status: "pending",
        },
        {
          icon: <PlayCircleOutlineIcon color="secondary" />,
          name: "Zoom Meeting",
          time: "60m",
          status: "pending",
        },
        {
          icon: <LinkIcon color="action" />,
          name: "External Material",
          time: "15m",
          status: "pending",
        },
      ],
    },
  ],
};

const CoursePage = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSession, setActiveSession] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // --- Unenrolled View ---
  if (!isEnrolled) {
    return (
      <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100dvh", py: 4 }}>
        <Box maxWidth="md" mx="auto">
          {/* Hero Section */}
          <Card
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              mb: 4,
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              image={mockCourse.thumbnail}
              alt={mockCourse.title}
              sx={{ width: isMobile ? "100%" : 320, objectFit: "cover" }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={700} mb={1}>
                {mockCourse.title}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    {mockCourse.duration} Minutes
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <StarIcon fontSize="small" color="warning" />
                  <Typography variant="body2">
                    {mockCourse.rating} / 5.0
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h5" color="primary" fontWeight={700} mb={2}>
                Rp {mockCourse.price.toLocaleString("id-ID")}
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setIsEnrolled(true)}
              >
                + JOIN CLASS
              </Button>
            </CardContent>
          </Card>

          {/* Highlights Section */}
          <Box display="flex" gap={2} mb={3} flexWrap="wrap">
            {mockCourse.highlights.map((h, i) => (
              <Stack
                key={i}
                direction="row"
                alignItems="center"
                spacing={1}
                bgcolor="#fff"
                px={2}
                py={1}
                borderRadius={2}
                boxShadow={1}
              >
                {h.icon}
                <Typography variant="body2">{h.label}</Typography>
              </Stack>
            ))}
          </Box>

          {/* Module List Section (Preview) */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Course Curriculum
              </Typography>
              {mockCourse.modules.map((mod, idx) => (
                <Accordion key={idx}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>{mod.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {mod.submodules.map((sub, i) => (
                        <li key={i}>
                          <Typography variant="body2">{sub}</Typography>
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          {/* Description Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                About this Course
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: showFullDesc ? "unset" : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {mockCourse.description}
              </Typography>
              {!showFullDesc && (
                <Button
                  size="small"
                  onClick={() => setShowFullDesc(true)}
                  sx={{ mt: 1 }}
                >
                  Show more
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Trainer Information Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Trainers
              </Typography>
              <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                {mockCourse.trainers.map((t, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <Avatar
                      src={t.avatar}
                      alt={t.name}
                      sx={{ width: 56, height: 56 }}
                    />
                    <Box>
                      <Typography fontWeight={600}>{t.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t.trainer_type}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Footer />
      </Box>
    );
  }

  // --- Enrolled View ---
  const session = mockCourse.sessions[activeSession];
  // Check if all activities are done
  const allDone = session.activities.every((act) => act.status === "done");
  // Calculate total subtopics
  const totalSubtopics = mockCourse.sessions.reduce(
    (acc, s) => acc + (s.subTopics?.length || 0),
    0
  );
  // Handler for back navigation (replace with real navigation if needed)
  const handleBack = () => window.history.back();
  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100dvh", p: 4 }}>
      <Box maxWidth="lg" mx="auto">
        {/* Course Info Header with Back Button and Summary */}
        {/* Back Button above Info Header */}
        <Box sx={{ mb: 2 }}>
          <Tooltip title="Back">
            <IconButton
              onClick={handleBack}
              size="large"
              sx={{ bgcolor: "#fff", boxShadow: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              alignItems={isMobile ? "flex-start" : "center"}
              justifyContent="space-between"
            >
              <Stack
                direction="column"
                alignItems="start"
                spacing={2}
                sx={{ flex: 1 }}
              >
                <Typography variant="h6" fontWeight={700} noWrap>
                  {mockCourse.title}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" ml={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CodeIcon fontSize="small" color="secondary" />
                    <Typography variant="body2" fontWeight={400}>
                      {mockCourse.code}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ListAltIcon fontSize="small" color="secondary" />
                    <Typography variant="body2" fontWeight={400}>
                      {totalSubtopics} Subtopics
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ClassIcon fontSize="small" color="secondary" />
                    <Typography variant="body2" fontWeight={400}>
                      {mockCourse.classInfo}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            {/* Trainer Avatars and Names in Info Header */}
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              mt={2}
              borderTop={"1px solid #eee"}
              pt={2}
            >
              {mockCourse.trainers.map((t, i) => (
                <Stack key={i} direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    src={t.avatar}
                    alt={t.name}
                    sx={{ border: "2px solid #fff", width: 44, height: 44 }}
                  />
                  <Stack>
                    <Typography variant="body2" fontWeight={600} noWrap>
                      {t.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {t.trainer_type}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Main Navigation Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          <Tab label="Session" />
          <Tab label="Syllabus" />
          <Tab label="Forum" />
          <Tab label="Assessment" />
          <Tab label="Gradebook" />
        </Tabs>

        {/* Session/Meeting Navigation */}
        {activeTab === 0 && (
          <Stack direction="row" spacing={1} mb={2}>
            {mockCourse.sessions.map((s, idx) => (
              <Button
                key={idx}
                variant={activeSession === idx ? "contained" : "outlined"}
                color={activeSession === idx ? "primary" : "inherit"}
                size="small"
                onClick={() => setActiveSession(idx)}
              >
                Session {idx + 1}
              </Button>
            ))}
          </Stack>
        )}

        {/* Main Content Area */}
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems="flex-start"
        >
          {/* Session Content (Left Pane) */}
          <Box flex={2} minWidth={0}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={1}>
                  {session.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  Learning Outcomes:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {session.learningOutcome.map((lo, i) => (
                    <li key={i}>
                      <Typography variant="body2">{lo}</Typography>
                    </li>
                  ))}
                </ul>
                <Typography variant="subtitle2" color="text.secondary" mt={2}>
                  Sub-Topics:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {session.subTopics.map((st, i) => (
                    <li key={i}>
                      <Typography variant="body2">{st}</Typography>
                    </li>
                  ))}
                </ul>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Schedule:
                </Typography>
                <Typography variant="body2">
                  {new Date(session.schedule.start).toLocaleString()} -{" "}
                  {new Date(session.schedule.end).toLocaleString()}
                  <br />
                  Mode: {session.schedule.mode}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Activity Panel (Right Pane) */}
          <Box flex={1} minWidth={isMobile ? 0 : 280}>
            <Card
              sx={{
                background: allDone
                  ? "#e8f5e9"
                  : "linear-gradient(135deg, #fde7c8ff 0%, #f9dcb0ff 100%)",
                boxShadow: 2,
                transition: "background 0.3s",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} mb={2}>
                  Things to do in this session
                </Typography>
                <Stack spacing={2}>
                  {session.activities.map((act, i) => (
                    <Stack
                      key={i}
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      {act.icon}
                      <Box flex={1}>
                        <Typography variant="body2" fontWeight={600}>
                          {act.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {act.time}
                        </Typography>
                      </Box>
                      {act.status === "done" ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <Chip label="Pending" size="small" color="warning" />
                      )}
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default CoursePage;
