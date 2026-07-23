import express from "express";

import ReferralController from "../controller/referal.controller.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Get Logged-in User Referral History
 * GET /api/v1/referrals/history
 */
router.get(
  "/history",
  verifyToken,
  ReferralController.getReferralHistory
);

/**
 * Get Total Referral Income
 * GET /api/v1/referrals/total-income
 */
router.get(
  "/total-income",
  verifyToken,
  ReferralController.getTotalReferralIncome
);

/**
 * Get Referral By Id
 * GET /api/v1/referrals/:id
 */
router.get(
  "/all",
  verifyToken,
  ReferralController.getAllReferrals
);

router.get(
  "/:id",
  verifyToken,
  ReferralController.getReferralById
);

export default router;