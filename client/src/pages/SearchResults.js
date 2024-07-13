import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchTrains } from '../services/api';

const SearchResults = () => {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { from, to, date } = location.state || {};

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const results = await searchTrains(from, to, date);
                setTrains(results);
                setError(null);
            } catch (err) {
                setError('Failed to fetch train results. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [from, to, date]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Search Results</h2>
            {trains.length === 0 ? (
                <p>No trains found for your search criteria.</p>
            ) : (
                trains.map(train => (
                    <div key={train.id}>
                        <h3>{train.name}</h3>
                        <p>From: {train.from} To: {train.to}</p>
                        <p>Departure: {train.departureTime}</p>
                        {/* Add more train details as needed */}
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResults;