const express = require('express');
const router = express.Router();
const { fetchNeoData } = require('../services/neoService');

// GET endpoint to fetch Near Earth Objects
router.get('/', async (req, res) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    return res.status(400).json({ message: 'Please provide both start_date and end_date query parameters.' });
  }

  try {
    const neoData = await fetchNeoData(start_date, end_date);
    res.json(neoData);
  } catch (error) {
    console.error('Error fetching NEO data:', error);
    res.status(500).json({ message: 'Error fetching NEO data' });
  }
});

module.exports = router;
