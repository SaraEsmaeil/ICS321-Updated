import React, { useState } from 'react';
import './AddTournament.css';
import { FaPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const AddTournament = () => {
  const [formData, setFormData] = useState({
    tr_name: '',
    start_date: '',
    end_date: ''
  });

  const [success, setSuccess] = useState(false); // ✅ NEW STATE

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tournamentData = {
      tr_id: uuidv4(),
      ...formData
    };

    console.log('Tournament added:', tournamentData);

    // ✅ Show success message
    setSuccess(true);

    // ✅ Clear the form
    setFormData({
      tr_name: '',
      start_date: '',
      end_date: ''
    });

    // ✅ Hide message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="add-tournament-container">
      <div className="form-card">
        <h2 className="form-title">Add New Tournament</h2>

        {success && <p className="success-message">✅ Tournament added successfully!</p>}

        <form onSubmit={handleSubmit}>
          <label>Tournament Name</label>
          <input
            type="text"
            name="tr_name"
            placeholder="Enter tournament name"
            value={formData.tr_name}
            onChange={handleChange}
            required
          />

          <div className="date-fields">
            <div>
              <label>Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">
            <FaPlus /> Add Tournament
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTournament; 