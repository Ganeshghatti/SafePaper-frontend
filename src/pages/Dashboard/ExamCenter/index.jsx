import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  List,
  ListItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Chip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
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
      <Box className="p-6 space-y-8">
        <div className="flex items-center justify-between mb-8">
          <Typography variant="h4" className="gradient-text font-bold">
            Exam Center Dashboard
          </Typography>
          <SchoolIcon className="text-primary" sx={{ fontSize: 40 }} />
        </div>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {examDetails && !examDetails.hasDecodedQuestions && (
          <Paper className="p-6 hover-card bg-secondary">
            <div className="flex items-center space-x-2 mb-4">
              <AccessTimeIcon className="text-accent" />
              <Typography variant="h6" className="font-semibold text-primary">
                Time Status
              </Typography>
            </div>
            
            <Alert 
              severity="info"
              className="bg-secondary/20 border border-primary/20"
            >
              <div className="space-y-2">
                <Typography>Paper can only be requested within 5 minutes before exam start time</Typography>
                <Typography 
                  className={`font-bold ${canRequestPaper ? 'text-green-600' : 'text-gray-600'}`}
                >
                  {timeLeft}
                </Typography>
              </div>
            </Alert>
          </Paper>
        )}

        {examDetails && (
          <Paper className="p-6 hover-card bg-secondary">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h6" className="font-semibold text-primary">
                Current Exam
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

            {canRequestPaper && !examDetails.hasDecodedQuestions && (
              <Button
                variant="contained"
                onClick={handleRequestPaper}
                disabled={requesting}
                startIcon={<QuizIcon />}
                className="w-full mt-4 bg-primary hover:bg-accent transition-colors"
              >
                {requesting ? <CircularProgress size={24} /> : 'Request Paper'}
              </Button>
            )}
          </Paper>
        )}

        {examDetails?.questions && (
          <Paper className="p-6 hover-card bg-white">
            <Typography variant="h6" className="font-semibold mb-4">
              Questions
            </Typography>
            <List className="space-y-4">
              {examDetails.questions.map((q, index) => (
                <Paper 
                  key={q.id} 
                  className="p-4 border border-secondary"
                >
                  <Typography className="font-medium mb-3">
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
                          className="text-textcolor"
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Paper>
              ))}
            </List>
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
