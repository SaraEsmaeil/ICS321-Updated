import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScheduleMatch.css';

const ScheduleMatch = () => {
  const [formData, setFormData] = useState({
    match_no: '',
    tr_id: '', // Add tournament ID
    play_stage: '',
    play_date: '',
    team_id1: '',
    team_id2: '',
    venue_id: ''
  });

  const [teams, setTeams] = useState([]);
  const [venues, setVenues] = useState([]);
  const [tournaments, setTournaments] = useState([]);


  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, venuesRes, tournamentsRes] = await Promise.all([
          axios.get('http://localhost:3001/api/teams'),
          axios.get('http://localhost:3001/api/venues'),
          axios.get('http://localhost:3001/api/tournaments')
        ]);
        console.log('Tournaments raw response:', tournamentsRes.data);

        setTeams(teamsRes.data);
        setVenues(venuesRes.data);
        setTournaments(Array.isArray(tournamentsRes.data) ? tournamentsRes.data : []);
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to load dropdown data.');
      }
    };
    fetchData();
  }, []);
        

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        match_no: Number(formData.match_no),
        tr_id: Number(formData.tr_id),
        play_stage: formData.play_stage,
        play_date: formData.play_date,
        team_id1: Number(formData.team_id1),
        team_id2: Number(formData.team_id2),
        venue_id: Number(formData.venue_id)
      };
      
      const response = await axios.post(
        'http://localhost:3001/api/matches', // Add full backend URL
        payload
      );
      
      if (response.data.success) {
        alert(`✅ ${response.data.message}`);
        setFormData({
          match_no: '',
          tr_id: '',
          play_stage: '',
          play_date: '',
          team_id1: '',
          team_id2: '',
          venue_id: ''
        });
        
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.details || 
                          'Failed to schedule match';
      console.error('Error Details:', error.response?.data);
      alert(`❌ Error: ${errorMessage}`);
    }
  };

  return (
    <div className="schedule-container">
      <div className="schedule-card">
        <h2>Schedule Match</h2>
        <form onSubmit={handleSubmit}>
          {/* Match Number */}
          <input
            type="number"
            name="match_no"
            placeholder="Match Number"
            value={formData.match_no}
            onChange={handleChange}
            required
          />
          <select name="tr_id" value={formData.tr_id} onChange={handleChange} required>
  <option value="">Select Tournament</option>
  {(Array.isArray(tournaments) ? tournaments : []).map(t => (
    <option key={t.id} value={t.id}>{t.name}</option>
  ))}
</select>


          {/* Play Stage Dropdown */}
          <select name="play_stage" value={formData.play_stage} onChange={handleChange} required>
            <option value="">Select Stage</option>
            <option value="G">Group</option>
            <option value="R">Round of 16</option>
            <option value="Q">Quarter Final</option>
            <option value="S">Semi Final</option>
            <option value="F">Final</option>
          </select>

          {/* Date Picker */}
          <input
            type="date"
            name="play_date"
            value={formData.play_date}
            onChange={handleChange}
            required
          />

          {/* Team Selection */}
          <select name="team_id1" value={formData.team_id1} onChange={handleChange} required>
            <option value="">Select Team 1</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>

          <select name="team_id2" value={formData.team_id2} onChange={handleChange} required>
            <option value="">Select Team 2</option>
            {teams
              .filter(t => t.id !== formData.team_id1)
              .map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
          </select>

          {/* Venue Selection */}
          <select name="venue_id" value={formData.venue_id} onChange={handleChange} required>
            <option value="">Select Venue</option>
            {venues.map(venue => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </select>

          <button type="submit" className="btn-submit" >Schedule Match</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMatch;