import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteTournament = () => {
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // ✅ Fetch tournaments on load
    useEffect(() => {
        axios.get('http://localhost:3001/api/tournaments')
            .then(res => {
                console.log("API Response:", res.data); // Should show an array now
                if (Array.isArray(res.data)) {
                    setTournaments(res.data);
                } else {
                    console.error('Expected array but got:', res.data);
                }
            })
            .catch(err => console.error('Error fetching tournaments:', err));
    }, []);
    
    
    

    // ✅ Handle delete
    const handleDelete = () => {
        if (!selectedTournament) {
            alert("Please select a tournament to delete.");
            return;
        }

        axios.delete(`http://localhost:3001/api/tournaments/${selectedTournament}`)
            .then(() => {
                alert("Tournament deleted successfully!");
                setTournaments(prev => prev.filter(t => t.tr_id !== selectedTournament));
                setSelectedTournament(null);
            })
            .catch(err => {
                console.error("Delete error:", err);
                alert("Failed to delete tournament.");
            });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <h1 className="text-center mb-4">Delete Tournament</h1>

                    <div className="mb-4">
                        <label htmlFor="tournamentSelect" className="form-label">Select Tournament:</label>
                        <select
                            id="tournamentSelect"
                            className="form-select"
                            value={selectedTournament || ''}
                            onChange={(e) => setSelectedTournament(Number(e.target.value))}
                        >
                            <option value="" disabled>-- Select a Tournament --</option>
                            {Array.isArray(tournaments) && tournaments.map((t) => (
                                <option key={t.tr_id} value={t.tr_id}>
                                    {t.tr_name} ({formatDate(t.start_date)} - {formatDate(t.end_date)})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="d-grid mb-4">
                        <button className="btn btn-danger btn-lg" onClick={handleDelete}>
                            Delete Tournament
                        </button>
                    </div>

                    <h4>Remaining Tournaments:</h4>
                    <div className="list-group">
                        {Array.isArray(tournaments) && tournaments.map((t) => (
                            <div key={t.tr_id} className="list-group-item d-flex justify-content-between align-items-start">
                                <div>
                                    <div className="fw-bold">{t.tr_name}</div>
                                    <small>{formatDate(t.start_date)} - {formatDate(t.end_date)}</small>
                                </div>
                                <span className="badge bg-primary">ID: {t.tr_id}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteTournament;
