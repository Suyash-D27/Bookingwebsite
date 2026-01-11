const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getUserBookings } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Protect all routes
router.use(authMiddleware);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/bookings', getUserBookings);

module.exports = router;
