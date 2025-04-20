import React from 'react';
import './MatchSummary.css';
import '../styles/Typography.css';

const recentResults = [
  { teamA: 'Team Alpha', score: '2 - 1', teamB: 'Team Beta' },
  { teamA: 'Team Gamma', score: '0 - 3', teamB: 'Team Delta' },
];

const upcomingMatches = [
  { teamA: 'Team Epsilon', time: 'Apr 22, 15:00', teamB: 'Team Zeta' },
  { teamA: 'Team Theta', time: 'Apr 23, 16:30', teamB: 'Team Iota' },
];

const MatchSummary = () => {
  return (
    <div className="match-summary">
         <div className="text-title" style={{ fontWeight: 'bold' }}>
  Match summary
</div>
      <div className="match-cards">
        {/* Recent Results */}
        <div className="match-section">
          <h4 className="text-subtitle">Recent Results</h4>
          {recentResults.map((match, index) => (
            <div key={index} className="match-box">
              <span className="text-team-name">{match.teamA}</span>
              <span className="text-score">{match.score}</span>
              <span className="text-team-name">{match.teamB}</span>
            </div>
          ))}
        </div>

        {/* Upcoming Matches */}
        <div className="match-section">
          <h4 className="text-subtitle">Upcoming Matches</h4>
          {upcomingMatches.map((match, index) => (
            <div key={index} className="match-box">
              <span className="text-team-name">{match.teamA}</span>
              <span className="text-match-time">{match.time}</span>
              <span className="text-team-name">{match.teamB}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchSummary;
