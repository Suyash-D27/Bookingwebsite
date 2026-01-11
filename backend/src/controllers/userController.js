const { User, Booking } = require('../models');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

// ✅ Get logged-in user's profile
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json(
    new ApiResponse(200, user, "Profile fetched successfully")
  );
});

// ✅ Update profile info
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone },
    { new: true }
  ).select('-passwordHash');

  res.status(200).json(
    new ApiResponse(200, updatedUser, "Profile updated successfully")
  );
});

// ✅ Get all bookings of a user
exports.getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate('targetId');
  res.status(200).json(
    new ApiResponse(200, bookings, "User bookings fetched successfully")
  );
});
