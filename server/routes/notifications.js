const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationService = require('../services/notificationService');

// Get user's notifications
router.get('/', auth, async (req, res) => {
    try {
        const notifications = await notificationService.getUserNotifications(req.user.id);
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Mark notification as read
router.put('/:id/read', auth, async (req, res) => {
    try {
        await notificationService.markNotificationAsRead(req.params.id);
        res.json({ msg: 'Notification marked as read' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;