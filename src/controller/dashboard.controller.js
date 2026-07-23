import DashboardService from "../service/dashboard.service.js";

class DashboardController {
  /**
   * Get Dashboard
   * GET /api/dashboard
   */
  async getDashboard(req, res, next) {
    try {
      const dashboard = await DashboardService.getDashboard(
        req.user._id
      );

      return res.status(200).json({
        success: true,
        message: "Dashboard fetched successfully.",
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();