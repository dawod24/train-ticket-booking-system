// client/src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
    const [trains, setTrains] = useState([]);
    const [newTrain, setNewTrain] = useState({
        name: '',
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTrains();
    }, []);

    const fetchTrains = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/trains', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch trains');
            }
            const data = await response.json();
            setTrains(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setNewTrain({ ...newTrain, [e.target.name]: e.target.value });
    };

    const handleAddTrain = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/admin/trains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(newTrain)
            });
            if (!response.ok) {
                throw new Error('Failed to add train');
            }
            fetchTrains();
            setNewTrain({
                name: '',
                from: '',
                to: '',
                departureTime: '',
                arrivalTime: '',
                availableSeats: 0
            });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h2>Admin Panel</h2>
            <h3>Add New Train</h3>
            <form onSubmit={handleAddTrain} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    value={newTrain.name}
                    onChange={handleInputChange}
                    placeholder="Train Name"
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="from"
                    value={newTrain.from}
                    onChange={handleInputChange}
                    placeholder="From"
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="to"
                    value={newTrain.to}
                    onChange={handleInputChange}
                    placeholder="To"
                    required
                    style={styles.input}
                />
                <input
                    type="datetime-local"
                    name="departureTime"
                    value={newTrain.departureTime}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                />
                <input
                    type="datetime-local"
                    name="arrivalTime"
                    value={newTrain.arrivalTime}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    name="availableSeats"
                    value={newTrain.availableSeats}
                    onChange={handleInputChange}
                    placeholder="Available Seats"
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Add Train</button>
            </form>
            <h3>All Trains</h3>
            {trains.map((train) => (
                <div key={train._id} style={styles.trainCard}>
                    <h4>{train.name}</h4>
                    <p>From: {train.from} To: {train.to}</p>
                    <p>Departure: {new Date(train.departureTime).toLocaleString()}</p>
                    <p>Arrival: {new Date(train.arrivalTime).toLocaleString()}</p>
                    <p>Available Seats: {train.availableSeats}</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
    },

    trainCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
    },
};

export default AdminPanel;