const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

// ✅ Register a new user
exports.register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already registered");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // save new user
  const user = await User.create({ name, email, phone, passwordHash });

  // issue JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json(
    new ApiResponse(201, { user, token }, "User registered successfully")
  );
});

// ✅ Login existing user
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check user
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // check password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  // issue JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };

  res.status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(200, { user, token }, "Login successful")
    );
});

// ✅ Verify user email manually
exports.verifyEmail = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { emailVerifiedAt: new Date() },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiResponse(200, user, "Email verified")
  );
});
