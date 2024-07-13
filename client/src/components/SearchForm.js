import React, { useState } from 'react';

const SearchForm = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call an API to search for trains
        console.log('Searching for trains:', { from, to, date });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">Search Trains</button>
        </form>
    );
};

export default SearchForm;