// client/src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios';

const AdminDashboard = () => {
    const [trains, setTrains] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [trainsResponse, bookingsResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/trains`),
                axios.get(`${API_BASE_URL}/bookings`)
            ]);

            setTrains(trainsResponse.data);
            setBookings(bookingsResponse.data);
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={styles.message}>Loading...</div>;
    if (error) return <div style={styles.message}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h2>Admin Dashboard</h2>
            <div style={styles.section}>
                <h3>Trains</h3>
                {trains.map(train => (
                    <div key={train._id} style={styles.item}>
                        <p>{train.name}: {train.from} to {train.to}</p>
                        <p>Departure: {new Date(train.departureTime).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div style={styles.section}>
                <h3>Recent Bookings</h3>
                {bookings.map(booking => (
                    <div key={booking._id} style={styles.item}>
                        <p>User: {booking.user.username}</p>
                        <p>Train: {booking.train.name}</p>
                        <p>Seats: {booking.seats.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    section: {
        marginBottom: '20px',
    },
    item: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9',
    },
    message: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#555',
        marginTop: '20px',
    },
};

export default AdminDashboard;