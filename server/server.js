const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// ... existing imports
const authRoutes = require('./routes/auth');
const bookingsRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// ... existing middleware
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/users', userRoutes);

// ... rest of your server.js code

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Could not connect to Database', err));

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const trainRoutes = require('./routes/trains');
app.use('/api/trains', trainRoutes);

// Add a simple root route for testing
app.get('/', (req, res) => {
    res.send('Train Booking API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});