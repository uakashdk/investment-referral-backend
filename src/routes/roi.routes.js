import express from "express";

import ROIHistoryController from "../controller/roi.controller.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Get Logged-in User ROI History
 * GET /api/v1/roi-history/history
 */
router.get(
  "/history",
  verifyToken,
  ROIHistoryController.getUserROIHistory
);

/**
 * Get Total ROI Earned
 * GET /api/v1/roi-history/total
 */
router.get(
  "/total",
  verifyToken,
  ROIHistoryController.getTotalROI
);

/**
 * Get Pending ROI
 * GET /api/v1/roi-history/pending
 */
router.get(
  "/pending",
  verifyToken,
  ROIHistoryController.getPendingROI
);

/**
 * Get All ROI History
 * GET /api/v1/roi-history/all
 */
router.get(
  "/all",
  verifyToken,
  ROIHistoryController.getAllROIHistory
);

/**
 * Get Investment ROI History
 * GET /api/v1/roi-history/investment/:investmentId
 */
router.get(
  "/investment/:investmentId",
  verifyToken,
  ROIHistoryController.getInvestmentROIHistory
);

/**
 * Get ROI History By Id
 * GET /api/v1/roi-history/:id
 */
router.get(
  "/:id",
  verifyToken,
  ROIHistoryController.getROIHistoryById
);

export default router;