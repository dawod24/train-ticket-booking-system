// client/src/components/TrainList.js
import React from 'react';

const TrainList = ({ trains }) => {
    return (
        <div>
            <h2>Available Trains</h2>
            <ul>
                {trains.map((train) => (
                    <li key={train.id}>
                        {train.name} - Departs: {train.departureTime}, Arrives: {train.arrivalTime}
                        <button>Book Now</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainList;