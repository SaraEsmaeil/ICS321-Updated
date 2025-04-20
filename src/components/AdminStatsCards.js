import React from 'react';
import './AdminStatsCards.css';
import '../styles/Typography.css';
import { FaThList, FaUsers, FaTrophy } from 'react-icons/fa';

const AdminStatsCards = () => {
  const stats = [
    { title: 'Total Teams', value: 24, icon: <FaThList /> },
    { title: 'Total Players', value: 312, icon: <FaUsers /> },
    { title: 'Active Tournaments', value: 3, icon: <FaTrophy /> }
  ];

  return (
    <div className="stats-cards">
      {stats.map((card, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <span className="text-label">{card.title}</span>
            <span className="stat-icon">{card.icon}</span>
          </div>
          <div className="text-value">{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;
