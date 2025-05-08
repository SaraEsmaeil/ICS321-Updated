import React, { useState, useEffect } from 'react';
import './AssignCaptain.css'; // Ensure your CSS file exists and is correctly styled

const AssignCaptain = () => {
  const [formData, setFormData] = useState({
    match_no: '',
    team_id: '',
    player_captain: ''
  });

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch teams, players, and matches for dropdowns
    const fetchData = async () => {
      try {
        const [teamsRes, playersRes, matchesRes] = await Promise.all([
          fetch('http://localhost:3001/api/teams'),
          fetch('http://localhost:3001/api/players'),
          fetch('http://localhost:3001/api/matches')
        ]);
    
        console.log('Teams Response Status:', teamsRes.status);
        console.log('Players Response Status:', playersRes.status);
        console.log('Matches Response Status:', matchesRes.status);
    
        const teamsData = await teamsRes.json();
        const playersData = await playersRes.json();
        const matchesData = await matchesRes.json();
    
        setTeams(teamsData);
        setPlayers(playersData);
        setMatches(matchesData);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        alert('❌ Failed to load data from server.');
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { match_no, team_id, player_captain } = formData;

    // ✅ Basic validation
    if (!match_no || !team_id || !player_captain) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/assign-captain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          match_no: Number(match_no),
          team_id: Number(team_id),
          player_captain: Number(player_captain)
        })
      });

      if (response.ok) {
        alert("✅ Captain assigned successfully!");
        setFormData({ match_no: '', team_id: '', player_captain: '' });
      } else {
        const errorData = await response.json();
        alert(`❌ Error: ${errorData.error || 'Failed to assign captain'}`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert("❌ Network or server error.");
    }
  };

  return (
    <div className="captain-container">
      <div className="captain-card">
        <h2>Assign Match Captain</h2>
        <form onSubmit={handleSubmit}>
          <label>Match Number</label>
          <select name="match_no" value={formData.match_no} onChange={handleChange} required>
            <option value="">Select Match</option>
            {Array.isArray(matches) && matches.map(match => (
              <option key={match.id} value={match.id}>
                Match #{match.id} — {match.name || `${match.team1_name} vs ${match.team2_name}`}
              </option>
            ))}
          </select>

          <label>Team</label>
          <select name="team_id" value={formData.team_id} onChange={handleChange} required>
            <option value="">Select Team</option>
            {Array.isArray(teams) && teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>

          <label>Player (Captain)</label>
          <select name="player_captain" value={formData.player_captain} onChange={handleChange} required>
            <option value="">Select Player</option>
            {Array.isArray(players) && players.map(player => (
              <option key={player.id} value={player.id}>
                #{player.jersey_no} — {player.name}
              </option>
            ))}
          </select>

          <button type="submit" className="btn-submit">Assign Captain</button>
        </form>
      </div>
    </div>
  );
};

export default AssignCaptain;
