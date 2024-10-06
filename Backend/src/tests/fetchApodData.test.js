// tests/fetchApodData.test.js
const axios = require('axios');
const { fetchApodData } = require('../path/to/your/module'); // Adjust the path accordingly
const { getCache, setCache } = require('../cache/redisCache');

// Mock the axios and cache methods
jest.mock('axios');
jest.mock('../cache/redisCache');

describe('fetchApodData', () => {
  const API_KEY = process.env.NASA_API_KEY; // Ensure your test environment has this set
  const date = '2024-10-06';
  const cacheKey = `apod:${date}`;
  const mockData = {
    title: 'Test Image',
    url: 'https://example.com/image.jpg',
    explanation: 'This is a test explanation.',
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('should return cached data if available', async () => {
    // Arrange
    getCache.mockResolvedValueOnce(JSON.stringify(mockData)); // Mocking cache

    // Act
    const data = await fetchApodData(date);

    // Assert
    expect(getCache).toHaveBeenCalledWith(cacheKey);
    expect(data).toEqual(mockData);
    expect(axios.get).not.toHaveBeenCalled(); // API should not be called
  });

  test('should fetch data from API if cache is not available', async () => {
    // Arrange
    getCache.mockResolvedValueOnce(null); // Simulating no cached data
    axios.get.mockResolvedValueOnce({ data: mockData }); // Mocking API response

    // Act
    const data = await fetchApodData(date);

    // Assert
    expect(getCache).toHaveBeenCalledWith(cacheKey);
    expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/planetary/apod', {
      params: { api_key: API_KEY, date },
    });
    expect(setCache).toHaveBeenCalledWith(cacheKey, JSON.stringify(mockData), 86400);
    expect(data).toEqual(mockData);
  });

  test('should handle API errors gracefully', async () => {
    // Arrange
    getCache.mockResolvedValueOnce(null); // Simulating no cached data
    axios.get.mockRejectedValueOnce(new Error('Network Error')); // Simulating API error

    // Act & Assert
    await expect(fetchApodData(date)).rejects.toThrow('Network Error'); // Change this if you handle errors differently
    expect(getCache).toHaveBeenCalledWith(cacheKey);
    expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/planetary/apod', {
      params: { api_key: API_KEY, date },
    });
    expect(setCache).not.toHaveBeenCalled(); // No cache should be set on error
  });
});
