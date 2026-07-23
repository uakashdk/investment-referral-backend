import ROIHistoryService from "../service/roi.service.js";

class ROIHistoryController {
  /**
   * Get Logged-in User ROI History
   * GET /api/v1/roi-history/history
   */
  async getUserROIHistory(req, res, next) {
    try {
      const roiHistory =
        await ROIHistoryService.getUserROIHistory(
          req.user._id
        );

      return res.status(200).json({
        success: true,
        data: roiHistory,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get ROI History By Id
   * GET /api/v1/roi-history/:id
   */
  async getROIHistoryById(req, res, next) {
    try {
      const roi =
        await ROIHistoryService.getROIHistoryById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: roi,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Investment ROI History
   * GET /api/v1/roi-history/investment/:investmentId
   */
  async getInvestmentROIHistory(req, res, next) {
    try {
      const roiHistory =
        await ROIHistoryService.getInvestmentROIHistory(
          req.params.investmentId
        );

      return res.status(200).json({
        success: true,
        data: roiHistory,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Total ROI Earned
   * GET /api/v1/roi-history/total
   */
  async getTotalROI(req, res, next) {
    try {
      const total =
        await ROIHistoryService.getTotalROI(
          req.user._id
        );

      return res.status(200).json({
        success: true,
        data: {
          totalROI: total,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Pending ROI
   * GET /api/v1/roi-history/pending
   */
  async getPendingROI(req, res, next) {
    try {
      const pendingROI =
        await ROIHistoryService.getPendingROI();

      return res.status(200).json({
        success: true,
        data: pendingROI,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get All ROI History
   * GET /api/v1/roi-history/all
   */
  async getAllROIHistory(req, res, next) {
    try {
      const roiHistory =
        await ROIHistoryService.getAllROIHistory();

      return res.status(200).json({
        success: true,
        data: roiHistory,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ROIHistoryController();