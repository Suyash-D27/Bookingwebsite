const { Hotel, Monastery, Event } = require('../models');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

exports.search = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    throw new ApiError(400, "Query parameter 'q' is required");
  }

  const regex = new RegExp(q, 'i'); // case-insensitive search

  const hotels = await Hotel.find({ isActive: true, $or: [{ name: regex }, { city: regex }, { address: regex }] });
  const monasteries = await Monastery.find({ isActive: true, $or: [{ name: regex }, { location: regex }, { description: regex }] });
  const events = await Event.find({ isActive: true, $or: [{ name: regex }, { location: regex }, { description: regex }] });

  res.status(200).json(
    new ApiResponse(200, { hotels, monasteries, events }, "Search results fetched successfully")
  );
});
