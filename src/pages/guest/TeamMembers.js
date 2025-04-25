import React, { useState } from 'react';
import './TeamMembers.css';

const TeamMembers = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamData, setTeamData] = useState(null);

  // Dummy team data
  const dummyTeams = {
    team1: {
      name: 'Falcons',
      group: 'Group A',
      matchesPlayed: 5,
      manager: {
        name: 'John Doe',
        contact: 'john@example.com',
      },
      coach: {
        name: 'Jane Smith',
        contact: 'jane@example.com',
      },
      captain: {
        name: 'Ali Ahmed',
      },
      players: [
        { id: 1, name: 'Player 1', jersey_no: '10', position: 'Forward' },
        { id: 2, name: 'Player 2', jersey_no: '5', position: 'Defender' },
        { id: 3, name: 'Player 3', jersey_no: '7', position: 'Midfielder' },
      ],
    },
    team2: {
      name: 'Wolves',
      group: 'Group B',
      matchesPlayed: 4,
      manager: {
        name: 'Mohammed Ali',
        contact: 'mohammed@example.com',
      },
      coach: {
        name: 'Sara Khan',
        contact: 'sara@example.com',
      },
      captain: {
        name: 'Omar Ali',
      },
      players: [
        { id: 1, name: 'Player A', jersey_no: '9', position: 'Forward' },
        { id: 2, name: 'Player B', jersey_no: '4', position: 'Defender' },
        { id: 3, name: 'Player C', jersey_no: '11', position: 'Goalkeeper' },
      ],
    },
  };

  const handleTeamChange = (e) => {
    const selected = e.target.value;
    setSelectedTeam(selected);
    setTeamData(dummyTeams[selected] || null);
  };

  return (
    <div className="team-members-container">
      <h2 className="team-members-title">Browse Team Members</h2>

      <label className="team-members-label">Select a Team</label>
      <select className="team-members-select" value={selectedTeam} onChange={handleTeamChange}>
        <option value="">Select Team</option>
        <option value="team1">Falcons</option>
        <option value="team2">Wolves</option>
      </select>

      {teamData && (
        <div className="team-info">
          <h3 className="team-members-subtitle">Team Overview</h3>
          <p><strong>Team Name:</strong> {teamData.name}</p>
          <p><strong>Group:</strong> {teamData.group}</p>
          <p><strong>Matches Played:</strong> {teamData.matchesPlayed}</p>

          <h3 className="team-members-subtitle">Team Members</h3>

          <div className="team-role manager">
            <h4>Manager</h4>
            <p>{teamData.manager.name}</p>
            <p>{teamData.manager.contact}</p>
          </div>

          <div className="team-role coach">
            <h4>Coach</h4>
            <p>{teamData.coach.name}</p>
            <p>{teamData.coach.contact}</p>
          </div>

          <div className="team-role captain">
            <h4>Captain</h4>
            <p>{teamData.captain.name}</p>
          </div>

          <h4>Players</h4>
          <ul className="players-list">
            {teamData.players.map((player) => (
              <li key={player.id} className="player-card">
                <p>{player.name} - #{player.jersey_no} - {player.position}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
