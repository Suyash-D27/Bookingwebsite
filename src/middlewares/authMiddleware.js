const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, "Unauthorized request");
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) {
      throw new ApiError(401, "Unauthorized request");
    }
    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
});
