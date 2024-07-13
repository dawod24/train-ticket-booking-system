import { searchTrains } from '../services/api';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const [trains, setTrains] = useState([]);
    const location = useLocation();
    const { from, to, date } = location.state || {};

    // In your useEffect:
    useEffect(() => {
        const fetchTrains = async () => {
            const trainData = await searchTrains(from, to, date);
            setTrains(trainData);
        };
        fetchTrains();
    }, [from, to, date]);

    return (
        <div style={styles.container}>
            <h2>Search Results</h2>
            <p>Showing trains from {from} to {to} on {date}</p>
            {trains.map(train => (
                <div key={train.id} style={styles.trainItem}>
                    <h3>{train.name}</h3>
                    <p>Departure: {train.departure} - Arrival: {train.arrival}</p>
                    <button style={styles.bookButton}>Book Now</button>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
    },
    trainItem: {
        border: '1px solid #ddd',
        padding: '1rem',
        margin: '1rem 0',
    },
    bookButton: {
        backgroundColor: '#4a90e2',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
    },
};

export default SearchResults;