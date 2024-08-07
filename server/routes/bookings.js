// server/routes/bookings.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Train = require('../models/Train');
const notificationService = require('../services/notificationService');

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
    // ... (keep the existing code for creating a booking)
    try {
        const { trainId, seats } = req.body;

        // Check if train exists
        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(404).json({ msg: 'Train not found' });
        }

        // Check if seats are available
        const unavailableSeats = seats.filter(seatNumber =>
            train.seats.find(s => s.number === seatNumber && s.isBooked)
        );

        if (unavailableSeats.length > 0) {
            return res.status(400).json({ msg: `Seats ${unavailableSeats.join(', ')} are not available` });
        }

        // Create booking
        const newBooking = new Booking({
            user: req.user.id,
            train: trainId,
            seats: seats
        });

        // Update train's seat availability
        train.seats.forEach(seat => {
            if (seats.includes(seat.number)) {
                seat.isBooked = true;
            }
        });

        await train.save();
        await newBooking.save();

        // Create notification
        await notificationService.createNotification(
            req.user.id,
            `Your booking for ${train.name} from ${train.from} to ${train.to} has been confirmed.`,
            'booking'
        );

        const populatedBooking = await Booking.findById(newBooking._id).populate('train');

        res.json(populatedBooking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

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

        // Update train's seat availability
        const train = await Train.findById(booking.train);
        booking.seats.forEach(seatNumber => {
            const seat = train.seats.find(s => s.number === seatNumber);
            if (seat) {
                seat.isBooked = false;
            }
        });
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