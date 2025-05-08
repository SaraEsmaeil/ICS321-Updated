const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/assign-captain', async (req, res) => {
  const { match_no, team_id, player_captain } = req.body;

  try {
    await pool.query(
      `INSERT INTO MATCH_CAPTAIN (match_no, team_id, player_captain)
   VALUES (?, ?, ?)
   ON DUPLICATE KEY UPDATE player_captain = VALUES(player_captain)`,
  [match_no, team_id, player_captain]
    );
    res.status(201).json({ message: 'Captain assigned successfully' });
  } catch (err) {
    console.error('❌ Error assigning captain:', err);
    res.status(500).json({ error: 'Failed to assign captain' });
  }
});
module.exports = router;