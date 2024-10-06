const redis = require('redis');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a Redis client instance
let redisClient;

(async () => {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });

  // Handle connection error
  redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
  });

  // Connect to Redis
  await redisClient.connect();
})();

// Async function to get data from Redis
const getCache = async (key) => {
  try {
    const value = await redisClient.get(key);
    return value;
  } catch (error) {
    console.error('Error retrieving cache:', error);
    return null;
  }
};

// Async function to set data in Redis
const setCache = async (key, value, expirationInSeconds) => {
  try {
    await redisClient.set(key, value, {
      EX: expirationInSeconds, // Set expiration in seconds
    });
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

module.exports = { getCache, setCache };
