const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { User } = require('../models');

let token;

describe('Monastery Endpoints', () => {

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        // Create user and get token for protected routes
        await User.deleteMany({ email: 'monasterytest@example.com' });
        const res = await request(app).post('/api/auth/register').send({
            name: 'Monastery Test User',
            email: 'monasterytest@example.com',
            password: 'password123'
        });
        token = res.body.data.token;
    });

    afterAll(async () => {
        await User.deleteMany({ email: 'monasterytest@example.com' });
        await mongoose.connection.close();
    });

    it('should create a monastery (protected)', async () => {
        const res = await request(app)
            .post('/api/monasteries')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Rumtek Monastery',
                location: 'Gangtok',
                description: 'A beautiful monastery'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.data).toHaveProperty('_id');
    });

    it('should get all monasteries', async () => {
        const res = await request(app).get('/api/monasteries');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });
});
