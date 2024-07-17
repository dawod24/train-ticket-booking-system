import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '../components/SearchResults';

const SearchResultsPage = () => {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const searchParams = new URLSearchParams(location.search);
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

    return <SearchResults trains={trains} loading={loading} error={error} />;
};

export default SearchResultsPage;