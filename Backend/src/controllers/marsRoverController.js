const express = require('express');
const router = express.Router();
const { fetchMarsRoverPhotos } = require('../services/marsRoverService');

// GET /mars-rover?sol=1000
router.get('/', async (req, res) => {
  const sol = req.query.sol || 1000; // Default to sol 1000 if no sol is provided
  
  try {
    const photos = await fetchMarsRoverPhotos(sol);
    res.json({ sol, photos });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Mars Rover photos' });
  }
});

module.exports = router;
