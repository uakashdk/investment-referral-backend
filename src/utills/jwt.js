import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Generate Access Token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: "7d",
  });
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};