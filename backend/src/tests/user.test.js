const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { User } = require('../models');

let token;

describe('User Endpoints', () => {

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        await User.deleteMany({ email: 'usertest@example.com' });
        const res = await request(app).post('/api/auth/register').send({
            name: 'Profile Test User',
            email: 'usertest@example.com',
            password: 'password123'
        });
        token = res.body.data.token;
    });

    afterAll(async () => {
        await User.deleteMany({ email: 'usertest@example.com' });
        await mongoose.connection.close();
    });

    it('should get user profile', async () => {
        const res = await request(app)
            .get('/api/user/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.email).toEqual('usertest@example.com');
    });

    it('should update user profile', async () => {
        const res = await request(app)
            .put('/api/user/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Name',
                phone: '1234567890'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.name).toEqual('Updated Name');
    });
});
