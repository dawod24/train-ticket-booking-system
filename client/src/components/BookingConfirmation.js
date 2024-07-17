import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { trainId, selectedSeats } = location.state || {};

    useEffect(() => {
        const confirmBooking = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ trainId, seats: selectedSeats })
                });

                if (!response.ok) {
                    throw new Error('Booking failed');
                }

                const data = await response.json();
                setBooking(data);
            } catch (err) {
                setError(err.message);
            }
        };

        if (trainId && selectedSeats) {
            confirmBooking();
        }
    }, [trainId, selectedSeats]);

    if (error) return <div style={styles.error}>Error: {error}</div>;
    if (!booking) return <div>Processing your booking...</div>;

    return (
        <div style={styles.container}>
            <h2>Booking Confirmed!</h2>
            <p>Train: {booking.train.name}</p>
            <p>From: {booking.train.from} To: {booking.train.to}</p>
            <p>Departure: {new Date(booking.train.departureTime).toLocaleString()}</p>
            <p>Seats: {booking.seats.join(', ')}</p>
            <button onClick={() => navigate('/my-bookings')} style={styles.button}>
                View My Bookings
            </button>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default BookingConfirmation;