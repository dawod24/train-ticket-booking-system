// server/routes/users.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/me', auth, async (req, res) => {
    try {
        console.log('Fetching user with ID:', req.user.id);
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ msg: 'User not found' });
        }
        console.log('User found:', user);
        res.json(user);
    } catch (err) {
        console.error('Error in /me route:', err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    const { username, email } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;