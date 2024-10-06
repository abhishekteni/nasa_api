// src/components/APOD.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Container, Box } from '@mui/material';
import space_stars from '../assets/bg2.gif';

const APOD = ({ selectedDate }) => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   
  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/apod?date=${selectedDate}`);
        setApodData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching APOD data');
        setLoading(false);
      }
    };

    // Fetch only if selectedDate is available
    if (selectedDate) {
      fetchAPOD();
    }
  }, [selectedDate]);

  if (loading) return <CircularProgress />; // Loading state
  if (error) return <div>{error}</div>; // Error state

  return (
    <Box
      sx={{
        backgroundImage: `url(${space_stars})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: '0 10vw',
        padding: '5vh 0',
        minHeight: '50vh',
      }}
    >
      <Container maxWidth="sm">
        {apodData && (
          <Card className='apod_section' elevation={3}>
            <CardMedia
              component="img"
              height="300"
              image={apodData.url}
              alt={apodData.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {apodData.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {apodData.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {apodData.explanation}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default APOD;
