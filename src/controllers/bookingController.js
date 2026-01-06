const { Booking } = require('../models');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

// Create booking
exports.createBooking = asyncHandler(async (req, res) => {
  const { targetType, targetId, checkIn, checkOut, qty, totalAmount } = req.body;

  const booking = await Booking.create({
    userId: req.user.id,
    targetType,
    targetId,
    checkIn,
    checkOut,
    qty,
    totalAmount
  });

  res.status(201).json(
    new ApiResponse(201, booking, "Booking successful")
  );
});

// Get booking by ID
exports.getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('targetId').populate('userId');
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  res.status(200).json(
    new ApiResponse(200, booking, "Booking fetched successfully")
  );
});

// Get all bookings (admin)
exports.getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().populate('targetId').populate('userId');
  res.status(200).json(
    new ApiResponse(200, bookings, "All bookings fetched successfully")
  );
});

// Cancel booking
exports.cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  res.status(200).json(
    new ApiResponse(200, booking, "Booking cancelled")
  );
});
