// server/services/notificationService.js
const Notification = require('../models/Notification');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const createTransporter = () => {
    if (process.env.NODE_ENV === 'test') {
        return {
            sendMail: jest.fn().mockResolvedValue({ messageId: 'mock-message-id' })
        };
    } else {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
};

const notificationService = {
    transporter: createTransporter(),

    createNotification: async (userId, message, type) => {
        const notification = new Notification({
            user: userId,
            message,
            type
        });
        await notification.save();

        // Send email notification
        const user = await User.findById(userId);
        if (user && user.email) {
            await notificationService.transporter.sendMail({
                from: '"Train Booking System" <noreply@trainbooking.com>',
                to: user.email,
                subject: `New Notification: ${type}`,
                text: message
            });
        }

        return notification;
    },

    // ... other methods remain the same

    getUserNotifications: async (userId) => {
        return await Notification.find({ user: userId }).sort({ createdAt: -1 });
    },

    markNotificationAsRead: async (notificationId) => {
        await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    }
};

module.exports = notificationService;