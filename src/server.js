import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/database.js";
import mongoose from "mongoose";

let server = null;

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // Wait until database is connected
    await connectDB();

    server = app.listen(env.port, () => {
      console.log(` Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error(" Failed to start server");
    console.error(error.message);

    process.exit(1);
  }
};

/**
 * Graceful Shutdown
 */
const gracefulShutdown = async (signal) => {
  console.log(` ${signal} received. Shutting down gracefully...`);

  try {
    if (server) {
      server.close(() => {
        console.log(" HTTP Server Closed");
      });
    }

    await mongoose.connection.close();

    console.log(" MongoDB Connection Closed");

    process.exit(0);
  } catch (error) {
    console.error(" Error during shutdown:", error.message);
    process.exit(1);
  }
};

/**
 * Process Events
 */
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("uncaughtException", (error) => {
  console.error(" Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error(" Unhandled Rejection:", reason);
  process.exit(1);
});

/**
 * Bootstrap Application
 */
startServer();