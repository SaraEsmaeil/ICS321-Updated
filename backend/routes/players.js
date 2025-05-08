const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.player_id AS id,
        per.name,
        p.jersey_no
      FROM PLAYER p
      JOIN PERSON per ON p.player_id = per.kfupm_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('❌ Failed to load players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});


   
module.exports = router;