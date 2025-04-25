import React, { useState } from 'react';
import './CardManagement.css';

const CardManagement = () => {
  const [cardData, setCardData] = useState({
    player_id: '',
    match_no: '',
    booking_time: '',
    sent_off: '',
    play_schedule: '',
    play_half: ''
  });

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Card Entry Submitted:", cardData);
    alert("Card entry recorded!");
    // TODO: backend insert
  };

  return (
    <div className="card-container">
      <div className="card-form">
        <h2>Card Management</h2>
        <form onSubmit={handleSubmit}>
          <label>Player ID</label>
          <input type="text" name="player_id" onChange={handleChange} required />

          <label>Match Number</label>
          <input type="text" name="match_no" onChange={handleChange} required />

          <label>Booking Time</label>
          <input type="time" name="booking_time" onChange={handleChange} required />

          <label>Sent Off</label>
          <select name="sent_off" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>

          <label>Play Schedule</label>
          <select name="play_schedule" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="NT">Normal Time</option>
            <option value="ST">Stoppage Time</option>
            <option value="ET">Extra Time</option>
          </select>

          <label>Play Half</label>
          <select name="play_half" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1st">1st Half</option>
            <option value="2nd">2nd Half</option>
          </select>

          <button type="submit" className="btn-submit">Submit Card</button>
        </form>
      </div>
    </div>
  );
};

export default CardManagement;
