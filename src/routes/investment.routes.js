import express from "express";

import InvestmentController from "../controller/investment.controller.js";

import verifyToken from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  createInvestmentSchema,
} from "../validator/investment.validator.js";

const router = express.Router();

/**
 * Create Investment
 * POST /api/investments
 */
router.post(
  "/create-investment",
  verifyToken,
  validate(createInvestmentSchema),
  InvestmentController.createInvestment
);

/**
 * Get Active Investments
 * GET /api/investments/active
 */
router.get(
  "/active",
  verifyToken,
  InvestmentController.getActiveInvestments
);

/**
 * Get Logged-in User Investments
 * GET /api/investments/my-investments
 */
router.get(
  "/my-investments",
  verifyToken,
  InvestmentController.getUserInvestments
);

/**
 * Get Investment By Id
 * GET /api/investments/:id
 */
router.get(
  "/:id",
  verifyToken,
  InvestmentController.getInvestmentById
);

/**
 * Cancel Investment
 * PATCH /api/investments/:id/cancel
 */
router.patch(
  "/:id/cancel",
  verifyToken,
  InvestmentController.cancelInvestment
);

/**
 * Complete Investment
 * PATCH /api/investments/:id/complete
 */
router.patch(
  "/:id/complete",
  verifyToken,
  InvestmentController.completeInvestment
);

export default router;