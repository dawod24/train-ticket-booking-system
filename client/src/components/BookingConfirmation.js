import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingConfirmation = () => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { trainId, selectedSeats } = location.state || {};

    useEffect(() => {
        const confirmBooking = async () => {
            if (!trainId || !selectedSeats) {
                setError('Booking information is missing');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post('/api/bookings', { trainId, seats: selectedSeats });
                setBooking(response.data);
            } catch (err) {
                setError('Failed to confirm booking. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        confirmBooking();
    }, [trainId, selectedSeats]);

    if (loading) return <div>Processing your booking...</div>;
    if (error) return <div>{error}</div>;
    if (!booking) return <div>No booking information available</div>;

    return (
        <div style={styles.container}>
            <h2>Booking Confirmed!</h2>
            <p>Train: {booking.train.name}</p>
            <p>From: {booking.train.from} To: {booking.train.to}</p>
            <p>Departure: {new Date(booking.train.departureTime).toLocaleString()}</p>
            <p>Seats: {booking.seats.join(', ')}</p>
            <button onClick={() => navigate('/dashboard')} style={styles.button}>
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
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default BookingConfirmation;