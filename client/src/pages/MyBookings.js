import React, { useState, useEffect } from 'react';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchBookings();
    }, []);

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
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
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
};

export default MyBookings;