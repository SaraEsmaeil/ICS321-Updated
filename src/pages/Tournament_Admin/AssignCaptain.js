import React, { useState, useEffect } from 'react';
import './AssignCaptain.css';
// Dummy data for testing
const dummyTeams = [
  {
    id: '1',
    name: 'Team A',
    members: [
      { id: '101', name: 'Ahmed' },
      { id: '102', name: 'Majid' },
      { id: '103', name: 'Saeed' },
    ],
  },
  {
    id: '2',
    name: 'Team B',
    members: [
      { id: '201', name: 'Fahd' },
      { id: '202', name: 'Yasir' },
      { id: '203', name: 'Mohammed' },
    ],
  },
];
// Import CSS for styling
// Ensure this component is rendered when "Assign Captain" is clicked in the sidebar
// Example using React Router for routing:



const AssignCaptain = ({ teams = dummyTeams, onAssignCaptain = () => {} }) => {

    const [selectedTeam, setSelectedTeam] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectedCaptain, setSelectedCaptain] = useState('');

    useEffect(() => {
        if (selectedTeam) {
            // Fetch team members based on the selected team
            const team = teams.find((team) => team.id === selectedTeam);
            setTeamMembers(team ? team.members : []);
        } else {
            setTeamMembers([]);
        }
        setSelectedCaptain('');
    }, [selectedTeam, teams]);

    const handleAssignCaptain = () => {
        if (selectedTeam && selectedCaptain) {
            try {
                onAssignCaptain(selectedTeam, selectedCaptain);
                alert(`Captain assigned successfully!`);
                // Reset the form after assigning
                setSelectedTeam('');
                setTeamMembers([]);
                setSelectedCaptain('');
            } catch (error) {
                console.error('Error assigning captain:', error);
                alert('An error occurred while assigning the captain. Please try again.');
            }
        } else {
            alert('Please select a team and a captain.');
        }
    };

    return (
        <div className="assign-captain-container">
            <h2>Assign Captain</h2>
            <div className="form-group">
                <label htmlFor="team">Select Team:</label>
                <select
                    id="team"
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                >
                    <option value="">-- Select Team --</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>
            {teamMembers.length > 0 && (
                <div className="form-group">
                    <label htmlFor="captain">Select Captain:</label>
                    <select
                        id="captain"
                        value={selectedCaptain}
                        onChange={(e) => setSelectedCaptain(e.target.value)}
                    >
                        <option value="">-- Select Captain --</option>
                        {teamMembers.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <button className="assign-button" onClick={handleAssignCaptain}>
                Assign Captain
            </button>
        </div>
    );
};

export default AssignCaptain;
