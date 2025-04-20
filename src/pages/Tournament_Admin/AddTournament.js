import React, { useState } from 'react';
import './AddTournament.css';
import { FaPlus } from 'react-icons/fa';

const AddTournament = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tournament added:', formData);
    // Add your backend logic here (e.g. axios.post)
  };

  return (
    <div className="add-tournament-container">
      <div className="form-card">
        <h2 className="form-title">Add New Tournament</h2>
        <form onSubmit={handleSubmit}>
          <label>Tournament Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter tournament name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Tournament Number</label>
          <input
            type="text"
            name="number"
            placeholder="Enter tournament number"
            value={formData.number}
            onChange={handleChange}
          />

          <div className="date-fields">
            <div>
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
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
