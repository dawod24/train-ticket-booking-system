// client/src/components/SeatSelection.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SeatSelection = () => {
    const [train, setTrain] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { trainId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrain = async () => {
            try {
                const response = await axios.get(`/api/trains/${trainId}`);
                setTrain(response.data);
            } catch (err) {
                setError('Failed to fetch train details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrain();
    }, [trainId]);

    const handleSeatClick = (seatNumber) => {
        setSelectedSeats(prev =>
            prev.includes(seatNumber)
                ? prev.filter(seat => seat !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    const handleConfirm = () => {
        navigate('/booking-confirmation', { state: { trainId, selectedSeats } });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!train) return <div>No train details found</div>;

    return (
        <div style={styles.container}>
            <h2>{train.name} - Seat Selection</h2>
            <p>From: {train.from} To: {train.to}</p>
            <p>Departure: {new Date(train.departureTime).toLocaleString()}</p>
            <div style={styles.seatMap}>
                {train.seats.map((seat) => (
                    <button
                        key={seat.number}
                        onClick={() => handleSeatClick(seat.number)}
                        disabled={seat.isBooked}
                        style={{
                            ...styles.seat,
                            backgroundColor: seat.isBooked ? 'gray' : selectedSeats.includes(seat.number) ? 'green' : 'white'
                        }}
                    >
                        {seat.number}
                    </button>
                ))}
            </div>
            <button onClick={handleConfirm} disabled={selectedSeats.length === 0} style={styles.confirmButton}>
                Confirm Selection
            </button>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
    },
    seatMap: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '10px',
        margin: '20px 0',
    },
    seat: {
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #ddd',
        cursor: 'pointer',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default SeatSelection;