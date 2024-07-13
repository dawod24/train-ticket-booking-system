const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// GET /api/trains/search
router.get('/search', async (req, res) => {
    try {
        const { from, to, date } = req.query;

        if (!from || !to || !date) {
            return res.status(400).json({ message: 'Missing required search parameters' });
        }

        const trains = await Train.find({
            from: { $regex: new RegExp(from, 'i') },
            to: { $regex: new RegExp(to, 'i') },
            departureTime: {
                $gte: new Date(`${date}T00:00:00.000Z`),
                $lt: new Date(`${date}T23:59:59.999Z`)
            }
        });

        res.json(trains);
    } catch (error) {
        res.status(500).json({ message: 'Error searching trains', error: error.message });
    }
});

module.exports = router;