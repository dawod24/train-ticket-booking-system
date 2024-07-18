// client/src/pages/HomePage.js
import React from 'react';
import SearchForm from '../components/SearchForm';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <h2>Welcome to Train Ticket Booking</h2>
            <SearchForm />
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        textAlign: 'center',
    },
};

export default HomePage;