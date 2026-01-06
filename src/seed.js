const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User, Hotel, Monastery, Event } = require('./models');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Hotel.deleteMany({});
        await Monastery.deleteMany({});
        await Event.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // 1. Create Users
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        const userPassword = await bcrypt.hash('user123', salt);

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@sikkim.com',
            passwordHash: adminPassword,
            role: 'admin',
            phone: '9876543210'
        });

        const user = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            passwordHash: userPassword,
            role: 'user',
            phone: '1234567890'
        });
        console.log('👤 Users created');

        // 2. Create Hotels
        const hotels = await Hotel.insertMany([
            {
                name: 'The Elgin Nor-Khill',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
                address: 'Palace Ground',
                city: 'Gangtok',
                rating: 5,
                isActive: true
            },
            {
                name: 'Mayfair Spa Resort & Casino',
                image: 'https://images.unsplash.com/photo-1571896349842-6e5c48dc52e3?q=80&w=1200',
                address: 'Ranipool',
                city: 'Gangtok',
                rating: 5,
                isActive: true
            },
            {
                name: 'Hotel Tashi Delek',
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200',
                address: 'M.G. Marg',
                city: 'Gangtok',
                rating: 4,
                isActive: true
            }
        ]);
        console.log(`🏨 ${hotels.length} Hotels created`);

        // 3. Create Monasteries
        const monasteries = await Monastery.insertMany([
            {
                name: 'Rumtek Monastery',
                image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Rumtek_monastery.jpg',
                location: 'Rumtek, Gangtok',
                description: 'A gompa located in the Indian state of Sikkim near the capital Gangtok. It is a focal point for the sectarian tensions within the Karma Kagyu school.',
                isActive: true
            },
            {
                name: 'Pemayangtse Monastery',
                image: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Front_view_of_Pemayangtse_monastery.jpg',
                location: 'Pelling',
                description: 'One of the oldest and premier monasteries of Sikkim, famous for the sculpting and wood carving.',
                isActive: true
            },
            {
                name: 'Enchey Monastery',
                image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Enchey_monastery.jpg',
                location: 'Gangtok',
                description: 'An important seat of the Nyingma order, built on a stunning ridge with views of Kanchenjunga.',
                isActive: true
            }
        ]);
        console.log(`🏯 ${monasteries.length} Monasteries created`);

        // 4. Create Events
        const events = await Event.insertMany([
            {
                name: 'Sikkim International Flower Festival',
                image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Gangtok_flower_exhibition%2C_Sikkim.jpg',
                startDate: new Date('2025-05-01'),
                endDate: new Date('2025-05-31'),
                location: 'Gangtok',
                description: 'A spectacular display of orchids, rhododendrons, and other seasonal flowers.',
                ticketPrice: 50,
                isActive: true
            },
            {
                name: 'Losar Festival',
                image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200',
                startDate: new Date('2025-02-19'),
                endDate: new Date('2025-02-21'),
                location: 'All Sikkim',
                description: 'The Tibetan New Year, celebrated with Chaam dances in monasteries.',
                ticketPrice: 0,
                isActive: true
            }
        ]);
        console.log(`🎉 ${events.length} Events created`);

        console.log('✨ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
