const { Hotel } = require('../models');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

// Create hotel
exports.createHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.create(req.body);
  res.status(201).json(
    new ApiResponse(201, hotel, "Hotel created successfully")
  );
});

// Get all hotels
exports.getHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({ isActive: true });
  res.status(200).json(
    new ApiResponse(200, hotels, "Hotels fetched successfully")
  );
});

// Get hotel by id
exports.getHotelById = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }
  res.status(200).json(
    new ApiResponse(200, hotel, "Hotel fetched successfully")
  );
});

// Update hotel
exports.updateHotel = asyncHandler(async (req, res) => {
  const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedHotel) {
    throw new ApiError(404, "Hotel not found");
  }
  res.status(200).json(
    new ApiResponse(200, updatedHotel, "Hotel updated successfully")
  );
});

// Soft delete hotel
exports.deleteHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }
  res.status(200).json(
    new ApiResponse(200, {}, "Hotel deactivated")
  );
});

