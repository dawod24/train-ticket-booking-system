// client/src/pages/MyBookings.js
import React, { useState, useEffect } from 'react';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }
            alert('Booking cancelled successfully');
            fetchBookings(); // Refresh the bookings list
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>You have no bookings yet.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking._id} style={styles.bookingCard}>
                        <h3>{booking.train.name}</h3>
                        <p>From: {booking.train.from} To: {booking.train.to}</p>
                        <p>Departure: {new Date(booking.train.departureTime).toLocaleString()}</p>
                        <p>Seats: {booking.seats}</p>
                        <button
                            onClick={() => handleCancelBooking(booking._id)}
                            style={styles.cancelButton}
                        >
                            Cancel Booking
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
    bookingCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
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

export default MyBookings;