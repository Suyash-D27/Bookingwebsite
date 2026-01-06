const { Monastery } = require("../models");
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

exports.createMonastery = asyncHandler(async (req, res) => {
  const monastery = await Monastery.create(req.body);
  res.status(201).json(
    new ApiResponse(201, monastery, "Monastery created successfully")
  );
});

exports.getMonasteries = asyncHandler(async (req, res) => {
  const monasteries = await Monastery.find({ isActive: true });
  res.status(200).json(
    new ApiResponse(200, monasteries, "Monasteries fetched successfully")
  );
});

exports.getMonasteryById = asyncHandler(async (req, res) => {
  const monastery = await Monastery.findById(req.params.id);
  if (!monastery) {
    throw new ApiError(404, "Monastery not found");
  }
  res.status(200).json(
    new ApiResponse(200, monastery, "Monastery fetched successfully")
  );
});

exports.updateMonastery = asyncHandler(async (req, res) => {
  const updated = await Monastery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    throw new ApiError(404, "Monastery not found");
  }
  res.status(200).json(
    new ApiResponse(200, updated, "Monastery updated successfully")
  );
});

exports.deleteMonastery = asyncHandler(async (req, res) => {
  const monastery = await Monastery.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!monastery) {
    throw new ApiError(404, "Monastery not found");
  }
  res.status(200).json(
    new ApiResponse(200, {}, "Monastery deactivated")
  );
});
