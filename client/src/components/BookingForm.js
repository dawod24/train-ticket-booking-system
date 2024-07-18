// client/src/components/BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';
import SeatSelection from './SeatSelection';

const BookingForm = ({ trainId }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const handleSeatSelect = (seats) => {
        setSelectedSeats(seats);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/bookings', {
                trainId,
                seats: selectedSeats
            });
            setBookingConfirmed(true);
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    if (bookingConfirmed) {
        return <div>Booking confirmed! Your seats: {selectedSeats.join(', ')}</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <SeatSelection trainId={trainId} onSeatSelect={handleSeatSelect} />
            <button type="submit" disabled={selectedSeats.length === 0}>
                Confirm Booking
            </button>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: '20px 0',
    },
    label: {
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '5px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};

export default BookingForm;