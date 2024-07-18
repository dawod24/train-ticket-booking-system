// client/src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/bookings`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBookings(response.data);
        } catch (error) {
            setError('Failed to fetch bookings: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBookings(bookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            setError('Failed to cancel booking: ' + error.message);
        }
    };

    if (loading) return <div>Loading bookings...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h2>User Dashboard</h2>
            <Notification />
            {bookings.length === 0 ? (
                <p>You have no current bookings.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking._id} style={styles.bookingCard}>
                        <h3>{booking.train.name}</h3>
                        <p>From: {booking.train.from} To: {booking.train.to}</p>
                        <p>Departure: {new Date(booking.train.departureTime).toLocaleString()}</p>
                        <p>Seats: {booking.seats.join(', ')}</p>
                        <button onClick={() => handleCancelBooking(booking._id)} style={styles.cancelButton}>
                            Cancel Booking
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    bookingCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9',
    },
    cancelButton: {
        backgroundColor: '#ff4136',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default UserDashboard;