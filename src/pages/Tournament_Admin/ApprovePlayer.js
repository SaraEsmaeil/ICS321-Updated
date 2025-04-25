import React, { useState } from 'react';
import './ApprovePlayer.css';

const ApprovePlayer = () => {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Ahmed',
      position: 'Forward',
      team: 'Falcons',
      pendingSince: '2 days'
    },
    {
      id: 2,
      name: 'Mohammed',
      position: 'Goalkeeper',
      team: 'Wolves',
      pendingSince: '3 days'
    },
    {
      id: 3,
      name: 'Khalid',
      position: 'Defender',
      team: 'Tigers',
      pendingSince: '1 day'
    }
  ]);

  const handleApprove = (id) => {
    setPlayers(players.filter(player => player.id !== id));
    alert('Player approved!');
  };

  return (
    <div className="approve-player-container">
      <h2 className="page-title">Pending Player Approvals</h2>
      <div className="player-grid">
        {players.map(player => (
          <div key={player.id} className="player-card">
            <h4>{player.name}</h4>
            <p className="light">{player.position}</p>
            <p className="team-label">Team: <strong>{player.team}</strong></p>
            <p className="pending">Pending since {player.pendingSince}</p>
            <button className="approve-btn" onClick={() => handleApprove(player.id)}>
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovePlayer;
