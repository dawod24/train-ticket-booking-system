import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/search', { state: { from, to, date } });
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
                style={styles.input}
            />
            <input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
                style={styles.input}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Search Trains</button>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: '0 auto',
    },
    input: {
        margin: '0.5rem 0',
        padding: '0.5rem',
        fontSize: '1rem',
    },
    button: {
        backgroundColor: '#4a90e2',
        color: 'white',
        border: 'none',
        padding: '0.5rem',
        fontSize: '1rem',
        cursor: 'pointer',
    },
};

export default SearchForm;