const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all venues
router.get('/', async (req, res) => {
  try {
    const [venues] = await pool.query(`
      SELECT venue_id AS id, venue_name AS name 
      FROM VENUE
    `);
    res.json(venues);
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
});

module.exports = router;