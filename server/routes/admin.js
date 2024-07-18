// server/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Train = require('../models/Train');
const Booking = require('../models/Booking');

// Get all trains (admin only)
router.get('/trains', [auth, admin], async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/bookings', [auth, admin], async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'username').populate('train', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new train (admin only)
router.post('/trains', [auth, admin], async (req, res) => {
    try {
        const { name, from, to, departureTime, arrivalTime, seats } = req.body;

        const newTrain = new Train({
            name,
            from,
            to,
            departureTime,
            arrivalTime,
            seats: Array(parseInt(seats)).fill().map((_, i) => ({ number: `${i + 1}`, isBooked: false }))
        });

        const train = await newTrain.save();
        res.json(train);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a train (admin only)
router.put('/trains/:id', [auth, admin], async (req, res) => {
    try {
        const { name, from, to, departureTime, arrivalTime, seats } = req.body;

        let train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ msg: 'Train not found' });
        }

        train.name = name;
        train.from = from;
        train.to = to;
        train.departureTime = departureTime;
        train.arrivalTime = arrivalTime;

        // Only update seats if the number has changed
        if (seats !== train.seats.length) {
            train.seats = Array(parseInt(seats)).fill().map((_, i) => ({
                number: `${i + 1}`,
                isBooked: i < train.seats.length ? train.seats[i].isBooked : false
            }));
        }

        await train.save();
        res.json(train);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a train (admin only)
router.delete('/trains/:id', [auth, admin], async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ msg: 'Train not found' });
        }

        await train.remove();
        res.json({ msg: 'Train removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;