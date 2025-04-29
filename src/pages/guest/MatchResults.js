import './MatchResults.css';
// Dummy data
const matches = [
    {
        matchNumber: 1,
        team1: "Al-Hilal",
        team2: "Al-Nassr",
        goals: [
            { scorer: "Neymar Jr", number: 10, time: 28 },
            { scorer: "Cristiano Ronaldo", number: 7, time: 63 },
            { scorer: "Aleksandar Mitrović", number: 9, time: 89 }
        ]
    },
    {
        matchNumber: 2,
        team1: "Al-Ittihad",
        team2: "Al-Ahli",
        goals: [
            { scorer: "Karim Benzema", number: 9, time: 15 },
            { scorer: "Riyad Mahrez", number: 30, time: 51 },
            { scorer: "Fabinho", number: 3, time: 76 }
        ]
    },
    {
        matchNumber: 3,
        team1: "Al-Shabab",
        team2: "Al-Fateh",
        goals: [
            { scorer: "Éver Banega", number: 10, time: 34 },
            { scorer: "Cristian Tello", number: 11, time: 67 }
        ]
    },
    {
        matchNumber: 4,
        team1: "Al-Ettifaq",
        team2: "Al-Taawoun",
        goals: [
            { scorer: "Georginio Wijnaldum", number: 25, time: 42 },
            { scorer: "Salem Al-Dawsari", number: 29, time: 81 }
        ]
    },
    {
        matchNumber: 5,
        team1: "Al-Fayha",
        team2: "Al-Raed",
        goals: []
    }
];
const MatchResults = () => {
    return (
        <div className="match-results-container">
            <h1 className="page-title">Saudi Pro League Match Results</h1>
            <div className="matches-grid">
                {matches.map((match) => (
                    <div key={match.matchNumber} className="match-card">
                        <div className="match-header">
                            <div className="team">
                               
                                <span className="team-name">{match.team1}</span>
                            </div>
                            
                            <div className="match-center">
                                <span className="match-status">FT</span>
                                <div className="score">
                                    {match.goals.filter(g => g.team === match.team1).length} - 
                                    {match.goals.filter(g => g.team === match.team2).length}
                                </div>
                                <span className="match-venue">King Fahd Stadium</span>
                            </div>
                            
                            <div className="team">
                                <span className="team-name">{match.team2}</span>
        
                            </div>
                        </div>

                        <div className="match-details">
                            <div className="competition-info">
                                <span className="competition-name">Saudi Pro League</span>
                                <span className="match-date">25 March 2024</span>
                            </div>
                            
                            {match.goals.length > 0 ? (
                                <div className="goals-container">
                                    <div className="goals-column">
                                        {match.goals.map((goal, index) => (
                                            <div key={index} className="goal-event">
                                                <span className="goal-time">{goal.time}'</span>
                                                <span className="scorer">
                                                    {goal.scorer}
                                                    <span className="player-number">#{goal.number}</span>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="no-goals">No goals scored in this match</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};



export default MatchResults;