import React, { useState } from 'react';

const DeleteTournament = () => {
    const createDate = (days) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    };

    const [tournaments, setTournaments] = useState([
        { 
            id: 1,
            name: "Summer Champions Cup",
            startDate: createDate(7),
            endDate: createDate(14),
            location: "Madrid, Spain"
        },
        { 
            id: 2,
            name: "Youth Football League",
            startDate: createDate(3),
            endDate: createDate(10),
            location: "London, UK"
        },
        { 
            id: 3,
            name: "World Football Championship",
            startDate: createDate(-3),
            endDate: createDate(4),
            location: "Paris, France"
        },
        { 
            id: 4,
            name: "City Cup Tournament",
            startDate: createDate(-5),
            endDate: createDate(2),
            location: "Berlin, Germany"
        },
        { 
            id: 5,
            name: "Winter Soccer Classic",
            startDate: createDate(-30),
            endDate: createDate(-15),
            location: "Moscow, Russia"
        },
        { 
            id: 6,
            name: "Spring Training Cup",
            startDate: createDate(-20),
            endDate: createDate(-10),
            location: "Rome, Italy"
        }
    ]);

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

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <h1 className="text-center mb-4">Delete Tournament</h1>
                    
                    <div className="mb-4">
                        <div className="form-group">
                            <label htmlFor="tournamentSelect" className="form-label">
                                Select Tournament:
                            </label>
                            <select
                                id="tournamentSelect"
                                className="form-select"
                                value={selectedTournament || ''}
                                onChange={(e) => setSelectedTournament(Number(e.target.value))}
                            >
                                <option value="" disabled>
                                    -- Select a Tournament --
                                </option>
                                {tournaments.map((tournament) => (
                                    <option key={tournament.id} value={tournament.id}>
                                        {tournament.name} ({formatDate(tournament.startDate)} to {formatDate(tournament.endDate)})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="d-grid gap-2 mb-4">
                        <button
                            onClick={handleDelete}
                            className="btn btn-danger btn-lg"
                        >
                            Delete Tournament
                        </button>
                    </div>

                    <div className="mt-4">
                        <h4>Remaining Tournaments:</h4>
                        <div className="list-group">
                            {tournaments.map((tournament) => (
                                <div 
                                    key={tournament.id}
                                    className="list-group-item d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{tournament.name}</div>
                                        <span className="text-muted">
                                            {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                                        </span>
                                        <div className="text-muted small mt-1">
                                            Location: {tournament.location}
                                        </div>
                                    </div>
                                    <span className="badge bg-primary rounded-pill">
                                        ID: {tournament.id}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteTournament;