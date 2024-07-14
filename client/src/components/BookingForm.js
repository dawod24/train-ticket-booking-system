// src/components/BookingForm.js
import React, { useState } from 'react';

const BookingForm = ({ train, onBookingComplete }) => {
    const [seats, setSeats] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/trains/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ trainId: train._id, seats }),
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            const result = await response.json();
            onBookingComplete(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
                Number of seats:
                <input
                    type="number"
                    min="1"
                    max={train.availableSeats}
                    value={seats}
                    onChange={(e) => setSeats(parseInt(e.target.value))}
                    style={styles.input}
                />
            </label>
            <button type="submit" disabled={loading} style={styles.button}>
                {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
            {error && <p style={styles.error}>{error}</p>}
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: '20px 0',
    },
    label: {
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '5px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};

export default BookingForm;