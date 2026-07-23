import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,

  dbRetryCount: Number(process.env.DB_RETRY_COUNT),
  dbRetryDelay: Number(process.env.DB_RETRY_DELAY),
};