const axios = require('axios');
const { getCache, setCache } = require('../cache/redisCache');
// https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
const NASA_API_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const API_KEY = process.env.NASA_API_KEY;

const fetchNeoData = async (startDate, endDate) => {
  const cacheKey = `neo:${startDate}&${endDate}`;

  // Check if data is cached in Redis
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // Fetch data from NASA API
  const response = await axios.get(NASA_API_URL, {
    params: {
      start_date: startDate,
      end_date: endDate,
      api_key: API_KEY,
    },
  });

  const data = response.data;

  // Store the response in Redis (cache for 1 hour)
  await setCache(cacheKey, JSON.stringify(data), 3600);

  return data;
};

module.exports = { fetchNeoData };
