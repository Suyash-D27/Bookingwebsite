const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const hotelRoutes = require('./hotelRoutes');
const monasteryRoutes = require('./monasteryRoutes');
const eventRoutes = require('./eventRoutes');
const bookingRoutes = require('./bookingRoutes');
const ticketRoutes = require('./ticketRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/hotels', hotelRoutes);
router.use('/monasteries', monasteryRoutes);
router.use('/events', eventRoutes);
router.use('/bookings', bookingRoutes);
router.use('/tickets', ticketRoutes);
router.use('/search', searchRoutes);

module.exports = router;
