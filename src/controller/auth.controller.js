import AuthService from "../service/auth.service.js";

class AuthController {
  /**
   * Register User
   * POST /api/auth/register
   */
  async register(req, res, next) {
    try {
      const result = await AuthService.registerUser(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login User
   * POST /api/auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.loginUser(
        email,
        password
      );

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * User Profile
   * GET /api/auth/profile
   */
  async getProfile(req, res, next) {
    try {
      const user = await AuthService.getProfile(req.user.id);

      return res.status(200).json({
        success: true,
        message: "Profile fetched successfully.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();