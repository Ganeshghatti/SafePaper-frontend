import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button
} from '@mui/material';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { examService } from '../../../services/examService';

export default function ExamCenterDashboard() {
  const [loading, setLoading] = useState(true);
  const [examDetails, setExamDetails] = useState(null);
  const [error, setError] = useState(null);
  const [canRequestPaper, setCanRequestPaper] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    checkExamDetails();
    const interval = setInterval(checkExamTime, 1000); // Check every second for smoother countdown
    return () => clearInterval(interval);
  }, []);

  const checkExamTime = () => {
    if (!examDetails) return;
    
    const now = new Date();
    const examDate = new Date(examDetails.date);
    const [hours, minutes] = examDetails.startTime.split(':');
    examDate.setHours(parseInt(hours), parseInt(minutes));
    const timeDiffMinutes = (examDate - now) / (1000 * 60);

    const canRequest = timeDiffMinutes <= 5 && timeDiffMinutes > 0;
    setCanRequestPaper(canRequest);

    // Calculate time left to request
    if (timeDiffMinutes > 5) {
      const minutesToRequest = Math.floor(timeDiffMinutes - 5);
      const secondsToRequest = Math.floor(((timeDiffMinutes - 5) % 1) * 60);
      setTimeLeft(`${minutesToRequest}m ${secondsToRequest}s until paper can be requested`);
    } else if (timeDiffMinutes > 0) {
      const secondsLeft = Math.floor(timeDiffMinutes * 60);
      setTimeLeft(`${secondsLeft}s remaining for exam`);
    } else {
      setTimeLeft('Paper request time has expired');
    }
  };

  const handleRequestPaper = async () => {
    try {
      setRequesting(true);
      const response = await examService.requestPaper();
      setExamDetails(response.examDetails);
      showToast.success('Paper retrieved successfully');
    } catch (err) {
      showToast.error(err.message || 'Failed to retrieve paper');
    } finally {
      setRequesting(false);
    }
  };

  const checkExamDetails = async () => {
    try {
      setLoading(true);
      const response = await examService.getExamCenterDetails();
      console.log('Exam details response:', response);
      setExamDetails(response.examDetails);
    } catch (err) {
      setError(err.message || 'Failed to fetch exam details');
    } finally {
      setLoading(false);
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
          Exam Center Dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {examDetails && !examDetails.hasDecodedQuestions && (
          <Alert 
            severity="info" 
            sx={{ 
              mb: 2,
              '& .MuiAlert-message': {
                width: '100%'
              }
            }}
          >
            <Box>
              <Typography>Paper can only be requested within 5 minutes before exam start time</Typography>
              <Typography 
                sx={{ 
                  mt: 1,
                  fontWeight: 'bold',
                  color: canRequestPaper ? 'success.main' : 'text.secondary'
                }}
              >
                {timeLeft}
              </Typography>
            </Box>
          </Alert>
        )}

        {examDetails ? (
          <>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Current Exam</Typography>
              <Typography>Date: {new Date(examDetails.date).toLocaleDateString()}</Typography>
              <Typography>Time: {examDetails.startTime} - {examDetails.endTime}</Typography>
              <Typography>Status: {examDetails.status}</Typography>
              
              {canRequestPaper && !examDetails.hasDecodedQuestions && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRequestPaper}
                  disabled={requesting}
                  sx={{ mt: 2 }}
                >
                  {requesting ? <CircularProgress size={24} /> : 'Request Paper'}
                </Button>
              )}
            </Paper>

            {examDetails.questions && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Questions</Typography>
                <List>
                  {examDetails.questions.map((q, index) => (
                    <React.Fragment key={q.id}>
                      <ListItem alignItems="flex-start">
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="subtitle1" gutterBottom>
                            {index + 1}. {q.question}
                          </Typography>
                          <FormControl component="fieldset">
                            <RadioGroup>
                              {q.options.map((option, optIndex) => (
                                <FormControlLabel
                                  key={optIndex}
                                  value={option}
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </ListItem>
                      {index < examDetails.questions.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            )}
          </>
        ) : (
          <Alert severity="info">
            There are no active exams at the moment.
          </Alert>
        )}
      </Box>
    </DashboardLayout>
  );
}
