import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';

const ViewTournament = () => {
    const now = new Date();
    
    // Helper functions to create relative dates
    const createDate = (days) => {
        const date = new Date(now);
        date.setDate(date.getDate() + days);
        return date;
    };

    const [tournaments] = useState([
        // Future tournaments
        { 
            id: 1,
            name: "Summer Champions Cup",
            startDate: createDate(7),  // Starts in 7 days
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
        
        // Ongoing tournaments
        { 
            id: 3,
            name: "World Football Championship",
            startDate: createDate(-3),  // Started 3 days ago
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
        
        // Finished tournaments
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

    const [filter, setFilter] = useState('all');

    const filterTournaments = () => {
        const currentDate = new Date();
        return tournaments.filter(tournament => {
            const start = new Date(tournament.startDate);
            const end = new Date(tournament.endDate);
            
            if (filter === 'future') return start > currentDate;
            if (filter === 'ongoing') return start <= currentDate && end >= currentDate;
            if (filter === 'finished') return end < currentDate;
            return true;
        });
    };

    const getStatus = (tournament) => {
        const currentDate = new Date();
        const start = new Date(tournament.startDate);
        const end = new Date(tournament.endDate);
        
        if (start > currentDate) return 'future';
        if (end < currentDate) return 'finished';
        return 'ongoing';
    };

    const statusColors = {
        future: 'primary',
        ongoing: 'success',
        finished: 'secondary'
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4 text-center" style={{ color: '#002B5B' }}>
                Tournament Viewer
            </h1>

            <div className="row mb-4">
                <div className="col-md-6 mx-auto">
                    <div className="d-flex gap-2 justify-content-center">
                        {['all', 'future', 'ongoing', 'finished'].map((f) => (
                            <button
                                key={f}
                                className={`btn btn-${f === filter ? statusColors[f] || 'dark' : 'outline-dark'}`}
                                onClick={() => setFilter(f)}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filterTournaments().map((tournament) => (
                    <div className="col" key={tournament.id}>
                        <div className="card h-100 shadow-sm border-0">
                            <div 
                                className="card-header"
                                style={{ 
                                    backgroundColor: '#002B5B',
                                    color: 'white'
                                }}
                            >
                                <h5 className="mb-0">{tournament.name}</h5>
                            </div>
                            
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className={`badge bg-${statusColors[getStatus(tournament)]}`}>
                                        {getStatus(tournament).toUpperCase()}
                                    </span>
                                    <small className="text-muted">
                                        {tournament.location}
                                    </small>
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <small className="text-muted">Starts:</small>
                                            <div className="fw-bold">
                                                {format(new Date(tournament.startDate), 'MMM dd, yyyy')}
                                            </div>
                                        </div>
                                        <div>
                                            <small className="text-muted">Ends:</small>
                                            <div className="fw-bold">
                                                {format(new Date(tournament.endDate), 'MMM dd, yyyy')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="progress" style={{ height: '5px' }}>
    <div 
        className={`progress-bar bg-${statusColors[getStatus(tournament)]}`}
        style={{ 
            width: getStatus(tournament) === 'finished' ? '100%' : 
                   getStatus(tournament) === 'ongoing' ? '50%' : 
                   '30%' // Shorter width for future tournaments
        }}
    />
</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewTournament;