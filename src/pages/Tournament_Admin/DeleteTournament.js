import React, { useState } from 'react';
import './DeleteTournament.css';

// Dummy data for tournaments
const dummyTournaments = [
    { id: 1, name: 'Tournament A' },
    { id: 2, name: 'Tournament B' },
    { id: 3, name: 'Tournament C' },
];

const DeleteTournament = () => {
    const [tournaments, setTournaments] = useState(dummyTournaments);
    const [selectedTournament, setSelectedTournament] = useState(null);

    const handleDelete = () => {
        if (selectedTournament) {
            const updatedTournaments = tournaments.filter(
                (tournament) => tournament.id !== selectedTournament
            );
            setTournaments(updatedTournaments);
            setSelectedTournament(null);
            alert('Tournament deleted successfully!');
        } else {
            alert('Please select a tournament to delete.');
        }
    };

    return (
        <div className="delete-tournament-container">
            <h1>Delete Tournament</h1>
            <div className="tournament-select">
                <label htmlFor="tournamentSelect">Select Tournament:</label>
                <select
                    id="tournamentSelect"
                    value={selectedTournament || ''}
                    onChange={(e) => setSelectedTournament(Number(e.target.value))}
                >
                    <option value="" disabled position="absolute">
                        -- Select a Tournament --
                    </option>
                    {tournaments.map((tournament) => (
                        <option key={tournament.id} value={tournament.id}>
                            {tournament.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleDelete}
                className="delete-button"
            >
                Delete Tournament
            </button>
            <div className="remaining-tournaments">
                <h2>Remaining Tournaments:</h2>
                <ul className="tournament-list">
                    {tournaments.map((tournament) => (
                        <li key={tournament.id}>{tournament.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DeleteTournament;