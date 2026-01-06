const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { User, Hotel } = require('../models');

let token;
let hotelId;

describe('Booking Endpoints', () => {

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        await User.deleteMany({ email: 'bookingtest@example.com' });
        const res = await request(app).post('/api/auth/register').send({
            name: 'Booking Test User',
            email: 'bookingtest@example.com',
            password: 'password123'
        });
        token = res.body.data.token;

        // Create a dummy hotel to book
        const hotel = await Hotel.create({
            name: 'Booking Test Hotel',
            location: 'Gangtok',
            pricePerNight: 2000
        });
        hotelId = hotel._id;
    });

    afterAll(async () => {
        await User.deleteMany({ email: 'bookingtest@example.com' });
        await Hotel.findByIdAndDelete(hotelId);
        await mongoose.connection.close();
    });

    it('should create a booking', async () => {
        const res = await request(app)
            .post('/api/bookings')
            .set('Authorization', `Bearer ${token}`)
            .send({
                targetType: 'Hotel',
                targetId: hotelId,
                checkIn: '2025-12-25',
                checkOut: '2025-12-28',
                totalAmount: 6000
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.data).toHaveProperty('_id');
    });

    it('should get user bookings', async () => {
        const res = await request(app)
            .get('/api/user/bookings')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});
