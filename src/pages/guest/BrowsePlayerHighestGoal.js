import React, { useEffect, useState } from 'react';
import './BrowsePlayerHighestGoal.css';

// Dummy data for testing
const dummyPlayer = {
    name: "Ali Al-Hassan",
    goals: 27,
    team: "Team Falcons"
};

const BrowsePlayerHighestGoal = () => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        // Simulate API call with dummy data
        const fetchPlayerWithHighestGoals = async () => {
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Use dummy data instead of actual API call
                setPlayer(dummyPlayer);
                
                // For actual implementation, you would use:
                // const response = await fetch('/api/players/highest-goals');
                // const data = await response.json();
                // setPlayer(data);
                
            } catch (error) {
                console.error('Error fetching player data:', error);
            }
        };

        fetchPlayerWithHighestGoals();
    }, []);

    return (
        <div className="player-highest-goals-container">
            <h1>Player with the Highest Goals</h1>
            {player ? (
                <div className="player-info">
                    <p><strong>Name:</strong> {player.name}</p>
                    <p><strong>Goals Scored:</strong> {player.goals}</p>
                    <p><strong>Team:</strong> {player.team}</p>
                </div>
            ) : (
                <p className="loading-message">Loading...</p>
            )}
        </div>
    );
};

export default BrowsePlayerHighestGoal;