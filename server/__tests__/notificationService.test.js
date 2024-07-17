const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const Notification = require('../models/Notification');
const notificationService = require('../services/notificationService');

let mongoServer;
let userId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Create a test user
    const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    await user.save();
    userId = user._id;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Notification.deleteMany({});
    jest.clearAllMocks();
});

describe('Notification Service', () => {
    it('should create a new notification', async () => {
        await notificationService.createNotification(userId, 'Test notification', 'system');

        const notifications = await Notification.find({ user: userId });
        expect(notifications).toHaveLength(1);
        expect(notifications[0].message).toBe('Test notification');
        expect(notifications[0].type).toBe('system');

        // Check if sendMail was called
        expect(notificationService.transporter.sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
                to: 'test@example.com',
                subject: 'New Notification: system',
                text: 'Test notification'
            })
        );
    });

    // ... other tests remain the same
    it('should get user notifications', async () => {
        await notificationService.createNotification(userId, 'Test notification 1', 'system');
        await notificationService.createNotification(userId, 'Test notification 2', 'booking');

        const notifications = await notificationService.getUserNotifications(userId);
        expect(notifications).toHaveLength(2);
    });

    it('should mark notification as read', async () => {
        const notification = await notificationService.createNotification(userId, 'Test notification', 'system');

        await notificationService.markNotificationAsRead(notification._id);

        const updatedNotification = await Notification.findById(notification._id);
        expect(updatedNotification.isRead).toBe(true);
    });
});