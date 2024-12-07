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
  FormControl
} from '@mui/material';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { examService } from '../../../services/examService';

export default function ExamCenterDashboard() {
  const [loading, setLoading] = useState(true);
  const [examDetails, setExamDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkExamDetails();
  }, []);

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

        {examDetails ? (
          <>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Current Exam</Typography>
              <Typography>Date: {new Date(examDetails.date).toLocaleDateString()}</Typography>
              <Typography>Time: {examDetails.startTime} - {examDetails.endTime}</Typography>
              <Typography>Status: {examDetails.status}</Typography>
              <Typography>
                Questions Status: {examDetails.hasDecodedQuestions ? 'Ready' : 'Waiting for guardian keys'}
              </Typography>
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
