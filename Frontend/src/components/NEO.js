import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { Card, Box, CardActions,CardContent,Button,Typography } from '@mui/material'; // Import necessary components
const NEO = ({ startDate, endDate }) => {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNEO = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/neo?start_date=${startDate}&end_date=${endDate}`
        );
        
        const neoObject = response.data.near_earth_objects;
        const allNEOs = Object.values(neoObject).flat();
        setNeoData(allNEOs);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching NEO data: ${err.message}`);
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchNEO();
    }
  }, [startDate, endDate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Prepare data for charts
  const labels = neoData.map((obj) => obj.name);
  const diameters = neoData.map(
    (obj) => obj.estimated_diameter.meters.estimated_diameter_max
  );
  const velocities = neoData.map(
    (obj) => parseFloat(obj.close_approach_data[0].relative_velocity.kilometers_per_hour)
  );

  const diameterData = {
    labels,
    datasets: [
      {
        label: 'Estimated Diameter (meters)',
        data: diameters,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const velocityData = {
    labels,
    datasets: [
      {
        label: 'Velocity (km/h)',
        data: velocities,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Near-Earth Objects from {startDate} to {endDate}</h2>
      <div style={{ width: '600px', margin: 'auto' }}>
        <h3>Estimated Diameter</h3>
        <Bar data={diameterData} options={{ responsive: true }} />
      </div>
      <div style={{ width: '600px', margin: 'auto', marginTop: '50px' }}>
        <h3>Velocity</h3>
        <Bar data={velocityData} options={{ responsive: true }} />
      </div>
      <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
      Near-Earth Objects from {startDate} to {endDate}
    </Typography>

    {/* Flex container for the cards */}
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
      {neoData.length > 0 ? (
        neoData.map((obj) => (
          <Card sx={{ maxWidth: 275,gap:20 }} key={obj.id}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {obj.name} - {obj.close_approach_data[0].close_approach_date}
              </Typography>
              <Typography variant="h5" component="div">
                {obj.name}
                
              </Typography>
             
              <Typography variant="body2">
              Estimated Diameter: {obj.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} meters
                Velocity: {parseFloat(obj.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h
                <br />
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No Near-Earth Objects found for this date range.</Typography>
      )}
    </Box>
  </Box>
    </div>
  );
};

export default NEO;
