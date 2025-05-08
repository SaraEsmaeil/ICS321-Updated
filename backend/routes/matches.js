const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all played matches
router.get('/matches', async (req, res) => {
  try {
    const [matches] = await pool.query(`
      SELECT 
        mp.match_no AS id,
        mp.play_date AS date,
        t1.team_name AS team1_name,
        t2.team_name AS team2_name
      FROM MATCH_PLAYED mp
      JOIN TEAM t1 ON mp.team_id1 = t1.team_id
      JOIN TEAM t2 ON mp.team_id2 = t2.team_id
    `);

    const formatted = matches.map(m => ({
      id: m.id,
      name: `${m.team1_name} vs ${m.team2_name}`,
      date: m.date
    }));

    res.json(formatted);
  } catch (err) {
    console.error('❌ Failed to fetch matches:', err);
    res.status(500).json({ error: 'Could not fetch matches' });
  }
});

// POST schedule match (to SCHEDULED_MATCH)
router.post('/', async (req, res) => {
  const { match_no, tr_id, play_stage, play_date, team_id1, team_id2, venue_id } = req.body;

  try {
    const [tournament] = await pool.query(
      'SELECT tr_id FROM TOURNAMENT WHERE tr_id = ?', 
      [tr_id]
    );

    if (tournament.length === 0) {
      return res.status(400).json({ error: 'Invalid tournament ID' });
    }

    await pool.query(
      `INSERT INTO SCHEDULED_MATCH 
        (match_no, tr_id, play_stage, play_date, team_id1, team_id2, venue_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [match_no, tr_id, play_stage, play_date, team_id1, team_id2, venue_id]
    );

    res.status(201).json({ success: true, message: 'Match scheduled successfully' });
  } catch (error) {
    console.error('Error [POST /api]:', error);
    res.status(500).json({ error: 'Database operation failed' });
  }
});

router.post('/match-results', async (req, res) => {
  const {
    match_no, play_stage, play_date, team_id1, team_id2,
    results, decided_by, goal_score, venue_id, audience,
    player_of_match, stop1_sec, stop2_sec
  } = req.body;

  try {
    await pool.query(`
      INSERT INTO MATCH_PLAYED 
      (match_no, play_stage, play_date, team_id1, team_id2, results, decided_by,
       goal_score, venue_id, audience, player_of_match, stop1_sec, stop2_sec)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        match_no, play_stage, play_date, team_id1, team_id2,
        results, decided_by, goal_score, venue_id, audience,
        player_of_match, stop1_sec, stop2_sec
      ]
    );
    res.status(201).json({ message: 'Match result submitted successfully' });
  } catch (err) {
    console.error('❌ Error inserting match result:', err);
    res.status(500).json({ error: 'Database error inserting match result' });
  }
});





// GET match results with goal scorers
router.get('/results', async (req, res) => {
  try {
    const [matches] = await pool.query(`
      SELECT 
        mp.match_no AS id,
        DATE_FORMAT(mp.play_date, '%Y-%m-%d') AS date,
        t1.team_name AS team1,
        t2.team_name AS team2,
        mp.goal_score,
        v.venue_name AS venue,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'scorer', per.name,
            'number', p.jersey_no,
            'time', gd.goal_time,
            'team', CASE 
              WHEN gd.team_id = mp.team_id1 THEN t1.team_name
              ELSE t2.team_name
            END
          )
        ) AS goals
      FROM MATCH_PLAYED mp
      JOIN TEAM t1 ON mp.team_id1 = t1.team_id
      JOIN TEAM t2 ON mp.team_id2 = t2.team_id
      JOIN VENUE v ON mp.venue_id = v.venue_id
      LEFT JOIN GOAL_DETAILS gd ON mp.match_no = gd.match_no
      LEFT JOIN PLAYER p ON gd.player_id = p.player_id
      LEFT JOIN PERSON per ON p.player_id = per.kfupm_id
      GROUP BY mp.match_no
      ORDER BY mp.play_date DESC
    `);

    const formattedMatches = matches.map(match => ({
      ...match,
      goals: match.goals ? match.goals.filter(g => g.scorer) : []
    }));

    res.json(formattedMatches);
  } catch (error) {
    console.error('Error [GET /api/matches/results]:', error);
    res.status(500).json({ error: 'Failed to load match results' });
  }
});

module.exports = router;
