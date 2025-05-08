import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BrowsePlayerHighestGoal.css';

const BrowsePlayerHighestGoal = () => {
    const [topScorers, setTopScorers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hardcoded API base URL
    const API_BASE_URL = 'http://localhost:3001';

    useEffect(() => {
        const fetchTopScorers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/players/top-scorers`);
                setTopScorers(response.data);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching player data:', error);
                setError('Failed to load top scorers data');
                setLoading(false);
                
                if (error.response) {
                    console.error('Server responded with:', error.response.status);
                } else if (error.request) {
                    console.error('No response received from server');
                }
            }
        };

        fetchTopScorers();
    }, []);

    return (
        <div className="player-highest-goals-container">
            <h1>Top Scorers by Tournament</h1>
            
            {error && <p className="error-message">{error}</p>}
            
            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : (
                topScorers.length > 0 ? (
                    topScorers.map((tournament) => (
                        <div key={tournament.tournament_id} className="tournament-scorers">
                            <h2>{tournament.tournament_name}</h2>
                            <div className="player-info">
                                <p><strong>Player:</strong> {tournament.player_name}</p>
                                <p><strong>Goals:</strong> {tournament.total_goals}</p>
                                <p><strong>Team:</strong> {tournament.team_name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-data">No top scorers found</p>
                )
            )}
        </div>
    );
};

export default BrowsePlayerHighestGoal;