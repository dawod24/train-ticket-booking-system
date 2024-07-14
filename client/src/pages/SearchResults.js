// src/pages/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '../components/SearchResults';

const SearchResultsPage = () => {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const fetchTrains = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/trains/search?${searchParams}`);
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

        fetchTrains();
    }, [location.search]);

    const handleBookNow = (train) => {
        setSelectedTrain(train);
    };

    const handleBookingComplete = (result) => {
        setTrains(trains.map(t =>
            t._id === result.train._id ? result.train : t
        ));
        setSelectedTrain(null);
        alert('Booking successful!');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <SearchResults
            trains={trains}
            onBookNow={handleBookNow}
            selectedTrain={selectedTrain}
            onBookingComplete={handleBookingComplete}
        />
    );
};

export default SearchResultsPage;