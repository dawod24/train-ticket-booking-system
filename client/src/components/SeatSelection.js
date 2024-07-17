import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SeatSelection = () => {
    const [train, setTrain] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { trainId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrain = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/trains/${trainId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch train data');
                }
                const data = await response.json();
                setTrain(data);
            } catch (error) {
                console.error('Error fetching train:', error);
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

    if (!train) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <h2>Select Seats for {train.name}</h2>
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
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        margin: '20px 0',
    },
    seat: {
        padding: '10px',
        border: '1px solid black',
        cursor: 'pointer',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default SeatSelection;