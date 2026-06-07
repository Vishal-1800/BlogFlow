const AppError = require("../utils/AppError");

/**
 * Global Express error-handling middleware.
 *
 * Normalises various error types (Mongoose CastError, duplicate-key,
 * validation errors, custom AppError) into a consistent JSON response.
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // --- Mongoose CastError (invalid ObjectId, etc.) ---
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // --- Mongoose duplicate key error ---
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue).join(", ");
    message = `Duplicate field value for: ${field}. Please use another value.`;
  }

  // --- Mongoose validation error ---
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // --- Zod validation error (fallback if not caught by middleware) ---
  if (err.name === "ZodError") {
    statusCode = 400;
    message = "Validation failed";
    errors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
  }

  // Log non-operational (unexpected) errors in development
  if (!err.isOperational && process.env.NODE_ENV === "development") {
    console.error("❌ ERROR:", err);
  }

  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  // Include stack trace in development mode only
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
