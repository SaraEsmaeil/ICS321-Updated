const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming this is configured for MySQL

router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT tr_id AS id, tr_name AS name
        FROM TOURNAMENT
        ORDER BY start_date DESC
      `);
  
      console.log('✅ Backend tournaments rows:', rows);
      res.json(rows);
    } catch (error) {
        console.error('❌ Failed to fetch tournaments:', error.message);
        res.status(500).json({ error: 'Failed to load tournaments', details: error.message });
      }
  });


// ✅ DELETE tournament by ID
router.delete('/:id', (req, res) => {
    const tr_id = req.params.id;
  
    console.log(" Request to delete tournament with ID:", tr_id); // NEW LOG LINE
  
    db.query('DELETE FROM TOURNAMENT WHERE tr_id = ?', [tr_id], (err, result) => {
      if (err) {
        console.error("❌ SQL Delete Error:", err.sqlMessage); // ✅ Must log SQL error
        return res.status(500).json({ error: err.sqlMessage });
      }
      console.log("✅ Tournament deleted");
      res.json({ message: 'Tournament deleted successfully!' });
    });
  });

// GET tournament by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT t.*,
             COUNT(DISTINCT tt.team_id) as team_count,
             COUNT(DISTINCT tp.player_id) as player_count,
             COUNT(DISTINCT mp.match_no) as match_count
      FROM TOURNAMENT t
      LEFT JOIN TOURNAMENT_TEAM tt ON t.tr_id = tt.tr_id
      LEFT JOIN TEAM_PLAYER tp ON tt.tr_id = tp.tr_id AND tt.team_id = tp.team_id
      LEFT JOIN MATCH_PLAYED mp ON (mp.team_id1 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = t.tr_id) OR 
                                    mp.team_id2 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = t.tr_id))
      WHERE t.tr_id = $1
      GROUP BY t.tr_id, t.tr_name, t.start_date, t.end_date
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error getting tournament details:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET tournament standings
router.get('/:id/standings', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT tt.team_id, t.team_name, tt.team_group, 
             tt.match_played, tt.won, tt.draw, tt.lost,
             tt.goal_for, tt.goal_against, tt.goal_diff, tt.points, 
             tt.group_position
      FROM TOURNAMENT_TEAM tt
      JOIN TEAM t ON tt.team_id = t.team_id
      WHERE tt.tr_id = $1
      ORDER BY tt.team_group, tt.points DESC, tt.goal_diff DESC
    `, [id]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting tournament standings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET tournament matches
router.get('/:id/matches', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT mp.match_no, mp.play_date, mp.play_stage, 
             mp.goal_score, mp.results, 
             t1.team_id as team_id1, t1.team_name as team1_name,
             t2.team_id as team_id2, t2.team_name as team2_name,
             v.venue_name
      FROM MATCH_PLAYED mp
      JOIN TEAM t1 ON mp.team_id1 = t1.team_id
      JOIN TEAM t2 ON mp.team_id2 = t2.team_id
      JOIN VENUE v ON mp.venue_id = v.venue_id
      WHERE mp.team_id1 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = $1)
            OR mp.team_id2 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = $1)
      ORDER BY mp.play_date
    `, [id]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting tournament matches:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a tournament by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM TOURNAMENT WHERE tr_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tournament not found' });
        }

        res.json({ message: 'Tournament deleted successfully', tournament: result.rows[0] });
    } catch (err) {
        console.error('Error deleting tournament:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST create a new tournament
router.post('/', async (req, res) => {
    try {
        const { tr_name, start_date, end_date, location, description, organizer_id } = req.body;
        
        // Input validation
        if (!tr_name || !start_date || !end_date) {
            return res.status(400).json({ error: 'Tournament name, start date, and end date are required' });
        }
        
        // Validate dates
        if (new Date(start_date) > new Date(end_date)) {
            return res.status(400).json({ error: 'Start date must be before end date' });
        }
        
        const result = await db.query(
            `INSERT INTO TOURNAMENT (tr_name, start_date, end_date, location, description, organizer_id) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [tr_name, start_date, end_date, location, description, organizer_id]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating tournament:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT update an existing tournament
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { tr_name, start_date, end_date, location, description, organizer_id, status } = req.body;
        
        // Input validation
        if (!tr_name || !start_date || !end_date) {
            return res.status(400).json({ error: 'Tournament name, start date, and end date are required' });
        }
        
        // Validate dates
        if (new Date(start_date) > new Date(end_date)) {
            return res.status(400).json({ error: 'Start date must be before end date' });
        }
        
        const result = await db.query(
            `UPDATE TOURNAMENT 
             SET tr_name = $1, start_date = $2, end_date = $3, location = $4, 
                 description = $5, organizer_id = $6, status = $7
             WHERE tr_id = $8 
             RETURNING *`,
            [tr_name, start_date, end_date, location, description, organizer_id, status, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tournament not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating tournament:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET teams not in the tournament
router.get('/:id/available-teams', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(`
            SELECT t.team_id, t.team_name
            FROM TEAM t
            WHERE t.team_id NOT IN (
                SELECT tt.team_id 
                FROM TOURNAMENT_TEAM tt 
                WHERE tt.tr_id = $1
            )
            ORDER BY t.team_name
        `, [id]);
        
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting available teams:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST add team to tournament
router.post('/:id/teams', async (req, res) => {
    try {
        const { id } = req.params;
        const { team_id, team_group } = req.body;
        
        // Check if tournament exists
        const tournamentCheck = await db.query('SELECT * FROM TOURNAMENT WHERE tr_id = $1', [id]);
        if (tournamentCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Tournament not found' });
        }
        
        // Check if team exists
        const teamCheck = await db.query('SELECT * FROM TEAM WHERE team_id = $1', [team_id]);
        if (teamCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Team not found' });
        }
        
        // Check if team is already in the tournament
        const existingCheck = await db.query(
            'SELECT * FROM TOURNAMENT_TEAM WHERE tr_id = $1 AND team_id = $2',
            [id, team_id]
        );
        
        if (existingCheck.rows.length > 0) {
            return res.status(409).json({ error: 'Team is already in this tournament' });
        }
        
        // Add team to tournament with initial stats
        const result = await db.query(
            `INSERT INTO TOURNAMENT_TEAM 
            (tr_id, team_id, team_group, match_played, won, draw, lost, goal_for, goal_against, goal_diff, points, group_position) 
            VALUES ($1, $2, $3, 0, 0, 0, 0, 0, 0, 0, 0, 0) 
            RETURNING *`,
            [id, team_id, team_group || 'A']
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding team to tournament:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE remove team from tournament
router.delete('/:id/teams/:teamId', async (req, res) => {
    try {
        const { id, teamId } = req.params;
        
        // Check if team is in tournament
        const teamCheck = await db.query(
            'SELECT * FROM TOURNAMENT_TEAM WHERE tr_id = $1 AND team_id = $2',
            [id, teamId]
        );
        
        if (teamCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Team not found in this tournament' });
        }
        
        // Check if team has matches in the tournament
        const matchCheck = await db.query(`
            SELECT * FROM MATCH_PLAYED mp
            WHERE (mp.team_id1 = $1 OR mp.team_id2 = $1)
            AND (mp.team_id1 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = $2)
                OR mp.team_id2 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = $2))
        `, [teamId, id]);
        
        if (matchCheck.rows.length > 0) {
            return res.status(400).json({ 
                error: 'Cannot remove team with existing matches. Delete matches first.'
            });
        }
        
        // Remove team from tournament
        const result = await db.query(
            'DELETE FROM TOURNAMENT_TEAM WHERE tr_id = $1 AND team_id = $2 RETURNING *',
            [id, teamId]
        );
        
        res.json({ 
            message: 'Team removed from tournament successfully', 
            team: result.rows[0]
        });
    } catch (err) {
        console.error('Error removing team from tournament:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST create a new match in the tournament
router.post('/:id/matches', async (req, res) => {
    try {
        const { id } = req.params;
        const { team_id1, team_id2, play_date, play_stage, venue_id } = req.body;
        
        // Input validation
        if (!team_id1 || !team_id2 || !play_date || !play_stage || !venue_id) {
            return res.status(400).json({ 
                error: 'Teams, play date, play stage, and venue are required'
            });
        }
        
        // Check if both teams are in the tournament
        const teamsCheck = await db.query(
            'SELECT * FROM TOURNAMENT_TEAM WHERE tr_id = $1 AND team_id IN ($2, $3)',
            [id, team_id1, team_id2]
        );
        
        if (teamsCheck.rows.length < 2) {
            return res.status(400).json({ 
                error: 'Both teams must be registered in this tournament'
            });
        }
        
        // Get next match number
        const matchNoResult = await db.query('SELECT MAX(match_no) as max_no FROM MATCH_PLAYED');
        const nextMatchNo = (matchNoResult.rows[0].max_no || 0) + 1;
        
        // Create the match
        const result = await db.query(
            `INSERT INTO MATCH_PLAYED 
            (match_no, team_id1, team_id2, play_date, play_stage, venue_id, goal_score, results) 
            VALUES ($1, $2, $3, $4, $5, $6, '0-0', 'D') 
            RETURNING *`,
            [nextMatchNo, team_id1, team_id2, play_date, play_stage, venue_id]
        );
        
        // Get match details with team names and venue name
        const matchDetails = await db.query(`
            SELECT mp.match_no, mp.play_date, mp.play_stage, 
                mp.goal_score, mp.results, 
                t1.team_id as team_id1, t1.team_name as team1_name,
                t2.team_id as team_id2, t2.team_name as team2_name,
                v.venue_name
            FROM MATCH_PLAYED mp
            JOIN TEAM t1 ON mp.team_id1 = t1.team_id
            JOIN TEAM t2 ON mp.team_id2 = t2.team_id
            JOIN VENUE v ON mp.venue_id = v.venue_id
            WHERE mp.match_no = $1
        `, [nextMatchNo]);
        
        res.status(201).json(matchDetails.rows[0]);
    } catch (err) {
        console.error('Error creating match:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT update match results and update team standings
router.put('/:id/matches/:matchNo', async (req, res) => {
    const client = await db.getClient();
    
    try {
        await client.query('BEGIN');
        
        const { id, matchNo } = req.params;
        const { goal_score, results } = req.body;
        
        if (!goal_score || !results) {
            return res.status(400).json({ error: 'Goal score and result are required' });
        }
        
        // Get match info before update
        const matchInfo = await client.query(
            'SELECT * FROM MATCH_PLAYED WHERE match_no = $1',
            [matchNo]
        );
        
        if (matchInfo.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Match not found' });
        }
        
        const match = matchInfo.rows[0];
        const team_id1 = match.team_id1;
        const team_id2 = match.team_id2;
        
        // Verify teams are in the tournament
        const teamsCheck = await client.query(
            'SELECT * FROM TOURNAMENT_TEAM WHERE tr_id = $1 AND team_id IN ($2, $3)',
            [id, team_id1, team_id2]
        );
        
        if (teamsCheck.rows.length < 2) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Both teams must be registered in this tournament' });
        }
        
        // Update match with results
        const updateResult = await client.query(
            'UPDATE MATCH_PLAYED SET goal_score = $1, results = $2 WHERE match_no = $3 RETURNING *',
            [goal_score, results, matchNo]
        );
        
        // Parse score and update team statistics
        const [goalsTeam1, goalsTeam2] = goal_score.split('-').map(Number);
        
        // Team 1 updates
        if (results === 'W') {
            // Team 1 won
            await client.query(`
                UPDATE TOURNAMENT_TEAM 
                SET match_played = match_played + 1,
                    won = won + 1,
                    goal_for = goal_for + $1,
                    goal_against = goal_against + $2,
                    goal_diff = goal_diff + ($1 - $2),
                    points = points + 3
                WHERE tr_id = $3 AND team_id = $4
            `, [goalsTeam1, goalsTeam2, id, team_id1]);
            
            // Team 2 lost
            await client.query(`
                UPDATE TOURNAMENT_TEAM 
                SET match_played = match_played + 1,
                    lost = lost + 1,
                    goal_for = goal_for + $1,
                    goal_against = goal_against + $2,
                    goal_diff = goal_diff + ($1 - $2)
                WHERE tr_id = $3 AND team_id = $4
            `, [goalsTeam2, goalsTeam1, id, team_id2]);
        } else if (results === 'L') {
            // Team 1 lost
            await client.query(`
                UPDATE TOURNAMENT_TEAM 
                SET match_played = match_played + 1,
                    lost = lost + 1,
                    goal_for = goal_for + $1,
                    goal_against = goal_against + $2,
                    goal_diff = goal_diff + ($1 - $2)
                WHERE tr_id = $3 AND team_id = $4
            `, [goalsTeam1, goalsTeam2, id, team_id1]);
            
            // Team 2 won
            await client.query(`
                UPDATE TOURNAMENT_TEAM 
                SET match_played = match_played + 1,
                    won = won + 1,
                    goal_for = goal_for + $1,
                    goal_against = goal_against + $2,
                    goal_diff = goal_diff + ($1 - $2),
                    points = points + 3
                WHERE tr_id = $3 AND team_id = $4
            `, [goalsTeam2, goalsTeam1, id, team_id2]);
        } else {
            // Draw
            await client.query(`
                UPDATE TOURNAMENT_TEAM 
                SET match_played = match_played + 1,
                    draw = draw + 1,
                    goal_for = goal_for + $1,
                    goal_against = goal_against + $2,
                    points = points + 1
                WHERE tr_id = $3 AND team_id = $4
            `, [goalsTeam1, goalsTeam2, id, team_id1]);
            
            await client.query(`
                UPDATE TOURNAMENT_TEAM 
                SET match_played = match_played + 1,
                    draw = draw + 1,
                    goal_for = goal_for + $1,
                    goal_against = goal_against + $2,
                    points = points + 1
                WHERE tr_id = $3 AND team_id = $4
            `, [goalsTeam2, goalsTeam1, id, team_id2]);
        }
        
        // Update group positions for all teams in this tournament
        // Get all groups in the tournament
        const groupsResult = await client.query(
            'SELECT DISTINCT team_group FROM TOURNAMENT_TEAM WHERE tr_id = $1',
            [id]
        );
        
        // For each group, update positions
        for (const groupRow of groupsResult.rows) {
            const group = groupRow.team_group;
            
            // Get teams in this group sorted by points and goal difference
            const teamsInGroup = await client.query(`
                SELECT team_id 
                FROM TOURNAMENT_TEAM 
                WHERE tr_id = ? AND team_group = ? 
                ORDER BY points DESC, goal_diff DESC, goal_for DESC
            `, [id, group]);
            
            // Update positions
            let position = 1;
            for (const teamRow of teamsInGroup.rows) {
                await client.query(
                    'UPDATE TOURNAMENT_TEAM SET group_position = ? WHERE tr_id = ? AND team_id = ?',
                    [position++, id, teamRow.team_id]
                );
            }
        }
        
        await client.query('COMMIT');
        
        // Get updated match details
        const updatedMatch = await db.query(`
            SELECT mp.match_no, mp.play_date, mp.play_stage, 
                mp.goal_score, mp.results, 
                t1.team_id as team_id1, t1.team_name as team1_name,
                t2.team_id as team_id2, t2.team_name as team2_name,
                v.venue_name
            FROM MATCH_PLAYED mp
            JOIN TEAM t1 ON mp.team_id1 = t1.team_id
            JOIN TEAM t2 ON mp.team_id2 = t2.team_id
            JOIN VENUE v ON mp.venue_id = v.venue_id
            WHERE mp.match_no = ?
        `, [matchNo]);
        
        res.json(updatedMatch.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error updating match results:', err);
        res.status(500).json({ error: 'Server error' });
    } finally {
        client.release();
    }
});

// GET tournament teams with players
router.get('/:id/teams', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Get all teams in tournament
        const teams = await db.query(`
            SELECT tt.team_id, t.team_name, tt.team_group
            FROM TOURNAMENT_TEAM tt
            JOIN TEAM t ON tt.team_id = t.team_id
            WHERE tt.tr_id = ?
            ORDER BY tt.team_group, t.team_name
        `, [id]);
        
        // For each team get players
        const result = [];
        
        for (const team of teams.rows) {
            const players = await db.query(`
                SELECT p.player_id, p.player_name, p.jersey_no, p.position, 
                       tp.is_captain, tp.playing_status
                FROM TEAM_PLAYER tp
                JOIN PLAYER p ON tp.player_id = p.player_id
                WHERE tp.tr_id = ? AND tp.team_id = ?
                ORDER BY tp.is_captain DESC, p.jersey_no
            `, [id, team.team_id]);
            
            result.push({
                ...team,
                players: players.rows
            });
        }
        
        res.json(result);
    } catch (err) {
        console.error('Error getting tournament teams:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST assign team captain
router.post('/:id/teams/:teamId/captain', async (req, res) => {
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();
        
        const { id, teamId } = req.params;
        const { playerId } = req.body;
        
        if (!playerId) {
            return res.status(400).json({ error: 'Player ID is required' });
        }
        
        // Verify player is in team for this tournament
        const playerCheck = await connection.query(
            'SELECT * FROM TEAM_PLAYER WHERE tr_id = ? AND team_id = ? AND player_id = ?',
            [id, teamId, playerId]
        );
        
        if (playerCheck[0].length === 0) {
            await connection.rollback();
            return res.status(404).json({ error: 'Player not found in this team for this tournament' });
        }
        
        // Remove captain status from all players in the team
        await connection.query(
            'UPDATE TEAM_PLAYER SET is_captain = 0 WHERE tr_id = ? AND team_id = ?',
            [id, teamId]
        );
        
        // Assign new captain
        await connection.query(
            'UPDATE TEAM_PLAYER SET is_captain = 1 WHERE tr_id = ? AND team_id = ? AND player_id = ?',
            [id, teamId, playerId]
        );
        
        await connection.commit();
        
        // Get updated player info
        const playerInfo = await db.query(`
            SELECT p.player_id, p.player_name, p.jersey_no, p.position, 
                   tp.is_captain, tp.playing_status, t.team_name
            FROM TEAM_PLAYER tp
            JOIN PLAYER p ON tp.player_id = p.player_id
            JOIN TEAM t ON tp.team_id = t.team_id
            WHERE tp.tr_id = ? AND tp.team_id = ? AND tp.player_id = ?
        `, [id, teamId, playerId]);
        
        res.json({
            message: 'Captain assigned successfully',
            player: playerInfo[0][0]
        });
    } catch (err) {
        await connection.rollback();
        console.error('Error assigning captain:', err);
        res.status(500).json({ error: 'Server error' });
    } finally {
        connection.release();
    }
});

// POST add player to tournament team
router.post('/:id/teams/:teamId/players', async (req, res) => {
    try {
        const { id, teamId } = req.params;
        const { playerId, playing_status } = req.body;
        
        if (!playerId) {
            return res.status(400).json({ error: 'Player ID is required' });
        }
        
        // Check if tournament exists
        const tournamentCheck = await db.query('SELECT * FROM TOURNAMENT WHERE tr_id = ?', [id]);
        if (tournamentCheck[0].length === 0) {
            return res.status(404).json({ error: 'Tournament not found' });
        }
        
        // Check if team is in tournament
        const teamCheck = await db.query(
            'SELECT * FROM TOURNAMENT_TEAM WHERE tr_id = ? AND team_id = ?',
            [id, teamId]
        );
        
        if (teamCheck[0].length === 0) {
            return res.status(404).json({ error: 'Team not found in this tournament' });
        }
        
        // Check if player exists
        const playerCheck = await db.query('SELECT * FROM PLAYER WHERE player_id = ?', [playerId]);
        if (playerCheck[0].length === 0) {
            return res.status(404).json({ error: 'Player not found' });
        }
        
        // Check if player is already in a team for this tournament
        const existingCheck = await db.query(
            'SELECT * FROM TEAM_PLAYER WHERE tr_id = ? AND player_id = ?',
            [id, playerId]
        );
        
        if (existingCheck[0].length > 0) {
            return res.status(409).json({ 
                error: 'Player is already assigned to a team in this tournament' 
            });
        }
        
        // Add player to team
        await db.query(
            `INSERT INTO TEAM_PLAYER 
            (tr_id, team_id, player_id, playing_status, is_captain) 
            VALUES (?, ?, ?, ?, 0)`,
            [id, teamId, playerId, playing_status || 'Active']
        );
        
        // Get player details
        const playerInfo = await db.query(`
            SELECT p.player_id, p.player_name, p.jersey_no, p.position, 
                   tp.is_captain, tp.playing_status
            FROM TEAM_PLAYER tp
            JOIN PLAYER p ON tp.player_id = p.player_id
            WHERE tp.tr_id = ? AND tp.team_id = ? AND tp.player_id = ?
        `, [id, teamId, playerId]);
        
        res.status(201).json(playerInfo[0][0]);
    } catch (err) {
        console.error('Error adding player to team:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE remove player from tournament team
router.delete('/:id/teams/:teamId/players/:playerId', async (req, res) => {
    try {
        const { id, teamId, playerId } = req.params;
        
        // Check if player is in team for this tournament
        const playerCheck = await db.query(
            'SELECT * FROM TEAM_PLAYER WHERE tr_id = ? AND team_id = ? AND player_id = ?',
            [id, teamId, playerId]
        );
        
        if (playerCheck[0].length === 0) {
            return res.status(404).json({ error: 'Player not found in this team for this tournament' });
        }
        
        // Check if player is captain
        if (playerCheck[0][0].is_captain) {
            return res.status(400).json({ 
                error: 'Cannot remove team captain. Assign a new captain first.' 
            });
        }
        
        // Remove player from team
        await db.query(
            'DELETE FROM TEAM_PLAYER WHERE tr_id = ? AND team_id = ? AND player_id = ?',
            [id, teamId, playerId]
        );
        
        res.json({ message: 'Player removed from team successfully' });
    } catch (err) {
        console.error('Error removing player from team:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET tournament statistics
router.get('/:id/statistics', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Get tournament details
        const tournamentDetails = await db.query('SELECT * FROM TOURNAMENT WHERE tr_id = ?', [id]);
        
        if (tournamentDetails[0].length === 0) {
            return res.status(404).json({ error: 'Tournament not found' });
        }
        
        // Get match statistics
        const matchStats = await db.query(`
            SELECT 
                COUNT(*) as total_matches,
                SUM(CAST(SUBSTRING_INDEX(goal_score, '-', 1) AS UNSIGNED) + 
                    CAST(SUBSTRING_INDEX(goal_score, '-', -1) AS UNSIGNED)) as total_goals,
                AVG(CAST(SUBSTRING_INDEX(goal_score, '-', 1) AS UNSIGNED) + 
                    CAST(SUBSTRING_INDEX(goal_score, '-', -1) AS UNSIGNED)) as avg_goals_per_match,
                COUNT(CASE WHEN results = 'W' OR results = 'L' THEN 1 END) as decisive_matches,
                COUNT(CASE WHEN results = 'D' THEN 1 END) as drawn_matches
            FROM MATCH_PLAYED mp
            WHERE mp.team_id1 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = ?) 
                  OR mp.team_id2 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = ?)
        `, [id, id]);
        
        // Get top scorers
        const topScorers = await db.query(`
            SELECT p.player_id, p.player_name, t.team_id, t.team_name, 
                   COUNT(*) as goals
            FROM GOAL_DETAILS gd
            JOIN PLAYER p ON gd.player_id = p.player_id
            JOIN TEAM t ON gd.team_id = t.team_id
            JOIN MATCH_PLAYED mp ON gd.match_no = mp.match_no
            WHERE (mp.team_id1 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = ?) 
                  OR mp.team_id2 IN (SELECT team_id FROM TOURNAMENT_TEAM WHERE tr_id = ?))
                  AND gd.goal_type != 'O'
            GROUP BY p.player_id, p.player_name, t.team_id, t.team_name
            ORDER BY goals DESC
            LIMIT 10
        `, [id, id]);
        
        res.json({
            tournament: tournamentDetails[0][0],
            matchStats: matchStats[0][0],
            topScorers: topScorers[0]
        });
    } catch (err) {
        console.error('Error getting tournament statistics:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;