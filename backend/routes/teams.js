const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get players of a specific team
router.get('/:teamId/players', async (req, res) => {
  try {
    const { teamId } = req.params;
    
    const [rows] = await pool.query(`
      SELECT 
        p.player_id AS id,
        per.name,
        p.jersey_no AS jersey_number,
        pp.position_desc AS position
      FROM PLAYER p
      JOIN PERSON per ON p.player_id = per.kfupm_id
      JOIN TEAM_PLAYER tp ON p.player_id = tp.player_id
      JOIN PLAYING_POSITION pp ON p.position_to_play = pp.position_id
      WHERE tp.team_id = ?
      ORDER BY per.name ASC
    `, [teamId]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching team players:', error);
    res.status(500).json({ error: 'Failed to fetch team players' });
  }
});
// Get all teams
router.get('/', async (req, res) => {
  try {
    const [teams] = await pool.query(`
      SELECT team_id AS id, team_name AS name 
      FROM TEAM
    `);
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});
module.exports = router;