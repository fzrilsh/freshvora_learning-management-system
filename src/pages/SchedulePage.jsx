import { ScheduleItemSkeleton } from '../components/widgets/SectionSkeletons';
import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Chip,
  Divider,
} from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  isWithinInterval,
  parseISO,
} from "date-fns";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TodayIcon from "@mui/icons-material/Today";

import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import {
  Schedule as ScheduleIcon,
  Place as PlaceIcon,
  Bookmarks as SessionIcon,
} from "@mui/icons-material";
import Footer from "../components/Footer";

// Move MonthContainer outside component for correct theme access
const MonthContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: theme.spacing ? theme.spacing(1) : 8,
  marginBottom: theme.spacing ? theme.spacing(2) : 16,
}));

// Use the same class data as OngoingClass.jsx, mapping countdown timestamps to ISO date strings
const now = Date.now();
const scheduleData = [
  {
    id: 1,
    type: "Online Class",
    countdown: now + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000, // 2 days 3 hours from now
    classCode: "CLASS-UX01",
    program: "UI/UX Design",
    instructors: ["John Doe", "Sarah Miller", "Mike Johnson"],
    schedule: "13:00 - 15:00",
    progress: 65,
    session: 5,
  },
  {
    id: 2,
    type: "Onsite Class",
    location: "SMKN 1 Tangerang - Room 101",
    countdown: now + 5 * 60 * 60 * 1000 + 30 * 60 * 1000, // 5 hours 30 min from now
    classCode: "CLASS-WD02",
    program: "Web Development",
    instructors: ["Alex Chen", "Emma Wilson"],
    schedule: "09:00 - 11:00",
    progress: 30,
    session: 3,
  },
  {
    id: 3,
    type: "Online Class",
    countdown: now + 7 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000, // 1 week 1 hour from now
    classCode: "CLASS-DM01",
    program: "Digital Marketing",
    instructors: ["David Kim", "Lisa Park", "Tom Brown"],
    schedule: "14:00 - 16:00",
    progress: 80,
    session: 8,
  },
  {
    id: 4,
    type: "Online Class",
    countdown: now + 45 * 60 * 1000 + 10 * 1000, // 45 min 10 sec from now
    classCode: "CLASS-NEW04",
    program: "Data Science",
    instructors: ["Jane Smith"],
    schedule: "16:00 - 17:00",
    progress: 10,
    session: 1,
  },
];

// Helper to get ISO date string (yyyy-MM-dd) from countdown timestamp
function getDateStringFromCountdown(countdown) {
  const d = new Date(countdown);
  return d.toISOString().slice(0, 10);
}

// Map to calendar data format for this page
const scheduleCalendarData = scheduleData.map((item) => ({
  ...item,
  date: getDateStringFromCountdown(item.countdown),
  // For display, pick first instructor as main
  instructor: {
    name: item.instructors[0],
    avatar: undefined, // You can add avatar URLs if needed
  },
  time: item.schedule + " WIB",
}));

function ServerDay(props) {
  const { day, outsideCurrentMonth, ...other } = props;
  const hasClass = scheduleCalendarData.some((item) => {
    if (!item.date) return false;
    try {
      return isSameDay(parseISO(item.date), day);
    } catch {
      return false;
    }
  });
  return (
    <Box sx={{ position: "relative" }}>
      <PickersDay {...props} outsideCurrentMonth={outsideCurrentMonth} />
      {hasClass && !outsideCurrentMonth && (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            bottom: 4,
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            bgcolor: "primary.main",
          }}
        />
      )}
    </Box>
  );
}

function SchedulePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const today = new Date("2025-09-14T00:00:00");
  const [calendarDate, setCalendarDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // List for selected date
  const selectedList = scheduleCalendarData.filter((item) =>
    isSameDay(parseISO(item.date), selectedDate)
  );

  const handlePrevMonth = () => {
    const firstDay = subMonths(calendarDate, 1);
    setCalendarDate(firstDay);
    setSelectedDate(firstDay);
  }
  const handleNextMonth = () => {
    const firstDay = addMonths(calendarDate, 1);
    setCalendarDate(firstDay);
    setSelectedDate(firstDay);
  }
  const handleToday = () => {
    setCalendarDate(today);
    setSelectedDate(today);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: { xs: 1, md: 4 }, maxWidth: "100%" }}>
        <Grid container spacing={4} justifyContent={"center"}>
          {/* Calendar Column */}
          <Grid item xs={12} md={5}>
            <Stack
              direction={{ xs: "column", sm: "column", md: "column" }}
              alignItems={{ xs: "stretch", sm: "center", md: "stretch" }}
              spacing={1}
              mb={2}
              sx={{ width: "100%", justifyContent: "center" }}
            >
              <MonthContainer>
                <IconButton onClick={handlePrevMonth} size="small">
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ minWidth: 120, textAlign: "center", flex: 1 }}
                >
                  {format(calendarDate, "MMMM yyyy")}
                </Typography>
                <IconButton onClick={handleNextMonth} size="small">
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </MonthContainer>
              <Button
                startIcon={<TodayIcon />}
                onClick={handleToday}
                sx={{ minWidth: 0, px: 1 }}
              >
                Today
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPickerOpen(true)}
                sx={{ minWidth: 0, px: 1 }}
              >
                Jump to Month
              </Button>
              <DatePicker
                open={pickerOpen}
                onOpen={() => setPickerOpen(true)}
                onClose={() => setPickerOpen(false)}
                views={["year", "month"]}
                value={calendarDate}
                onChange={(date) => {
                  if (date) {
                    // Set calendarDate and selectedDate to first day of picked month
                    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    setCalendarDate(firstDay);
                    setSelectedDate(firstDay);
                  }
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box sx={{ display: "none" }} />
                )}
              />
            </Stack>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <DateCalendar
                value={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}
                referenceDate={calendarDate}
                onMonthChange={setCalendarDate}
                slots={{ day: ServerDay }}
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 1,
                  width: "100%",
                  minWidth: 260,
                  maxWidth: 340,
                }}
              />
            </Box>
          </Grid>
          {/* Schedule List Column */}
          <Grid item xs={12} md={7} sx={{ flexGrow: 1 }}>
            <Typography variant="h5" fontWeight={700} mb={2} color="primary">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </Typography>
            <Stack spacing={2}>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => <ScheduleItemSkeleton key={i} />)
                : selectedList.map((item) => (
                    <Card
                      key={item.id}
                      sx={{
                        borderRadius: 3,
                        boxShadow: 2,
                        width: "100%",
                        cursor: "pointer",
                        ":hover": { boxShadow: 6 },
                      }}
                    >
                      <CardContent
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent={"space-between"}
                          mb={0}
                        >
                          <Typography
                            variant="body2"
                            color="text"
                            sx={{ fontWeight: 600 }}
                          >
                            {item.classCode}
                          </Typography>
                          <Chip
                            label={item.type}
                            color={
                              item.type === "Online Class" ? "success" : "primary"
                            }
                            variant="outlined"
                            sx={{
                              borderColor: theme.palette.success.main,
                              color: theme.palette.success.main,
                              bgcolor: "transparent",
                              fontWeight: 600,
                            }}
                            size="small"
                          />
                        </Stack>
                        <Typography
                          variant="subtitile1"
                          fontWeight={400}
                          sx={{ mb: 1 }}
                        >
                          {item.program}
                        </Typography>
                        {/* Info rows, matching OngoingClass layout */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <ScheduleIcon sx={{ fontSize: 16, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {item.schedule} GMT+7
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <PlaceIcon sx={{ fontSize: 16, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {item.type === "Online Class"
                              ? "Zoom Meeting"
                              : item.location}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <SessionIcon sx={{ fontSize: 16, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            Session {item.session}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
              {selectedList.length === 0 && (
                <Typography
                  color="text.secondary"
                  align="left"
                  sx={{ mt: 4 }}
                >
                  No classes for this date.
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </LocalizationProvider>
  );
}

export default SchedulePage;
