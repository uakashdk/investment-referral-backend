import InvestmentService from "../service/investment.service.js";

class InvestmentController {
  /**
   * Create Investment
   * POST /api/investments
   */
  async createInvestment(req, res, next) {
    try {
      const investment = await InvestmentService.createInvestment({
        ...req.body,
        userId: req.user._id,
      });

      return res.status(201).json({
        success: true,
        message: "Investment created successfully.",
        data: investment,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Investment By Id
   * GET /api/investments/:id
   */
  async getInvestmentById(req, res, next) {
    try {
      const investment = await InvestmentService.getInvestmentById(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        data: investment,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Investments of a User
   * GET /api/investments/user/:userId
   */
  async getUserInvestments(req, res, next) {
    try {
      const investments = await InvestmentService.getUserInvestments(
        req.user._id
      );

      return res.status(200).json({
        success: true,
        data: investments,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get All Active Investments
   * GET /api/investments/active
   */
  async getActiveInvestments(req, res, next) {
    try {
      const investments =
        await InvestmentService.getActiveInvestments();

      return res.status(200).json({
        success: true,
        data: investments,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Cancel Investment
   * PATCH /api/investments/:id/cancel
   */
  async cancelInvestment(req, res, next) {
    try {
      await InvestmentService.cancelInvestment(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Investment cancelled successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Complete Investment
   * PATCH /api/investments/:id/complete
   */
  async completeInvestment(req, res, next) {
    try {
      await InvestmentService.completeInvestment(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Investment marked as completed.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new InvestmentController();