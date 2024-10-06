const axios = require('axios');

const API_KEY = 'DEMO_KEY'; // Replace with your NASA API key if available
const EPIC_API_URL = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${API_KEY}`;

// Function to fetch EPIC data from NASA API
const fetchEpicData = async () => {
  try {
    const response = await axios.get(EPIC_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch EPIC data');
  }
};

module.exports = { fetchEpicData };
