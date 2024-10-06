import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import homevideo from '../assets/homebackground.mp4';
import DateSelector from './DatePicker';

// Styled components
const Root = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden', // Prevent overflow for video
  color: '#fff',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const VideoBackground = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Cover the entire area
  zIndex: -1, // Place behind other content
});

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better text visibility
});

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Content = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  maxWidth: '600px', // Limit width for better readability
  animation: `${fadeInUp} 1.5s ease-out`,
  textAlign: 'center', // Center text
}));

// Styled AppBar
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  padding: '10px 0', // Increase padding for better title appearance
}));

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const BouncingTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2rem',
  animation: `${bounceAnimation} 2s infinite`,
  fontFamily: '"Orbitron", sans-serif', // Space themed font
  textAlign: 'center',
}));

const HomePage = ({ onDateChange }) => {
  return (
    <Root>
      {/* Video Background */}
      <VideoBackground autoPlay loop muted playsInline> {/* playsInline added for mobile */}
        <source src={homevideo} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      <StyledAppBar position="static">
        <Toolbar sx={{ justifyContent: 'center' }}> {/* Center toolbar content */}
          <BouncingTitle variant="h6">Bouncing Insight</BouncingTitle>
        </Toolbar>
      </StyledAppBar>

      <Overlay />

      <Content>
        <Typography variant="h3" sx={{ fontFamily: '"Orbitron", sans-serif', marginBottom: '16px' }}>
          Welcome to NASA Space Explorer
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: '"Roboto", sans-serif', marginBottom: '24px' }}>
          Discover amazing content about space exploration, Near-Earth Objects, Mars rover missions, and more!
        </Typography>
        <DateSelector onDateChange={onDateChange} />
      </Content>
    </Root>
  );
};

export default HomePage;
