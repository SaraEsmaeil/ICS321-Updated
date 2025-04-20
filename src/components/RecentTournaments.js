import React from 'react';
import './RecentTournaments.css';
import '../styles/Typography.css';
import { FaTrophy } from 'react-icons/fa';

const tournaments = [
  { name: 'Spring Championship 2025', teams: 8, status: 'Active', badge: 'in-progress' },
  { name: 'Winter Cup 2025', teams: 12, status: 'Completed', badge: 'completed' }
];

const RecentTournaments = () => {
  return (
    <div className="recent-tournaments">
      <div className="text-title" style={{ fontWeight: 'bold' }}>
  Recent Tournaments
</div>

      <div className="tournament-list">
        {tournaments.map((t, index) => (
          <div className="tournament-card" key={index}>
            <div className="tournament-left">
              <FaTrophy className="tournament-icon" />
              <div>
                <div className="text-tournament-title">{t.name}</div>
                <div className="text-tournament-sub">{t.teams} Teams • {t.status}</div>
              </div>
            </div>
            <div className={`badge ${t.badge}`}>{t.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTournaments;
