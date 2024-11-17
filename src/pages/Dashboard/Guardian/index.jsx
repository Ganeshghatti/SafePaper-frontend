import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function GuardianDashboard() {
  const cards = [
    {
      title: 'Student Profile',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      description: 'View and manage student information',
      path: '/student-profile'
    },
    {
      title: 'Exam Results',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      description: 'View exam results and progress',
      path: '/exam-results'
    }
  ];

  return (
    <DashboardLayout title="Guardian Dashboard">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Welcome, Guardian
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
