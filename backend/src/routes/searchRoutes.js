const express = require('express');
const router = express.Router();
const { search } = require('../controllers/searchController');

// Public search
// GET /api/search?q=keyword
router.get('/', search);

module.exports = router;
