import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import CreateQuestion from './CreateQuestion';
import { questionService } from '../../../services/questionService';

export default function PaperSetterDashboard() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [guardians, setGuardians] = useState([]);
  const [error, setError] = useState(null);
  const { getGuardians } = questionService;

  const fetchGuardians = async () => {
    try {
      const response = await getGuardians();
      if (response?.data) {
        setGuardians(response.data);
        setHasSubmitted(response.hasSetQuestions || false);
      }
    } catch (error) {
      console.error("Error fetching guardians:", error);
      setError(error.message || "Failed to fetch guardians");
    }
  };

  useEffect(() => {
    fetchGuardians();
  }, []);

  return (
    <DashboardLayout title="Paper Setter Dashboard">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Welcome, Paper Setter
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {hasSubmitted ? (
          <Alert severity="info">
            You have already submitted your questions. Thank you for your contribution!
          </Alert>
        ) : guardians && guardians.length > 0 ? (
          <CreateQuestion 
            onSuccess={() => setHasSubmitted(true)} 
            guardians={guardians}
          />
        ) : (
          <Alert severity="warning">
            No guardians available. Please try again later.
          </Alert>
        )}
      </Box>
    </DashboardLayout>
  );
}
