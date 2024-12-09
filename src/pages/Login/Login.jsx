import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, Typography } from '@mui/material';
import PaperSetterForm from './components/PaperSetterForm';
import GuardianForm from './components/GuardianForm';
import ExamCenterForm from './components/ExamCenterForm';
import LockIcon from '@mui/icons-material/Lock';
import './Login.scss';

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Login() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <Paper elevation={3} className="w-full max-w-md rounded-xl overflow-hidden relative z-10 shadow-xl">
        <div className="bg-primary text-white p-6 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
          <div className="relative z-10 flex flex-col items-center">
            <LockIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h5" className="font-bold">
              SafePaper Login
            </Typography>
            <Typography variant="body2" className="mt-2 opacity-80">
              Secure Exam Management System
            </Typography>
          </div>
        </div>
        
        <Box className="bg-secondary bg-opacity-30">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="login tabs"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontFamily: 'Poppins',
                textTransform: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                py: 2,
              },
              '& .Mui-selected': {
                color: 'primary.main',
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab label="Paper Setter" />
            <Tab label="Guardian" />
            <Tab label="Exam Center" />
          </Tabs>
        </Box>

        <CustomTabPanel value={activeTab} index={0}>
          <PaperSetterForm />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>
          <GuardianForm />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={2}>
          <ExamCenterForm />
        </CustomTabPanel>
      </Paper>
    </div>
  );
}
