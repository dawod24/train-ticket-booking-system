import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1>Train Ticket Booking System</h1>
            <nav>
                <ul style={styles.navList}>
                    <li><Link to="/" style={styles.navItem}>Home</Link></li>
                    <li><Link to="/search" style={styles.navItem}>Search Trains</Link></li>
                    <li><Link to="/bookings" style={styles.navItem}>My Bookings</Link></li>
                </ul>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#4a90e2',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
    },
    navItem: {
        color: 'white',
        textDecoration: 'none',
        margin: '0 1rem',
    },
};

export default Header;