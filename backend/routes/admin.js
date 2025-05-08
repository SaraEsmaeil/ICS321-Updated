const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/assign-captain', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { match_no, team_id, player_captain } = req.body;

    // 1. Validate player exists in system
    const [playerSystemCheck] = await connection.query(
      'SELECT 1 FROM PLAYER WHERE player_id = ?',
      [player_captain]
    );
    if (!playerSystemCheck.length) {
      throw new Error('Player does not exist in system');
    }

    // 2. Validate player-team-tournament association
    const [playerTeamCheck] = await connection.query(`
      SELECT 1 
      FROM TEAM_PLAYER
      WHERE 
        player_id = ?
        AND team_id = ?
        AND tr_id = (
          SELECT tr_id 
          FROM MATCH_PLAYED
          WHERE match_no = ?
        )
    `, [player_captain, team_id, match_no]);
    
    if (!playerTeamCheck.length) {
      throw new Error('Player not registered in team for this tournament');
    }

    // 3. Update captain
    await connection.beginTransaction();
    await connection.query(`
      INSERT INTO MATCH_CAPTAIN (match_no, team_id, player_captain)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE player_captain = VALUES(player_captain)
    `, [match_no, team_id, player_captain]);
    
    await connection.commit();
    res.json({ success: true, message: "Captain assignment updated" });

  } catch (error) {
    await connection.rollback();
    console.error("Validation Error:", error.message);
    res.status(400).json({ error: error.message });
  } finally {
    connection.release();
  }
});
module.exports = router;