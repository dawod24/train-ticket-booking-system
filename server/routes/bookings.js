const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Train = require('../models/Train');

// Get user's bookings
router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('train');
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create a new booking
router.post('/', auth, async (req, res) => {
    try {
        const { trainId, seats } = req.body;

        // Check if train exists and has enough seats
        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(404).json({ msg: 'Train not found' });
        }
        if (train.availableSeats < seats) {
            return res.status(400).json({ msg: 'Not enough seats available' });
        }

        // Create booking
        const newBooking = new Booking({
            user: req.user.id,
            train: trainId,
            seats: seats
        });

        // Update train's available seats
        train.availableSeats -= seats;
        await train.save();

        await newBooking.save();

        res.json(newBooking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Add this new route to your existing bookings.js file

// Cancel a booking
router.delete('/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        // Check if the booking belongs to the user
        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Update train's available seats
        const train = await Train.findById(booking.train);
        train.availableSeats += booking.seats;
        await train.save();

        // Remove the booking
        await booking.remove();

        res.json({ msg: 'Booking cancelled successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;