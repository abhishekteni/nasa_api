const axios = require('axios');
const { fetchNeoData } = require('../services/neoService');
const { getAsync, setAsync } = require('../cache/redisCache');

// Mock axios and redis functions
jest.mock('axios');
jest.mock('../cache/redisCache');

describe('NeoWs Service', () => {
  const startDate = '2023-09-01';
  const endDate = '2023-09-07';
  const mockResponse = {
    data: {
      element_count: 5,
      near_earth_objects: {
        '2023-09-01': [],
        '2023-09-02': [],
        '2023-09-03': [],
        // ... more data
      },
    },
  };

  it('should return cached data if available', async () => {
    getAsync.mockResolvedValue(JSON.stringify(mockResponse.data));

    const result = await fetchNeoData(startDate, endDate);
    expect(result).toEqual(mockResponse.data);
  });

  it('should fetch data from NASA API if not cached', async () => {
    getAsync.mockResolvedValue(null);
    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchNeoData(startDate, endDate);
    expect(result).toEqual(mockResponse.data);
    expect(setAsync).toHaveBeenCalled(); // Ensure the result is cached
  });

  it('should handle errors from NASA API', async () => {
    getAsync.mockResolvedValue(null);
    axios.get.mockRejectedValue(new Error('NASA API error'));

    await expect(fetchNeoData(startDate, endDate)).rejects.toThrow('NASA API error');
  });
});
