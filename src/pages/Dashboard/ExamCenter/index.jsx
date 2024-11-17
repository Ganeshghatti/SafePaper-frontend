import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function ExamCenterDashboard() {
  const cards = [
    {
      title: 'Upcoming Exams',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      description: 'View and manage upcoming examinations',
      path: '/upcoming-exams'
    },
    {
      title: 'Student Management',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      description: 'Manage student registrations and records',
      path: '/students'
    },
    {
      title: 'Exam Supervision',
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 40 }} />,
      description: 'Monitor and supervise ongoing exams',
      path: '/supervision'
    }
  ];

  return (
    <DashboardLayout title="Exam Center Dashboard">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Welcome, Exam Center
        </Typography>

        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.title}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                {card.icon}
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
