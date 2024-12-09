import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecurityIcon from '@mui/icons-material/Security';
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
      <Box className="p-6 space-y-8">
        <div className="flex items-center justify-between mb-8">
          <Typography variant="h4" className="gradient-text font-bold">
            Guardian Dashboard
          </Typography>
          <SecurityIcon className="text-primary" sx={{ fontSize: 40 }} />
        </div>

        {examDetails && (
          <Paper className="p-6 hover-card bg-secondary">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h6" className="font-semibold text-primary">
                Current Exam Details
              </Typography>
              <Chip 
                label={examDetails.status}
                color={examDetails.status === 'active' ? 'success' : 'default'}
                variant="outlined"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <AccessTimeIcon className="text-accent" />
                <div>
                  <Typography variant="body2" color="textSecondary">Date</Typography>
                  <Typography>{new Date(examDetails.date).toLocaleDateString()}</Typography>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <AccessTimeIcon className="text-accent" />
                <div>
                  <Typography variant="body2" color="textSecondary">Time</Typography>
                  <Typography>{examDetails.startTime} - {examDetails.endTime}</Typography>
                </div>
              </div>
            </div>

            <Alert 
              severity="info"
              className="bg-secondary/20 border border-primary/20"
            >
              Ensure you have the correct key to submit for this exam.
            </Alert>
          </Paper>
        )}

        {examDetails && !hasSubmitted && (
          <Paper className="p-6 hover-card bg-secondary">
            <Typography variant="h6" className="font-semibold mb-4 text-primary">
              Submit Key
            </Typography>
            
            {error && (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" className="mb-4">
                Key submitted successfully
              </Alert>
            )}
            
            <form onSubmit={handleSubmitKey} className="space-y-4">
              <TextField
                fullWidth
                label="Secret Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
                className="bg-secondary/10"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button 
                type="submit" 
                variant="contained"
                fullWidth
                className="bg-primary hover:bg-accent transition-colors"
              >
                Submit Key
              </Button>
            </form>
          </Paper>
        )}

        {!examDetails && (
          <Alert 
            severity="info"
            className="bg-secondary/20 border border-primary/20"
          >
            There are no active exams at the moment.
          </Alert>
        )}
      </Box>
    </DashboardLayout>
  );
}
