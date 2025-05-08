import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MatchResults.css';

const MatchResults = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Change the useEffect fetch call to
        const response = await axios.get('http://localhost:3001/api/matches/results')
        setMatches(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) return <div className="loading">Loading matches...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="match-results-container">
      <h1 className="page-title">Match Results</h1>
      <div className="matches-grid">
        {matches.map((match) => {
          const [score1, score2] = match.goal_score?.split('-') || ['0', '0'];
          
          return (
            <div key={match.id} className="match-card">
              <div className="match-header">
                <div className="team">
                  <span className="team-name">{match.team1}</span>
                </div>
                
                <div className="match-center">
                  <span className="match-status">FT</span>
                  <div className="score">
                    <span>{score1}</span>
                    <span>-</span>
                    <span>{score2}</span>
                  </div>
                  <span className="match-date">{formatDate(match.date)}</span>
                  <span className="match-venue">{match.venue}</span>
                </div>
                
                <div className="team">
                  <span className="team-name">{match.team2}</span>
                </div>
              </div>

              {match.goals.length > 0 && (
                <div className="goals-container">
                  <h3>Goal Details</h3>
                  <div className="goals-list">
                    {match.goals.map((goal, index) => (
                      <div key={index} className="goal-item">
                        <span className="goal-time">{goal.time}'</span>
                        <span className="goal-scorer">
                          {goal.scorer} 
                          <span className="goal-team">({goal.team})</span>
                        </span>
                        <span className="goal-number">#{goal.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchResults;