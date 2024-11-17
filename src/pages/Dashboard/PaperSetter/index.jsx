import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';

export default function PaperSetterDashboard() {
  const cards = [
    {
      title: 'Create New Paper',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      description: 'Create a new question paper',
      path: '/create-paper'
    },
    {
      title: 'Previous Papers',
      icon: <HistoryIcon sx={{ fontSize: 40 }} />,
      description: 'View and manage previous papers',
      path: '/previous-papers'
    }
  ];

  return (
    <DashboardLayout title="Paper Setter Dashboard">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Welcome, Paper Setter
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
