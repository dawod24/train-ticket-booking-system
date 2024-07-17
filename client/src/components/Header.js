import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
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
                    {user ? (
                        <>
                            <li><Link to="/dashboard" style={styles.navItem}>My Dashboard</Link></li>
                            {(user.role === 'admin' || user.role === 'super_admin') && (
                                <li><Link to="/admin" style={styles.navItem}>Admin Dashboard</Link></li>
                            )}
                            {user.role === 'super_admin' && (
                                <li><Link to="/super-admin" style={styles.navItem}>Super Admin Dashboard</Link></li>
                            )}
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