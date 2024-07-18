// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const bookingsRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');
const userManagementRoutes = require('./routes/userManagement');
const notificationRoutes = require('./routes/notifications');
const trainRoutes = require('./routes/trains');
const adminRoutes = require('./routes/admin');

const app = express();
const port = process.env.PORT || 5000;

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

// Database connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Could not connect to Database', err));

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;