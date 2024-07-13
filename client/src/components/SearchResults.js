import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { results, searchParams } = location.state || {};

    if (!results) {
        return <div>No search results available. Please perform a search.</div>;
    }

    return (
        <div>
            <h2>Search Results</h2>
            <p>Showing trains from {searchParams.from} to {searchParams.to} on {searchParams.date}</p>
            {results.length === 0 ? (
                <p>No trains found for your search criteria.</p>
            ) : (
                results.map(train => (
                    <div key={train._id}>
                        <h3>{train.name}</h3>
                        <p>From: {train.from} To: {train.to}</p>
                        <p>Departure: {new Date(train.departureTime).toLocaleString()}</p>
                        <p>Arrival: {new Date(train.arrivalTime).toLocaleString()}</p>
                        <p>Available Seats: {train.availableSeats}</p>
                        <button>Book Now</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResults;