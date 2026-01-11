const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validateMiddleware');
const { body } = require('express-validator');
const { register, login, verifyEmail } = require('../controllers/authControllers');


// Register
router.post(
  '/register',
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ]),
  register
);

// Login
router.post('/login', login);

// Verify email
router.post('/verify-email', verifyEmail);

module.exports = router;
