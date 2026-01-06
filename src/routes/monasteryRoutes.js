const express = require('express');
const router = express.Router();
const {
  createMonastery,
  getMonasteries,
  getMonasteryById,
  updateMonastery,
  deleteMonastery
} = require('../controllers/monasteryController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getMonasteries);
router.get('/:id', getMonasteryById);

// Admin routes
router.use(authMiddleware);
router.post('/', createMonastery);
router.put('/:id', updateMonastery);
router.delete('/:id', deleteMonastery);

module.exports = router;
