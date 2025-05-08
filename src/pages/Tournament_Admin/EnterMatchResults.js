import React, { useState, useEffect } from 'react';
import './EnterMatchResults.css';

const EnterMatchResults = () => {
  const [formData, setFormData] = useState({
    match_no: '',
    play_stage: '',
    play_date: '',
    team_id1: '',
    team_id2: '',
    results: '',
    decided_by: '',
    goal_score: '',
    venue_id: '',
    audience: '',
    player_of_match: '',
    stop1_sec: '',
    stop2_sec: ''
  });

  const [teams, setTeams] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    // ✅ Updated: Use full backend URL
    fetch('http://localhost:3001/api/teams')
      .then(res => res.json())
      .then(data => {
        console.log('Teams loaded:', data);
        setTeams(data);
      })
      .catch(err => {
        console.error('Error loading teams:', err);
        alert('❌ Failed to load teams');
      });

    fetch('http://localhost:3001/api/venues')
      .then(res => res.json())
      .then(data => {
        console.log('Venues loaded:', data);
        setVenues(data);
      })
      .catch(err => {
        console.error('Error loading venues:', err);
        alert('❌ Failed to load venues');
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     // ✅ Frontend validation
  if (formData.team_id1 === formData.team_id2) {
    alert("❌ Team 1 and Team 2 cannot be the same.");
    return;
  }

  if (
    isNaN(Number(formData.player_of_match)) ||
    Number(formData.player_of_match) < 1000
  ) {
    alert("❌ Please enter a valid Player of the Match ID (>= 1000).");
    return;
  }


    try {
      const response = await fetch('http://localhost:3001/api/match-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          match_no: Number(formData.match_no),
          team_id1: Number(formData.team_id1),
          team_id2: Number(formData.team_id2),
          venue_id: Number(formData.venue_id),
          audience: Number(formData.audience),
          player_of_match: Number(formData.player_of_match),
          stop1_sec: Number(formData.stop1_sec),
          stop2_sec: Number(formData.stop2_sec)
        })
      });

      if (response.ok) {
        alert("✅ Match result submitted successfully!");
        setFormData({
          match_no: '',
          play_stage: '',
          play_date: '',
          team_id1: '',
          team_id2: '',
          results: '',
          decided_by: '',
          goal_score: '',
          venue_id: '',
          audience: '',
          player_of_match: '',
          stop1_sec: '',
          stop2_sec: ''
        });
      } else {
        const errorData = await response.json();
        alert(`❌ Error: ${errorData.error || 'Failed to submit match result'}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Network or server error.");
    }
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <h2>Enter Match Results</h2>
        <form onSubmit={handleSubmit}>
          <label>Match Number</label>
          <input type="number" name="match_no" value={formData.match_no} onChange={handleChange} required />

          <label>Play Stage</label>
          <select name="play_stage" value={formData.play_stage} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="G">Group</option>
            <option value="Q">Quarter</option>
            <option value="S">Semi</option>
            <option value="F">Final</option>
          </select>

          <label>Play Date</label>
          <input type="date" name="play_date" value={formData.play_date} onChange={handleChange} required />

          <label>Team 1</label>
          <select name="team_id1" value={formData.team_id1} onChange={handleChange} required>
  <option value="">Select Team 1</option>
  {Array.isArray(teams) && teams.map(team => (
    <option key={team.id} value={team.id}>{team.name}</option>
  ))}
</select>


          <label>Team 2</label>
          <select name="team_id2" value={formData.team_id2} onChange={handleChange} required>
  <option value="">Select Team 2</option>
  {Array.isArray(teams) && teams.map(team => (
    <option key={`team2-${team.id}`} value={team.id}>{team.name}</option>
  ))}
</select>


          <label>Result</label>
          <select name="results" value={formData.results} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="WIN">Win</option>
            <option value="LOSS">Loss</option>
            <option value="DRAW">Draw</option>
          </select>

          <label>Decided By</label>
          <select name="decided_by" value={formData.decided_by} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="N">Normal</option>
            <option value="P">Penalty</option>
          </select>

          <label>Goal Score (e.g. 3-2)</label>
          <input type="text" name="goal_score" value={formData.goal_score} onChange={handleChange} required />

          <label>Venue</label>
          <select name="venue_id" value={formData.venue_id} onChange={handleChange} required>
            <option value="">Select</option>
            {Array.isArray(venues) && venues.map(venue => (
  <option key={venue.id} value={venue.id}>{venue.name}</option>
))}
          </select>

          <label>Audience</label>
          <input type="number" name="audience" value={formData.audience} onChange={handleChange} required />

          <label>Player of the Match (Player ID)</label>
          <input type="number" name="player_of_match" value={formData.player_of_match} onChange={handleChange} required />

          <label>Stoppage Time (1st Half)</label>
          <input type="number" name="stop1_sec" value={formData.stop1_sec} onChange={handleChange} required />

          <label>Stoppage Time (2nd Half)</label>
          <input type="number" name="stop2_sec" value={formData.stop2_sec} onChange={handleChange} required />

          <button type="submit" className="btn-submit">Submit Result</button>
        </form>
      </div>
    </div>
  );
};

export default EnterMatchResults;
