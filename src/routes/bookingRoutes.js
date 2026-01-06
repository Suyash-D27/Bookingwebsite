const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking
} = require('../controllers/bookingController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', createBooking);
router.get('/:id', getBookingById);
router.put('/:id/cancel', cancelBooking);
router.get('/', getAllBookings); // Admin: see all bookings

module.exports = router;
