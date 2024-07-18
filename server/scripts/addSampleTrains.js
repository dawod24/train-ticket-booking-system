// server/scripts/addSampleTrains.js
const mongoose = require('mongoose');
require('dotenv').config();
const Train = require('../models/Train');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Could not connect to Database', err));

const sampleTrains = [
    {
        name: "Express 1",
        from: "New York",
        to: "Boston",
        departureTime: new Date("2023-07-15T09:00:00Z"),
        arrivalTime: new Date("2023-07-15T13:00:00Z"),
        availableSeats: 100
    },
    {
        name: "Express 2",
        from: "Boston",
        to: "New York",
        departureTime: new Date("2023-07-15T14:00:00Z"),
        arrivalTime: new Date("2023-07-15T18:00:00Z"),
        availableSeats: 80
    }
];

const addSampleTrains = async () => {
    try {
        await Train.insertMany(sampleTrains);
        console.log('Sample trains added successfully');
    } catch (error) {
        console.error('Error adding sample trains:', error);
    } finally {
        mongoose.connection.close();
    }
};

addSampleTrains();