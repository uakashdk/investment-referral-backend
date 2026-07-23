import { Router } from "express";

import AuthController from "../controller/auth.controller.js";

import verifyToken from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validator/auth.validator.js";

const router = Router();

/**
 * Register User
 * POST /api/auth/register
 */
router.post(
  "/register",
  validate(registerSchema),
  AuthController.register
);

/**
 * Login User
 * POST /api/auth/login
 */
router.post(
  "/login",
  validate(loginSchema),
  AuthController.login
);

/**
 * Get Profile
 * GET /api/auth/profile
 */
router.get(
  "/profile",
  verifyToken,
  AuthController.getProfile
);

export default router;