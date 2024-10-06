const express = require('express');
const { fetchApodData } = require('../services/apodService');

const router = express.Router();

router.get('/', async (req, res) => {
  const { date } = req.query;
  console.log(date + "hello")
  try {
    const apodData = await fetchApodData(date);
    res.json(apodData);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    res.status(500).json({ message: 'Error fetching APOD data' });
  }
});

module.exports = router;
