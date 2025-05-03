import React, { useState } from 'react';
import './JoinTeam.css';

const JoinTeam = () => {
  const [formData, setFormData] = useState({
    playerName: '',
    studentId: '',    // ✅ NEW FIELD
    teamId: '',
    position: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Request submitted:', formData);
    alert('Your request to join the team has been submitted!');
    setFormData({ playerName: '', studentId: '', teamId: '', position: '' }); // ✅ RESET
  };

  return (
    <div className="join-team-container">
      <h2>Request to Join a Team</h2>
      <form onSubmit={handleSubmit}>
        <label>Player Name</label>
        <input
          type="text"
          name="playerName"
          value={formData.playerName}
          onChange={handleChange}
          required
        />

        <label>Student ID</label>  {/* ✅ NEW INPUT */}
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <label>Select Team</label>
        <select
          name="teamId"
          value={formData.teamId}
          onChange={handleChange}
          required
        >
          <option value="">--Select--</option>
          <option value="team1">Falcons</option>
          <option value="team2">Wolves</option>
        </select>

        <label>Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-submit">Submit Request</button>
      </form>
    </div>
  );
};

export default JoinTeam;
