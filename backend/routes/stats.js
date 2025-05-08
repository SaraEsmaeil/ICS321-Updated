// routes/matches.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Define your routes here
  router.get('/', async (req, res) => {
    try {
      const [matches] = await db.query('SELECT * FROM MATCH_PLAYED');
      res.json(matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      res.status(500).json({ error: 'Failed to fetch matches' });
    }
  });

  // Add more routes as needed

  return router;
};
