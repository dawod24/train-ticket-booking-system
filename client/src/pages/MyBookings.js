import React from 'react';

const MyBookings = () => {
    return (
        <div style={styles.container}>
            <h2>My Bookings</h2>
            <p>You have no current bookings.</p>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        textAlign: 'center',
    },
};

export default MyBookings;