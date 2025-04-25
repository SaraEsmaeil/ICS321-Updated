import React, { useState } from 'react';
import './Fields.css';

const Fields = () => {
  const [fields, setFields] = useState([
    { id: 'F001', name: 'North Field', assignedVenue: '', available: true },
    { id: 'F002', name: 'Main Stadium', assignedVenue: 'Venue A', available: false },
    { id: 'F003', name: 'South Field', assignedVenue: '', available: true }
  ]);

  const venues = ['Venue A', 'Venue B', 'Venue C'];

  const handleAssign = (fieldId, venueName) => {
    const updated = fields.map(field =>
      field.id === fieldId
        ? { ...field, assignedVenue: venueName, available: false }
        : field
    );
    setFields(updated);
    alert(`✅ ${venueName} assigned to ${fieldId}`);
    // TODO: POST or PATCH to backend to update venue_description
  };

  return (
    <div className="fields-container">
      <h2>Manage Soccer Fields</h2>
      <table className="fields-table">
        <thead>
          <tr>
            <th>Field ID</th>
            <th>Field Name</th>
            <th>Assigned Venue</th>
            <th>Status</th>
            <th>Assign to Venue</th>
          </tr>
        </thead>
        <tbody>
          {fields.map(field => (
            <tr key={field.id}>
              <td>{field.id}</td>
              <td>{field.name}</td>
              <td>{field.assignedVenue || '-'}</td>
              <td>
                <span className={field.available ? 'available' : 'assigned'}>
                  {field.available ? 'Available' : 'Assigned'}
                </span>
              </td>
              <td>
                <select
                  onChange={(e) => handleAssign(field.id, e.target.value)}
                  disabled={!field.available}
                  defaultValue=""
                >
                  <option value="" disabled>Select Venue</option>
                  {venues.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fields;
