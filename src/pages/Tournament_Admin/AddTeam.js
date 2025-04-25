import React, { useState } from 'react';
import './AddTeam.css';

const AddTeam = () => {
  const [formData, setFormData] = useState({
    tournament: '',
    teamName: '',
    teamId: '',
    group: '',
    coachName: '',
    coachPhone: '',
    managerName: '',
    managerPhone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Team submitted:', formData);
    // TODO: connect to backend
  };

  return (
    <div className="add-team-container">
      <div className="form-card">
        <h2 className="form-title">Add Team</h2>
        <form onSubmit={handleSubmit}>
          <label>Tournament</label>
          <select name="tournament" value={formData.tournament} onChange={handleChange} required>
            <option value="">Select Tournament</option>
            <option value="t1">Spring Cup 2025</option>
            <option value="t2">Winter League 2025</option>
          </select>

          <label>Team Name</label>
          <input type="text" name="teamName" placeholder="Team Name" value={formData.teamName} onChange={handleChange} required />

          <label>Team ID</label>
          <input type="text" name="teamId" placeholder="Team ID" value={formData.teamId} onChange={handleChange} required />

          <label>Group</label>
          <select name="group" value={formData.group} onChange={handleChange} required>
            <option value="">Select Group</option>
            <option value="A">Group A</option>
            <option value="B">Group B</option>
          </select>

          <label>Coach Name</label>
          <input type="text" name="coachName" placeholder="Coach Name" value={formData.coachName} onChange={handleChange} required />

          <label>Coach Contact (phone)</label>
          <input type="tel" name="coachPhone" placeholder="Phone Number" value={formData.coachPhone} onChange={handleChange} required />

          <label>Manager Name</label>
          <input type="text" name="managerName" placeholder="Manager Name" value={formData.managerName} onChange={handleChange} required />

          <label>Manager Contact (phone)</label>
          <input type="tel" name="managerPhone" placeholder="Phone Number" value={formData.managerPhone} onChange={handleChange} required />

          <label>Address</label>
          <textarea name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} required />

          <div className="form-buttons">
            <button type="submit" className="btn-primary">Submit</button>
            <button type="reset" className="btn-secondary" onClick={() => setFormData({})}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
