import React, { useState } from 'react';
import './EnterMatchResults.css';

const EnterMatchResults = () => {
  const [formData, setFormData] = useState({
    match_no: '',
    results: '',
    decided_by: '',
    goal_score: '',
    player_of_match: '',
    stop1_sec: '',
    stop2_sec: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Match Result Submitted:", formData);
    alert("Result submitted successfully!");
    // TODO: Integrate with backend API
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <h2>Enter Match Results</h2>
        <form onSubmit={handleSubmit}>
          <label>Match Number</label>
          <input type="text" name="match_no" onChange={handleChange} required />

          <label>Result</label>
          <select name="results" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="win">Win</option>
            <option value="loss">Loss</option>
            <option value="draw">Draw</option>
          </select>

          <label>Decided By</label>
          <select name="decided_by" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="N">Normal</option>
            <option value="P">Penalty</option>
          </select>

          <label>Goal Score</label>
          <input type="text" name="goal_score" onChange={handleChange} required />

          <label>Player of the Match</label>
          <input type="text" name="player_of_match" onChange={handleChange} required />

          <label>Stoppage Time (1st Half)</label>
          <input type="number" name="stop1_sec" onChange={handleChange} required />

          <label>Stoppage Time (2nd Half)</label>
          <input type="number" name="stop2_sec" onChange={handleChange} required />

          <button type="submit" className="btn-submit">Submit Result</button>
        </form>
      </div>
    </div>
  );
};

export default EnterMatchResults;
