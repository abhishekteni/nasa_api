const axios = require('axios');
const { getCache, setCache } = require('../cache/redisCache');

const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = process.env.NASA_API_KEY;

const fetchApodData = async (date) => {
  const cacheKey = `apod:${date || 'today'}`;

  // Check if data is cached
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // Fetch data from NASA APOD API
  const response = await axios.get(NASA_APOD_URL, {
    params: {
      api_key: API_KEY,
      date: date || undefined, // if no date is passed, it fetches today's APOD
    },
  });

  const data = response.data;

  // Cache the response for 24 hours (86400 seconds)
  await setCache(cacheKey, JSON.stringify(data), 86400);

  return data;
};

module.exports = { fetchApodData };
