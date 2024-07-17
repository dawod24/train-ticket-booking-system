import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [trains, setTrains] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trainsResponse = await axios.get('/api/trains');
                setTrains(trainsResponse.data);

                const bookingsResponse = await axios.get('/api/bookings');
                setBookings(bookingsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="trains-section">
                <h3>Trains</h3>
                {trains.map(train => (
                    <div key={train._id} className="train-item">
                        <p>{train.name}: {train.from} to {train.to}</p>
                        <p>Departure: {new Date(train.departureTime).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div className="bookings-section">
                <h3>Recent Bookings</h3>
                {bookings.map(booking => (
                    <div key={booking._id} className="booking-item">
                        <p>User: {booking.user.username}</p>
                        <p>Train: {booking.train.name}</p>
                        <p>Seats: {booking.seats.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;