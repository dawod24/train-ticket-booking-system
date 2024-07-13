// server/routes/trains.js
const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

router.get('/', async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const train = new Train({
        name: req.body.name,
        from: req.body.from,
        to: req.body.to,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime,
        seats: req.body.seats,
    });

    try {
        const newTrain = await train.save();
        res.status(201).json(newTrain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;