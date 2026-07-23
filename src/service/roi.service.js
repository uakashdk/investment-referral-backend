import ROIHistoryRepository from "../repositories/roiHistory.repository.js";
import UserRepository from "../repositories/user.repository.js";
import InvestmentRepository from "../repositories/investment.repository.js";
import ApiError from "../utills/ApiError.js";

class ROIHistoryService {
  /**
   * Create ROI History
   * (Internal Service - Used by Cron Job)
   */
  async createROIHistory(data, session = null) {
    const {
      user,
      investment,
      roiAmount,
      date,
      status = "PAID",
    } = data;

    /**
     * Validate User
     */
    const userData = await UserRepository.findById(user);

    if (!userData) {
      throw new ApiError(404, "User not found.");
    }

    /**
     * Validate Investment
     */
    const investmentData =
      await InvestmentRepository.findById(investment);

    if (!investmentData) {
      throw new ApiError(404, "Investment not found.");
    }

    /**
     * Validate ROI Amount
     */
    if (roiAmount <= 0) {
      throw new ApiError(
        400,
        "ROI amount must be greater than zero."
      );
    }

    /**
     * Create ROI History
     */
    return await ROIHistoryRepository.createROIHistory(
      {
        user,
        investment,
        roiAmount,
        date,
        status,
      },
      session
    );
  }

  /**
   * Get ROI History By Id
   */
  async getROIHistoryById(id) {
    const roi =
      await ROIHistoryRepository.findById(id);

    if (!roi) {
      throw new ApiError(
        404,
        "ROI history not found."
      );
    }

    return roi;
  }

  /**
   * Get Logged-in User ROI History
   */
  async getUserROIHistory(userId) {
    return await ROIHistoryRepository.findByUserId(
      userId
    );
  }

  /**
   * Get Investment ROI History
   */
  async getInvestmentROIHistory(investmentId) {
    return await ROIHistoryRepository.findByInvestmentId(
      investmentId
    );
  }

  /**
   * Get Today's ROI History
   */
  async getROIHistoryByDate(date) {
    return await ROIHistoryRepository.findByDate(
      date
    );
  }

  /**
   * Get Total ROI Earned
   */
  async getTotalROI(userId) {
    return await ROIHistoryRepository.getTotalROIByUser(
      userId
    );
  }

  /**
   * Get Pending ROI
   */
  async getPendingROI() {
    return await ROIHistoryRepository.getPendingROI();
  }

  /**
   * Update ROI Status
   */
  async updateROIStatus(id, status, session = null) {
    const roi =
      await ROIHistoryRepository.findById(id);

    if (!roi) {
      throw new ApiError(
        404,
        "ROI history not found."
      );
    }

    return await ROIHistoryRepository.updateStatus(
      id,
      status,
      session
    );
  }

  /**
   * Get All ROI History
   */
  async getAllROIHistory() {
    return await ROIHistoryRepository.getAllROIHistory();
  }
}

export default new ROIHistoryService();