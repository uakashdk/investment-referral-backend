import UserRepository from "../repositories/user.repository.js";
import InvestmentRepository from "../repositories/investment.repository.js";
import ROIHistoryRepository from "../repositories/roiHistory.repository.js";
import ReferralRepository from "../repositories/referralIncome.repository.js";
import ApiError from "../utills/ApiError.js";

class DashboardService {
  /**
   * User Dashboard
   */
  async getDashboard(userId) {
    /**
     * Validate User
     */
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    /**
     * Fetch Dashboard Data
     */
    const [
      totalInvestment,
      totalROI,
      totalReferralIncome,
      investments,
      roiHistory,
      referralHistory,
    ] = await Promise.all([
      InvestmentRepository.getUserTotalInvestment(userId),
      ROIHistoryRepository.getTotalROIByUser(userId),
      ReferralRepository.getTotalReferralIncome(userId),
      InvestmentRepository.findByUserId(userId),
      ROIHistoryRepository.findByUserId(userId),
      ReferralRepository.getReferralHistory(userId),
    ]);

    return {
      summary: {
        walletBalance: user.walletBalance,
        totalInvestment,
        totalROIEarned: totalROI,
        totalLevelIncomeEarned: totalReferralIncome,
      },

      recentInvestments: investments.slice(0, 5),

      recentROIHistory: roiHistory.slice(0, 5),

      recentReferralHistory: referralHistory.slice(0, 5),
    };
  }
}

export default new DashboardService();