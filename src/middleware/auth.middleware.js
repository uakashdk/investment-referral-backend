import UserRepository from "../repositories/user.repository.js";
import { verifyAccessToken } from "../utills/jwt.js";

const verifyToken = async (req, res, next) => {
  try {
    /**
     * Authorization Header
     */
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });
    }

    /**
     * Bearer Token
     */
    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    /**
     * Verify JWT
     */
    const decoded = verifyAccessToken(token);

    /**
     * Find User
     */
    const user = await UserRepository.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    /**
     * Account Status
     */
    if (user.accountStatus !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    /**
     * Attach User
     */
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default verifyToken;