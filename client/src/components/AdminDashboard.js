import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTrain, setEditingTrain] = useState(null);
    const [newTrain, setNewTrain] = useState({
        name: '', from: '', to: '', departureTime: '', arrivalTime: '', seats: ''
    });

    useEffect(() => {
        fetchTrains();
    }, []);

    const fetchTrains = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/trains', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    const handleInputChange = (e, isNewTrain = false) => {
        const { name, value } = e.target;
        if (isNewTrain) {
            setNewTrain({ ...newTrain, [name]: value });
        } else {
            setEditingTrain({ ...editingTrain, [name]: value });
        }
    };

    const handleAddTrain = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/admin/trains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newTrain)
            });
            if (!response.ok) {
                throw new Error('Failed to add train');
            }
            const addedTrain = await response.json();
            setTrains([...trains, addedTrain]);
            setNewTrain({ name: '', from: '', to: '', departureTime: '', arrivalTime: '', seats: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditTrain = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/admin/trains/${editingTrain._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editingTrain)
            });
            if (!response.ok) {
                throw new Error('Failed to update train');
            }
            const updatedTrain = await response.json();
            setTrains(trains.map(train => train._id === updatedTrain._id ? updatedTrain : train));
            setEditingTrain(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteTrain = async (trainId) => {
        if (window.confirm('Are you sure you want to delete this train?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/trains/${trainId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to delete train');
                }
                setTrains(trains.filter(train => train._id !== trainId));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) return <div>Loading trains...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h2>Admin Dashboard</h2>
            <h3>All Trains</h3>
            {trains.map((train) => (
                <div key={train._id} style={styles.trainCard}>
                    {editingTrain && editingTrain._id === train._id ? (
                        <form onSubmit={handleEditTrain}>
                            <input name="name" value={editingTrain.name} onChange={handleInputChange} required />
                            <input name="from" value={editingTrain.from} onChange={handleInputChange} required />
                            <input name="to" value={editingTrain.to} onChange={handleInputChange} required />
                            <input name="departureTime" type="datetime-local" value={editingTrain.departureTime} onChange={handleInputChange} required />
                            <input name="arrivalTime" type="datetime-local" value={editingTrain.arrivalTime} onChange={handleInputChange} required />
                            <input name="seats" type="number" value={editingTrain.seats} onChange={handleInputChange} required />
                            <button type="submit">Save</button>
                            <button onClick={() => setEditingTrain(null)}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <h4>{train.name}</h4>
                            <p>From: {train.from} To: {train.to}</p>
                            <p>Departure: {new Date(train.departureTime).toLocaleString()}</p>
                            <p>Available Seats: {train.seats.filter(seat => !seat.isBooked).length}</p>
                            <button onClick={() => setEditingTrain(train)}>Edit</button>
                            <button onClick={() => handleDeleteTrain(train._id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
            <h3>Add New Train</h3>
            <form onSubmit={handleAddTrain} style={styles.form}>
                <input name="name" value={newTrain.name} onChange={(e) => handleInputChange(e, true)} placeholder="Train Name" required />
                <input name="from" value={newTrain.from} onChange={(e) => handleInputChange(e, true)} placeholder="From" required />
                <input name="to" value={newTrain.to} onChange={(e) => handleInputChange(e, true)} placeholder="To" required />
                <input name="departureTime" type="datetime-local" value={newTrain.departureTime} onChange={(e) => handleInputChange(e, true)} required />
                <input name="arrivalTime" type="datetime-local" value={newTrain.arrivalTime} onChange={(e) => handleInputChange(e, true)} required />
                <input name="seats" type="number" value={newTrain.seats} onChange={(e) => handleInputChange(e, true)} placeholder="Number of Seats" required />
                <button type="submit" style={styles.submitButton}>Add Train</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    trainCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default AdminDashboard;