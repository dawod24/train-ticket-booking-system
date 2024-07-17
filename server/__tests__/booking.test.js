const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../server');
const User = require('../models/User');
const Train = require('../models/Train');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

let mongoServer;
let token;
let userId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Create a user and generate token
    const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    await user.save();
    userId = user._id;

    token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Train.deleteMany({});
    await Booking.deleteMany({});
});

describe('Booking Routes', () => {
    it('should create a new booking', async () => {
        const train = new Train({
            name: 'Test Train',
            from: 'City A',
            to: 'City B',
            departureTime: new Date(),
            arrivalTime: new Date(),
            seats: [{ number: '1A', isBooked: false }]
        });
        await train.save();

        const res = await request(app)
            .post('/api/bookings')
            .set('Authorization', `Bearer ${token}`)
            .send({
                trainId: train._id,
                seats: ['1A']
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.seats).toContain('1A');
    });
});