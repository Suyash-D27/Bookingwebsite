const express = require('express');
const router = express.Router();
const { generateTicket, getTicket, downloadTicket } = require('../controllers/ticketController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', generateTicket);
router.get('/:id', getTicket);
router.get('/:id/download', downloadTicket);

module.exports = router;
