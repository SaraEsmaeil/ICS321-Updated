import React, { useState } from 'react';
import './AssignCaptain.css';

const AssignCaptain = () => {
  const [formData, setFormData] = useState({
    match: '',
    team: '',
    player: ''
  });

  // Mock data (replace with actual API later)
  const matches = [
    { match_no: 1, name: 'Match 1 – Falcons vs Tigers', teams: ['Falcons', 'Tigers'] },
    { match_no: 2, name: 'Match 2 – Eagles vs Wolves', teams: ['Eagles', 'Wolves'] }
  ];

  const players = {
    Falcons: ['Mohammed', 'Ali Hassan'],
    Tigers: ['Khalid', 'Zayd Khan'],
    Eagles: ['Sami Omar', 'Saud'],
    Wolves: ['Yusuf Ali', 'Fahad']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'team' ? { player: '' } : {}) // reset player on team change
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    alert(`✅ Captain assigned successfully to ${formData.team}`);
    // TODO: Send to backend (match_captain table)
  };

  const selectedMatch = matches.find(m => m.match_no.toString() === formData.match);

  return (
    <div className="assign-captain-container">
      <div className="assign-card">
        <h2>Assign Match Captain</h2>
        <p>Select a match, then a team, and assign its captain.</p>
        <form onSubmit={handleSubmit}>
          <label>Match</label>
          <select name="match" value={formData.match} onChange={handleChange} required>
            <option value="">Select a match</option>
            {matches.map(match => (
              <option key={match.match_no} value={match.match_no}>{match.name}</option>
            ))}
          </select>

          {formData.match && (
            <>
              <label>Team</label>
              <select name="team" value={formData.team} onChange={handleChange} required>
                <option value="">Select a team</option>
                {selectedMatch.teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </>
          )}

          {formData.team && (
            <>
              <label>Captain</label>
              <select name="player" value={formData.player} onChange={handleChange} required>
                <option value="">Select a player</option>
                {players[formData.team]?.map(player => (
                  <option key={player} value={player}>{player}</option>
                ))}
              </select>
            </>
          )}

          <button type="submit" className="assign-btn">Assign Captain</button>
        </form>
      </div>
    </div>
  );
};

export default AssignCaptain;
