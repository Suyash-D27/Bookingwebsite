const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Admin routes
router.use(authMiddleware);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
