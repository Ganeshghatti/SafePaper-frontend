import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Paper } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const features = [
  {
    icon: <SecurityIcon className="text-[#9FE870]" sx={{ fontSize: 40 }} />,
    title: 'Unbreakable Security',
    description: 'Bank-Level AES-256 Advanced Security For Private Proctoring'
  },
  {
    icon: <SecurityIcon className="text-[#9FE870]" sx={{ fontSize: 40 }} />,
    title: 'AI Proctoring Assistant',
    description: 'AI-Powered Proctoring Engine To Safeguard Academic Integrity'
  },
  {
    icon: <SecurityIcon className="text-[#9FE870]" sx={{ fontSize: 40 }} />,
    title: 'Post-Exam Scrutiny',
    description: 'AI-Based Auto Video Roll To Ensure Academic Integrity'
  }
];

const benefits = [
  {
    title: "For a Student",
    items: [
      "Establish Academic Integrity",
      "Revolutionize Exam Delivery",
      "Gain Valuable Insights"
    ]
  },
  {
    title: "For a Business",
    items: [
      "Streamline Operations",
      "Enhance Security",
      "Improve Efficiency"
    ]
  }
];

const testimonials = [
  {
    name: "Sarah Jone",
    role: "Professor",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "ProctorTech has been a lifesaver for my online exams. The AI proctoring is incredibly effective."
  },
  {
    name: "Dr. David Lee",
    role: "Dean of Engineering",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "The analytics data has been invaluable in improving our examination process."
  },
  {
    name: "Maria Garcia",
    role: "IT Director",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "Excellent customer support and robust security features make this a top choice."
  }
];

const faqs = [
  "Is it necessary to log in to book token or access Last Minute Exam?",
  "How are payments and refunds handled in the RemoteXY feature?",
  "What measures are in place to ensure security and fairness in remotely handling?",
  "Can I cancel a reasonable arrangement in hourly rental bookings?",
  "How does the RemoteXY feature work?",
  "Can I use the Hourly Rental Service without creating an account?",
  "What types of spaces can I rent hourly?",
  "How do Last Minute Deals work?"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <Container maxWidth="lg" className="py-4">
          <div className="flex justify-between items-center">
            <Typography variant="h6" className="font-bold">
              PROCTORTECH
            </Typography>
            <div className="flex items-center gap-4">
              <Button component={Link} to="/login" variant="contained" className="bg-[#9FE870] text-black hover:bg-[#8AD562]">
                Book a Demo
              </Button>
              <Button variant="outlined" className="border-[#9FE870] text-[#9FE870]">
                Cart 0
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <Container maxWidth="lg" className="py-20">
        <div className="text-center space-y-6">
          <Typography variant="h1" className="text-5xl md:text-7xl font-bold">
            PROCTOR <span className="text-[#9FE870]">EXAMS</span>
          </Typography>
          <Typography variant="h2" className="text-3xl md:text-5xl font-bold">
            ANYWHERE <span className="text-[#9FE870]">ANYTIME</span>
          </Typography>
          <Typography variant="body1" className="text-gray-400 max-w-2xl mx-auto">
            ProctorTech Provides Security AI-enabled Proctoring To Safeguard Exam Integrity
          </Typography>
          <div className="flex justify-center gap-4">
            <Button variant="contained" className="bg-[#9FE870] text-black hover:bg-[#8AD562]">
              Book a Demo
            </Button>
            <Button variant="outlined" className="border-[#9FE870] text-[#9FE870]">
              Get Tour
            </Button>
          </div>
        </div>
      </Container>

      {/* Partners */}
      <Container maxWidth="lg" className="py-10">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {['Softbank', 'Samsung', 'VISA', 'Amazon Pay', 'PayPal', 'Alipay'].map((partner) => (
            <Grid item key={partner}>
              <Typography variant="body2" className="text-gray-500">
                {partner}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features */}
      <Container maxWidth="lg" className="py-20">
        <Typography variant="h3" className="text-center mb-12">
          Secure & Streamlined Exam - Features Of - 
          <span className="text-[#9FE870]"> Proctortech</span>
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper className="p-6 bg-[#222222] border border-gray-800">
                {feature.icon}
                <Typography variant="h6" className="my-3">
                  {feature.title}
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  {feature.description}
                </Typography>
                <Button 
                  endIcon={<ArrowForwardIcon />}
                  className="mt-4 text-[#9FE870]"
                >
                  Read More
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits */}
      <Container maxWidth="lg" className="py-20">
        <Typography variant="h3" className="text-center mb-12">
          The <span className="text-[#9FE870]">Benefits</span> You Get!
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper className="p-6 bg-[#222222] border border-gray-800">
                <Typography variant="h6" className="mb-4">
                  {benefit.title}
                </Typography>
                <ul className="space-y-2">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#9FE870] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pricing */}
      <Container maxWidth="lg" className="py-20">
        <Typography variant="h3" className="text-center mb-12">
          Simple & Cool <span className="text-[#9FE870]">pricing</span> plans.
        </Typography>
        <Paper className="p-8 bg-[#222222] border border-gray-800 max-w-md mx-auto">
          <Typography variant="h6" className="mb-4">
            $129 <span className="text-sm text-gray-400">/month</span>
          </Typography>
          <Button 
            variant="contained" 
            fullWidth 
            className="bg-[#9FE870] text-black hover:bg-[#8AD562] mb-4"
          >
            Try 1 month
          </Button>
          <Button variant="outlined" fullWidth className="border-[#9FE870] text-[#9FE870]">
            See a Demo
          </Button>
        </Paper>
      </Container>

      {/* Testimonials */}
      <Container maxWidth="lg" className="py-20">
        <Typography variant="h3" className="text-center mb-12">
          What Our <span className="text-[#9FE870]">Happy User</span> Says
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper className="p-6 bg-[#222222] border border-gray-800">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="body2" className="text-gray-400">
                      {testimonial.role}
                    </Typography>
                  </div>
                </div>
                <Typography variant="body2" className="text-gray-300">
                  {testimonial.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQs */}
      <Container maxWidth="lg" className="py-20">
        <Typography variant="h3" className="text-center mb-12">
          Frequently Asked <span className="text-[#9FE870]">Questions</span>
        </Typography>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Paper key={index} className="p-4 bg-[#222222] border border-gray-800">
              <Typography variant="body1">{faq}</Typography>
            </Paper>
          ))}
        </div>
      </Container>

      {/* Newsletter */}
      <Container maxWidth="lg" className="py-20">
        <Paper className="p-8 bg-[#222222] border border-gray-800 text-center">
          <Typography variant="h3" className="mb-6">
            Join Our <span className="text-[#9FE870]">Newsletter</span>
          </Typography>
          <Button 
            variant="contained" 
            className="bg-[#9FE870] text-black hover:bg-[#8AD562]"
          >
            Subscribe
          </Button>
        </Paper>
      </Container>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="mb-4">
                PROCTORTECH
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                AI-powered secure exam proctoring for the highest integrity
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" className="mb-4">Product</Typography>
                  <div className="space-y-2 text-gray-400">
                    <Typography variant="body2">How it work</Typography>
                    <Typography variant="body2">Features</Typography>
                    <Typography variant="body2">Pricing</Typography>
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" className="mb-4">Company</Typography>
                  <div className="space-y-2 text-gray-400">
                    <Typography variant="body2">About Us</Typography>
                    <Typography variant="body2">Blog</Typography>
                    <Typography variant="body2">Contact</Typography>
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" className="mb-4">Utility</Typography>
                  <div className="space-y-2 text-gray-400">
                    <Typography variant="body2">Style Guide</Typography>
                    <Typography variant="body2">Changelog</Typography>
                    <Typography variant="body2">License</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}