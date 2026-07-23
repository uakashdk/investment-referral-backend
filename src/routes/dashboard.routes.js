import express from "express";

import DashboardController from "../controller/dashboard.controller.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Dashboard
 * GET /api/dashboard
 */
router.get(
  "/dashboard",
  verifyToken,
  DashboardController.getDashboard
);

export default router;