const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { User } = require('../models');

let token;

describe('Event Endpoints', () => {

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        await User.deleteMany({ email: 'eventtest@example.com' });
        const res = await request(app).post('/api/auth/register').send({
            name: 'Event Test User',
            email: 'eventtest@example.com',
            password: 'password123'
        });
        token = res.body.data.token;
    });

    afterAll(async () => {
        await User.deleteMany({ email: 'eventtest@example.com' });
        await mongoose.connection.close();
    });

    it('should create an event (protected)', async () => {
        const res = await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Flower Festival',
                startDate: '2025-05-15',
                endDate: '2025-05-20',
                location: 'Gangtok',
                description: 'Annual flower show'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.data.name).toEqual('Flower Festival');
    });

    it('should get all events', async () => {
        const res = await request(app).get('/api/events');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });
});
