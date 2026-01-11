const mongoose = require("mongoose");
const { ApiError } = require("../utils/ApiError");

exports.errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error for debugging
    console.error(`[Error] ${statusCode} - ${message}`);
    if (err.errors) console.error(err.errors);
    if (err.stack) console.error(err.stack);

    return res.status(statusCode).json({
      success: false,
      message,
      errors: err.errors || [],
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  res.status(error.statusCode).json({
    ...response,
    errors: error.errors || []
  });
};

