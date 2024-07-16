// src/components/SearchResults.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ trains, onBookNow }) => {
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState({});

    const handleSeatChange = (trainId, seats) => {
        setSelectedSeats({ ...selectedSeats, [trainId]: seats });
    };

    const handleBookNow = async (train) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const seats = selectedSeats[train._id] || 1;

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ trainId: train._id, seats })
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            const result = await response.json();
            alert('Booking successful!');
            onBookNow(result);
        } catch (error) {
            console.error('Error booking train:', error);
            alert('Failed to book train. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Search Results</h2>
            {trains.length === 0 ? (
                <p>No trains found for your search criteria.</p>
            ) : (
                trains.map((train) => (
                    <div key={train._id} style={styles.trainCard}>
                        <h3>{train.name}</h3>
                        <p>From: {train.from} To: {train.to}</p>
                        <p>Departure: {new Date(train.departureTime).toLocaleString()}</p>
                        <p>Arrival: {new Date(train.arrivalTime).toLocaleString()}</p>
                        <p>Available Seats: {train.availableSeats}</p>
                        <div>
                            <label htmlFor={`seats-${train._id}`}>Number of seats: </label>
                            <input
                                type="number"
                                id={`seats-${train._id}`}
                                min="1"
                                max={train.availableSeats}
                                value={selectedSeats[train._id] || 1}
                                onChange={(e) => handleSeatChange(train._id, parseInt(e.target.value))}
                                style={styles.seatInput}
                            />
                        </div>
                        <button
                            style={styles.bookButton}
                            onClick={() => handleBookNow(train)}
                        >
                            Book Now
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    // ... existing styles ...
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
    },
    trainCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
    },
    bookButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    seatInput: {
        width: '50px',
        marginRight: '10px',
    },
};

export default SearchResults;