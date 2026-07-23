import express from "express";
import cors from "cors";
import errorHandler from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import investmentRoutes from "./routes/investment.routes.js";
import referralRoutes from "./routes/referal.routes.js";
import roiRoutes from "./routes/roi.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health Check
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Investment Management API Running Successfully 🚀",
  });
});

/**
 * Routes
 */

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/investments", investmentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/referrals", referralRoutes);
app.use("/api/v1/roi-history", roiRoutes);

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

app.use(errorHandler);

export default app;