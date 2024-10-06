const express = require('express');
const router = express.Router();
const { fetchEpicData } = require('../services/epicService');

// Endpoint to fetch all available EPIC data
router.get('/', async (req, res) => {
  try {
    const epicData = await fetchEpicData();
    res.status(200).json(epicData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching EPIC data', details: error.message });
  }
});

module.exports = router;
