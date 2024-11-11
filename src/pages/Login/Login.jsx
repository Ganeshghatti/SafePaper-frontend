import React from "react";
import "./Login.scss";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import PaperSetterForm from "./components/PaperSetterForm";
import GuardianForm from "./components/GuardianForm";
import ExamCenterForm from "./components/ExamCenterForm";
import TopAdmin from "./components/TopAdmin";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Login() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <section className="login">
      <Box sx={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="login role tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab 
              label="Paper Setter" 
              {...a11yProps(0)}
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              label="Guardian" 
              {...a11yProps(1)}
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              label="Exam Center" 
              {...a11yProps(2)}
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              label="Admin" 
              {...a11yProps(3)}
              sx={{ textTransform: 'none' }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            <PaperSetterForm />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <GuardianForm />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ExamCenterForm />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <TopAdmin />
        </CustomTabPanel>
      </Box>
    </section>
  );
}

function LoginForm({ role }) {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
      }}
    >
      <h2>{role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Login</h2>
      {/* Add your form fields here */}
    </Box>
  );
}

LoginForm.propTypes = {
  role: PropTypes.oneOf(['paper-setter', 'guardian', 'exam-center', 'admin']).isRequired,
};
