require('dotenv').config();
const mongoose = require('mongoose');
const { User, Hotel, Monastery, Event } = require('./models');

const checkCounts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const u = await User.countDocuments();
        const h = await Hotel.countDocuments();
        const m = await Monastery.countDocuments();
        const e = await Event.countDocuments();

        console.log(`Users: ${u}`);
        console.log(`Hotels: ${h}`);
        console.log(`Monasteries: ${m}`);
        console.log(`Events: ${e}`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
checkCounts();
