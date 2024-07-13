// scripts/addSampleData.js
const mongoose = require('mongoose');
require('dotenv').config();

const Train = require('../models/Train');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Could not connect to Database', err));

const sampleTrains = [
    {
        name: 'Express 1',
        from: 'New York',
        to: 'Washington D.C.',
        departureTime: new Date('2023-07-15T09:00:00'),
        arrivalTime: new Date('2023-07-15T13:00:00'),
        seats: 200
    },
    {
        name: 'Express 2',
        from: 'Los Angeles',
        to: 'San Francisco',
        departureTime: new Date('2023-07-16T10:00:00'),
        arrivalTime: new Date('2023-07-16T16:00:00'),
        seats: 180
    },
    // Add more sample trains as needed
];

const addSampleData = async () => {
    try {
        await Train.insertMany(sampleTrains);
        console.log('Sample data added successfully');
    } catch (error) {
        console.error('Error adding sample data:', error);
    } finally {
        mongoose.connection.close();
    }
};

addSampleData();