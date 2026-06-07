/**
 * Wraps an async Express route handler so that any rejected promise
 * is automatically forwarded to the global error-handling middleware
 * via next(err), eliminating the need for try/catch in every handler.
 *
 * @param {import("express").RequestHandler} fn - Async route handler
 * @returns {import("express").RequestHandler}
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
