// server/routes/trains.js
const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// GET /api/trains/search
router.get('/search', async (req, res) => {
    console.log('Search route hit. Query:', req.query);
    try {
        const { from, to, date } = req.query;

        if (!from || !to || !date) {
            console.log('Missing parameters');
            return res.status(400).json({ message: 'Missing required search parameters' });
        }

        const query = {
            from: { $regex: new RegExp(from, 'i') },
            to: { $regex: new RegExp(to, 'i') },
            departureTime: {
                $gte: new Date(`${date}T00:00:00.000Z`),
                $lt: new Date(`${date}T23:59:59.999Z`)
            }
        };

        console.log('Searching with query:', query);

        const trains = await Train.find(query);

        console.log('Search results:', trains);

        res.json(trains);
    } catch (error) {
        console.error('Error in search route:', error);
        res.status(500).json({ message: 'Error searching trains', error: error.message });
    }
});

// Add a simple test route
router.get('/test', (req, res) => {
    res.json({ message: 'Train routes are working' });
});

// GET /api/trains
router.get('/', async (req, res) => {
    try {
        const trains = await Train.find();
        console.log('All trains:', trains);
        res.json(trains);
    } catch (error) {
        console.error('Error fetching all trains:', error);
        res.status(500).json({ message: 'Error fetching trains', error: error.message });
    }
});

// In server/routes/trains.js, add this new route

router.post('/book', async (req, res) => {
    try {
        const { trainId, seats } = req.body;
        const train = await Train.findById(trainId);

        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }

        if (train.availableSeats < seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        train.availableSeats -= seats;
        await train.save();

        res.json({ message: 'Booking successful', train });
    } catch (error) {
        res.status(500).json({ message: 'Error booking train', error: error.message });
    }
});

router.get('/:id/seats', async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(train.seats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;