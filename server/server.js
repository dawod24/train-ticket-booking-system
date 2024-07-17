const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bookingsRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');
const userManagementRoutes = require('./routes/userManagement');
const notificationRoutes = require('./routes/notifications');
const trainRoutes = require('./routes/trains');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', userManagementRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/admin', adminRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.send('Train Booking API is running');
});

// Function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to Database');
    } catch (err) {
        console.error('Could not connect to Database', err);
    }
};

// Start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 5000;
    connectDB().then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    });
}

module.exports = { app, connectDB };