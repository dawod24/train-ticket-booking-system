import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SearchResults = ({ trains, loading, error }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSelectTrain = (train) => {
        if (user) {
            navigate(`/seat-selection/${train._id}`);
        } else {
            navigate('/login', { state: { from: `/seat-selection/${train._id}` } });
        }
    };

    if (loading) {
        return <div style={styles.message}>Loading search results...</div>;
    }

    if (error) {
        return <div style={styles.message}>Error: {error}</div>;
    }

    if (trains.length === 0) {
        return <div style={styles.message}>No trains found matching your search criteria.</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Search Results</h2>
            {trains.map((train) => (
                <div key={train._id} style={styles.trainCard}>
                    <h3 style={styles.trainName}>{train.name}</h3>
                    <p>From: {train.from} To: {train.to}</p>
                    <p>Departure: {new Date(train.departureTime).toLocaleString()}</p>
                    <p>Arrival: {new Date(train.arrivalTime).toLocaleString()}</p>
                    <p>Available Seats: {train.seats ? train.seats.filter(seat => !seat.isBooked).length : 'N/A'}</p>
                    <button
                        onClick={() => handleSelectTrain(train)}
                        style={styles.selectButton}
                    >
                        Select Seats
                    </button>
                </div>
            ))}
        </div>
    );
};

// ... rest of the file remains the same

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    trainCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9',
    },
    trainName: {
        color: '#2c3e50',
        marginBottom: '10px',
    },
    selectButton: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    message: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#555',
        marginTop: '20px',
    },
};

export default SearchResults;