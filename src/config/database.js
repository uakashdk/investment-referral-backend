import mongoose from "mongoose";
import env from "./env.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const MAX_RETRIES = env.dbRetryCount;
  const RETRY_DELAY = env.dbRetryDelay;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        ` Connecting to MongoDB (${attempt}/${MAX_RETRIES})...`
      );

      await mongoose.connect(env.mongoUri);

      console.log(" MongoDB Connected Successfully");

      return;
    } catch (error) {
      console.error(
        ` MongoDB Connection Failed (${attempt}/${MAX_RETRIES})`
      );

      console.error(error.message);

      if (attempt === MAX_RETRIES) {
        console.error(" Maximum retry attempts reached.");
        throw error;
      }

      console.log(
        ` Retrying in ${RETRY_DELAY / 1000} seconds...\n`
      );

      await sleep(RETRY_DELAY);
    }
  }
};

/**
 * Connection Events
 */

mongoose.connection.on("connected", () => {
  console.log(" MongoDB Connected");
});

mongoose.connection.on("disconnected", () => {
  console.log(" MongoDB Disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error(" MongoDB Error:", err.message);
});

export default connectDB;