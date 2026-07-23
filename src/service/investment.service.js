import InvestmentRepository from "../repositories/investment.repository.js";
import UserRepository from "../repositories/user.repository.js";
import ApiError from "../utills/ApiError.js";

class InvestmentService {
  /**
   * Create Investment
   */
  async createInvestment(data) {
    const {
      userId,
      amount,
      planName,
      durationInDays,
      dailyROIPercentage,
    } = data;

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    if (user.accountStatus !== "ACTIVE") {
      throw new ApiError(403, "User account is inactive.");
    }

    if (amount <= 0) {
      throw new ApiError(400, "Investment amount must be greater than zero.");
    }

    const startDate = new Date();

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationInDays);

    const investment =
      await InvestmentRepository.createInvestment({
        user: userId,
        investmentAmount: amount,
        planDetails: planName,
        startDate,
        endDate,
        dailyROIPercentage,
        investmentStatus: "ACTIVE",
      });

    return investment;
  }

  /**
   * Get Investment By Id
   */
  async getInvestmentById(id) {
    const investment = await InvestmentRepository.findById(id);

    if (!investment) {
      throw new ApiError(404, "Investment not found.");
    }

    return investment;
  }

  /**
   * Get User Investments
   */
  async getUserInvestments(userId) {
    return await InvestmentRepository.findByUserId(userId);
  }

  /**
   * Get Active Investments
   */
  async getActiveInvestments() {
    return await InvestmentRepository.findActiveInvestments();
  }

  /**
   * Cancel Investment
   */
  async cancelInvestment(id) {
    const investment = await InvestmentRepository.findById(id);

    if (!investment) {
      throw new ApiError(404, "Investment not found.");
    }

    if (investment.investmentStatus !== "ACTIVE") {
      throw new ApiError(
        400,
        "Only active investments can be cancelled."
      );
    }

    return await InvestmentRepository.updateStatus(
      id,
      "CANCELLED"
    );
  }

  /**
   * Complete Investment
   */
  async completeInvestment(id) {
    const investment = await InvestmentRepository.findById(id);

    if (!investment) {
      throw new ApiError(404, "Investment not found.");
    }

    return await InvestmentRepository.updateStatus(
      id,
      "COMPLETED"
    );
  }
}

export default new InvestmentService();