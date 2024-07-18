// server/routes/userManagement.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const superAdmin = require('../middleware/superAdmin');
const User = require('../models/User');

// Get all users (super admin only)
router.get('/', [auth, superAdmin], async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update user role (super admin only)
router.put('/:id/role', [auth, superAdmin], async (req, res) => {
    try {
        const { role } = req.body;

        if (!['user', 'admin', 'super_admin'].includes(role)) {
            return res.status(400).json({ msg: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;