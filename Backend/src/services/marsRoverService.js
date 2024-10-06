const axios = require('axios');

// NASA API URL and demo key for Mars Rover Photos
const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY'; // Use environment variable or fallback to 'DEMO_KEY'
const MARS_ROVER_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`;

const fetchMarsRoverPhotos = async (sol) => {
  try {
    const response = await axios.get(`${MARS_ROVER_URL}`, {
      params: {
        sol: sol, // Martian sol (day)
        api_key: API_KEY
      }
    });
    return response.data.photos; // Return the array of photos
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error.message);
    throw new Error('Failed to fetch Mars Rover photos');
  }
};

module.exports = {
  fetchMarsRoverPhotos
};
