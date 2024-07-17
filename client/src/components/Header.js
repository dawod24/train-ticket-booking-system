import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <header style={styles.header}>
            <h1>Train Ticket Booking System</h1>
            <nav>
                <ul style={styles.navList}>
                    <li><Link to="/" style={styles.navItem}>Home</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/my-bookings" style={styles.navItem}>My Bookings</Link></li>
                            <li><Link to="/profile" style={styles.navItem}>Profile</Link></li>
                            {user && user.isAdmin && <li><Link to="/admin" style={styles.navItem}>Admin Panel</Link></li>}
                            <li><button onClick={handleLogout} style={styles.logoutButton}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" style={styles.navItem}>Login</Link></li>
                            <li><Link to="/register" style={styles.navItem}>Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

// ... styles remain the same
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
    logoutButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '1rem',
    },
};

export default Header;