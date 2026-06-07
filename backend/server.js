require("dotenv").config();

const createApp = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

/**
 * Bootstrap the server:
 *  1. Connect to MongoDB
 *  2. Create the Express app
 *  3. Start listening
 */
const startServer = async () => {
  try {
    await connectDB();

    const app = createApp();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
