import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  CircularProgress,
  Chip,
  List,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import QuizIcon from '@mui/icons-material/Quiz';
import TimerIcon from '@mui/icons-material/Timer';
import WarningIcon from '@mui/icons-material/Warning';
import { jsPDF } from 'jspdf';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { examService } from '../../../services/examService';

export default function ExamCenterDashboard() {
  const [loading, setLoading] = useState(true);
  const [examDetails, setExamDetails] = useState(null);
  const [error, setError] = useState(null);
  const [canRequestPaper, setCanRequestPaper] = useState(false);
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

  const checkExamDetails = async () => {
    try {
      setLoading(true);
      const response = await examService.getExamCenterDetails();
      console.log(response);
      setExamDetails(response.examDetails);
    } catch (err) {
      setError(err.message || 'Failed to fetch exam details');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('Poppins');
    doc.text('Exam Questions', 20, 20);
    examDetails.questions.forEach((q, index) => {
      doc.text(`${index + 1}. ${q.question}`, 20, 30 + index * 10);
    });
    doc.save('exam_questions.pdf');
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
      <Box className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <SchoolIcon className="text-accent" sx={{ fontSize: 40 }} />
              <Typography variant="h4" className="font-space-grotesk gradient-text font-bold">
                Exam Center Dashboard
              </Typography>
            </div>
            <Typography variant="body1" className="font-poppins text-gray-600 max-w-2xl">
              Access and manage secure exam papers. Questions will be available after successful 
              decryption during the designated exam time window.
            </Typography>
          </div>
        </div>

        {/* Time Status Section */}
        {examDetails && !examDetails.hasDecodedQuestions && (
          <Paper className="p-6 bg-secondary hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <TimerIcon className="text-accent" sx={{ fontSize: 32 }} />
              <Typography variant="h6" className="font-semibold text-primary">
                Time Status
              </Typography>
            </div>
            
            <Alert 
              severity="info"
              className="bg-secondary/20 border-2 border-primary/20"
              icon={<AccessTimeIcon className="text-accent" />}
            >
              <div className="space-y-2">
                <Typography variant="body1">
                  Paper can only be requested within 5 minutes before exam start time
                </Typography>
                <Typography 
                  className={`font-bold ${canRequestPaper ? 'text-green-600' : 'text-gray-600'}`}
                >
                  {timeLeft}
                </Typography>
              </div>
            </Alert>
          </Paper>
        )}

        {/* Exam Details Section */}
        {examDetails && (
          <Paper className="p-6 bg-secondary hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h6" className="font-semibold text-primary flex items-center gap-2">
                <QuizIcon className="text-accent" />
                Current Exam
              </Typography>
              <Chip 
                label={examDetails.status}
                color={examDetails.status === 'active' ? 'success' : 'default'}
                variant="outlined"
                className="border-2"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <AccessTimeIcon className="text-primary" />
                <div>
                  <Typography variant="body2" color="textSecondary">Date</Typography>
                  <Typography className="font-medium">
                    {new Date(examDetails.date).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <AccessTimeIcon className="text-primary" />
                <div>
                  <Typography variant="body2" color="textSecondary">Time</Typography>
                  <Typography className="font-medium">
                    {examDetails.startTime} - {examDetails.endTime}
                  </Typography>
                </div>
              </div>
            </div>

            {canRequestPaper && !examDetails.hasDecodedQuestions && (
              <Button
                variant="contained"
                onClick={checkExamDetails} // Assuming this will fetch the questions
                disabled={requesting}
                startIcon={requesting ? <CircularProgress size={20} /> : <QuizIcon />}
                className="w-full bg-primary hover:bg-accent transition-all transform hover:scale-105"
              >
                {requesting ? 'Requesting Paper...' : 'Request Paper'}
              </Button>
            )}
          </Paper>
        )}

        {/* Download Questions Button */}
        {examDetails?.questions && (
          <Paper className="p-6 bg-secondary hover:shadow-lg transition-shadow">
            <Typography variant="h6" className="font-semibold mb-4 text-primary flex items-center gap-2">
              <QuizIcon className="text-accent" />
              Download Exam Questions
            </Typography>
            <Button
              variant="contained"
              onClick={downloadPDF}
              className="bg-primary hover:bg-accent transition-all transform hover:scale-105"
            >
              Download PDF
            </Button>
          </Paper>
        )}

        {error && (
          <Alert severity="error" className="border-2 border-red-200">
            {error}
          </Alert>
        )}

        {!examDetails && (
          <Alert 
            severity="info"
            className="bg-secondary/20 border-2 border-primary/20"
            icon={<InfoIcon className="text-accent" />}
          >
            <Typography variant="body1">
              There are no active exams at the moment.
            </Typography>
          </Alert>
        )}
      </Box>
    </DashboardLayout>
  );
}
