const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const postRoutes = require("./routes/post.routes");
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/AppError");

/**
 * Creates and configures the Express application.
 * @returns {import("express").Application}
 */
const createApp = () => {
  const app = express();

  // --------------- Global Middleware ---------------

  // Security headers
  app.use(helmet());

  // CORS — allow the Vite frontend dev server
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
      credentials: true,
    })
  );

  // HTTP request logging
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }

  // Body parsers
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // --------------- Routes ---------------

  /** Health check */
  app.get("/api/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Blog Management API is running 🚀",
      timestamp: new Date().toISOString(),
    });
  });

  /** Blog post routes */
  app.use("/api/posts", postRoutes);

  // --------------- 404 & Error Handling ---------------

  /** Catch-all for unknown routes */
  app.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.method} ${req.originalUrl}`, 404));
  });

  /** Global error handler (must be last) */
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
