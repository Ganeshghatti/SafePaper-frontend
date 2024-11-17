import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import PaperSetterForm from './components/PaperSetterForm';
import GuardianForm from './components/GuardianForm';
import ExamCenterForm from './components/ExamCenterForm';
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
    <div className="login">
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 500 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="login tabs"
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
