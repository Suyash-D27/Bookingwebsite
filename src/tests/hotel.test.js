const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Hotel Endpoints', () => {

    // We assume the DB connection is handled by app.js or beforeAll in a setup file
    // But for safety in standalone run:
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should get all hotels (public route)', async () => {
        const res = await request(app).get('/api/hotels');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });

});
