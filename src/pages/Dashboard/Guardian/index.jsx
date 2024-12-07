import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { examService } from '../../../services/examService';

export default function GuardianDashboard() {
  const [loading, setLoading] = useState(true);
  const [examStatus, setExamStatus] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [key, setKey] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const checkKeyStatus = async () => {
    try {
      setLoading(true);
      const response = await examService.checkKeyStatus();
      console.log(response);
      setExamStatus(response.status);
      setHasSubmitted(response.hasSubmitted);
      setExamDetails(response.examDetails);
    } catch (err) {
      setError(err.message || 'Failed to check key status');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitKey = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      console.log(key)
      const response = await examService.submitGuardianKey({ key });
      if (response.success) {
        setSuccess(true);
        setKey('');
        checkKeyStatus();
      }
    } catch (err) {
      setError(err.message || 'Failed to submit key');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Guardian Dashboard
        </Typography>

        {examDetails&& (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Current Exam</Typography>
            <Typography>Date: {new Date(examDetails.date).toLocaleDateString()}</Typography>
            <Typography>Time: {examDetails.startTime} - {examDetails.endTime}</Typography>
            <Typography>Status: {examDetails.status}</Typography>
          </Paper>
        )}

        {examDetails && !hasSubmitted && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Submit Key</Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Key submitted successfully
              </Alert>
            )}
            <form onSubmit={handleSubmitKey}>
              <TextField
                fullWidth
                label="Secret Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained">
                Submit Key
              </Button>
            </form>
          </Paper>
        )}

        {hasSubmitted && (
          <Alert severity="success">
            You have already submitted your key for this exam.
          </Alert>
        )}

        {!examDetails && (
          <Alert severity="info">
            There are no active exams at the moment.
          </Alert>
        )}
      </Box>
    </DashboardLayout>
  );
}
