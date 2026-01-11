const express = require('express');
const router = express.Router();
const {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel
} = require('../controllers/hotelController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getHotels);
router.get('/:id', getHotelById);

// Admin protected routes
router.use(authMiddleware);
router.post('/', createHotel);
router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);

module.exports = router;
