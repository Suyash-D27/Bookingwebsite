const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth Endpoints', () => {
    // Clear users before tests
    beforeAll(async () => {
        // Wait for DB connection if not already connected (app.js calls connectDB)
        // In a real setup, we might want to connect manually here to be sure, 
        // but app.js does it. We just need to make sure we can clean up.
        // Let's verify connection state or wait a bit.
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        await User.deleteMany({ email: 'test@example.com' });
    });

    afterAll(async () => {
        await User.deleteMany({ email: 'test@example.com' });
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.data).toHaveProperty('token');
    });

    it('should login the registered user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('token');
    });

    it('should not login with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(400); // Assuming 400 or 401
    });
});
