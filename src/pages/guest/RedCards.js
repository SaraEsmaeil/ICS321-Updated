import React from 'react';
import './RedCards.css';

const RedCards = () => {
    const redCardData = [
        {
            player: 'Salem Al-Dawsari',
            team: 'Al-Hilal',
            minute: 67,
            match: 'Al-Hilal vs Al-Nassr'
        },
        {
            player: 'Abderrazak Hamdallah',
            team: 'Al-Ittihad',
            minute: 45,
            match: 'Al-Ittihad vs Al-Ahli'
        },
        {
            player: 'Cristiano Ronaldo',
            team: 'Al-Nassr',
            minute: 89,
            match: 'Al-Nassr vs Al-Shabab'
        },
        {
            player: 'Ever Banega',
            team: 'Al-Shabab',
            minute: 23,
            match: 'Al-Fateh vs Al-Shabab'
        },
    ];

    return (
        <div className="red-cards-container">
            <h1 className="red-cards-title">Red Cards Issued</h1>
            <div className="red-cards-list">
                {redCardData.map((card, index) => (
                    <div key={index} className="red-card">
                        <div className="card-header">
                            <span className="red-card-icon">🟥</span>
                            <div className="player-info">
                                <h2>{card.player}</h2>
                                <div className="team-match">
                                    <span className="team">{card.team}</span>
                                    <span className="match">{card.match}</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-details">
                            <span className="minute">{card.minute}'</span>
                            <div className="match-context">
                                <span className="match-date">March 25, 2024</span>
                                <span className="competition">Saudi Pro League</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RedCards;