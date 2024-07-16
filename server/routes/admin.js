const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Train = require('../models/Train');

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

// Add a new train (admin only)
router.post('/trains', [auth, admin], async (req, res) => {
    try {
        const { name, from, to, departureTime, arrivalTime, availableSeats } = req.body;
        const newTrain = new Train({
            name,
            from,
            to,
            departureTime,
            arrivalTime,
            availableSeats
        });
        const train = await newTrain.save();
        res.json(train);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;