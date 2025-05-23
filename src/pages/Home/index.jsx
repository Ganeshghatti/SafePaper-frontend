import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Paper } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import CloudIcon from '@mui/icons-material/Cloud';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const features = [
  {
    icon: <LockIcon className="text-accent" sx={{ fontSize: 40 }} />,
    title: 'AES-256 Encryption',
    description: 'Military-grade encryption for your exam papers'
  },
  {
    icon: <TimelineIcon className="text-accent" sx={{ fontSize: 40 }} />,
    title: 'Blockchain Audit Logs',
    description: 'Immutable record of all paper access and modifications'
  },
  {
    icon: <VerifiedUserIcon className="text-accent" sx={{ fontSize: 40 }} />,
    title: 'Role-Based Access',
    description: 'Granular control over who can access what'
  },
  {
    icon: <GroupIcon className="text-accent" sx={{ fontSize: 40 }} />,
    title: 'Guardian System',
    description: 'Multi-party key reconstruction for enhanced security'
  },
  {
    icon: <CloudIcon className="text-accent" sx={{ fontSize: 40 }} />,
    title: 'Secure Cloud Storage',
    description: 'Encrypted storage with redundant backups'
  },
  {
    icon: <SecurityIcon className="text-accent" sx={{ fontSize: 40 }} />,
    title: 'Advanced Security',
    description: 'TLS encryption and SHA-256 hashing'
  }
];

const steps = [
  {
    title: 'Encrypt & Store',
    description: 'Admin securely encrypts exam papers and stores them in the cloud'
  },
  {
    title: 'Distribute Keys',
    description: 'Encryption keys are split and distributed to trusted guardians'
  },
  {
    title: 'Secure Access',
    description: 'Paper access requires multiple guardian approvals'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-10 bg-cover bg-center" />
        <Container maxWidth="lg" className="relative z-10">
          <Box className="py-20 md:py-32 text-center">
            <Typography variant="h1" className="text-4xl md:text-6xl font-bold mb-6 font-space-grotesk">
              Secure Examination Paper Storage.
              <span className="block">Reinvented.</span>
            </Typography>
            <Typography variant="h2" className="text-xl md:text-2xl mb-8 opacity-90 font-poppins">
              SafePaper protects exam integrity using Blockchain and Secret Sharing
            </Typography>
            <div className="flex gap-4 justify-center">
              <Button
                variant="contained"
                size="large"
                className="bg-white text-primary hover:bg-gray-100"
                component={Link}
                to="/login"
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="border-white text-white hover:bg-white/10"
                endIcon={<ArrowForwardIcon />}
              >
                Learn More
              </Button>
            </div>
          </Box>
        </Container>
      </div>

      {/* Problem & Solution */}
      <Container maxWidth="lg" className="py-20">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" className="text-3xl md:text-4xl font-bold mb-6 gradient-text font-space-grotesk">
              Why SafePaper?
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-4">
              Traditional exam paper management faces critical challenges: paper leaks, insider threats, and lack of accountability. SafePaper addresses these issues head-on with cutting-edge technology.
            </Typography>
            <div className="space-y-4">
              {['AES Encryption', 'Shamir\'s Secret Sharing', 'Blockchain Logs'].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <Typography>{item}</Typography>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl transform rotate-3" />
              <img
                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Secure Paper Management"
                className="rounded-xl relative z-10 w-full"
              />
            </div>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 py-20">
        <Container maxWidth="lg">
          <Typography variant="h3" className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-space-grotesk">
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper className="p-6 h-full hover:shadow-lg transition-shadow bg-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <Typography variant="h6" className="font-space-grotesk font-semibold">
                      {step.title}
                    </Typography>
                  </div>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      {/* Features */}
      <Container maxWidth="lg" className="py-20">
        <Typography variant="h3" className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text font-space-grotesk">
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper className="p-6 h-full hover:shadow-lg transition-shadow text-center">
                <div className="mb-4">{feature.icon}</div>
                <Typography variant="h6" className="mb-2 font-space-grotesk font-semibold">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-20">
        <Container maxWidth="lg" className="text-center">
          <Typography variant="h3" className="text-3xl md:text-4xl font-bold mb-6 font-space-grotesk">
            Protect your exams with SafePaper today
          </Typography>
          <Typography variant="h6" className="mb-8 opacity-90">
            Join leading institutions in securing their examination process
          </Typography>
          <Button
            variant="contained"
            size="large"
            className="bg-white text-primary hover:bg-gray-100"
            component={Link}
            to="/login"
          >
            Get Started Now
          </Button>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="mb-4 font-space-grotesk">
                SafePaper
              </Typography>
              <Typography variant="body2" className="opacity-75">
                Secure examination paper management system powered by blockchain technology
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="mb-4 font-space-grotesk">
                Contact
              </Typography>
              <Typography variant="body2" className="opacity-75">
                Email: safepaper@squirrel.in
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="mb-4 font-space-grotesk">
                Legal
              </Typography>
              <div className="space-y-2">
                <Typography variant="body2" className="opacity-75 hover:opacity-100 cursor-pointer">
                  Terms of Service
                </Typography>
                <Typography variant="body2" className="opacity-75 hover:opacity-100 cursor-pointer">
                  Privacy Policy
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}