import React, { useState } from 'react';
import './ScheduleMatch.css';

const ScheduleMatch = () => {
  const [formData, setFormData] = useState({
    match_no: '',
    play_stage: '',
    play_date: '',
    team_id1: '',
    team_id2: '',
    venue_id: ''
  });

  // Dummy data — replace with API call later
  const teams = [
    { id: 'T001', name: 'Falcons' },
    { id: 'T002', name: 'Tigers' },
    { id: 'T003', name: 'Wolves' },
    { id: 'T004', name: 'Eagles' }
  ];

  const venues = [
    { id: 'V001', name: 'Main Stadium' },
    { id: 'V002', name: 'West Field' },
    { id: 'V003', name: 'East Arena' }
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Match Scheduled:', formData);
    alert(`✅ Match #${formData.match_no} scheduled successfully!`);
    // TODO: Send to backend
  };

  return (
    <div className="schedule-container">
      <div className="schedule-card">
        <h2>Schedule Match</h2>
        <form onSubmit={handleSubmit}>
          <label>Match Number</label>
          <input
            type="text"
            name="match_no"
            placeholder="Enter match number"
            value={formData.match_no}
            onChange={handleChange}
            required
          />

          <label>Play Stage</label>
          <select name="play_stage" value={formData.play_stage} onChange={handleChange} required>
            <option value="">Select Stage</option>
            <option value="G">Group</option>
            <option value="R">Round of 16</option>
            <option value="Q">Quarter Final</option>
            <option value="S">Semi Final</option>
            <option value="F">Final</option>
          </select>

          <label>Play Date</label>
          <input
            type="date"
            name="play_date"
            value={formData.play_date}
            onChange={handleChange}
            required
          />

          <label>Team 1</label>
          <select name="team_id1" value={formData.team_id1} onChange={handleChange} required>
            <option value="">Select Team 1</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>

          <label>Team 2</label>
          <select name="team_id2" value={formData.team_id2} onChange={handleChange} required>
            <option value="">Select Team 2</option>
            {teams
              .filter(team => team.id !== formData.team_id1)
              .map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
          </select>

          <label>Venue</label>
          <select name="venue_id" value={formData.venue_id} onChange={handleChange} required>
            <option value="">Select Venue</option>
            {venues.map(venue => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </select>

          <button type="submit" className="btn-submit">Schedule Match</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMatch;
