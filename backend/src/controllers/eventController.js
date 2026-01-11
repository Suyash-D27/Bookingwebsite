const { Event } = require('../models');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

exports.createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(
    new ApiResponse(201, event, "Event created successfully")
  );
});

exports.getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ isActive: true });
  res.status(200).json(
    new ApiResponse(200, events, "Events fetched successfully")
  );
});

exports.getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }
  res.status(200).json(
    new ApiResponse(200, event, "Event fetched successfully")
  );
});

exports.updateEvent = asyncHandler(async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    throw new ApiError(404, "Event not found");
  }
  res.status(200).json(
    new ApiResponse(200, updated, "Event updated successfully")
  );
});

exports.deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!event) {
    throw new ApiError(404, "Event not found");
  }
  res.status(200).json(
    new ApiResponse(200, {}, "Event deactivated")
  );
});
