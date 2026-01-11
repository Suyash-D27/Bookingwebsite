const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Search Endpoints', () => {

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should search for items', async () => {
        const res = await request(app).get('/api/search?q=gangtok');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('hotels');
        expect(res.body.data).toHaveProperty('monasteries');
        expect(res.body.data).toHaveProperty('events');
    });

    it('should return 400 if query is missing', async () => {
        const res = await request(app).get('/api/search');
        expect(res.statusCode).toEqual(400);
    });
});
